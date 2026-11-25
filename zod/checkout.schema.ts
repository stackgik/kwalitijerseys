import {z} from "zod";
import {AVAILABLE_JERSEY_SIZES, DELIVERY_FEES} from "@/constant";

const stateKeys = Object.keys(DELIVERY_FEES) as ([keyof typeof DELIVERY_FEES, ...(keyof typeof DELIVERY_FEES)[]]);

const checkoutSchema = z.object({
    customerName: z.string().trim().min(2).max(100),
    phoneNumber: z.string().trim().regex(/^\+?[0-9]{10,15}$/),
    address: z.string().trim().min(5).max(300),
    city: z.string().trim().min(2).max(100),
    state: z.enum(stateKeys),
    orderNotes: z.string().max(500).optional(),
    items: z
        .array(
            z.object({
                productId: z.guid(),
                size: z.enum(AVAILABLE_JERSEY_SIZES),
                version: z.enum(["fan", "player"]).optional(),
                quantity: z.number().int().min(1).max(10),
                customization: z
                    .object({
                        name: z.string().trim().max(12).optional(),
                        number: z.string().trim().regex(/^\d{0,3}$/).optional(),
                    })
                    .optional(),
            })
        )
        .min(1)
        .max(50), //for now
});

export type CheckoutPayload = z.infer<typeof checkoutSchema>;

export default checkoutSchema;