"use client";

import { useEffect, useRef, useState } from "react";
import { X, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EmptyData from "./Empty";
import ProductCard from "./ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { authClient } from "@/lib/auth-client";

type PaginationMeta = {
  limit: number;
  total: number;
  totalPages: number;
};

type ShopProps = {
  products: IProductProps[];
  pagination: PaginationMeta;
  wishlistIds: string[];
  pendingWishlistId: string | null;
};

export const Shop = ({
  products,
  pagination,
  wishlistIds,
  pendingWishlistId,
}: ShopProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  console.log(products);

  const [showFilters, setShowFilters] = useState(false);

  const { data: session } = authClient.useSession();
  const { toggleWishlist, setInitialWishlist } = useWishlist();
  const hasResumedRef = useRef(false);

  useEffect(() => {
    setInitialWishlist(wishlistIds);
  }, [setInitialWishlist, wishlistIds]);

  useEffect(() => {
    if (pendingWishlistId && session && !hasResumedRef.current) {
      hasResumedRef.current = true;
      (async () => {
        await toggleWishlist(pendingWishlistId);
        router.replace(pathname);
      })();
    }
  }, [pendingWishlistId, session, toggleWishlist, pathname, router]);

  // Read current URL parameters
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const activeLeague = searchParams.get("league") || "All";
  const activeMinPrice = searchParams.get("minPrice");
  const activeMaxPrice = searchParams.get("maxPrice");

  // Determine current active price range preset for UI highlighting
  const getActivePriceRangePreset = () => {
    if (!activeMinPrice && activeMaxPrice === "15000") return "Under 15k";
    if (activeMinPrice === "15000" && activeMaxPrice === "20000")
      return "15k-20k";
    if (activeMinPrice === "20000" && !activeMaxPrice) return "Above 20k";
    return "All";
  };

  const activePricePreset = getActivePriceRangePreset();

  // Unified SearchParam Updater
  const updateParams = (updates: Record<string, string | null>) => {
    // This makes the search params editable and mutable
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "All") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    if (!("page" in updates)) {
      params.set("page", "1");
    }

    // This changes the URL causing the shop page to re-render.
    router.push(`${pathname}?${params.toString()}`);
  };

  // Handles toggling or setting single filter values (e.g., league selection)
  const updateFilter = (key: string, value: string) => {
    if (value === "All" || value === "") {
      updateParams({ [key]: null });
    } else {
      updateParams({ [key]: value });
    }
  };

  // Price Tier Selection Handler
  const handlePriceFilter = (range: string) => {
    switch (range) {
      case "Under 15k":
        updateParams({ minPrice: null, maxPrice: "15000" });
        break;
      case "15k-20k":
        updateParams({ minPrice: "15000", maxPrice: "20000" });
        break;
      case "Above 20k":
        updateParams({ minPrice: "20000", maxPrice: null });
        break;
      default:
        updateParams({ minPrice: null, maxPrice: null });
        break;
    }
  };

  const clearFilters = () => {
    router.push(pathname);
    setShowFilters(false);
  };

  const hasActiveFilters =
    searchParams.has("league") ||
    searchParams.has("minPrice") ||
    searchParams.has("maxPrice") ||
    searchParams.has("team");

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Editorial Sub-Header Title Meta Panel */}
        <div className="mb-10 pb-6 border-b border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-1.5">
              Kwaliti Vault
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              Shop All Jerseys
            </h1>
            <p className="text-xs font-semibold text-gray-500 mt-1">
              Showing {products.length} of {pagination.total}{" "}
              {pagination.total === 1 ? "jersey" : "jerseys"} matching
              specifications
            </p>
          </div>

          {/* Responsive Mobile Filter Control Button */}
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex-1 inline-flex items-center justify-center gap-2 px-4 h-11 border border-gray-200 bg-white hover:border-black rounded-xl transition-all text-xs font-bold uppercase tracking-wider"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8 items-start relative">
          {/* SIDEBAR: Sticky Desktop Controller Panel */}
          <aside
            className={`${
              showFilters
                ? "fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end"
                : "hidden"
            } lg:block lg:sticky lg:top-24 lg:z-10 lg:w-60 shrink-0 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowFilters(false);
            }}
          >
            <div className="bg-white h-full w-80 lg:w-full p-6 lg:p-0 overflow-y-auto flex flex-col gap-5 lg:bg-transparent animate-in slide-in-from-right lg:animate-none duration-300">
              {/* Header inside mobile sliding drawer */}
              <div className="lg:hidden flex items-center justify-between pb-4 border-b border-gray-100">
                <h2 className="text-xs font-black uppercase tracking-wider text-gray-900">
                  Refine Selection
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1.5 hover:bg-gray-50 border border-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Team Filter Input */}
                <div className="bg-gray-50/50 border border-gray-100 p-4 rounded-2xl ">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Featured Teams
                  </h3>
                  <div className="space-y-1 max-h-52 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {[
                      "All",
                      "Arsenal",
                      "Chelsea",
                      "Manchester United",
                      "Liverpool",
                      "Manchester City",
                      "Real Madrid",
                      "Barcelona",
                      "Bayern Munich",
                      "PSG",
                      "Others",
                    ].map((team) => {
                      const activeTeam = searchParams.get("team") || "All";
                      const isSelected = activeTeam === team;

                      return (
                        <button
                          key={team}
                          onClick={() =>
                            updateFilter("team", isSelected ? "All" : team)
                          }
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                            isSelected
                              ? "bg-black text-white shadow-xs"
                              : "text-gray-600 hover:bg-gray-100 hover:text-black"
                          }`}
                        >
                          {team === "All" ? "All Clubs & Teams" : team}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* League Segment Block Container */}
                <div className="bg-gray-50/50 border border-gray-100 p-4 rounded-2xl">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                    League / Category
                  </h3>
                  <div className="space-y-1">
                    {[
                      "All",
                      "Premier League",
                      "La Liga",
                      "National Teams",
                      "Ligue 1",
                      "Bundesliga",
                      "Serie A",
                      "Others",
                    ].map((league) => (
                      <button
                        key={league}
                        onClick={() =>
                          updateFilter(
                            "league",
                            league === activeLeague ? "All" : league,
                          )
                        }
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                          activeLeague === league
                            ? "bg-black text-white shadow-xs"
                            : "text-gray-600 hover:bg-gray-100 hover:text-black"
                        }`}
                      >
                        {league === "All" ? "All Competitions" : league}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Index Tier Selector Block Container */}
                <div className="bg-gray-50/50 border border-gray-100 p-4 rounded-2xl">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Price Range
                  </h3>
                  <div className="space-y-1">
                    {["All", "Under 15k", "15k-20k", "Above 20k"].map(
                      (range) => (
                        <button
                          key={range}
                          onClick={() => handlePriceFilter(range)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                            activePricePreset === range
                              ? "bg-black text-white shadow-xs"
                              : "text-gray-600 hover:bg-gray-100 hover:text-black"
                          }`}
                        >
                          {range === "All" ? "Any Price Value" : range}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* Master Reset Button Option */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full h-11 border border-dashed border-red-200 hover:border-red-600 text-red-600 hover:bg-red-50/20 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                  >
                    Wipe Active Filters
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* MAIN CONTAINER: Product Cards + Pagination Bar */}
          <main className="flex-1 w-full">
            {products.length === 0 ? (
              <div className="border border-dashed border-gray-200 rounded-2xl p-12 text-center max-w-md mx-auto mt-6">
                <EmptyData
                  title="No Jerseys Found"
                  description="We don't have matching specs in stock right now. Try clearing some query tags."
                  action={clearFilters}
                  btnContent="Reset Shop Grid"
                  icon={X}
                />
              </div>
            ) : (
              <div className="space-y-10">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 sm:gap-6">
                  {products.map((product, index) => (
                    <ProductCard product={product} key={product.id || index} />
                  ))}
                </div>

                {/* SERVER-PAGINATION CONTROL BAR */}
                {pagination.totalPages > 1 && (
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                    <button
                      onClick={() =>
                        updateParams({ page: (currentPage - 1).toString() })
                      }
                      disabled={currentPage <= 1}
                      className="inline-flex items-center gap-1.5 px-4 h-10 border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-wider hover:border-black disabled:opacity-40 disabled:hover:border-gray-200 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {Array.from(
                        { length: pagination.totalPages },
                        (_, i) => i + 1,
                      ).map((p) => (
                        <button
                          key={p}
                          onClick={() => updateParams({ page: p.toString() })}
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                            currentPage === p
                              ? "bg-black text-white"
                              : "text-gray-500 hover:bg-gray-100 hover:text-black"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        updateParams({ page: (currentPage + 1).toString() })
                      }
                      disabled={currentPage >= pagination.totalPages}
                      className="inline-flex items-center gap-1.5 px-4 h-10 border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-wider hover:border-black disabled:opacity-40 disabled:hover:border-gray-200 disabled:cursor-not-allowed transition-all"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
