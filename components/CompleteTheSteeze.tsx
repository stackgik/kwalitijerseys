"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface CompleteTheSteezeProps {
  currentProductId: string;
  products: IProductData[];
}

export function CompleteTheSteeze({
  currentProductId,
  products,
}: CompleteTheSteezeProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter out the current item, and cap the total recommendation pool at exactly 20 items
  const recommendedProducts = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 20);

  // Fallback safe rendering if no other jerseys exist in catalog
  if (recommendedProducts.length === 0) return null;

  const formatCurrency = (amountInKobo: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amountInKobo / 100);
  };

  return (
    <div className="mt-16 border-t border-gray-100 pt-12 pb-6 relative group/section">
      {/* Header Info */}
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Complete The Steeze
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Gear up with other high-demand drops
        </p>
      </div>

      {/* Modern Carousel Flex Frame Container */}
      <div
        ref={carouselRef}
        className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {recommendedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="w-60 sm:w-67.5 shrink-0 group snap-start block"
          >
            {/* Image Frame Canvas */}
            <div className="aspect-4/5 bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100/80 relative mb-3.5 shadow-xs">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                sizes="(max-w-7xl) 270px"
              />
              {product.type === "retro" && (
                <span className="absolute top-3 left-3 bg-zinc-950 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider shadow-xs">
                  Retro
                </span>
              )}
            </div>

            {/* Typography Description Bundle */}
            <div className="space-y-1 px-1.5">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                {product.league || "Special"} Edition
              </span>
              <h4 className="text-xs font-bold text-zinc-800 truncate group-hover:text-black transition-colors">
                {product.name}
              </h4>
              <p className="text-sm font-black text-zinc-950 tabular-nums">
                {formatCurrency(product.priceInKobo)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
