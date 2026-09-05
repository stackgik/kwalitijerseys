"use client";

import { MessageCircle, Mail, Shirt, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const WHATSAPP_NUMBER = "2348130105893";
  const SUPPORT_EMAIL = "hello@kwalitijerseys.com";
  const CURRENT_YEAR = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-zinc-900 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand Billboard */}
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 group w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-700 rounded-md"
            >
              <div className="p-1.5 bg-zinc-900 rounded-lg border border-zinc-800 transition-colors group-hover:border-zinc-700">
                <Shirt className="w-4 h-4 text-zinc-100 transition-transform duration-300 group-hover:rotate-6" />
              </div>
              <span className="text-lg font-bold tracking-tight text-zinc-100">
                kwalitijerseys
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Nigeria’s premium plug for authentic matchday kits, modern
              editions, and vintage retro classics. Curated quality, delivered
              nationwide.
            </p>
          </div>

          {/* Quick Hub Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {["Shop All Jerseys", "About Us", "Contact"].map((label) => {
                const href =
                  label === "Shop All Jerseys"
                    ? "/shop"
                    : `/${label.toLowerCase().replace(" ", "")}`;
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group text-zinc-400 hover:text-white text-sm transition-colors duration-200 inline-flex items-center"
                    >
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Collections Filter Routing */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-4">
              Popular Leagues
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Premier League", query: "Premier League" },
                { label: "La Liga", query: "La Liga" },
                { label: "National Teams", query: "National Teams" },
                { label: "Others", query: "Others" },
              ].map((item) => (
                <li key={item.query}>
                  <Link
                    href={`/shop?league=${item.query}`}
                    className="text-zinc-400 hover:text-white text-sm transition-colors duration-200 inline-flex items-center"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Instant Communications Desk */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-4">
              Get In Touch
            </h3>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%27m%20interested%20in%20your%20jerseys`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-zinc-400 hover:text-emerald-400 text-sm transition-colors duration-200 w-fit"
              >
                <MessageCircle className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                <span>WhatsApp Order Line</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="group flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors duration-200 w-fit"
              >
                <Mail className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                <span>{SUPPORT_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Closing Matrix Footer Details */}
        <div className="border-t border-zinc-900 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-zinc-500 text-xs">
            © {CURRENT_YEAR} kwalitijerseys. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono">
            <span className="h-1 w-1 bg-zinc-700 rounded-full" />
            Reliable Shipping Across All 36 Nigerian States
          </div>
        </div>
      </div>
    </footer>
  );
}
