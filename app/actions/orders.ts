"use server";
import { customAlphabet } from "nanoid";

import { db } from "../db";
import { orderItems, orders } from "../db/schema";
import { eq } from "drizzle-orm";

const checkoutOrderAction = async (orderPayload: IOrderPayload) => {
  try {
    // Whatever is returned from this transaction becomes the value of the result.
    const result = await db.transaction(async (tx) => {
      const {
        customerName,
        phoneNumber,
        address,
        city,
        state,
        total,
        items,
        itemsSubtotal,
        deliveryFee,
        orderNotes,
      } = orderPayload;
      const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);
      const reference = `KJ-${nanoid()}`;

      // Insert a fraction of the payload into the DB
      const [newOrder] = await tx
        .insert(orders)
        .values({
          reference,
          customerName,
          phoneNumber,
          address,
          city,
          state,
          total,
          itemsSubtotal,
          deliveryFee,
          orderNotes,
        })
        .returning({ orderId: orders.id, customerName: orders.customerName });

      // Make an array of formatted cart items and do bulk insert into the order items table
      const formattedCartItems = items.map((item) => ({
        orderId: newOrder.orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.priceInKobo,
        size: item.size,
        version: item.version,
        customName: item.customization?.name,
        customNumber: item.customization?.number,
        customPrice: item.customization?.price,
      }));

      await tx.insert(orderItems).values(formattedCartItems);

      return reference;
    });

    return { success: true, reference: result };
  } catch (error) {
    throw error;
  }
  // create a transaction with drizzleORM
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
      .set({ paymentStatus: "fraud_audit_flagged" })
      .where(eq(orders.reference, reference));
    return;
  }

  await db
    .update(orders)
    .set({ paymentStatus: "paid" })
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
    .set({ paymentStatus: "failed" })
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
          .set({ paymentStatus: "paid", updatedAt: new Date() })
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
