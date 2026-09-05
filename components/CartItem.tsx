"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

const CartItem = ({ item }: { item: ICartItem }) => {
  const { cartItemId, image, name, size, quantity, priceInKobo } = item;
  const { updateItem, removeItem, setEditingItem } = useCart();

  const totalPrice =
    (priceInKobo / 100 + (item.customization?.price || 0)) * quantity;

  return (
    <div className="group bg-white border border-gray-100 rounded-xl p-4 sm:p-5 flex gap-4 sm:gap-6 hover:border-gray-200 hover:shadow-sm transition-all duration-300">
      {/* Enhanced Product Image Wrapper */}
      <div className="relative w-20 h-24 sm:w-24 sm:h-28 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Details Area */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Header: Name & Desktop Price */}
          <div className="flex justify-between items-start gap-4 mb-2">
            <h3 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2 leading-snug min-w-0">
              {name}
            </h3>
            <span className="text-base sm:text-lg font-bold text-gray-900 whitespace-nowrap hidden sm:block">
              ₦{totalPrice.toLocaleString()}
            </span>
          </div>

          {/* Metadata / Tags */}
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-gray-500 mb-4 items-center">
            <span className="bg-gray-50 text-gray-700 px-2 py-0.5 rounded font-medium border border-gray-100">
              Size {size}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-600 font-medium">Player Version</span>

            {item.customization && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-emerald-700 font-medium bg-emerald-50/60 px-2 py-0.5 rounded border border-emerald-100/50">
                  Print: {item.customization.name} ({item.customization.number})
                </span>
              </>
            )}
          </div>
        </div>

        {/* Mobile Price + Interactive Footer Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-50">
          {/* Mobile Price View only */}
          <span className="text-base font-bold text-gray-900 sm:hidden">
            ₦{totalPrice.toLocaleString()}
          </span>

          <div className="flex items-center justify-between sm:justify-start sm:gap-6 w-full sm:w-auto">
            {/* Minimalist Quantity Selector */}
            <div className="flex items-center bg-gray-50 border border-gray-200/60 rounded-lg p-0.5">
              <button
                onClick={() =>
                  updateItem(cartItemId, { ...item, quantity: quantity - 1 })
                }
                disabled={quantity === 1}
                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-md disabled:opacity-30 disabled:pointer-events-none transition text-xs font-medium"
              >
                —
              </button>
              <span className="text-xs font-semibold w-7 text-center text-gray-800 tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() =>
                  updateItem(cartItemId, { ...item, quantity: quantity + 1 })
                }
                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition text-xs font-medium"
              >
                +
              </button>
            </div>

            {/* Quick Action Operations */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setEditingItem(item)}
                className="px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition flex items-center gap-1"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Edit
              </button>
              <span className="text-gray-200 text-xs hidden sm:inline">|</span>
              <button
                onClick={() => removeItem(cartItemId)}
                className="px-2.5 py-1.5 text-xs font-medium text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50/50 transition flex items-center gap-1"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
