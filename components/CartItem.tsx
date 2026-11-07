"use client";

import Image from "next/image";
import { useCart } from "@/context/CartEditContext";
import { SquarePen, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/app/store/hooks";
import { removeItem } from "@/app/store/slices/cartSlice";

const CartItem = ({ item }: { item: ICartItem }) => {
  const { cartItemId, image, name, size, quantity, priceInKobo, version } =
    item;
  const { setEditingItem } = useCart();
  const dispatch = useAppDispatch();

  const totalPrice =
    (priceInKobo / 100 + (item.customization?.price || 0)) * quantity;

  return (
    <div className="py-5 flex gap-4 group">
      <div className="relative w-16 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100/60 shrink-0">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-xs sm:text-sm text-gray-900 truncate">
              {name}
            </h3>
            <p className="text-xs sm:text-sm font-black text-gray-900 tabular-nums">
              ₦{totalPrice.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[11px] font-medium text-gray-500">
            <span>
              Size: <b className="text-gray-800">{size}</b>
            </span>
            <span>
              Style:{" "}
              <b className="text-gray-800 capitalize">
                {item.type === "retro" ? item.type : `${version} Version`}
              </b>
            </span>
            <span>
              Qty: <b className="text-gray-800">{quantity}</b>
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
            <SquarePen className="w-3 h-3" /> Edit
          </button>
          <span className="text-gray-200 text-xs">|</span>
          <button
            onClick={() => dispatch(removeItem(cartItemId))}
            className="text-[11px] font-bold text-gray-400 hover:text-red-600 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3 h-3" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
