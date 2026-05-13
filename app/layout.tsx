import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "JerseyHub - Premium Football Jerseys in Nigeria",
  description:
    "Shop authentic and high-quality football jerseys from top clubs worldwide. Fast delivery across Nigeria. Original and replica jerseys available.",
  keywords: [
    "football jerseys Nigeria",
    "authentic jerseys",
    "replica jerseys",
    "football kits",
    "sports apparel",
  ],
  openGraph: {
    title: "JerseyHub - Premium Football Jerseys",
    description: "Nigeria's trusted source for authentic football jerseys",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-y-scroll">
      <body className={`${nunito.className} font-sans antialiased`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
