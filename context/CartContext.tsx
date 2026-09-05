"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type CartContextType = {
  cartItems: ICartItem[];
  setCartItems: Dispatch<SetStateAction<ICartItem[]>>;
  addItem: (newItem: ICartItem) => void;
  removeItem: (itemId: string) => void;
  updateItem: (itemId: string, newItem: ICartItem) => void;
  clearCart: () => void;
  editingItem: ICartItem | null;
  setEditingItem: Dispatch<SetStateAction<ICartItem | null>>;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "kwalitijerseys_global_cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>(() => {
    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
    return [];
  });

  const [editingItem, setEditingItem] = useState<ICartItem | null>(null);

  // Expunge cart data from localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const clearCart = () => {
    setCartItems([]);
  };

  const addItem = (newItem: ICartItem) => {
    setCartItems((prev) => {
      // Find matching item based on identity, size, and version tier
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.size === newItem.size &&
          item.version === newItem.version,
      );

      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      }

      return [...prev, newItem];
    });
  };

  const removeItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== itemId));
  };

  const updateItem = (itemId: string, newItem: ICartItem) => {
    setCartItems((prev) =>
      prev.map((cartItem) =>
        cartItem.cartItemId !== itemId ? cartItem : newItem,
      ),
    );
  };

  // Math metrics
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.priceInKobo / 100 + (item.customization?.price ?? 0)) *
        item.quantity,
    0,
  );

  const cartItemsCount = cartItems.reduce(
    (sum, curr) => sum + curr.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItem,
        removeItem,
        clearCart,
        itemCount: cartItemsCount,
        subtotal,
        updateItem,
        editingItem,
        setEditingItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export default CartContext;
