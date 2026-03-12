"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { allProducts } from "@/constant";
import { useRouter, useSearchParams } from "next/navigation";
import EmptyData from "./Empty";
import ProductCard from "./ProductCard";

// Mock product data

export function Shop() {
  const [selectedLeague, setSelectedLeague] = useState<string>("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  // This is readonly, which is why URLSearchParams is needed to mutate
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const filteredProducts = allProducts.filter((product) => {
    // League filter
    const matchesLeague =
      params.get("league") === null || params.get("league") === product.league;

    // Price filter
    let matchesPrice = true;
    if (params.get("price") === "Under 15k") {
      matchesPrice = product.price < 15000;
    } else if (params.get("price") === "15k-20k") {
      matchesPrice = product.price >= 15000 && product.price <= 20000;
    } else if (params.get("price") === "Above 20k") {
      matchesPrice = product.price > 20000;
    }

    // Product must match BOTH filters
    return matchesLeague && matchesPrice;
  });

  const updateFilter = (key: string, value: string) => {
    if (value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/shop?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/shop");
  };

  const hasActiveFilters =
    selectedLeague !== "All" || selectedPriceRange !== "All";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl mb-2">Shop All Jerseys</h1>
          <p className="text-gray-600">
            {filteredProducts.length} jerseys available
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg border border-gray-200 w-full justify-center hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters</span>
            {hasActiveFilters && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block fixed lg:relative inset-0 lg:inset-auto z-40 lg:z-auto bg-black/50 lg:bg-transparent`}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowFilters(false);
            }}
          >
            <div className="bg-white lg:bg-transparent w-80 h-full lg:h-auto lg:w-64 p-6 lg:p-0 overflow-y-auto">
              {/* Mobile Close Button */}
              <div className="lg:hidden flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* WORKING ON THIS TO USE QUERY STRINGS */}
              <div className="space-y-6">
                {/* League Filter */}
                <div className="bg-white lg:bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold mb-3">League / Category</h3>
                  <div className="space-y-2">
                    {["All", "EPL", "La Liga", "National", "Retro"].map(
                      (league) => (
                        <button
                          key={league}
                          onClick={() => updateFilter("league", league)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            (params.get("league") || "All") === league
                              ? "bg-black text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {league}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="bg-white lg:bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {["All", "Under 15k", "15k-20k", "Above 20k"].map(
                      (range) => (
                        <button
                          key={range}
                          onClick={() => updateFilter("price", range)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            (params.get("price") || "All") === range
                              ? "bg-black text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {range}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              // Adjust the button in this component to use dynamic logic
              <EmptyData
                title={"No jerseys found"}
                description={
                  "Try adjusting your filters or browse all products"
                }
                action={clearFilters}
                btnContent="Clear filter"
                icon={X}
              />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
