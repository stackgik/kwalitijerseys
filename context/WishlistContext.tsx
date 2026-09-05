"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import * as Sentry from "@sentry/nextjs";
import {
  addProductToWishlists,
  removeProductFromWishlists,
} from "@/app/actions/products";

type WishlistContextValue = {
  wishlisted: Set<string>;
  pendingId: string | null;
  toggleWishlist: (productId: string) => Promise<void>;
  setInitialWishlist: (ids: string[]) => void;
};

type WishlistProviderProps = {
  children: ReactNode;
  initialWishlistIds: string[];
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({
  children,
  initialWishlistIds,
}: WishlistProviderProps) {
  const [wishlisted, setWishlisted] = useState<Set<string>>(
    () => new Set(initialWishlistIds),
  );
  const [pendingId, setPendingId] = useState<string | null>(null);

  const setInitialWishlist = useCallback(
    (ids: string[]) => setWishlisted(new Set(ids)),
    [],
  );

  //   The wishlist button toggle functionality
  const toggleWishlist = useCallback(
    async (productId: string) => {
      const isCurrentlyWishlisted = wishlisted.has(productId);

      // Do optimistic toggling
      setWishlisted((prev) => {
        // clone the set to mutate
        const next = new Set(prev);
        if (isCurrentlyWishlisted) {
          next.delete(productId);
        } else {
          next.add(productId);
        }

        return next;
      });
      // useful for disabling the wishlist button while network trip is being made to the DB
      setPendingId(productId);

      // Do the actual HTTP request
      try {
        if (isCurrentlyWishlisted) {
          await removeProductFromWishlists(productId);
        } else {
          await addProductToWishlists(productId);
        }
      } catch (ex) {
        // Revert the optimistic toggle
        setWishlisted((prev) => {
          // clone the set to mutate
          const next = new Set(prev);
          if (isCurrentlyWishlisted) {
            next.delete(productId);
          } else {
            next.add(productId);
          }
          return next;
        });

        Sentry.captureException(ex, { tags: { flow: "wishlist-toggle" } });
      } finally {
        setPendingId(null);
      }
    },
    [wishlisted],
  );

  return (
    <WishlistContext.Provider
      value={{ wishlisted, pendingId, setInitialWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}
