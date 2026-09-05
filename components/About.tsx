"use client";

import {
  Shield,
  Truck,
  BadgeCheck,
  Heart,
  Star,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export function About() {
  return (
    <div className="bg-white text-black antialiased selection:bg-black selection:text-white">
      {/* 1. Header Hero Panel */}
      <section className="border-b border-gray-100 py-16 md:py-24 bg-gray-50/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block">
            Behind the Stitching
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900">
            About KwalitiJerseys
          </h1>
          <p className="text-sm md:text-base text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
            Curating premium pitch wear and historically precise retro
            architecture for the absolute football purist across Nigeria.
          </p>
        </div>
      </section>

      {/* 2. Manifesto / Our Story */}
      <section className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-4 lg:sticky lg:top-24">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">
              The Genesis
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 uppercase">
              Curating for <br />
              the Culture.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-sm font-medium text-gray-600 leading-relaxed">
            <p>
              KwalitiJerseys wasn’t born from business spreadsheets; it grew
              straight out of raw terrace subculture. We realized it was
              entirely too difficult for fans across Nigeria to get their hands
              on premium-grade replicas, exact player-spec threadings, and
              flawless historical retros without dealing with sub-par material
              or endless logistics bottlenecks.
            </p>
            <p>
              We established a localized, rigorously filtered supply framework
              to handle the sorting for you. Every patch placement, stitch
              alignment, and heat-pressed material variant is manually verified
              before it is indexed into our digital collection.
            </p>
            <p>
              Today, we serve a growing grid of collectors, casual weekend
              wearers, and local pitch purists spanning Lagos, Abuja, Port
              Harcourt, and beyond. We don’t just ship jerseys—we manage kit
              identity.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars Value Grid */}
      <section className="py-16 bg-gray-50/60 border-y border-gray-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-1.5">
              Operations Standard
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">
              Why Collectors Trust Our Vault
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BadgeCheck,
                title: "Player & Fan Spec Precision",
                desc: "We prioritize authentic premium detailing, exact badging texture, and durability benchmarks that stand up to active pitch use and repetitive wash cycles.",
              },
              {
                icon: Truck,
                title: "Insured National Dispatch",
                desc: "Fulfillment routes covering all 36 states safely. Every piece moves through reliable transit chains with real-time status visibility over our WhatsApp grid.",
              },
              {
                icon: Shield,
                title: "Strict Quality Guarantee",
                desc: "Zero guessing games. If the structural print properties or sizing indexes don't align with what you ordered, we manage returns hassle-free within 2 days.",
              },
              {
                icon: Heart,
                title: "Built by Football Fanatics",
                desc: "We verify typography, embroidery drop accuracy, and fabric weighting against original kit parameters because we wear them ourselves.",
              },
              {
                icon: Star,
                title: "The Retro & Current Catalog",
                desc: "A constantly updating vault spanning elite current European drop configurations to classic vintage designs that are near impossible to locate elsewhere.",
              },
              {
                icon: MapPin,
                title: "Seamless Verification Loops",
                desc: "No opaque systems. Everything connects straight into a clean checkout workflow that lets you audit specific customization parameters directly with dispatch handlers.",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 p-5 sm:p-6 rounded-2xl shadow-2xs space-y-4"
              >
                <div className="bg-black text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-xs">
                  <pillar.icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Structural Quality Audit Promise */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-xs">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(50,50,50,0.4),transparent_60%)]" />

          <div className="relative z-10 space-y-6">
            <div>
              <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400 block mb-2">
                Pre-Waybill Audit
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                The Four-Point Quality Loop
              </h2>
              <p className="text-xs text-gray-400 mt-1 font-medium">
                We don&apos;t authorize dispatch until a kit passes our physical
                verification logs:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                "Fabric density and tensile structural stitching verification.",
                "Symmetry check on club badges and branding embroidery loops.",
                "Thermal tracking and accuracy checks on requested player names/numbers.",
                "Exact metric sizing checks against premium fitting standards.",
              ].map((text, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-start bg-white/5 border border-white/5 p-3.5 rounded-xl"
                >
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-300 font-medium leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Logistics Transparency Node */}
      <section className="py-16 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-2xs">
            <div className="md:col-span-5 space-y-2">
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block">
                Hub Logistics
              </span>
              <h2 className="text-lg font-black tracking-tight text-gray-900 uppercase">
                National Transit
              </h2>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Our main packaging facilities route custom prints through
                instant dispatch networks daily.
              </p>
            </div>

            <div className="md:col-span-7 pt-4 md:pt-0 md:pl-6 md:border-l border-dashed border-gray-100 space-y-3 text-xs font-semibold text-gray-700">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                  Lagos Hub Matrix
                </span>
                <span className="text-gray-900 font-black">
                  Same Day / 24 Hours Max
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                  Tier-1 State Hubs (Abuja, PH, Ibadan)
                </span>
                <span className="text-gray-900 font-black">
                  2 - 3 Business Days
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                  Regional Delivery Outposts
                </span>
                <span className="text-gray-900 font-black">
                  3 - 5 Business Days
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
