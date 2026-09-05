import Link from "next/link";
import {
  Shirt,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Heart,
  Truck,
  HelpCircle,
  Lock,
} from "lucide-react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const memberPerks = [
    // {
    //   icon: Package,
    //   title: "Real-time Order Tracking",
    //   description:
    //     "Track your jersey shipments live from dispatch to delivery.",
    // },
    {
      icon: Heart,
      title: "Saved Fits & Wishlists",
      description:
        "Keep your favorite home, away, and retro kits in one place.",
    },
    {
      icon: Sparkles,
      title: "Member-Only Drops",
      description:
        "Get early access to limited edition kits & vintage restocks.",
    },
    {
      icon: Truck,
      title: "Express Nationwide Shipping",
      description: "Fast doorstep delivery across Lagos, Abuja & nationwide.",
    },
  ];

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-neutral-50/60 font-sans text-neutral-900 antialiased flex flex-col selection:bg-neutral-950 selection:text-white">
      {/* Clean Light Header */}
      <header className="shrink-0 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          {/* Back to Shop Link */}
          <Link
            href="/shop"
            className="flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg p-1.5 -ml-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline uppercase tracking-wider">
              Back to Shop
            </span>
          </Link>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-md"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-neutral-950 text-white flex items-center justify-center transition-transform group-hover:scale-105">
              <Shirt className="w-4 h-4" />
            </div>
            <span className="text-base sm:text-lg font-black tracking-tight uppercase text-neutral-950">
              kwalitijerseys
            </span>
          </Link>

          {/* Help & Support */}
          <a
            href="https://wa.me/2340000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-black transition-colors p-1.5"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Need Help?</span>
          </a>
        </div>
      </header>

      <main className="flex-1 min-h-0 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Side: Editorial Showcase & Member Perks (Desktop Only) */}
        <section className="hidden lg:flex lg:col-span-6 xl:col-span-5 flex-col justify-between p-6 xl:p-8 border-r border-neutral-200/80 relative overflow-hidden bg-white">
          {/* Subtle Ambient Soft Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-neutral-200/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-4 xl:gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-widest w-fit">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Member Club</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl xl:text-3xl font-black text-neutral-950 uppercase tracking-tight leading-tight">
                Elevate Your <br /> Jersey Game.
              </h1>
              <p className="text-xs xl:text-sm font-medium text-neutral-600 leading-relaxed max-w-sm">
                Join over 15,000+ football lovers across Nigeria accessing
                authentic player-version & vintage kits.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-3 border-t border-neutral-100">
              {memberPerks.map((perk, index) => {
                const IconComponent = perk.icon;
                return (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-xl bg-neutral-100 border border-neutral-200/80 text-neutral-900 flex items-center justify-center shrink-0 group-hover:bg-neutral-950 group-hover:text-white transition-colors">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-black uppercase text-neutral-950 tracking-wide">
                        {perk.title}
                      </span>
                      <span className="text-[11px] font-medium text-neutral-500 leading-normal">
                        {perk.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-4 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-full bg-neutral-200 overflow-hidden shrink-0 border border-neutral-300 relative">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Member avatar"
                fill
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-xs">
              <div className="flex items-center gap-0.5 text-amber-500 text-[10px]">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className="font-semibold text-neutral-800 italic mt-0.5 text-[11px]">
                Fastest jersey delivery in Lagos. Quality is 100% top tier!
              </p>
              <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider mt-0.5">
                — Tunde E., Verified Buyer
              </span>
            </div>
          </div>
        </section>

        {/* Form Container Side */}
        <section className="lg:col-span-6 xl:col-span-7 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative bg-neutral-50/60 overflow-y-auto min-h-0">
          <div className="w-full max-w-md my-auto py-2">{children}</div>
        </section>
      </main>

      <footer className="shrink-0 border-t border-neutral-200/80 bg-white text-neutral-500 text-xs py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
            <div className="flex items-center gap-1.5 text-neutral-600">
              <Lock className="w-3.5 h-3.5 text-neutral-900" />
              <span>Encrypted Session</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Authentic Quality Guarantee</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-neutral-500 text-[10px] sm:text-[11px] font-medium">
            <Link
              href="/privacy"
              className="hover:text-neutral-950 transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              href="/terms"
              className="hover:text-neutral-950 transition-colors"
            >
              Terms of Service
            </Link>
            <span>•</span>
            <span>© {new Date().getFullYear()} Kwalitijerseys</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
