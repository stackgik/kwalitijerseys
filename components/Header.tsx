"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Shirt,
  ShoppingCart,
  Heart,
  User,
  Package,
  Settings,
  MapPin,
  Power,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useAuthModal } from "@/context/AuthModalContext";
import { useWishlist } from "@/context/WishlistContext";
// import { useAuthModal } from "@/components/AuthModalContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { wishlisted } = useWishlist();
  const { data } = authClient.useSession();
  const router = useRouter();
  const { setIsModalOpen } = useAuthModal();

  const pathname = usePathname();
  const { itemCount } = useCart();
  const user = data?.user
    ? {
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.image ?? null,
        id: data.user.id,
      }
    : null;

  const wishlistCount = wishlisted.size;

  // Navigation Links
  const textLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAvatarClick = () => {
    if (!data) {
      setIsModalOpen(true);
    } else {
      setUserDropdownOpen((prev) => !prev);
    }
  };

  const handleSignOut = async () => {
    setUserDropdownOpen(false);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/60 transition-shadow duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-md"
            >
              <Shirt className="w-5 h-5 text-black transition-transform duration-200 group-hover:scale-110" />
              <span className="text-lg font-black tracking-tight text-black uppercase">
                kwalitijerseys
              </span>
            </Link>

            {/* Navigation & Action Controls Hub */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
              {/* Desktop Text Links */}
              <nav className="hidden md:flex items-center gap-1 mr-2">
                {textLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
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

              {/* 1. Wishlist Icon Button */}
              <Link
                href="/wishlist"
                aria-label={`View wishlist (${wishlistCount} items)`}
                className={`relative p-2.5 rounded-xl border transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                  isActive("/wishlist")
                    ? "border-black bg-black text-white"
                    : "border-gray-200/80 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && data && (
                  <span className="absolute -top-1.5 -right-1.5 text-[10px] font-extrabold rounded-full w-4.5 h-4.5 flex items-center justify-center bg-black text-white border border-white shadow-2xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* 2. Cart Icon Button */}
              <Link
                href="/cart"
                aria-label={`View shopping cart with ${itemCount} items`}
                className={`relative p-2.5 rounded-xl border transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                  isActive("/cart")
                    ? "border-black bg-black text-white"
                    : "border-gray-200/80 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {itemCount > 0 && (
                  <span
                    className={`absolute -top-1.5 -right-1.5 text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-xs transition-colors border ${
                      isActive("/cart")
                        ? "bg-white text-black border-black"
                        : "bg-black text-white border-white"
                    }`}
                  >
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* 3. User Avatar / Auth Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={handleAvatarClick}
                  aria-label="User Account Menu"
                  aria-expanded={userDropdownOpen}
                  className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer ${
                    userDropdownOpen || isActive("/account")
                      ? "border-black bg-black text-white"
                      : "border-gray-200/80 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name || "User avatar"}
                      width={16}
                      height={16}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  {data && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        userDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Authenticated Dropdown Menu */}
                {userDropdownOpen && data && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* User Greeting & Header */}
                    <div className="p-3 bg-neutral-50 rounded-xl flex flex-col">
                      <span className="text-xs font-black text-neutral-900 uppercase tracking-tight">
                        {user?.name}
                      </span>
                      <span className="text-[11px] font-medium text-neutral-400 truncate">
                        {user?.email}
                      </span>
                    </div>

                    <div className="h-px bg-neutral-100 my-1" />

                    {/* Dropdown Options */}
                    <Link
                      href="/account/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-100 hover:text-black transition-colors"
                    >
                      <Package className="w-4 h-4 text-neutral-500" />
                      <span>Orders & Purchases</span>
                    </Link>

                    <Link
                      href="/wishlist"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-100 hover:text-black transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Heart className="w-4 h-4 text-neutral-500" />
                        <span>My Wishlist</span>
                      </div>
                      {wishlistCount > 0 && (
                        <span className="text-[10px] font-black bg-neutral-200 text-neutral-800 px-1.5 py-0.5 rounded-md">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>

                    <Link
                      href="/account/addresses"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-100 hover:text-black transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-neutral-500" />
                      <span>Saved Addresses</span>
                    </Link>

                    <Link
                      href="/account/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-100 hover:text-black transition-colors"
                    >
                      <Settings className="w-4 h-4 text-neutral-500" />
                      <span>Account Settings</span>
                    </Link>

                    <div className="h-px bg-neutral-100 my-1" />

                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer w-full text-left"
                    >
                      <Power className="w-4 h-4 text-red-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                className="md:hidden p-2.5 rounded-xl border border-gray-200/80 text-gray-700 bg-white hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ml-0.5"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <nav
        className={`fixed top-16 inset-x-0 z-40 bg-white border-b border-gray-100 shadow-xl md:hidden transition-all duration-200 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        aria-label="Mobile navigation"
      >
        <ul className="flex flex-col p-3 gap-1">
          {textLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
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
