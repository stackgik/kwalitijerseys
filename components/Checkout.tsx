"use client";

import { useState } from "react";
import { ArrowLeft, ShieldCheck, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import {
  DELIVERY_FEES,
  MINIMUM_DELIVERY_FEE,
  NIGERIAN_STATES,
} from "@/constant";
import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DeliveryDetailsSchema,
  DeliveryDetailsSchemaType,
} from "@/zod/deliveryDetails.schema";
import { Field, FieldLabel } from "./ui/field";
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
import formatCurrency from "@/helper/formatCurrency";
import { checkoutOrderAction } from "@/app/actions/orders";

const Checkout = () => {
  const router = useRouter();
  const { cartItems, subtotal: globalCartSubtotal, clearCart } = useCart();
  const [selectedState, setSelectedState] = useState<string | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const searchParams = useSearchParams();

  const isExpressMode = searchParams.get("mode") === "express";

  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  // 1. PURE COMPUTATION: Resolve line items and totals
  let lineItems: ICartItem[] = [];
  let checkoutSubtotal = 0;

  if (isExpressMode) {
    const rawExpressItem =
      typeof window !== "undefined"
        ? sessionStorage.getItem("express_checkout_item")
        : null;

    if (rawExpressItem) {
      try {
        const parsed = JSON.parse(rawExpressItem);
        lineItems = [parsed];
        const singleItemBase = parsed.priceInKobo / 100;
        const singleItemCustom = parsed.customization?.price || 0;
        checkoutSubtotal =
          (singleItemBase + singleItemCustom) * parsed.quantity;
      } catch (error) {
        console.error("Failed to parse express checkout payload:", error);
      }
    }
  } else {
    lineItems = cartItems;
    checkoutSubtotal = globalCartSubtotal;
  }

  const { control, handleSubmit } = useForm<DeliveryDetailsSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(DeliveryDetailsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      deliveryNotes: "",
    },
  });

  const deliveryFee = selectedState
    ? DELIVERY_FEES[selectedState] || MINIMUM_DELIVERY_FEE
    : 0;

  const totalInKobo = (checkoutSubtotal + deliveryFee) * 100; // Paystack takes inputs strictly in raw minor units/Kobo

  if (lineItems.length === 0) {
    if (typeof window !== "undefined") {
      router.replace("/shop");
    }
    // This HTML will be on display while the navigation back to shop is being handled.
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-xs text-gray-400 animate-pulse tracking-wider">
          Routing back to bag variables...
        </div>
      </div>
    );
  }

  // 2. Paystack Inline Checkout Core Trigger
  const handlePaystackPayment = async (formData: DeliveryDetailsSchemaType) => {
    setIsProcessing(true);

    try {
      // 🎯 STEP 1: Create the pending row BEFORE opening the payment window
      const result = await checkoutOrderAction({
        customerName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        itemsSubtotal: checkoutSubtotal,
        deliveryFee,
        total: totalInKobo,
        items: lineItems,
        orderNotes: formData.deliveryNotes,
      });

      if (!result?.success || !result?.reference) {
        toast.error("Failed to initialize secure checkout tracking.");
        setIsProcessing(false);
        return;
      }

      // STEP 2: Launch the Pop instance
      const PaystackPop = (await import("@paystack/inline-js")).default;
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: PAYSTACK_PUBLIC_KEY as string,
        email: formData.email,
        amount: totalInKobo,
        currency: "NGN",
        reference: result.reference,

        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: formData.fullName,
            },
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: formData.phoneNumber,
            },
          ],
        },

        onSuccess: (response) => {
          if (isExpressMode) {
            sessionStorage.removeItem("express_checkout_item");
          } else {
            clearCart();
          }

          router.push(`/checkout/success?reference=${response.reference}`);
        },

        onCancel: () => {
          toast.error("Payment session closed.");
          setIsProcessing(false);
        },
      });
    } catch (error) {
      console.error("Payment window boot error:", error);
      toast.error("An operational checkout fault occurred.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
        <Link
          href="/cart"
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-black mb-8 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-0.5 transition-transform" />
          Back to Review Bag
        </Link>

        <div className="mb-10 pb-6 border-b border-gray-100">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
            Secure Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Shipping & Contact Form */}
          <div className="lg:col-span-7">
            <form
              id="checkout-form"
              onSubmit={handleSubmit(handlePaystackPayment)}
              className="border border-gray-100 rounded-2xl p-5 sm:p-6 bg-white shadow-2xs space-y-5"
            >
              <div className="pb-2 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-900">
                  Fulfillment & Delivery Details
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Provide precise info to enable instant automated dispatch
                  profiling.
                </p>
              </div>

              {/* Full Name Field */}
              <Controller
                name="fullName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="space-y-1.5">
                    <FieldLabel className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="e.g., Chidi Okafor"
                      className="w-full px-3.5 h-11 border border-gray-200 bg-white text-xs font-semibold rounded-xl focus:border-black focus:outline-none transition-colors"
                    />
                    {fieldState.error && (
                      <p className="text-red-600 text-xs mt-1 font-medium">
                        {fieldState.error.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              {/* Email Address Field (Required by Paystack) */}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="space-y-1.5">
                    <FieldLabel className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Email Address (For Paystack Receipts)
                    </FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="e.g., chidi@example.com"
                      className="w-full px-3.5 h-11 border border-gray-200 bg-white text-xs font-semibold rounded-xl focus:border-black focus:outline-none transition-colors"
                    />
                    {fieldState.error && (
                      <p className="text-red-600 text-xs mt-1 font-medium">
                        {fieldState.error.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Field */}
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field className="space-y-1.5">
                      <FieldLabel className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Phone Number (WhatsApp Active)
                      </FieldLabel>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="e.g., 08012345678"
                        className="w-full px-3.5 h-11 border border-gray-200 bg-white text-xs font-semibold rounded-xl focus:border-black focus:outline-none transition-colors"
                      />
                      {fieldState.error && (
                        <p className="text-red-600 text-xs mt-1 font-medium">
                          {fieldState.error.message}
                        </p>
                      )}
                    </Field>
                  )}
                />

                {/* City Field */}
                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field className="space-y-1.5">
                      <FieldLabel className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        City / District
                      </FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        placeholder="e.g., Surulere"
                        className="w-full px-3.5 h-11 border border-gray-200 bg-white text-xs font-semibold rounded-xl focus:border-black focus:outline-none transition-colors"
                      />
                      {fieldState.error && (
                        <p className="text-red-600 text-xs mt-1 font-medium">
                          {fieldState.error.message}
                        </p>
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Street Address */}
                <div className="sm:col-span-2">
                  <Controller
                    name="address"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field className="space-y-1.5">
                        <FieldLabel className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                          Street Address
                        </FieldLabel>
                        <Input
                          {...field}
                          type="text"
                          placeholder="e.g., House 14, 21st Road"
                          className="w-full px-3.5 h-11 border border-gray-200 bg-white text-xs font-semibold rounded-xl focus:border-black focus:outline-none transition-colors"
                        />
                        {fieldState.error && (
                          <p className="text-red-600 text-xs mt-1 font-medium">
                            {fieldState.error.message}
                          </p>
                        )}
                      </Field>
                    )}
                  />
                </div>

                {/* State Select Dropdown */}
                <div>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <Field className="space-y-1.5">
                        <FieldLabel className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                          State Gateway
                        </FieldLabel>
                        <Select
                          onValueChange={(val) => {
                            onChange(val);
                            setSelectedState(val);
                          }}
                          value={value}
                        >
                          <SelectTrigger className="w-full px-3.5 h-11 border border-gray-200 bg-white text-xs font-semibold rounded-xl focus:border-black focus:outline-none transition-colors">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {NIGERIAN_STATES.map((s) => (
                                <SelectItem
                                  key={s}
                                  value={s}
                                  className="text-xs font-semibold"
                                >
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.error && (
                          <p className="text-red-600 text-xs mt-1 font-medium">
                            {fieldState.error.message}
                          </p>
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>

              {/* Delivery Notes */}
              <Controller
                name="deliveryNotes"
                control={control}
                render={({ field }) => (
                  <Field className="space-y-1.5">
                    <FieldLabel className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Delivery Notes (Optional)
                    </FieldLabel>
                    <Textarea
                      {...field}
                      value={field.value || ""}
                      placeholder="Apartment codes, gated estate instructions, preferred timings..."
                      className="w-full p-3 border border-gray-200 bg-white text-xs font-semibold rounded-xl focus:border-black focus:outline-none transition-colors min-h-20 resize-none"
                    />
                  </Field>
                )}
              />
            </form>
          </div>

          {/* RIGHT: Production Financial Summary Sidebar */}
          <div className="lg:col-span-5 lg:sticky lg:top-6">
            <div className="border border-gray-100 rounded-2xl p-5 sm:p-6 bg-white shadow-2xs space-y-5">
              <h2 className="text-xs font-bold tracking-wider uppercase text-gray-400">
                Order Manifest Summary
              </h2>

              {/* Item Line Micro-Previews */}
              <div className="max-h-36 overflow-y-auto space-y-2 pr-1 divide-y divide-gray-50">
                {lineItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center pt-2 text-xs"
                  >
                    <div className="font-semibold text-gray-800 truncate max-w-[70%]">
                      {item.name}{" "}
                      <span className="text-neutral-400 font-medium">
                        ({item.size}) x{item.quantity}
                      </span>
                    </div>
                    <div className="font-bold text-gray-900 tabular-nums">
                      {formatCurrency(
                        (item.priceInKobo / 100 +
                          (item.customization?.price || 0)) *
                          item.quantity,
                        "NGN",
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-4 border-y border-gray-100/80 text-xs font-medium text-gray-500">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-bold tabular-nums">
                    {formatCurrency(checkoutSubtotal, "NGN")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery Logistics</span>
                  <span className="text-gray-900 font-bold tabular-nums">
                    {selectedState
                      ? formatCurrency(deliveryFee, "NGN")
                      : "Pending State Selection"}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-xs font-bold text-gray-900">
                  Total Due
                </span>
                <span className="text-xl sm:text-2xl font-black text-gray-900 tabular-nums">
                  {formatCurrency(totalInKobo / 100, "NGN")}
                </span>
              </div>

              {/* Enhanced Action Trigger Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full bg-neutral-950 text-white h-12 rounded-xl hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-all font-semibold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Configuring Paystack Secure Engine...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay Sacurely via Paystack</span>
                  </>
                )}
              </button>

              {/* Dynamic Compliance & Auditing Infrastructure Badge */}
              <div className="pt-4 border-t border-gray-100 flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-neutral-400 leading-normal">
                  Payments are processed securely over PCI-DSS compliant
                  channels via{" "}
                  <span className="text-neutral-600 font-semibold">
                    Paystack Checkout Layers
                  </span>
                  . Card credentials are completely tokenized and never pass
                  through local infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
