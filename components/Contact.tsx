"use client";

import { faqs } from "@/constant";
import { MessageCircle, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import AccordionItem from "./AccordionItem";
import { useState } from "react";

export function Contact() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const WHATSAPP_NUMBER = "2348130105893";
  const SUPPORT_EMAIL = "hello@kwalitijerseys.com";

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900 selection:bg-black selection:text-white antialiased">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-black py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(39,39,42,0.6),transparent)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300 border border-zinc-700/50 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Support Active
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Have questions about sizes, premium variants, or tracking your
            delivery? We are here to help.
          </p>
        </div>
      </section>

      {/* Primary Channels */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp Premium Card */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20have%20a%20question%20about%20your%20jerseys`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between bg-emerald-600 p-8 rounded-2xl shadow-xl shadow-emerald-900/10 hover:shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-1 text-white overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
              <div>
                <div className="inline-flex p-3 rounded-xl bg-white/10 mb-6 backdrop-blur-xs">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">
                  WhatsApp Instant Chat
                </h3>
                <p className="text-emerald-50/90 text-sm leading-relaxed mb-6">
                  Our primary avenue for instant ordering, order changes, custom
                  name specifications, and prompt sales resolution.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-mono text-emerald-200/80 mb-1">
                  Direct Support Line
                </p>
                <p className="font-semibold text-lg flex items-center gap-2">
                  +234 813 010 5893
                  <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="group relative flex flex-col justify-between bg-zinc-900 p-8 rounded-2xl shadow-xl shadow-zinc-950/10 hover:shadow-zinc-950/20 transition-all duration-300 hover:-translate-y-1 text-white"
            >
              <div>
                <div className="inline-flex p-3 rounded-xl bg-zinc-800 mb-6 border border-zinc-700/40">
                  <Mail className="w-6 h-6 text-zinc-300" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">
                  Email Desk
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Perfect for complex order adjustments, partnerships, business
                  operations, and bulk custom club team orders.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-mono text-zinc-500 mb-1">
                  Response Guarantee
                </p>
                <p className="font-semibold text-lg text-zinc-100 group-hover:text-white transition-colors">
                  {SUPPORT_EMAIL}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Info Split Matrix (Location & Timeline Operational Hours) */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Location Panel */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="p-2.5 w-fit rounded-lg bg-zinc-100 text-zinc-900 mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-zinc-950 mb-1">
                  National Fulfilment
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Dispatched rapidly nationwide across all 36 states via secure
                  freight.
                </p>
              </div>
              <p className="text-sm font-semibold text-zinc-900 mt-4 pt-4 border-t border-zinc-100">
                Lagos, Nigeria
              </p>
            </div>

            {/* Operational Metrics Panel */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs md:col-span-2">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-zinc-100">
                <div className="p-2.5 rounded-lg bg-zinc-100 text-zinc-900">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-950">
                    Operational Timelines
                  </h4>
                  <p className="text-xs text-zinc-500">
                    Live agents on standby during these hours
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Mon — Fri</span>
                  <span className="font-medium text-zinc-900">
                    9:00 AM — 8:00 PM
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Saturday</span>
                  <span className="font-medium text-zinc-900">
                    10:00 AM — 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Sunday</span>
                  <span className="font-medium text-zinc-900">
                    12:00 PM — 5:00 PM
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Email Queue</span>
                  <span className="font-medium text-emerald-600 font-mono">
                    Available 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-zinc-500">
              Everything you need to know about configurations and shipments
            </p>
          </div>

          <div className="space-y-2.5">
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

      {/* Inline Persistent Footer Call-To-Action */}
      <section className="py-16 bg-zinc-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Still Confused About Sizing?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto text-sm leading-relaxed">
            Drop us a line right now on WhatsApp. Our assistants will recommend
            the perfect fit based on your height and weight parameters.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20need%20help%20choosing%20the%20right%20jersey%20size`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-500 transition-colors font-medium text-sm gap-2 shadow-lg shadow-emerald-950/20"
          >
            <MessageCircle className="w-4 h-4" />
            Connect Instantly
          </a>
        </div>
      </section>
    </div>
  );
}
