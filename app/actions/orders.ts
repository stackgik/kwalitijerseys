"use server";
import {nanoid} from "nanoid"
import {z} from "zod"
import * as Sentry from "@sentry/nextjs";

import {db} from "../db";
import {orderItems, orders, products} from "../db/schema";
import {eq, inArray} from "drizzle-orm";
import checkoutSchema from "@/zod/checkout.schema";
import {DELIVERY_FEES, PRINT_FEE_KOBO, VERSION_UPCHARGE_KOBO} from "@/constant";

const checkoutOrderAction = async (orderPayload: unknown) => {
    const parsed = checkoutSchema.safeParse(orderPayload);
    if (!parsed.success) {
        return {success: false, error: "Invalid order details. Please check your inputs."};
    }
    const data = parsed.data;
    const {customerName, phoneNumber, address, city, state, items, orderNotes} = data;

    const ids = [...new Set(items.map((item) => item.productId))];
    const rows = await db.select().from(products).where(inArray(products.id, ids));

    const keyedProduct = new Map(rows.map(row => [row.id, row]));

    let itemsSubtotal = 0;
    const priced = items.map((item) => {
        const product = keyedProduct.get(item.productId);
        if (!product) throw new Error("Product not found");

        const unitPrice =
            product.type === "retro" || item.version === "fan"
                ? product.priceInKobo
                : product.priceInKobo + VERSION_UPCHARGE_KOBO;

        const number = item.customization?.number;
        const hasCustom = !!(item.customization?.name || item.customization?.number);
        const customPrice = !hasCustom ? 0 : (number?.length ?? 0) > 2 ? PRINT_FEE_KOBO.long : PRINT_FEE_KOBO.short;

        itemsSubtotal += (unitPrice + customPrice) * item.quantity;
        return {item, unitPrice, customPrice};
    });

    const deliveryFee = DELIVERY_FEES[state] * 100;
    const total = itemsSubtotal + deliveryFee

    const reference = `KJ-${nanoid()}`;

    try {
        await db.transaction(async (tx) => {
            const [newOrder] = await tx
                .insert(orders)
                .values({
                    reference, customerName, phoneNumber, address, city, state,
                    total, itemsSubtotal, deliveryFee, orderNotes,
                })
                .returning({orderId: orders.id});

            await tx.insert(orderItems).values(
                priced.map(({item, unitPrice, customPrice}) => ({
                    orderId: newOrder.orderId,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: unitPrice,
                    size: item.size,
                    version: item.version,
                    customName: item.customization?.name,
                    customNumber: item.customization?.number,
                    customPrice,
                }))
            );
        });
    } catch (ex) {
        Sentry.captureException(ex);
        return {success: false, error: "Something went wrong. Please try again."};
    }

    return {success: true, reference, total};
};

const markOrderPaid = async (
    reference: string,
    amountInKobo: number,
    status: string,
) => {
    if (status !== "success") return;

    const order = await db.query.orders.findFirst({
        where: eq(orders.reference, reference),
    });

    if (!order || order.paymentStatus === "paid") return;

    if (order.total !== amountInKobo) {
        await db
            .update(orders)
            .set({paymentStatus: "fraud_audit_flagged"})
            .where(eq(orders.reference, reference));
        return;
    }

    await db
        .update(orders)
        .set({paymentStatus: "paid"})
        .where(eq(orders.reference, reference));
};

const markOrderFailed = async (reference: string) => {
    const order = await db.query.orders.findFirst({
        where: eq(orders.reference, reference),
    });

    // Order doesn't exist or was already resolved — do nothing
    if (!order || order.paymentStatus !== "pending") return;

    await db
        .update(orders)
        .set({paymentStatus: "failed"})
        .where(eq(orders.reference, reference));
};

const verifyPaystackPayment = async (reference: string): Promise<boolean> => {
    try {
        // 1. Double check our DB first. If it's already marked paid by a webhook, skip the API call!
        const existingOrder = await db.query.orders.findFirst({
            where: eq(orders.reference, reference),
        });

        if (existingOrder && existingOrder.paymentStatus === "paid") {
            return true;
        }

        // 2. If not marked paid yet, talk directly to Paystack's official verification engine
        const response = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
                // Keep it fresh, don't cache verification results
                cache: "no-store",
            },
        );

        const data = await response.json();

        // 3. Confirm Paystack explicitly says the transaction is successful
        if (data.status === true && data.data.status === "success") {
            if (existingOrder && existingOrder.total === data.data.amount) {
                // Update order status to paid in your database
                await db
                    .update(orders)
                    .set({paymentStatus: "paid", updatedAt: new Date()})
                    .where(eq(orders.reference, reference));

                return true;
            }
        }

        return false;
    } catch (error) {
        console.error("Paystack verification server error:", error);
        return false;
    }
};

export {
    checkoutOrderAction,
    markOrderPaid,
    markOrderFailed,
    verifyPaystackPayment,
};
