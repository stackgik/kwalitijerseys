import z from "zod";

// Create the schema
export const DeliveryDetailsSchema = z.object({
  fullName: z
    .string()
    .min(3, "Please provide a valid name")
    .max(100, "Your name cannot be more than 100 characters"),
  email: z.email(
    "Please provide a valid email address for your digital receipt",
  ),
  phoneNumber: z
    .string()
    .regex(
      /^(070|080|081|090|091|071)\d{8}$/,
      "Provide a valid Nigerian phone number",
    ),
  address: z
    .string()
    .min(10, "Please provide a descriptive delivery address")
    .max(200, "Delivery address too long"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(1, "Please select a state"),
  deliveryNotes: z.string().max(500, "Delivery notes too long").optional(),
});

// Create a type for it
export type DeliveryDetailsSchemaType = z.infer<typeof DeliveryDetailsSchema>;
