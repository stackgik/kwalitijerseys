"use client";

import { useState } from "react";
import { ArrowLeft, Check, MessageCircle, Truck, Shield } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/constant";
import formatCurrency from "@/helper/formatCurrency";
import EmptyData from "./Empty";

export function ProductDetail() {
  const params = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customizationEnabled, setCustomizationEnabled] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [customizationError, setCustomizationError] = useState("");
  const router = useRouter();

  // Delivery information states
  const [showDeliveryForm, setShowDeliveryForm] = useState(true);

  const product = products.find((p) => p.id === Number(params.id));

  if (!product)
    return (
      <EmptyData
        title="Product Not Found"
        description="We couldn't find the jersey you're looking for. It may have been
          removed or doesn't exist."
        action={() => router.push("/shop")}
        btnContent="Back to shop"
        icon={ArrowLeft}
      />
    );

  const calculateCustomizationPrice = () => {
    if (!customizationEnabled) return 0;
    const numberLength = customNumber.trim().length;
    return numberLength >= 3 ? 6000 : 5000;
  };

  const getTotalPrice = () => {
    return product.price + calculateCustomizationPrice();
  };

  // const handleWhatsAppOrder = (data: DeliveryDetailsSchemaType) => {
  //   const { fullName, phoneNumber, address, city, state, deliveryNotes } = data;

  //   // Validate customization if enabled
  //   if (customizationEnabled) {
  //     if (!customName.trim() && !customNumber.trim()) {
  //       setCustomizationError(
  //         "Please provide either a name or number for customization",
  //       );
  //       return;
  //     }
  //     setCustomizationError("");
  //   }

  //   // Validate delivery information
  //   // if (!validateDeliveryInfo()) {
  //   //   return;
  //   // }

  //   let message = `Hi! I want to order:\n\nProduct: ${product.name}\nSize: ${selectedSize || "Not selected"}\nPrice: ₦${product.price.toLocaleString()}`;

  //   if (customizationEnabled) {
  //     message += `\n\nCUSTOMIZATION:`;
  //     if (customName.trim()) {
  //       message += `\nName: ${customName.trim()}`;
  //     }
  //     if (customNumber.trim()) {
  //       message += `\nNumber: ${customNumber.trim()}`;
  //     }
  //     message += `\nCustomization Fee: ₦${calculateCustomizationPrice().toLocaleString()}`;
  //     message += `\n\nTotal Price: ₦${getTotalPrice().toLocaleString()}`;
  //   }

  //   message += `\n\nDELIVERY INFORMATION:`;
  //   message += `\nName: ${fullName.trim()}`;
  //   message += `\nPhone: ${phoneNumber.trim()}`;
  //   message += `\nAddress: ${address.trim()}`;
  //   message += `\nCity: ${city.trim()}`;
  //   message += `\nState: ${state.trim()}`;
  //   if (deliveryNotes?.trim()) {
  //     message += `\nNotes: ${deliveryNotes?.trim()}`;
  //   }

  //   message += `\n\nPlease confirm availability and delivery fee.`;
  //   const encodedMessage = encodeURIComponent(message);
  //   window.open(`https://wa.me/2348012345678?text=${encodedMessage}`, "_blank");
  // };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <Link
          href="/shop"
          className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">
                {product.league} • {product.season}
              </p>
              <h1 className="text-3xl md:text-4xl mb-4">{product.name}</h1>
              <div>
                <p className="text-3xl font-bold">
                  {formatCurrency(product.price, "NGN")}
                </p>
                {customizationEnabled && (
                  <p className="text-sm text-gray-600 mt-1">
                    + ₦{calculateCustomizationPrice().toLocaleString()}{" "}
                    customization
                  </p>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 rounded-lg transition-colors font-medium ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Customization Section */}
            <div className="mb-6 border-2 border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold">Jersey Customization</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Add name and number to your jersey
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCustomizationEnabled(!customizationEnabled);
                    if (customizationEnabled) {
                      setCustomName("");
                      setCustomNumber("");
                      setCustomizationError("");
                    }
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    customizationEnabled
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {customizationEnabled ? "Remove" : "Add"}
                </button>
              </div>

              {customizationEnabled && (
                <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                  <div>
                    <label
                      htmlFor="custom-name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name on Jersey (Optional)
                    </label>
                    <input
                      id="custom-name"
                      type="text"
                      value={customName}
                      onChange={(e) => {
                        setCustomName(e.target.value.toUpperCase());
                        setCustomizationError("");
                      }}
                      placeholder="e.g., RONALDO"
                      maxLength={20}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors uppercase"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="custom-number"
                      className="block text-sm font-medium mb-2"
                    >
                      Jersey Number (Optional)
                    </label>
                    <input
                      id="custom-number"
                      type="text"
                      value={customNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value.length <= 3) {
                          setCustomNumber(value);
                          setCustomizationError("");
                        }
                      }}
                      placeholder="e.g., 7"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum 3 digits
                    </p>
                  </div>

                  {customizationError && (
                    <p className="text-sm text-red-600 flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{customizationError}</span>
                    </p>
                  )}

                  <div className="bg-gray-50 rounded-lg p-3 text-sm">
                    <p className="font-medium mb-1">Customization Pricing:</p>
                    <p className="text-gray-600">• 1-2 numbers: ₦5,000</p>
                    <p className="text-gray-600">• 3 numbers: ₦6,000</p>
                    <p className="text-xs text-gray-500 mt-2">
                      *You must provide either a name or number for
                      customization
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Information Form */}
            <div className="mb-6 border-2 border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold">Delivery Information</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Enter your delivery details
                  </p>
                </div>
                <button
                  onClick={() => setShowDeliveryForm(!showDeliveryForm)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showDeliveryForm
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {showDeliveryForm ? "Hide" : "Show"}
                </button>
              </div>

              {/* {showDeliveryForm && (
                <BillingAddressForm
                  onHandleWhatsAppOrder={handleWhatsAppOrder}
                />
              )} */}
            </div>

            {/* Product Features */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Product Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-1 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Fast Delivery</p>
                  <p className="text-xs text-gray-600">
                    2-5 days across Nigeria
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Quality Guaranteed</p>
                  <p className="text-xs text-gray-600">
                    Every item quality checked
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Easy Ordering</p>
                  <p className="text-xs text-gray-600">
                    Order directly via WhatsApp
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2 text-sm">
                Payment & Delivery Info
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Payment on delivery or bank transfer</li>
                <li>• Delivery fee calculated based on location</li>
                <li>• Contact us on WhatsApp for more details</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
