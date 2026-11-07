"use client";

import { createContext, SetStateAction, useContext, useState } from "react";

export type CartEditContextType = {
  editingItem: ICartItem | null;
  setEditingItem: React.Dispatch<SetStateAction<ICartItem | null>>;
};

const CartEditContext = createContext<CartEditContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [editingItem, setEditingItem] = useState<ICartItem | null>(null);

  return (
    <CartEditContext.Provider
      value={{
        editingItem,
        setEditingItem,
      }}
    >
      {children}
    </CartEditContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartEditContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export default CartEditContext;
