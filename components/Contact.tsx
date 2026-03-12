"use client";

import { faqs } from "@/constant";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import AccordionItem from "./AccordionItem";
import { useState } from "react";

export function Contact() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-black via-gray-900 to-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-300">
            We're here to help with any questions about our jerseys
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp */}
            <a
              href="https://wa.me/2348012345678?text=Hi!%20I%20have%20a%20question%20about%20your%20jerseys"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-linear-to-br from-[#25D366] to-[#20BA59] text-white p-8 rounded-2xl hover:shadow-xl transition-all hover:scale-105"
            >
              <MessageCircle className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">WhatsApp</h3>
              <p className="text-white/90 mb-4">
                Our primary channel for orders and inquiries. Get instant
                responses during business hours.
              </p>
              <p className="font-medium">+234 813 010 5893</p>
              <p className="text-sm text-white/80 mt-2">
                Tap to chat with us →
              </p>
            </a>

            {/* Email */}
            <a
              href="mailto:hello@jerseyhub.com"
              className="group bg-gray-900 text-white p-8 rounded-2xl hover:shadow-xl transition-all hover:scale-105"
            >
              <Mail className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Email</h3>
              <p className="text-gray-300 mb-4">
                For detailed inquiries, partnership opportunities, or bulk
                orders.
              </p>
              <p className="font-medium">hello@kwalitijersey.com</p>
              <p className="text-sm text-gray-400 mt-2">
                We reply within 24 hours
              </p>
            </a>

            {/* Location */}
            <div className="bg-gray-50 p-8 rounded-2xl border-2 border-gray-200">
              <MapPin className="w-12 h-12 mb-4 text-black" />
              <h3 className="text-2xl font-semibold mb-2 text-black">
                Location
              </h3>
              <p className="text-gray-600 mb-4">
                We deliver nationwide across Nigeria from our base in Lagos.
              </p>
              <p className="font-medium text-black">Lagos, Nigeria</p>
              <p className="text-sm text-gray-500 mt-2">
                Delivery to all 36 states
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <div className="flex items-start space-x-4 mb-6">
              <Clock className="w-8 h-8 text-black shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-2">Business Hours</h2>
                <p className="text-gray-600">
                  When you can reach us for support and orders
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">WhatsApp Support</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">12:00 PM - 5:00 PM</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Email Support</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available</span>
                    <span className="font-medium">7 Days a week</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> For urgent orders or immediate support,
                WhatsApp is your best option. We respond faster on WhatsApp
                during business hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
              Support
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500">Quick answers to common questions</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                index={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Chat with us on WhatsApp for instant support
          </p>
          <a
            href="https://wa.me/2348012345678?text=Hi!%20I%20have%20a%20question"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#25D366] text-white px-8 py-4 rounded-xl hover:bg-[#20BA59] transition-colors font-medium text-lg gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
