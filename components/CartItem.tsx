"use client";

import { Trash2, Edit2 } from "lucide-react";
import Image from "next/image";
import { ICartItem, useCart } from "@/context/CartContext";

const CartItem = ({ item }: { item: ICartItem }) => {
  // This is coming from the CartItem object itself
  const { id, image, name, size, version, quantity, price } = item;
  const { updateItem, removeItem, setEditingItem } = useCart();

  return (
    <div className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
      <Image
        src={image}
        alt={name}
        width={150}
        height={150}
        className="w-20 h-20 object-cover rounded-lg bg-gray-100"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm mb-1">{name}</h3>
        <p className="text-xs text-gray-600">
          Size: {size} • {version.charAt(0).toUpperCase() + version.slice(1)}
        </p>
        {item.customization && (
          <p className="text-xs text-gray-600">
            Custom: {item.customization.name} {item.customization.number}
          </p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <button
            disabled={quantity === 1}
            onClick={() => updateItem(id, { ...item, quantity: quantity - 1 })}
            className="w-6 h-6 border border-gray-200 rounded hover:border-gray-300 text-sm"
          >
            -
          </button>
          <span className="text-sm font-medium w-8 text-center">
            {quantity}
          </span>
          <button
            onClick={() => updateItem(id, { ...item, quantity: quantity + 1 })}
            className="w-6 h-6 border border-gray-200 rounded hover:border-gray-300 text-sm"
          >
            +
          </button>
        </div>
      </div>
      <div className="text-right flex flex-col gap-2">
        <p className="text-sm font-semibold">
          ₦
          {(
            (price + (item.customization?.price || 0)) *
            quantity
          ).toLocaleString()}
        </p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setEditingItem(item)}
            className="text-xs text-gray-600 hover:text-black flex items-center gap-1 justify-end"
          >
            <Edit2 className="w-3 h-3" />
            Edit
          </button>
          <button
            onClick={() => removeItem(id)}
            className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 justify-end"
          >
            <Trash2 className="w-3 h-3" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
