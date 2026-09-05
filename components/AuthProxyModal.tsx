"use client";

import { useAuthModal } from "@/context/AuthModalContext";
import { Heart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const AuthProxyModal = () => {
  const { isModalOpen, setIsModalOpen, redirectUrl } = useAuthModal();
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={() => setIsModalOpen(false)}
    >
      {/* Modal Dialog Frame */}
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl border border-neutral-100 flex flex-col transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="relative flex items-center justify-center px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2 text-sm sm:text-base font-black tracking-wider uppercase text-neutral-950">
            <Heart className="w-4 h-4 fill-black text-black" />
            <span>SAVE TO WISHLIST</span>
          </div>

          <button
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Editorial Split Lifestyle Banner */}
        <div className="relative w-full h-44 sm:h-52 bg-neutral-100 overflow-hidden flex">
          <div className="relative w-1/2 h-full border-r border-white/20">
            <Image
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
              alt="kwalitijerseys Sample Jersey"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-1/2 h-full">
            <Image
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
              alt="kwalitijerseys Sample Jersey"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Modal Copy & Action Buttons */}
        <div className="p-6 sm:p-8 flex flex-col items-center text-center gap-6">
          <p className="text-sm sm:text-base font-medium text-neutral-700 leading-relaxed max-w-md">
            Ever wish you could save all your fave fits & accessories in one
            place to come back to later? Almost like a ✨ wishlist ✨.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md pt-1">
            <Link
              href={`/register?callbackUrl=${encodeURIComponent(redirectUrl)}`}
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-[#0A0A0A] hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider text-center transition-all active:scale-[0.98] shadow-xs"
            >
              CREATE ACCOUNT
            </Link>

            <Link
              href={`/login?callbackUrl=${encodeURIComponent(redirectUrl)}`}
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-[#4A4A4A] hover:bg-[#383838] text-white font-extrabold text-xs uppercase tracking-wider text-center transition-all active:scale-[0.98] shadow-xs"
            >
              LOG IN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthProxyModal;
