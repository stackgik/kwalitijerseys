"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Truck,
  Shield,
  MessageCircle,
  ShoppingCart,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { AVAILABLE_JERSEY_SIZES, products } from "@/constant";
import { useCart } from "@/context/CartContext";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export function ProductDetail() {
  const params = useParams();
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

  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <Link href="/shop" className="text-sm hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const calculateCustomizationPrice = () => {
    if (!customizationEnabled) return 0;
    if (!customName.trim() && !customNumber.trim()) return 0;
    const numberLength = customNumber.trim().length;
    return numberLength >= 3 ? 6000 : 5000;
  };

  const getVersionPrice = () => {
    return selectedVersion === "player" ? product.price + 5000 : product.price;
  };

  const getTotalPrice = () => {
    const basePrice = getVersionPrice();
    const customPrice = calculateCustomizationPrice();
    return (basePrice + customPrice) * quantity;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (customizationEnabled && !customName.trim() && !customNumber.trim()) {
      toast.error(
        "Please add a name or number for customization, or disable it",
      );
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: getVersionPrice(),
      size: selectedSize,
      version: selectedVersion,
      quantity: quantity,
      image: product.images[0],
      ...(customizationEnabled &&
        (customName.trim() || customNumber.trim()) && {
          customization: {
            name: customName.trim() || undefined,
            number: customNumber.trim() || undefined,
            price: calculateCustomizationPrice(),
          },
        }),
    };

    addItem(cartItem);
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (customizationEnabled && !customName.trim() && !customNumber.trim()) {
      toast.error(
        "Please add a name or number for customization, or disable it",
      );
      return;
    }

    // Add to cart and navigate to checkout
    const cartItem = {
      id: product.id,
      name: product.name,
      price: getVersionPrice(),
      size: selectedSize,
      version: selectedVersion,
      quantity: quantity,
      image: product.images[0],
      ...(customizationEnabled &&
        (customName.trim() || customNumber.trim()) && {
          customization: {
            name: customName.trim() || undefined,
            number: customNumber.trim() || undefined,
            price: calculateCustomizationPrice(),
          },
        }),
    };

    addItem(cartItem);
    router.push("/checkout");
  };

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
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
                fill
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors relative ${
                      currentImageIndex === index
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      fill
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Signals - Mobile */}
            <div className="lg:hidden grid grid-cols-1 gap-3 mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-lg">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium">Fast Delivery</p>
                  <p className="text-xs text-gray-600">2-5 days nationwide</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-lg">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium">Quality Guaranteed</p>
                  <p className="text-xs text-gray-600">Every item checked</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Header */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">
                {product.league} • {product.season}
              </p>
              <h1 className="text-3xl md:text-4xl mb-3">{product.name}</h1>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-bold">
                  ₦{getVersionPrice().toLocaleString()}
                </p>
                {selectedVersion === "player" && (
                  <span className="text-sm text-gray-500 line-through">
                    ₦{product.price.toLocaleString()}
                  </span>
                )}
              </div>
              {customizationEnabled && calculateCustomizationPrice() > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  + ₦{calculateCustomizationPrice().toLocaleString()}{" "}
                  customization
                </p>
              )}
            </div>

            {/* Version Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Version</h3>
                <button
                  onClick={() => setShowVersionGuide(!showVersionGuide)}
                  className="text-xs text-gray-600 hover:text-black flex items-center gap-1"
                >
                  <Info className="w-3 h-3" />
                  Version Guide
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedVersion("fan")}
                  className={`px-4 py-3 border-2 rounded-lg transition-colors font-medium ${
                    selectedVersion === "fan"
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div>
                    <div className="text-sm">Fan Version</div>
                    <div className="text-xs opacity-75">
                      ₦{product.price.toLocaleString()}
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedVersion("player")}
                  className={`px-4 py-3 border-2 rounded-lg transition-colors font-medium ${
                    selectedVersion === "player"
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div>
                    <div className="text-sm">Player Version</div>
                    <div className="text-xs opacity-75">
                      ₦{(product.price + 5000).toLocaleString()}
                    </div>
                  </div>
                </button>
              </div>
              {showVersionGuide && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm space-y-2">
                  <div>
                    <p className="font-medium">Fan Version</p>
                    <p className="text-xs text-gray-600">
                      Comfortable for everyday wear. Lightweight and breathable.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Player Version</p>
                    <p className="text-xs text-gray-600">
                      Match-fit performance. Tighter fit, superior
                      moisture-wicking technology.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Select Size</h3>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs text-gray-600 hover:text-black flex items-center gap-1"
                >
                  <Info className="w-3 h-3" />
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_JERSEY_SIZES.map((size) => (
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
              {showSizeGuide && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2">Size</th>
                        <th className="text-left py-2">Chest (inches)</th>
                        <th className="text-left py-2">Length (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2">L</td>
                        <td className="py-2">42-44</td>
                        <td className="py-2">28-29</td>
                      </tr>
                      <tr>
                        <td className="py-2">XL</td>
                        <td className="py-2">44-46</td>
                        <td className="py-2">29-30</td>
                      </tr>
                      <tr>
                        <td className="py-2">XXL</td>
                        <td className="py-2">46-48</td>
                        <td className="py-2">30-31</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors font-medium cursor-pointer"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 h-10 text-center border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors font-medium cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Customization Section */}
            <div className="mb-6 border-2 border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold">
                    Jersey Customization (Optional)
                  </h3>
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
                    }
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
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
                      Name on Jersey
                    </label>
                    <input
                      id="custom-name"
                      type="text"
                      value={customName}
                      onChange={(e) =>
                        setCustomName(e.target.value.toUpperCase())
                      }
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
                      Jersey Number
                    </label>
                    <input
                      id="custom-number"
                      type="text"
                      value={customNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value.length <= 3) {
                          setCustomNumber(value);
                        }
                      }}
                      placeholder="e.g., 7"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum 3 digits
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 text-sm">
                    <p className="font-medium mb-1">Customization Pricing:</p>
                    <p className="text-gray-600">• 1-2 numbers: ₦5,000</p>
                    <p className="text-gray-600">• 3 numbers: ₦6,000</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleBuyNow}
                className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Buy Now • ₦{getTotalPrice().toLocaleString()}</span>
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full bg-white text-black border-2 border-black py-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Product Features */}
            <div className="mb-6 pb-6 border-b border-gray-200">
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
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-semibold mb-3">About This Jersey</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Trust Signals - Desktop */}
            <div className="hidden lg:grid grid-cols-1 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
