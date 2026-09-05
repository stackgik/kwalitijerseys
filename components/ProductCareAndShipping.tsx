"use client";

import { useState } from "react";
import { Truck, Sparkles, ChevronDown } from "lucide-react";

export function ProductCareAndShipping() {
  const [openSection, setOpenSection] = useState<"care" | "shipping" | null>(
    null,
  );

  const toggleSection = (section: "care" | "shipping") => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="mt-12 border-t border-gray-100 pt-8 w-full">
      <h3 className="text-sm font-bold tracking-wider uppercase text-gray-400 mb-4">
        Product Information & Trust
      </h3>

      {/* 💡 The Fix: Changed from full-width stack to an adaptive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/* SECTION 1: STEEZE CARE GUIDE */}
        <div className="border border-zinc-100 rounded-xl overflow-hidden bg-white shadow-xs">
          <button
            onClick={() => toggleSection("care")}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-zinc-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-zinc-500" />
              <span className="text-sm font-semibold text-zinc-900">
                Steeze Care & Washing Guide
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${openSection === "care" ? "rotate-180" : ""}`}
            />
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${openSection === "care" ? "max-h-60 border-t border-zinc-50" : "max-h-0"}`}
          >
            <div className="p-5 text-xs text-zinc-600 space-y-2.5 bg-zinc-50/30 leading-relaxed">
              <p className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0" />
                Hand wash inside out in cold water is highly recommended to
                protect prints.
              </p>
              <p className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0" />
                Never iron directly over heat-pressed sponsor emblems, names, or
                numbers.
              </p>
              <p className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0" />
                Do not tumble dry. Hang dry naturally away from scorching
                sunlight.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: SHIPPING TIMELINES */}
        <div className="border border-zinc-100 rounded-xl overflow-hidden bg-white shadow-xs">
          <button
            onClick={() => toggleSection("shipping")}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-zinc-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-zinc-500" />
              <span className="text-sm font-semibold text-zinc-900">
                Nationwide Delivery Timelines
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${openSection === "shipping" ? "rotate-180" : ""}`}
            />
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${openSection === "shipping" ? "max-h-60 border-t border-zinc-50" : "max-h-0"}`}
          >
            <div className="p-5 text-xs text-zinc-600 space-y-2.5 bg-zinc-50/30 leading-relaxed">
              <p className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-950 shrink-0" />
                <span>
                  <strong>Lagos Delivery:</strong> 1–2 working days via
                  localized dispatch.
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0" />
                <span>
                  <strong>Inter-State:</strong> 3–5 working days via GIG
                  Logistics hubs.
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0" />
                Tracking keys are dispatched automatically via WhatsApp once
                order departs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
