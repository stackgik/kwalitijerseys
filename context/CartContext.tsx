"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface ICartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  version: "player" | "fan";
  customization?: {
    name?: string;
    number?: string;
    price: number;
  };
}

export type CartContextType = {
  cartItems: ICartItem[];
  setCartItems: Dispatch<SetStateAction<ICartItem[]>>;
  addItem: (newItem: ICartItem) => void;
  removeItem: (itemId: number) => void;
  updateItem: (itemId: number, newItem: ICartItem) => void;
  editingItem: ICartItem | null;
  setEditingItem: Dispatch<SetStateAction<ICartItem | null>>;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [editingItem, setEditingItem] = useState<ICartItem | null>(null);

  // Add your cart methods here
  const addItem = (newItem: ICartItem) => {
    // Check if item that matches size and name already exist and take action
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.version === newItem.version,
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

  const removeItem = (itemId: number) => {
    setCartItems((prev) => {
      return prev.filter((item) => item.id !== itemId);
    });
  };

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.price + (item.customization?.price ?? 0)) * item.quantity,
    0,
  );

  const updateItem = (itemId: number, newItem: ICartItem) => {
    setCartItems((prev) =>
      prev.map((cartItem) => (cartItem.id !== itemId ? cartItem : newItem)),
    );
  };

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
