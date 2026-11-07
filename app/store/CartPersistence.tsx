"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppStore } from "./hooks";
import { hydrateCart } from "./slices/cartSlice";

// CartPersistence is just to read the localstorage
const CartPersistence = () => {
  const STORAGE_KEY = "cart_v1";
  const dispatch = useAppDispatch();
  const store = useAppStore();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved)
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) dispatch(hydrateCart(parsed));
      } catch {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
      }

    //   store subscription
    const unsubscribe = store.subscribe(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(store.getState().cart),
        );
      } catch {}
    });

    return unsubscribe;
  }, [dispatch, store]);

  return null;
};

export default CartPersistence;
