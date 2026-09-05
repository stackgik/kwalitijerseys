import {
  Shield,
  Truck,
  BadgeCheck,
  ArrowRight,
  MessageCircle,
  ShoppingBag,
  Play,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { BestSellers } from "./BestSellers";
import BestSellersSkeleton from "./BestSellersSkeleton";
import { leagues } from "@/constant";

const WHATSAPP_NUMBER = "2347067735811";

export function Home() {
  return (
    <div className="bg-white text-black antialiased selection:bg-black selection:text-white">
      <section className="relative min-h-screen bg-[#faf9f6] text-neutral-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-center">
        {/* Editorial Background Stars/Glints matching the reference image style */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <span className="absolute top-1/4 left-10 text-xl font-sans text-neutral-300">
            ✦
          </span>
          <span className="absolute bottom-1/4 right-10 text-2xl font-sans text-neutral-300">
            ✦
          </span>
          <span className="absolute top-1/3 right-1/4 text-sm font-sans text-neutral-300">
            ✦
          </span>
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
          {/* --- HEADER BLOCK (Centered Title & Actions) --- */}
          <div className="text-center max-w-4xl space-y-6 relative z-10 mb-12">
            {/* Top Operational Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200/80 rounded-full text-[10px] md:text-xs uppercase tracking-widest text-neutral-500 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
              Elite Kit Logistics Across Nigeria
            </div>

            {/* Centered Premium Typography */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-[0.95] max-w-3xl mx-auto text-neutral-950">
              Wear The Culture. <br />
              <span className="text-transparent font-medium italic font-serif normal-case">
                Command the Pitch.
              </span>
            </h1>

            {/* High-Contrast Action Triggers */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-neutral-950 text-white h-12 px-6 rounded-xl hover:bg-neutral-800 transition-all font-bold text-xs uppercase tracking-wider group cursor-pointer shadow-sm"
              >
                Explore Shop
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%27m%20interested%20in%20ordering`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white border border-neutral-200 text-neutral-900 h-12 px-6 rounded-xl hover:bg-neutral-50 transition-all font-bold text-xs uppercase tracking-wider gap-2 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* --- ASYMMETRIC BENTO EDITORIAL GRID (Light Version) --- */}
          <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl items-center relative">
            {/* Column 1: Left Floating Media Elements */}
            <div className="flex flex-col gap-4 col-span-1 md:col-span-1">
              {/* FIXED SPINNING BADGE: Native SVG textPath layout */}
              <div className="relative group cursor-pointer w-24 h-24 rounded-full border border-neutral-200 bg-white shadow-xs flex items-center justify-center mx-auto mb-2">
                <svg
                  className="absolute inset-0 w-full h-full animate-[spin_15s_linear_infinite]"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="transparent"
                  />
                  <text className="text-[7.5px] font-black uppercase tracking-[0.18em] fill-neutral-400">
                    <textPath href="#circlePath" startOffset="0%">
                      • kwalitijerseys vault • steeze sports
                    </textPath>
                  </text>
                </svg>
                <div className="w-8 h-8 rounded-full bg-neutral-950 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <Play className="w-3 h-3 fill-white text-white translate-x-0.5" />
                </div>
              </div>

              {/* Square Close-Up Detail Card */}
              <div className="bg-white rounded-2xl overflow-hidden aspect-square border border-neutral-200/60 relative group shadow-xs">
                <Image
                  src="/hero_assets/hero_image1.avif"
                  className="w-full h-full object-cover contrast-105 group-hover:scale-105 transition-transform duration-500"
                  alt="Jersey Fabric Crest Detailing"
                  fill
                />
                <span className="absolute bottom-2 left-3 text-[9px] uppercase font-black tracking-wider text-neutral-900 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-neutral-100">
                  Player Version
                </span>
              </div>
            </div>

            {/* Column 2: Medium Vertical Cut */}
            <div className="col-span-1 md:col-span-1 flex flex-col justify-end h-full pt-8">
              <div className="bg-white rounded-2xl overflow-hidden h-60 md:h-75 border border-neutral-200/60 relative group shadow-xs">
                <Image
                  src="/hero_assets/brazil.webp"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Streetwear football fit look"
                  fill
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                    New Drop
                  </span>
                </div>
              </div>
            </div>

            {/* Column 3: Center Spotlight Card (The Anchor) */}
            <div className="col-span-2 md:col-span-1.5 self-center">
              <div className="bg-white rounded-3xl overflow-hidden h-85 md:h-105 border border-neutral-300/80 relative group shadow-xl shadow-neutral-200/50">
                <Image
                  src="/hero_assets/england.webp"
                  className="w-full h-full object-cover group-hover:scale-102 transition-all duration-700"
                  alt="Premium Classic Football Outfit"
                  fill
                />
                <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-black/10 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="font-black text-xl uppercase tracking-tighter text-white">
                    Retro Archives
                  </h3>
                  <p className="text-xs text-neutral-300">
                    Authentic premium materials sourced for the culture.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 4: Split Stack */}
            <div className="col-span-2 md:col-span-1 grid grid-cols-2 md:flex md:flex-col gap-4">
              <div className="bg-white rounded-2xl overflow-hidden h-40 md:h-47.5 border border-neutral-200/60 shadow-xs relative group">
                <Image
                  src="/hero_assets/liverpool_black.jpg"
                  className="w-full h-full object-cover group-hover:scale-102 transition-all duration-700"
                  alt="Classic match day gear texture"
                  fill
                />
              </div>
              <div className="bg-white rounded-2xl overflow-hidden h-40 md:h-47.5 border border-neutral-200/60 shadow-xs relative group">
                <Image
                  src="/hero_assets/manyoo_blue.webp"
                  className="w-full h-full object-cover group-hover:scale-102 transition-all duration-700"
                  alt="Stadium kit display"
                  fill
                />
              </div>
            </div>
          </div>

          {/* Column 5: Right Typographic Side-Note */}
          <div className="col-span-1 md:col-span-0.5 hidden md:flex flex-col justify-between h-full py-6 pl-2">
            <div className="space-y-2">
              <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase block">
                \// the trend
              </span>
              <p className="text-xs font-bold leading-snug text-neutral-700 uppercase">
                Designed for fans who demand more than a flat template.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-4 space-y-1">
              <p className="text-[10px] italic text-neutral-500 leading-normal">
                The player-cut detailing fits impeccably clean on or off the
                pitch.
              </p>
              <span className="text-[9px] font-bold text-neutral-400 block uppercase">
                — Verified Plug OGees
              </span>
            </div>
          </div>
        </div>

        {/* --- BOTTOM CONTEXT FOUL FOOTER --- */}
        <div className="w-full max-w-7xl mx-auto border-t border-neutral-200/70 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-5 h-px bg-neutral-300 inline-block" />
            <span className="text-neutral-500">
              Always premium detailing. Zero replica flaws.
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-neutral-400">
            <span>Scroll to discover drops</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* 2. Trust Signals: Sleek Border Grid */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50/60 transition-colors">
              <div className="shrink-0 bg-black text-white w-11 h-11 rounded-xl flex items-center justify-center shadow-xs">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-wide uppercase text-gray-900">
                  Premium Grade Specs
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">
                  Flawless embroidery and exact structural prints.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50/60 transition-colors">
              <div className="shrink-0 bg-black text-white w-11 h-11 rounded-xl flex items-center justify-center shadow-xs">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-wide uppercase text-gray-900">
                  National Dispatch
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">
                  Express delivery routes serving all states smoothly.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50/60 transition-colors">
              <div className="shrink-0 bg-black text-white w-11 h-11 rounded-xl flex items-center justify-center shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-wide uppercase text-gray-900">
                  Strict Quality Audit
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">
                  Every kit is thoroughly audited before dispatch packaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Best Sellers: High-End Product Catalog Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 md:mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">
                Curated Drops
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
                Most Wanted Kits
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-black transition-colors group"
            >
              View Full Vault
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <Suspense fallback={<BestSellersSkeleton />}>
            <BestSellers />
          </Suspense>

          <div className="mt-10 sm:hidden">
            <Link
              href="/shop"
              className="flex w-full items-center justify-center h-12 border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-700 hover:border-black hover:text-black transition-all"
            >
              View All Vaulted Jerseys
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Featured Leagues: Editorial Mosaic Grid */}
      <section className="py-16 md:py-24 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 md:mb-12">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">
              Filter Segments
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              Shop by Campaign
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {leagues.map((league) => (
              <Link
                key={league.name}
                href={`/shop?league=${league.filter}`}
                className="group relative aspect-4/5 rounded-2xl overflow-hidden border border-gray-200/40 shadow-2xs bg-gray-900"
              >
                <Image
                  src={league.image}
                  alt={league.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover opacity-85 group-hover:scale-102 group-hover:opacity-100 transition-all duration-500 ease-out"
                />
                {/* Clean gradient overlay matching premium design cues */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-center justify-between gap-2">
                  <h3 className="text-white text-sm sm:text-base font-black tracking-tight uppercase">
                    {league.name}
                  </h3>
                  <div className="w-7 h-7 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Block: Minimalist Conversion Sheet Layout */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-2xs">
            <ShoppingBag className="w-5 h-5 text-gray-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
            Missing a Kit in Your Setup?
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-lg mx-auto leading-relaxed font-medium">
            Lock in custom squad number printings instantly. We configure
            everything over a quick chat layout directly with our verification
            operators.
          </p>
          <div className="pt-4">
            <a
              href="https://wa.me/2348012345678?text=Hi!%20I%27m%20interested%20in%20ordering%20a%20jersey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#25D366] text-white h-14 px-8 rounded-xl hover:bg-[#20BA59] transition-all font-bold text-xs uppercase tracking-wider shadow-sm group"
            >
              <MessageCircle className="mr-2 w-4 h-4 fill-white" />
              Initialize WhatsApp Dispatch
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
