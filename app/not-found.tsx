import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | Kwalitijerseys",
  description: "The page you are looking for does not exist.",
};

const NotFound = () => {
  return (
    <main className="min-h-screen bg-white text-neutral-950 px-4 py-24 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
      {/* Editorial Vector Background Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none">
          <path
            d="M-100,600 C400,450 300,100 800,300 C1300,500 1100,50 1600,200"
            stroke="#171717"
            strokeWidth="0.75"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-md w-full text-center space-y-10 relative z-10">
        {/* Dynamic Typography Header */}
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-500">
            Error Code 404
          </p>
          <h1 className="text-6xl sm:text-7xl font-black uppercase tracking-tight leading-none">
            Lost In <br /> Transit.
          </h1>
          <p className="text-sm text-neutral-500 max-w-xs mx-auto font-medium leading-relaxed">
            The pitch details or page directory you are looking for does not
            exist or has been permanently shifted.
          </p>
        </div>

        <hr className="border-neutral-100 max-w-xs mx-auto" />

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-xs mx-auto">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-neutral-950 hover:bg-neutral-900 text-white h-12 px-6 rounded-full font-bold text-xs uppercase tracking-wider gap-2 transition-all w-full shadow-xs group"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Go To Shop</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-950 h-12 px-6 rounded-full font-bold text-xs uppercase tracking-wider gap-2 transition-all w-full shadow-xs group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neutral-400 group-hover:-translate-x-1 transition-transform" />
            <span>Home</span>
          </Link>
        </div>

        {/* Minimal Bottom Brand Footer */}
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 pt-8">
          ✦ Steeze Sports International ✦
        </p>
      </div>
    </main>
  );
};

export default NotFound;
