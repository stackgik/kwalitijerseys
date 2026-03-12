import {
  DeliveryDetailsSchema,
  DeliveryDetailsSchemaType,
} from "@/zod/deliveryDetails.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { nigerianStates } from "@/constant";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";

type BillingAddressFormProp = {
  onHandleWhatsAppOrder: () => void;
};

const BillingAddressForm = ({
  onHandleWhatsAppOrder,
}: BillingAddressFormProp) => {
  // React Hook Form Setup
  const form = useForm<DeliveryDetailsSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(DeliveryDetailsSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      deliveryNotes: "",
    },
  });

  return (
    <div>
      <form
        className="space-y-6 mt-4 pt-4 border-t border-gray-200"
        onSubmit={form.handleSubmit(onHandleWhatsAppOrder)}
      >
        {/* Controller for firstName */}
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel
                htmlFor="fullname"
                className="cblock text-sm font-medium"
              >
                Full Name
              </FieldLabel>
              <Input
                {...field}
                className="w-full px-4 py-6 border-2 font-semibold border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                id="fullname"
                type="text"
                placeholder="e.g., John Doe"
              />
              {fieldState.error && (
                <p className="text-red-600 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </Field>
          )}
        />

        {/* Controller for Phone Number */}
        <Controller
          name="phoneNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel
                htmlFor="phone-number"
                className="cblock text-sm font-medium"
              >
                Phone Number
              </FieldLabel>
              <Input
                {...field}
                className="w-full px-4 py-6 border-2 font-semibold border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                id="phone-number"
                type="text"
                placeholder="e.g., 08012345678"
              />
              {fieldState.error && (
                <p className="text-red-600 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </Field>
          )}
        />

        {/* Controller for Phone Number */}
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel
                htmlFor="address"
                className="cblock text-sm font-medium"
              >
                Delivery Address
              </FieldLabel>
              <Input
                {...field}
                className="w-full px-4 py-6 border-2 font-semibold border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                id="address"
                type="text"
                placeholder="e.g., 123 Main Street"
              />
              {fieldState.error && (
                <p className="text-red-600 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </Field>
          )}
        />

        {/* Controller for Phone Number */}
        <Controller
          name="city"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="city" className="cblock text-sm font-medium">
                City
              </FieldLabel>
              <Input
                {...field}
                className="w-full px-4 py-6 border-2 font-semibold border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                id="city"
                type="text"
                placeholder="e.g., Lagos"
              />
              {fieldState.error && (
                <p className="text-red-600 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </Field>
          )}
        />

        <Controller
          name="state"
          control={form.control}
          render={({ field: { onChange, value }, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="state" className="block text-sm font-medium">
                State
              </FieldLabel>
              <Select onValueChange={onChange} value={value}>
                <SelectTrigger className="w-full px-4 py-6 border-2 font-semibold border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors">
                  <SelectValue placeholder="Please select a state..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* Controller for Delivery Notes */}
        <Controller
          name="deliveryNotes"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel
                htmlFor="delivery-notes"
                className="cblock text-sm font-medium"
              >
                Delivery Notes (Optional)
              </FieldLabel>
              <Textarea
                {...field}
                value={field.value || ""}
                className="w-full px-4 border-2 font-semibold border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors resize-none"
                id="delivery-notes"
                placeholder="e.g., Leave at the gate"
              />
              {fieldState.error && (
                <p className="text-red-600 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </Field>
          )}
        />
        {/* WhatsApp Order Button */}
        <Button className="w-full bg-[#25D366] text-white py-6 rounded-lg hover:bg-[#20BA59] transition-colors font-medium text-lg flex items-center justify-center space-x-2 mb-6 cursor-pointer">
          <MessageCircle className="w-6 h-6" />
          <span>Order on WhatsApp</span>
        </Button>
      </form>
    </div>
  );
};

export default BillingAddressForm;
