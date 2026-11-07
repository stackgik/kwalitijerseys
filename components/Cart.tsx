"use client";

import { ShoppingBag, ArrowLeft, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartEditContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EditCartItemSheet } from "./EditCartItemSheet";
import CartItem from "./CartItem";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  clearCart,
  selectCartItems,
  selectSubtotal,
} from "@/app/store/slices/cartSlice";

export function Cart() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { editingItem } = useCart();
  const cartItems = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectSubtotal);

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
                <div className="p-5 border-b border-gray-100/60 bg-gray-50/40 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-gray-900">
                    Selected Team Kits ({cartItems.length})
                  </h2>
                  {cartItems.length > 0 && (
                    <button
                      onClick={() => dispatch(clearCart())}
                      className="text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>

                <div className="divide-y divide-gray-100 px-5">
                  {cartItems.map((item, index) => (
                    <CartItem item={item} key={`${item.cartItemId}-${index}`} />
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
