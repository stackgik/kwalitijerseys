"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import {
  AVAILABLE_JERSEY_SIZES,
  productDetails,
  VERSION_UPCHARGE_KOBO,
} from "@/constant";
import { Plus, Minus } from "lucide-react";
import SideSheet from "./SideSheet";
import formatCurrency from "@/helper/formatCurrency";

interface EditCartItemDialogProps {
  item: ICartItem | null;
}

const EditCartForm = ({
  item,
  closeSheet,
}: {
  item: ICartItem;
  closeSheet: () => void;
}) => {
  const { updateItem } = useCart();

  const [size, setSize] = useState(item.size || "");
  const [version, setVersion] = useState<"fan" | "player">(
    item.version || "fan",
  );
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [customizationEnabled, setCustomizationEnabled] = useState(
    !!item.customization,
  );
  const [customName, setCustomName] = useState(item.customization?.name || "");
  const [customNumber, setCustomNumber] = useState(
    item.customization?.number || "",
  );

  const calculateCustomizationPrice = () => {
    if (!customizationEnabled || (!customName.trim() && !customNumber.trim()))
      return 0;
    return customNumber.trim().length >= 3 ? 6000 : 5000;
  };

  const product = productDetails.find((prod) => prod.id === item.productId);
  if (!product) {
    alert("something went wrong");
    return;
  }
  const pristinePriceInKobo = product.priceInKobo;

  const handleSave = () => {
    console.log(item.priceInKobo);

    const basePrice =
      version === "fan"
        ? pristinePriceInKobo
        : pristinePriceInKobo + VERSION_UPCHARGE_KOBO;

    const updatedItem: ICartItem = {
      ...item,
      size,
      version,
      quantity,
      priceInKobo: item.type === "retro" ? item.priceInKobo : basePrice,
      ...(customizationEnabled && (customName.trim() || customNumber.trim())
        ? {
            customization: {
              name: customName.trim() || undefined,
              number: customNumber.trim() || undefined,
              price: calculateCustomizationPrice(),
            },
          }
        : { customization: undefined }),
    };

    // console.log(updatedItem);

    updateItem(item.cartItemId, updatedItem);
    closeSheet();
  };

  return (
    <>
      <div className="space-y-6 pb-20">
        {/* Product Mini Metadata Info Card */}
        <div className="flex gap-4 p-3 bg-gray-50/40 border border-gray-100/60 rounded-xl">
          <div className="relative w-16 h-20 bg-white rounded-lg overflow-hidden border border-gray-100/80 shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h3 className="font-semibold text-xs sm:text-sm text-gray-900 line-clamp-2 leading-snug">
              {item.name}
            </h3>
            <p className="text-xs font-bold text-gray-500 mt-1.5 tabular-nums">
              Base Price: {formatCurrency(item.priceInKobo / 100, "NGN")}
            </p>
          </div>
        </div>

        {/* Version Selection Options */}
        {item.type === "retro" ? (
          ""
        ) : (
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-2.5">
              Kit Style
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {(["fan", "player"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVersion(v)}
                  className={`p-3.5 text-left border rounded-xl transition-all ${
                    version === v
                      ? "border-black bg-black text-white shadow-sm"
                      : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"
                  }`}
                >
                  <span className="block text-xs font-bold capitalize tracking-wide">
                    {v} Version
                  </span>
                  {v === "player" && (
                    <span
                      className={`block text-[10px] mt-0.5 font-medium ${version === v ? "text-gray-300" : "text-gray-500"}`}
                    >
                      + ₦{(VERSION_UPCHARGE_KOBO / 100).toLocaleString()} extra
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sizes Box Wrapper Grid */}
        <div>
          <h3 className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-2.5">
            Select Size
          </h3>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_JERSEY_SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`min-w-12.5 h-10 border text-xs font-bold rounded-xl flex items-center justify-center transition-all ${
                  size === s
                    ? "border-black bg-black text-white shadow-sm"
                    : "border-gray-200 text-gray-800 bg-white hover:border-gray-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Fine Segmented Quantity Controller */}
        <div>
          <h3 className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-2.5">
            Quantity
          </h3>
          <div className="flex items-center border border-gray-200/80 rounded-xl w-fit p-1 bg-gray-50/60">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-black hover:bg-white active:scale-95 transition-all"
            >
              <Minus className="w-3 h-3" />
            </button>
            <input
              type="text"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-10 text-center text-xs font-bold bg-transparent text-gray-900 focus:outline-none tabular-nums"
            />
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-black hover:bg-white active:scale-95 transition-all"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Custom Printing Card Layout */}
        <div className="border border-gray-100 rounded-xl bg-gray-50/40 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-gray-900">
                Custom Kit Printing
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Modify personalized squad metrics
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
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
              }`}
            >
              {customizationEnabled ? "Remove" : "Configure"}
            </button>
          </div>

          {customizationEnabled && (
            <div className="space-y-3 mt-4 pt-4 border-t border-gray-200/60 animate-in slide-in-from-top-2 duration-200">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">
                  Name Placement
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                  placeholder="e.g., RONALDO"
                  maxLength={20}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-black focus:outline-none bg-white text-xs uppercase font-semibold tracking-wide"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">
                  Squad Number
                </label>
                <input
                  type="text"
                  value={customNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value.length <= 3) setCustomNumber(value);
                  }}
                  placeholder="e.g., 7"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-black focus:outline-none bg-white text-xs font-bold"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stable Base Fixed Action Buttons Bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100/60 px-6 py-4 flex gap-3 bg-white/80 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.01)] z-10">
        <button
          onClick={closeSheet}
          className="flex-1 h-11 border border-gray-200 rounded-xl hover:bg-gray-50/80 transition-colors font-semibold text-xs text-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 h-11 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors font-semibold text-xs shadow-xs"
        >
          Apply Changes
        </button>
      </div>
    </>
  );
};

// 2. The structural wrapper passes down an item specific key string
export function EditCartItemSheet({
  item: editingItem,
}: EditCartItemDialogProps) {
  const { setEditingItem, editingItem: contextEditingItem } = useCart();
  const item = editingItem || contextEditingItem;

  const closeSheet = () => setEditingItem(null);

  return (
    <SideSheet isOpen={!!item} onClose={closeSheet} title="Configure Item">
      {item && (
        <EditCartForm
          key={`${item.cartItemId}-${item.size}-${item.version}`}
          item={item}
          closeSheet={closeSheet}
        />
      )}
    </SideSheet>
  );
}
