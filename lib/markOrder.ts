import "server-only"
import {db} from "@/app/db";
import {eq} from "drizzle-orm";
import {orders} from "@/app/db/schema";

const markOrderPaid = async (
    reference: string,
    amountInKobo: number,
) => {
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

export {markOrderPaid, markOrderFailed};