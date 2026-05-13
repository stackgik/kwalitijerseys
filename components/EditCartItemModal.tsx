import { useState } from "react";
import { X } from "lucide-react";
import { ICartItem, useCart } from "@/context/CartContext";
import Image from "next/image";
import { AVAILABLE_JERSEY_SIZES } from "@/constant";

interface EditCartItemDialogProps {
  item: ICartItem;
}

export function EditCartItemDialog({ item }: EditCartItemDialogProps) {
  const [size, setSize] = useState(item.size);
  const [version, setVersion] = useState<"fan" | "player">(item.version);
  const [quantity, setQuantity] = useState(item.quantity);
  const [customizationEnabled, setCustomizationEnabled] = useState(
    !!item.customization,
  );
  const [customName, setCustomName] = useState(item.customization?.name || "");
  const [customNumber, setCustomNumber] = useState(
    item.customization?.number || "",
  );
  const { updateItem, setEditingItem } = useCart();

  const closeModal = () => setEditingItem(null);

  const calculateCustomizationPrice = () => {
    if (!customizationEnabled) return 0;
    if (!customName.trim() && !customNumber.trim()) return 0;
    const numberLength = customNumber.trim().length;
    return numberLength >= 3 ? 6000 : 5000;
  };

  const handleSave = () => {
    const basePrice = version === "fan" ? item.price : item.price + 5000;

    const updatedItem: ICartItem = {
      ...item,
      size,
      version,
      quantity,
      price: basePrice,
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

    console.log(updatedItem);
    updateItem(item.id, updatedItem);

    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Item</h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Product Info */}
          <div className="flex gap-4">
            <Image
              src={item.image}
              alt={item.name}
              className="object-cover rounded-lg bg-gray-100"
              width={80}
              height={60}
            />
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">
                Base Price: ₦{item.price.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Version Selection */}
          <div>
            <h3 className="font-semibold mb-3">Version</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setVersion("fan")}
                className={`px-4 py-3 border-2 rounded-lg transition-colors font-medium ${
                  version === "fan"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div>
                  <div className="text-sm">Fan Version</div>
                </div>
              </button>
              <button
                onClick={() => setVersion("player")}
                className={`px-4 py-3 border-2 rounded-lg transition-colors font-medium ${
                  version === "player"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div>
                  <div className="text-sm">Player Version</div>
                  <div className="text-xs opacity-75">+₦5,000</div>
                </div>
              </button>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_JERSEY_SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-6 py-3 border-2 rounded-lg transition-colors font-medium ${
                    size === s
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors font-medium"
              >
                -
              </button>
              <input
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 h-10 text-center border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors font-medium"
              >
                +
              </button>
            </div>
          </div>

          {/* Customization */}
          <div className="border-2 border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold">Customization (Optional)</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Add name and number
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
                    htmlFor="edit-custom-name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name on Jersey
                  </label>
                  <input
                    id="edit-custom-name"
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
                    htmlFor="edit-custom-number"
                    className="block text-sm font-medium mb-2"
                  >
                    Jersey Number
                  </label>
                  <input
                    id="edit-custom-number"
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
                  <p className="text-xs text-gray-500 mt-1">Maximum 3 digits</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 text-sm">
                  <p className="font-medium mb-1">Customization Pricing:</p>
                  <p className="text-gray-600">• 1-2 numbers: ₦5,000</p>
                  <p className="text-gray-600">• 3 numbers: ₦6,000</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
          <button
            onClick={closeModal}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
