"use client";

import { ArrowLeft, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { DELIVERY_FEES, NIGERIAN_STATES } from "@/constant";
import CartItem from "./CartItem";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EditCartItemDialog } from "./EditCartItemModal";
import {
  DeliveryDetailsSchema,
  DeliveryDetailsSchemaType,
} from "@/zod/deliveryDetails.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

export function Checkout() {
  const router = useRouter();
  const { cartItems, subtotal, editingItem } = useCart();

  const { control, handleSubmit } = useForm<DeliveryDetailsSchemaType>({
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

  // const selectedState = watch("state");
  const [selectedState, setSelectedState] = useState<string | undefined>();
  const deliveryFee = selectedState ? DELIVERY_FEES[selectedState] || 3500 : 0;
  const total = subtotal + deliveryFee;

  const handleWhatsAppOrder = (formData: DeliveryDetailsSchemaType) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    let message = `Hi! I want to place an order:\n\n`;
    message += `📦 ORDER DETAILS:\n`;

    cartItems.forEach((item, index) => {
      message += `\n${index + 1}. ${item.name}\n`;
      message += `   Size: ${item.size}\n`;
      message += `   Version: ${item.version.charAt(0).toUpperCase() + item.version.slice(1)}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ₦${item.price.toLocaleString()}\n`;

      if (item.customization) {
        message += `   CUSTOMIZATION:\n`;
        if (item.customization.name)
          message += `   - Name: ${item.customization.name}\n`;
        if (item.customization.number)
          message += `   - Number: ${item.customization.number}\n`;
        message += `   - Customization Fee: ₦${item.customization.price.toLocaleString()}\n`;
      }

      const itemTotal =
        (item.price + (item.customization?.price || 0)) * item.quantity;
      message += `   Item Total: ₦${itemTotal.toLocaleString()}\n`;
    });

    message += `\n💰 PRICING:\n`;
    message += `Subtotal: ₦${subtotal.toLocaleString()}\n`;
    message += `Delivery Fee (${formData.state}): ₦${deliveryFee.toLocaleString()}\n`;
    message += `TOTAL: ₦${total.toLocaleString()}\n`;

    message += `\n📍 DELIVERY INFORMATION:\n`;
    message += `Name: ${formData.fullName}\n`;
    message += `Phone: ${formData.phoneNumber}\n`;
    message += `Address: ${formData.address}\n`;
    message += `City: ${formData.city}\n`;
    message += `State: ${formData.state}\n`;
    if (formData.deliveryNotes) message += `Notes: ${formData.deliveryNotes}\n`;

    message += `\nPlease confirm this order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/2348012345678?text=${encodedMessage}`, "_blank");
    toast.success("Order sent! Redirecting to shop...");
    setTimeout(() => router.push("/shop"), 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Add some jerseys to your cart to proceed with checkout
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/shop"
            className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>

          <h1 className="text-3xl md:text-4xl mb-8">Checkout</h1>

          <form onSubmit={handleSubmit(handleWhatsAppOrder)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left — order items + delivery fields */}
              <div className="lg:col-span-2 space-y-6">
                <div className="border-2 border-gray-100 rounded-lg p-4">
                  <h2 className="text-xl font-semibold mb-4">Your Order</h2>
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <CartItem key={index + 1} item={item} />
                    ))}
                  </div>
                </div>

                <div className="border-2 border-gray-100 rounded-lg p-4">
                  <h2 className="text-xl font-semibold mb-4">
                    Delivery Information
                  </h2>
                  <div className="space-y-6">
                    <Controller
                      name="fullName"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
                          <Input
                            {...field}
                            id="fullname"
                            type="text"
                            placeholder="e.g., John Doe"
                            className="w-full px-4 py-6 border-2 font-semibold border-gray-100 rounded-lg focus:border-black focus:outline-none transition-colors"
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
                      name="phoneNumber"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel htmlFor="phone-number">
                            Phone Number
                          </FieldLabel>
                          <Input
                            {...field}
                            id="phone-number"
                            type="text"
                            placeholder="e.g., 08012345678"
                            className="w-full px-4 py-6 border-2 font-semibold border-gray-100 rounded-lg focus:border-black focus:outline-none transition-colors"
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
                      name="address"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel htmlFor="address">
                            Delivery Address
                          </FieldLabel>
                          <Input
                            {...field}
                            id="address"
                            type="text"
                            placeholder="e.g., 123 Main Street, Ikeja"
                            className="w-full px-4 py-6 border-2 font-semibold border-gray-100 rounded-lg focus:border-black focus:outline-none transition-colors"
                          />
                          {fieldState.error && (
                            <p className="text-red-600 text-sm mt-1">
                              {fieldState.error.message}
                            </p>
                          )}
                        </Field>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Controller
                        name="city"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel htmlFor="city">City</FieldLabel>
                            <Input
                              {...field}
                              id="city"
                              type="text"
                              placeholder="e.g., Lagos"
                              className="w-full px-4 py-6 border-2 font-semibold border-gray-100 rounded-lg focus:border-black focus:outline-none transition-colors"
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
                        control={control}
                        render={({
                          field: { onChange, value },
                          fieldState,
                        }) => (
                          <Field>
                            <FieldLabel htmlFor="state">State</FieldLabel>
                            <Select
                              onValueChange={(val) => {
                                onChange(val); // updates react-hook-form
                                setSelectedState(val); // updates your local state
                              }}
                              value={value}
                            >
                              <SelectTrigger className="w-full px-4 py-6 border-2 font-semibold border-gray-100 rounded-lg focus:border-black focus:outline-none transition-colors">
                                <SelectValue placeholder="Please select a state..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {NIGERIAN_STATES.map((s) => (
                                    <SelectItem key={s} value={s}>
                                      {s}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {fieldState.error && (
                              <FieldError>
                                {fieldState.error.message}
                              </FieldError>
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    <Controller
                      name="deliveryNotes"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel htmlFor="delivery-notes">
                            Delivery Notes (Optional)
                          </FieldLabel>
                          <Textarea
                            {...field}
                            value={field.value || ""}
                            id="delivery-notes"
                            placeholder="e.g., Leave at the gate, call when you arrive"
                            className="w-full px-4 border-2 font-semibold border-gray-100 rounded-lg focus:border-black focus:outline-none transition-colors resize-none"
                          />
                          {fieldState.error && (
                            <p className="text-red-600 text-sm mt-1">
                              {fieldState.error.message}
                            </p>
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Right — order summary + submit */}
              <div className="lg:col-span-1">
                <div className="sticky top-6 border-2 border-gray-100 rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Order Summary</h2>

                  <div className="space-y-3 py-4 border-y border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ₦{subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Delivery Fee {selectedState && `(${selectedState})`}
                      </span>
                      <span className="font-medium">
                        {selectedState
                          ? `₦${deliveryFee.toLocaleString()}`
                          : "Select state"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold">
                      ₦{total.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#25D366] text-white py-4 rounded-lg hover:bg-[#20BA59] transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Complete Order on WhatsApp</span>
                  </button>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      By placing this order, you&apos;ll be redirected to
                      WhatsApp to confirm your order details with us. Payment
                      can be made via bank transfer or on delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {editingItem && (
        <EditCartItemDialog key={editingItem.id} item={editingItem} />
      )}
    </>
  );
}
