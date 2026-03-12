"use client";

import { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const SIZES = ["S", "M", "L", "XL", "XXL"];

const CartItem = ({
  item,
  onUpdateQuantity,
  onUpdateSize,
  onRemove,
  onUpdateCustomization,
}) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [customName, setCustomName] = useState(item.customization?.name || "");
  const [customNumber, setCustomNumber] = useState(
    item.customization?.number || "",
  );

  const handleSaveCustomization = () => {
    onUpdateCustomization(item.id, item.size, {
      name: customName.trim(),
      number: customNumber.trim(),
    });
    setShowCustomization(false);
  };

  const handleCancelCustomization = () => {
    setCustomName(item.customization?.name || "");
    setCustomNumber(item.customization?.number || "");
    setShowCustomization(false);
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200">
      <div className="flex gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{item.name}</h3>
          <p className="text-lg font-bold text-gray-900">
            ₦{item.price.toLocaleString()}
          </p>

          <div className="flex items-center gap-3 mt-3">
            <select
              value={item.size || ""}
              onChange={(e) => onUpdateSize(item.id, item.size, e.target.value)}
              className={`px-3 py-1.5 border-2 rounded-lg text-sm font-medium ${
                !item.size ? "border-red-500 bg-red-50" : "border-gray-200"
              }`}
            >
              <option value="">Select size</option>
              {SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2 border-2 border-gray-200 rounded-lg">
              <button
                onClick={() =>
                  onUpdateQuantity(item.id, item.size, item.quantity - 1)
                }
                className="p-1.5 hover:bg-gray-100 rounded"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 font-semibold">{item.quantity}</span>
              <button
                onClick={() =>
                  onUpdateQuantity(item.id, item.size, item.quantity + 1)
                }
                className="p-1.5 hover:bg-gray-100 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => onRemove(item.id, item.size)}
              className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {!item.size && (
            <p className="text-red-600 text-sm mt-2 font-medium">
              ⚠️ Please select a size
            </p>
          )}

          <button
            onClick={() => setShowCustomization(!showCustomization)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2"
          >
            {item.customization
              ? "✓ Customization added (+₦2,500)"
              : "⚙️ Add customization (optional)"}
          </button>

          {showCustomization && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
              <input
                type="text"
                placeholder="Name (e.g., OZIL)"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="Number (e.g., 11)"
                value={customNumber}
                onChange={(e) => setCustomNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveCustomization}
                  className="flex-1 bg-black text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelCustomization}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
