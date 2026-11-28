import crypto from "crypto";
import * as Sentry from "@sentry/nextjs";

import {markOrderFailed, markOrderPaid} from "@/lib/markOrder";

export async function POST(req: Request) {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    const expected = crypto
        .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
        .update(rawBody)
        .digest("hex");

    if (signature !== expected) {
        return new Response("Invalid signature", {status: 401});
    }

    let eventName = "unknown"
    try {
        const event = JSON.parse(rawBody);
        eventName = event.eventName;

        switch (event.event) {
            case "charge.success": {
                const {reference, amount} = event.data;
                await markOrderPaid(reference, amount);
                break;
            }

            case "charge.failed": {
                const {reference} = event.data;
                await markOrderFailed(reference);
                break;
            }

            default:
                break;
        }
        return new Response("OK", {status: 200});
    } catch (ex) {
        Sentry.captureException(ex, {tags: {where: "paystackWebhook"}, extra: {event: eventName}});
        return new Response("Error", {status: 500});
    }
}
