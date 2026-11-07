import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICartItem[] = [];

type UpdateItemPayload = {
  itemId: string;
  newItem: ICartItem;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart(_, action: PayloadAction<ICartItem[]>) {
      return action.payload;
    },

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

    clearCart() {
      return [];
    },
  },
  selectors: {
    selectCartItems: (state) => state,

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

export const { addItem, removeItem, updateItem, clearCart, hydrateCart } =
  cartSlice.actions;
export const { selectCartItemsCount, selectSubtotal, selectCartItems } =
  cartSlice.selectors;
export const cartReducer = cartSlice.reducer;
