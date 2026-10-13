"use client";

import formatCurrency from "@/helper/formatCurrency";
import Image from "next/image";
import Link from "next/link";
import WishlistBtn from "./WishlistBtn";

const ProductCard = ({ product }: { product: IProduct }) => {
  const { id, images, name, season, priceInKobo, stock, createdAt } =
    product || {};

  const isOutOfStock = stock === 0;

  const isNewArrival = ((): boolean => {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    return new Date(createdAt) > twoWeeksAgo;
  })();

  return (
    <div className="relative">
      {/* Floating Wishlist — outside the Link so hovers don't bleed */}
      <WishlistBtn productId={id} />

      <Link
        href={`/products/${id}`}
        className="group flex flex-col w-full bg-white transition-all duration-300"
      >
        <div className="aspect-3/4 bg-gray-50 rounded-xl relative overflow-hidden border border-gray-100 shadow-2xs">
          <Image
            src={images[0]}
            alt={name}
            className={`w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out ${
              isOutOfStock ? "grayscale opacity-60" : ""
            }`}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
          />

          {isNewArrival && (
            <div className="absolute bottom-3 left-3 bg-[#0A0A0A] text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-none shadow-xs z-10">
              New Arrival
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-neutral-900/30 flex items-center justify-center z-10 pointer-events-none">
              <span className="text-white font-black text-3xl sm:text-4xl tracking-tight drop-shadow-md">
                Sold Out
              </span>
            </div>
          )}
        </div>

        <div className="pt-3 pb-1 px-1 flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
              {season || "25/26 Season"}
            </span>

            <div className="text-xs font-bold text-neutral-900 flex items-center gap-1 z-10">
              <span>4.9</span>
              <span className="text-[#0A0A0A]">★</span>
            </div>
          </div>
          <h3 className="font-bold text-xs sm:text-sm text-gray-900 tracking-tight group-hover:text-gray-600 transition-colors line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center justify-between pt-0.5">
            <p className="text-xs sm:text-sm font-black text-gray-900 tabular-nums">
              {formatCurrency(priceInKobo! / 100, "NGN")}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
