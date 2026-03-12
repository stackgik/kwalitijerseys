"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  customization?: {
    name?: string;
    number?: string;
  } | null;
};

export type CartContextType = {
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  addItem: (newItem: CartItem) => void;
  removeItem: (itemId: string, itemSize: string) => void;
  itemCount: number;
  customizationFees?: number;
  deliveryFee: number;
  subtotal: number;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add your cart methods here
  const addItem = (newItem: CartItem) => {
    // Check if item that matches size and name already exist and take action
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === newItem.id && item.size === newItem.size,
      );

      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id && item.size === newItem.size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // If none matches, update the list with the new item.
      return [...prev, newItem];
    });
  };

  const removeItem = (itemId: string, itemSize: string) => {
    setCartItems((prev) => {
      return prev.filter(
        (item) => item.id !== itemId || item.size !== itemSize,
      );
    });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItem,
        removeItem,
        itemCount: cartItems.length,
        subtotal,
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
