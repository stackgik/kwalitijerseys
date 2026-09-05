// app/api/paystack/webhook/route.ts
import { markOrderFailed, markOrderPaid } from "@/app/actions/orders";
import crypto from "crypto";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  const expected = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(rawBody)
    .digest("hex");

  if (signature !== expected) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(rawBody);

  switch (event.event) {
    case "charge.success": {
      const { reference, amount, status } = event.data;
      await markOrderPaid(reference, amount, status);
      break;
    }

    case "charge.failed": {
      const { reference } = event.data;
      await markOrderFailed(reference);
      break;
    }

    default:
      // unknown event type — ignore but still return 200
      // Paystack will retry if you return non-200
      break;
  }

  return new Response("OK", { status: 200 });
}
