"use client";

import { useState } from "react";
import { ArrowLeft, ShoppingCart, Info, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import {
  AVAILABLE_JERSEY_SIZES,
  JERSEY_FEATURES,
  VERSION_UPCHARGE_KOBO,
} from "@/constant";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import VersionGuideSheet from "./VersionGuideSheet";
import SizeGuideSheet from "./SizeGuideSheet";
import formatCurrency from "@/helper/formatCurrency";
import { ProductCareAndShipping } from "./ProductCareAndShipping";
import { CompleteTheSteeze } from "./CompleteTheSteeze";

export function ProductDetail({
  productDetails,
  products,
}: {
  productDetails: IProductDetails;
  products: IProductData[];
  currentProductId: string;
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVersion, setSelectedVersion] = useState<"fan" | "player">(
    "fan",
  );
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customizationEnabled, setCustomizationEnabled] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showVersionGuide, setShowVersionGuide] = useState(false);

  const productPrice = productDetails.priceInKobo / 100;

  const calculateCustomizationPrice = () => {
    if (!customizationEnabled || (!customName.trim() && !customNumber.trim()))
      return 0;
    return customNumber.trim().length >= 3 ? 6000 : 5000;
  };

  const getVersionPrice = () => {
    return selectedVersion === "player"
      ? productPrice + VERSION_UPCHARGE_KOBO / 100
      : productPrice;
  };

  const getTotalPrice = () => {
    return (getVersionPrice() + calculateCustomizationPrice()) * quantity;
  };

  const compileLineItem = () => ({
    cartItemId: crypto.randomUUID(),
    productId: productDetails.id,
    name: productDetails.name,
    priceInKobo: getVersionPrice() * 100,
    size: selectedSize,
    type: productDetails.type as "current" | "modern" | "retro",
    quantity: quantity,
    image: productDetails.images[0].url,
    ...(productDetails.type !== "retro" && { version: selectedVersion }),
    ...(customizationEnabled &&
      (customName.trim() || customNumber.trim()) && {
        customization: {
          name: customName.trim() || undefined,
          number: customNumber.trim() || undefined,
          price: calculateCustomizationPrice(),
        },
      }),
  });

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to your bag.");
      return;
    }
    const newCartItem = compileLineItem();
    addItem(newCartItem);
    toast.success(productDetails.name + " has been added to basket");
  };

  // const handleExpressBuy = () => {};
  const handleExpressBuy = () => {
    // 1. Validation Guard
    if (!selectedSize) {
      toast.error("Please select a size before checking out.");
      return;
    }

    // 2. Build the exact payload schema matching your standard ICartItem interface
    const lineItem = compileLineItem();
    // 3. Stash the object in the current tab session storage vault
    sessionStorage.setItem("express_checkout_item", JSON.stringify(lineItem));

    // 4. Fire the route transition with a clear modal intent parameter
    router.push("/checkout?mode=express");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-black selection:text-white antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
        <Link
          href="/shop"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-black mb-8 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-0.5 transition-transform" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT: Product Images Showcase Matrix */}
          <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4 lg:sticky lg:top-6">
            {/* Thumbnail Navigation List */}
            {productDetails.images.length > 1 && (
              <div className="flex flex-row lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto lg:max-h-125 pb-2 lg:pb-0 scrollbar-none shrink-0">
                {productDetails.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-24 rounded-xl overflow-hidden transition-all duration-300 relative border shrink-0 ${
                      currentImageIndex === index
                        ? "border-black ring-2 ring-black/5"
                        : "border-zinc-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={`${image.id} preview ${index + 1}`}
                      className="w-full h-full object-cover"
                      fill
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Focal Frame */}
            <div className="grow aspect-4/5 bg-zinc-50 rounded-2xl overflow-hidden relative border border-zinc-100">
              <Image
                src={productDetails.images[currentImageIndex].url}
                alt={productDetails.name}
                className="w-full h-full object-cover transition-all duration-500"
                fill
                priority
              />
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="lg:col-span-5">
            <div className="mb-6 pb-6 border-b border-gray-100">
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-2">
                {productDetails.league} • {productDetails.season}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-3">
                {productDetails.name}
              </h1>
              <div className="flex items-baseline gap-3 mt-4">
                <p className="text-2xl sm:text-3xl font-black text-gray-900 tabular-nums">
                  {/* ₦{getVersionPrice().toLocaleString()} */}
                  {formatCurrency(getVersionPrice(), "NGN")}
                </p>
                {selectedVersion === "player" && (
                  <span className="text-sm font-medium text-gray-400 line-through tabular-nums">
                    ₦{(productDetails.priceInKobo / 100).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Version Selection */}
            {productDetails.type === "retro" ? (
              ""
            ) : (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs font-bold tracking-wider uppercase text-gray-500">
                    Kit Style
                  </h3>
                  <button
                    onClick={() => setShowVersionGuide(true)}
                    className="text-xs text-gray-500 hover:text-black flex items-center gap-1 transition-colors font-medium"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Version Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {(["fan", "player"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVersion(v)}
                      className={`p-3.5 text-left border rounded-xl transition-all duration-200 ${
                        selectedVersion === v
                          ? "border-black bg-black text-white shadow-xs"
                          : "border-gray-200 bg-white text-gray-800"
                      }`}
                    >
                      <span className="block text-xs font-bold capitalize tracking-wide">
                        {v} Version
                      </span>
                      <span
                        className={`block text-[11px] mt-0.5 ${selectedVersion === v ? "text-gray-300" : "text-gray-500"}`}
                      >
                        {v === "player"
                          ? formatCurrency(
                              productPrice + VERSION_UPCHARGE_KOBO / 100,
                              "NGN",
                            )
                          : formatCurrency(productPrice, "NGN")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-bold tracking-wider uppercase text-gray-500">
                  Select Size
                </h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-gray-500 hover:text-black flex items-center gap-1 transition-colors font-medium"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Measurements</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_JERSEY_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-13.5 h-11 border text-sm font-semibold rounded-xl flex items-center justify-center transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white shadow-xs"
                        : "border-gray-200 text-gray-800 bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-xs font-bold tracking-wider uppercase text-gray-500 mb-2.5">
                Quantity
              </h3>
              <div className="flex items-center border border-gray-200 rounded-xl w-fit p-1 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-black hover:bg-white transition-all"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-12 text-center text-sm font-bold bg-transparent text-gray-900 focus:outline-none tabular-nums"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-black hover:bg-white transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Customization Area */}
            <div className="mb-8 border border-gray-100 rounded-xl bg-gray-50/50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Custom Kit Printing
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Stitch your custom name and number tag
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCustomizationEnabled(!customizationEnabled);
                    if (customizationEnabled) {
                      setCustomName("");
                      setCustomNumber("");
                    }
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                    customizationEnabled
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  {customizationEnabled ? "Remove" : "Add Print"}
                </button>
              </div>

              {customizationEnabled && (
                <div className="space-y-3.5 mt-4 pt-4 border-t border-gray-200/60 transition-all">
                  <div>
                    <label
                      htmlFor="custom-name"
                      className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5"
                    >
                      Name Placement
                    </label>
                    <input
                      id="custom-name"
                      type="text"
                      value={customName}
                      onChange={(e) =>
                        setCustomName(e.target.value.toUpperCase())
                      }
                      placeholder="e.g., MBAPPÉ"
                      maxLength={20}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none bg-white text-sm uppercase font-semibold tracking-wide"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="custom-number"
                      className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5"
                    >
                      Squad Number
                    </label>
                    <input
                      id="custom-number"
                      type="text"
                      value={customNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        if (val.length <= 3) setCustomNumber(val);
                      }}
                      placeholder="e.g., 10"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none bg-white text-sm font-bold"
                    />
                  </div>
                  {/* Pricing Notice */}
                  <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Customization Pricing
                    </p>
                    <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                      Customization with 1–2 digits cost{" "}
                      <span className="text-black font-black">₦5,000</span>,
                      while one with 3-digit number costs{" "}
                      <span className="text-black font-black">₦6,000</span>.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Features section */}
            <div className="mb-8 grid grid-cols-2 gap-3.5 border-t border-b border-gray-100 py-6">
              {JERSEY_FEATURES.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 group">
                  <div className="w-5 h-5 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-black group-hover:border-black transition-colors duration-300">
                    <svg
                      className="w-3 h-3 text-zinc-600 group-hover:text-white transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-zinc-600 group-hover:text-black transition-colors duration-200 capitalize">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Smart Checkout CTAs */}
            {/* Actions Purchase Matrix Container */}
            <div className="grid grid-cols-1 gap-3 mb-8">
              {productDetails.stock > 0 ? (
                <>
                  {/* Primary: Express Transaction Vector */}
                  <button
                    onClick={handleExpressBuy}
                    className="w-full bg-zinc-950 text-white h-13 rounded-xl hover:bg-zinc-900 active:scale-[0.99] transition-all font-semibold text-sm shadow-md shadow-zinc-950/10 flex items-center justify-center gap-1.5"
                  >
                    <span>Express Buy Now</span>
                    <span className="opacity-40 text-xs">•</span>
                    <span className="font-medium text-zinc-300">
                      {/* ₦{getTotalPrice().toLocaleString()} */}
                      {formatCurrency(getTotalPrice(), "NGN")}
                    </span>
                  </button>

                  {/* Secondary: Persistent Cart Injection */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-white border border-zinc-200 text-zinc-900 h-13 rounded-xl hover:bg-zinc-50 active:scale-[0.99] transition-all font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4 text-zinc-500" />
                    <span>Add to Cart</span>
                  </button>
                </>
              ) : (
                /* Out of Stock Mode: Retains clean design balance without clashing options */
                <div className="space-y-3">
                  <button
                    disabled
                    className="w-full bg-zinc-100 text-zinc-400 h-13 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-zinc-200/50"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    Out of Stock
                  </button>
                  <p className="text-center text-xs text-zinc-500 font-medium leading-relaxed">
                    This jersey configuration is currently unavailable. Restocks
                    are updated weekly via WhatsApp updates.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 1. Trust, Care, and Logistics Accordion */}
        <ProductCareAndShipping />

        {/* 2. Personalized Catalog Recommendation Slider */}
        <CompleteTheSteeze
          currentProductId={productDetails.id}
          products={products}
        />
      </div>

      {/* Version Guide Sheet */}
      <VersionGuideSheet
        showVersionGuide={showVersionGuide}
        setShowVersionGuide={setShowVersionGuide}
      />

      {/* Size Guide Sheet */}
      <SizeGuideSheet
        showSizeGuide={showSizeGuide}
        setShowSizeGuide={setShowSizeGuide}
      />
    </div>
  );
}
