"use client";

import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useWishlist } from "@/context/WishlistContext";

const Wishlist = ({ products }: { products: IProductProps[] }) => {
  const { wishlisted } = useWishlist();

  const visibleProducts = products.filter((product) =>
    wishlisted.has(product.id),
  );
  const itemCount = visibleProducts.length;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="relative pt-6 pb-10 sm:pb-14">
          <div className="flex flex-col gap-3">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80">
              <Heart className="w-3 h-3 fill-black text-black" />
              <span className="text-[10px] font-black tracking-widest uppercase text-neutral-800">
                PERSONAL ARCHIVE
              </span>
            </div>

            {/* Title & Count Row */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mt-1">
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                WISHLIST
              </h1>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-neutral-400">
                {itemCount > 0
                  ? String(itemCount).padStart(2, "0") + " " + "Saved"
                  : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section: Product Grid OR Empty State */}
        {itemCount > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 sm:gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State Fallback */
          <div className="min-h-[45vh] flex flex-col items-center justify-center text-center p-8 bg-neutral-50 rounded-3xl border border-dashed border-neutral-200">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xs mb-4">
              <Heart className="w-6 h-6 text-neutral-300" />
            </div>

            <h2 className="text-lg font-extrabold text-neutral-900 uppercase tracking-tight">
              YOUR WISHLIST IS EMPTY
            </h2>

            <p className="text-xs sm:text-sm font-medium text-neutral-500 max-w-sm mt-1.5 mb-6 leading-relaxed">
              Explore our latest drop of player edition kits and retro jerseys
              to save your favorite fits for later.
            </p>

            <Link
              href="/shop"
              className="py-3.5 px-8 rounded-full bg-[#0A0A0A] hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all active:scale-[0.98] shadow-xs"
            >
              <span>EXPLORE KITS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
