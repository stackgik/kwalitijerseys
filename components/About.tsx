import { Shield, Truck, BadgeCheck, Heart, Star, MapPin } from "lucide-react";

export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-black via-gray-900 to-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">About KwalitiJersey</h1>
          <p className="text-lg text-gray-300">
            Nigeria's most trusted source for authentic and premium football
            jerseys
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We started KwalitiJersey with a simple mission: to make authentic
              football jerseys accessible to every Nigerian fan. Whether you
              support a local club or an international giant, we've got you
              covered.
            </p>
          </div>

          <div className="prose prose-lg mx-auto">
            <p className="text-gray-700">
              As football fans ourselves, we understand the importance of
              representing your team with pride. That's why we source only the
              highest quality jerseys—both original and premium
              replicas—ensuring you get the best value for your money.
            </p>
            <p className="text-gray-700">
              Since launching, we've served thousands of happy customers across
              Nigeria, from Lagos to Abuja, Port Harcourt to Kano. Our
              commitment to quality, authenticity, and customer satisfaction has
              made us a trusted name in the Nigerian football community.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Why Choose Us?</h2>
            <p className="text-gray-600">
              We're committed to providing the best experience for football fans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="bg-black text-white p-3 rounded-lg w-fit mb-4">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                100% Authentic Quality
              </h3>
              <p className="text-gray-600">
                We guarantee the authenticity of all our jerseys. Each item is
                carefully inspected before shipping to ensure you get exactly
                what you ordered.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="bg-black text-white p-3 rounded-lg w-fit mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                We deliver to all 36 states in Nigeria within 2-5 business days.
                Track your order every step of the way through WhatsApp.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="bg-black text-white p-3 rounded-lg w-fit mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">
                If you're not satisfied with your purchase, we offer hassle-free
                returns within 7 days. Your satisfaction is our priority.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="bg-black text-white p-3 rounded-lg w-fit mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Made for Fans</h3>
              <p className="text-gray-600">
                We're football fans just like you. We understand what you need
                and ensure every jersey meets the standards we'd want for
                ourselves.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="bg-black text-white p-3 rounded-lg w-fit mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Selection</h3>
              <p className="text-gray-600">
                From current season jerseys to retro classics, we stock a wide
                range of options from top clubs and national teams worldwide.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="bg-black text-white p-3 rounded-lg w-fit mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Nationwide Coverage
              </h3>
              <p className="text-gray-600">
                No matter where you are in Nigeria, we'll deliver to your
                doorstep. Reliable shipping partners across all states.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black text-white p-8 md:p-12 rounded-2xl">
            <h2 className="text-3xl md:text-4xl mb-4">Our Quality Promise</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-white">Every jersey we sell</strong>{" "}
                goes through a rigorous quality check process. We inspect:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span>Fabric quality and stitching</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span>Print and badge quality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span>Size accuracy and fit</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span>Color authenticity</span>
                </li>
              </ul>
              <p>
                We don't waybill anything we wouldn't be proud to wear
                ourselves. That's our promise to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Coverage */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Delivery Coverage</h2>
            <p className="text-gray-600">
              We deliver to all states across Nigeria
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Lagos</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Abuja</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Port Harcourt</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Kano</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Ibadan</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Benin City</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Kaduna</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Enugu</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">& All States</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Delivery Time:</strong> Same day for Lagos • 2-5 working
                days for other states
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Delivery Fee:</strong> Calculated based on your location
                (usually ₦1,500 - ₦5,000)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Returns Policy */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl mb-4">Returns & Exchange</h2>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-gray-700 mb-4">
              We want you to be completely satisfied with your purchase. If you
              receive a jersey that doesn't meet your expectations, we offer:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-black font-bold mr-2">•</span>
                <span>
                  <strong>2-day return window</strong> from the date of delivery
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-2">•</span>
                <span>
                  <strong>Free exchange</strong> if you receive the wrong size
                  or defective item
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-2">•</span>
                <span>
                  <strong>Full refund</strong> if the item doesn't match the
                  description
                </span>
              </li>
            </ul>
            <p className="text-sm text-gray-600 mt-6">
              Contact us on WhatsApp to initiate a return or exchange. Items
              must be unworn with original tags attached.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
