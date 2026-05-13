"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shirt, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    {
      href: "/checkout",
      label: (
        <div>
          <ShoppingCart size={20} />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {itemCount}
            </span>
          )}
        </div>
      ),
    },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-md"
            >
              <Shirt className="w-5 h-5 text-black transition-transform duration-200 group-hover:scale-110" />
              <span className="text-lg font-bold tracking-tight text-black">
                steezesportswear
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                    isActive(href)
                      ? "text-black bg-gray-100"
                      : "text-gray-500 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {label}
                  {isActive(href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <nav
        className={`fixed top-16 inset-x-0 z-40 bg-white border-b border-gray-100 shadow-lg md:hidden transition-all duration-200 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        aria-label="Mobile navigation"
      >
        <ul className="flex flex-col p-3 gap-1">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-gray-100 text-black"
                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
