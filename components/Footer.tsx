"use client";

import { MessageCircle, Mail, Shirt } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-md mb-4"
            >
              <Shirt className="w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:scale-110" />
              <span className="text-lg font-bold tracking-tight text-gray-100">
                kwalitijerseys
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Nigeria&apos;s trusted source for authentic football jerseys.
              Quality guaranteed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Shop All Jerseys
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold mb-4">Popular Leagues</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop?league=EPL"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Premier League
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?league=La+Liga"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  La Liga
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?league=National"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  National Teams
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?league=Retro"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Retro Classics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/2348012345678?text=Hi!%20I%27m%20interested%20in%20your%20jerseys"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:kwalitijerseys@gmail.com"
                className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>hello@kwalitijerseys.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} kwalitijerseys. All rights reserved. |
            Delivery across Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
