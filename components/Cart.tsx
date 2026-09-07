"use client";

import {
  ShoppingBag,
  ArrowLeft,
  Edit2,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { EditCartItemSheet } from "./EditCartItemSheet";

export function Cart() {
  const router = useRouter();
  const { cartItems, subtotal, editingItem, setEditingItem, removeItem } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-sm p-6 bg-gray-50/50 border border-gray-100 rounded-2xl">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-5 h-5 text-gray-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Add your favorite club or country kits to your bag to initialize
            checkout options.
          </p>
          <Link
            href="/shop"
            className="inline-flex mountaineer w-full justify-center bg-black text-white px-6 h-11 items-center rounded-xl hover:bg-gray-900 transition-colors text-xs font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white antialiased">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
          <Link
            href="/shop"
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-black mb-8 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-0.5 transition-transform" />
            Back to Shop
          </Link>

          <div className="mb-10 pb-6 border-b border-gray-100">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              Review Bag
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT: Cart Items List */}
            <div className="lg:col-span-7">
              <div className="border border-gray-100 rounded-2xl bg-white shadow-2xs overflow-hidden">
                <div className="p-5 border-b border-gray-100/60 bg-gray-50/40">
                  <h2 className="text-sm font-bold text-gray-900">
                    Selected Team Kits ({cartItems.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-100 px-5">
                  {cartItems.map((item, index) => (
                    <div
                      key={`${item.cartItemId}-${index}`}
                      className="py-5 flex gap-4 group"
                    >
                      <div className="relative w-16 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100/60 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-xs sm:text-sm text-gray-900 truncate">
                              {item.name}
                            </h3>
                            <p className="text-xs sm:text-sm font-black text-gray-900 tabular-nums">
                              ₦
                              {(
                                (item.priceInKobo / 100 +
                                  (item.customization?.price || 0)) *
                                item.quantity
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[11px] font-medium text-gray-500">
                            <span>
                              Size: <b className="text-gray-800">{item.size}</b>
                            </span>
                            <span>
                              Style:{" "}
                              <b className="text-gray-800 capitalize">
                                {item.type === "retro"
                                  ? item.type
                                  : `${item.version} Version`}
                              </b>
                            </span>
                            <span>
                              Qty:{" "}
                              <b className="text-gray-800">{item.quantity}</b>
                            </span>
                          </div>
                          {item.customization && (
                            <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100 text-[10px] text-gray-600 font-medium">
                              Print: {item.customization.name || "No Name"} • #
                              {item.customization.number || "00"}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mt-2 pt-2 border-t border-dashed border-gray-100">
                          <button
                            onClick={() => setEditingItem(item)}
                            className="text-[11px] font-bold text-gray-400 hover:text-black flex items-center gap-1 transition-colors"
                          >
                            <Edit2 className="w-3 h-3" /> Configure Style
                          </button>
                          <span className="text-gray-200 text-xs">|</span>
                          <button
                            onClick={() => removeItem(item.cartItemId)}
                            className="text-[11px] font-bold text-gray-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Totals Box Summary Card */}
            <div className="lg:col-span-5">
              <div className="border border-gray-100 rounded-2xl p-5 sm:p-6 bg-white shadow-2xs space-y-4">
                <h2 className="text-xs font-bold tracking-wider uppercase text-gray-400">
                  Order Summary
                </h2>

                <div className="py-4 border-y border-gray-100/80 text-xs font-medium text-gray-500 flex justify-between items-center">
                  <span>Bag Subtotal</span>
                  <span className="text-gray-900 font-bold tabular-nums text-sm">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-black text-white h-12 rounded-xl hover:bg-gray-900 transition-all font-semibold text-xs shadow-xs flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {editingItem && (
        <EditCartItemSheet
          key={`${editingItem.cartItemId}-${editingItem.size}-${editingItem.version}`}
          item={editingItem}
        />
      )}
    </>
  );
}
