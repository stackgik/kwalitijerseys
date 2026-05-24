import { bestSellers, leagues } from "@/constant";
import { Shield, Truck, BadgeCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-black via-gray-900 to-black text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Premium Football Jerseys Delivered to Your Door
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Original & high-quality replica jerseys from top clubs and
              national teams. Fast delivery across Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/2348012345678?text=Hi!%20I%27m%20interested%20in%20ordering%20a%20jersey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#25D366] text-white px-8 py-4 rounded-lg hover:bg-[#20BA59] transition-colors font-medium"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="shrink-0 bg-black text-white p-3 rounded-lg">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">100% Authentic</h3>
                <p className="text-sm text-gray-600">
                  Original and premium quality replicas
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="shrink-0 bg-black text-white p-3 rounded-lg">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Fast Delivery</h3>
                <p className="text-sm text-gray-600">
                  2-5 days delivery across Nigeria
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="shrink-0 bg-black text-white p-3 rounded-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Quality Guarantee</h3>
                <p className="text-sm text-gray-600">
                  Every item checked before shipping
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl mb-2">Best Sellers</h2>
              <p className="text-gray-600">Most popular jerseys this season</p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center text-sm hover:underline"
            >
              View All
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((jersey) => (
              <Link
                key={jersey.id}
                href={`/products/${jersey.id}`}
                className="group bg-white rounded-lg overflow-hidden border border-gray-200"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  <Image
                    src={jersey.image}
                    alt={jersey.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{jersey.season}</p>
                  <h3 className="font-semibold mb-1 line-clamp-1">
                    {jersey.name}
                  </h3>
                  <p className="text-lg font-bold">{jersey.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:hidden text-center">
            <Link
              href="/shop"
              className="inline-flex items-center text-sm font-medium hover:underline"
            >
              View All Jerseys
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Leagues */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl mb-2">Shop by League</h2>
            <p className="text-gray-600">
              Find your favorite team&apos;s jersey
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {leagues.map((league) => (
              <Link
                key={league.name}
                href={`/shop?league=${league.filter}`}
                className="group relative aspect-3/4 rounded-lg overflow-hidden"
              >
                <Image
                  src={league.image}
                  alt={league.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fill
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-semibold">
                    {league.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Ready to Order?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Chat with us on WhatsApp to place your order. Fast, easy, and
            secure.
          </p>
          <a
            href="https://wa.me/2348012345678?text=Hi!%20I%27m%20interested%20in%20ordering%20a%20jersey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#25D366] text-white px-8 py-4 rounded-lg hover:bg-[#20BA59] transition-colors font-medium text-lg"
          >
            Order on WhatsApp
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
