"use client";

import EmptyData from "@/components/Empty";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();
  const {
    items,
    subtotal,
    customizationFees,
    total,
    updateQuantity,
    updateSize,
    removeItem,
    updateCustomization,
  } = useCart();

  const canCheckout = items.length > 0 && items.every((item) => item.size);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-gray-600">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
            <Link
              href="/shop"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item, index) => (
                <CartItem
                  key={`${item.id}-${item.size}-${index}`}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onUpdateSize={updateSize}
                  onRemove={removeItem}
                  onUpdateCustomization={updateCustomization}
                />
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                {customizationFees > 0 && (
                  <div className="flex justify-between">
                    <span>Customization fees</span>
                    <span>₦{customizationFees.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between text-xl font-bold text-black">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              {!canCheckout && (
                <p className="text-red-600 text-sm mt-4 font-medium">
                  ⚠️ Please select sizes for all items before checkout
                </p>
              )}

              <Link
                href={canCheckout ? "/checkout" : "#"}
                onClick={(e) => !canCheckout && e.preventDefault()}
                className={`block w-full mt-6 py-4 rounded-lg font-bold text-lg text-center transition-colors ${
                  canCheckout
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;

{
  /* <EmptyData
      title="Your cart is empty"
      description="Add some jerseys to get started"
      action={() => router.push("/shop")}
      btnContent="Continue shopping"
    /> */
}
