import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import Script from "next/script";
import AuthModalProvider from "@/context/AuthModalContext";
import AuthProxyModal from "@/components/AuthProxyModal";
import { WishlistProvider } from "@/context/WishlistContext";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getWishlistIds } from "./actions/products";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "kwalitijerseys — Premium Pitch Wear & Football Kits Nigeria",
  description:
    "Source premium-grade player editions, authentic replicas, and historically precise vintage kits. Express track delivery serving all states across Nigeria.",
  keywords: [
    "football jerseys Nigeria",
    "premium kit replicas",
    "player edition jersey Lagos",
    "retro football kits",
    "steeze sportswear",
  ],
  openGraph: {
    title: "kwalitijerseys — Premium Football Kits",
    description: "Nigeria's premier collective for high-end football garments.",
    type: "website",
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const wishlistIds = session?.user
    ? await getWishlistIds(session.user.id)
    : [];

  return (
    <html lang="en" className="overflow-y-scroll scroll-smooth overscroll-none">
      <body
        className={`${nunito.className} font-sans antialiased bg-white text-black min-h-screen flex flex-col selection:bg-black selection:text-white overscroll-none`}
      >
        <AuthModalProvider>
          <CartProvider>
            <WishlistProvider initialWishlistIds={wishlistIds}>
              <main className="flex-1 grow">{children}</main>
              <Toaster position="top-center" />
              <AuthProxyModal />
            </WishlistProvider>
          </CartProvider>
        </AuthModalProvider>
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
};

export default RootLayout;
