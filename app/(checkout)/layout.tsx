import Link from "next/link";
import { Shirt, ShieldCheck, Lock, ArrowLeft, HelpCircle } from "lucide-react";

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-neutral-50/60 flex flex-col font-sans text-neutral-900 antialiased selection:bg-neutral-950 selection:text-white">
      {/* Distraction-Free Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Back to Cart Action */}
          <Link
            href="/cart"
            className="flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg p-1.5 -ml-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Return to Cart</span>
          </Link>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-md"
          >
            <div className="w-8 h-8 rounded-xl bg-neutral-950 text-white flex items-center justify-center transition-transform group-hover:scale-105">
              <Shirt className="w-4 h-4" />
            </div>
            <span className="text-base sm:text-lg font-black tracking-tight uppercase text-neutral-950">
              kwalitijerseys
            </span>
          </Link>

          {/* Security Indicator */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50/80 px-3 py-1.5 rounded-full border border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="hidden sm:inline">256-Bit SSL Encrypted</span>
            <span className="sm:hidden">Secure</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {children}
      </main>

      {/* Trust & Guarantee Footer */}
      <footer className="border-t border-neutral-200/80 bg-white text-neutral-500 text-xs py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            {/* Trust Micro-badges */}
            <div className="flex items-center gap-6 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-neutral-950" />
                <span>Encrypted Checkout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shirt className="w-3.5 h-3.5 text-neutral-950" />
                <span>100% Authentic Quality</span>
              </div>
            </div>

            {/* Legal & Assistance Links */}
            <div className="flex items-center gap-4 text-xs font-medium text-neutral-500">
              <a
                href="https://wa.me/2340000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-950 transition-colors flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Need help?</span>
              </a>
              <span>•</span>
              <Link
                href="/privacy"
                className="hover:text-neutral-950 transition-colors"
              >
                Privacy
              </Link>
              <span>•</span>
              <Link
                href="/terms"
                className="hover:text-neutral-950 transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutLayout;
