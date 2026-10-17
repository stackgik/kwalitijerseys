import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = "kwalitijerseys_global_cart";

const initialState: ICartItem[] = (() => {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.log(error);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }
  return [];
})();

type UpdateItemPayload = {
  itemId: string;
  newItem: ICartItem;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      const existingIndex = state.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.version === action.payload.version,
      );

      if (existingIndex > -1) {
        return state.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        );
      }

      return [...state, action.payload];
    },

    removeItem(state, action: PayloadAction<string>) {
      return state.filter((item) => item.cartItemId !== action.payload);
    },

    updateItem(state, action: PayloadAction<UpdateItemPayload>) {
      const { itemId, newItem } = action.payload;

      return state.map((cartItem) =>
        cartItem.cartItemId !== itemId ? cartItem : newItem,
      );
    },

    clearCart(state) {
      return (state = []);
    },
  },
  selectors: {
    selectCartItemsCount: (state) =>
      state.reduce((sum, curr) => sum + curr.quantity, 0),

    selectSubtotal: (state) =>
      state.reduce(
        (sum, item) =>
          sum +
          (item.priceInKobo / 100 + (item.customization?.price ?? 0)) *
            item.quantity,
        0,
      ),
  },
});

export default cartSlice;
