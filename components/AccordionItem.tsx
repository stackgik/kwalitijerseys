"use client";

import { Minus, Plus } from "lucide-react";

const AccordionItem = ({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      className={`group border rounded-xl overflow-hidden transition-all duration-200 ${
        isOpen
          ? "border-black shadow-sm"
          : "border-gray-200 hover:border-gray-400"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-400 shrink-0 w-5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-semibold text-gray-900 text-sm sm:text-base">
            {question}
          </span>
        </div>
        <span
          className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-200 ${
            isOpen
              ? "bg-black border-black text-white rotate-0"
              : "bg-white border-gray-300 text-gray-500 group-hover:border-black group-hover:text-black"
          }`}
        >
          {isOpen ? (
            <Minus className="w-3.5 h-3.5" />
          ) : (
            <Plus className="w-3.5 h-3.5" />
          )}
        </span>
      </button>

      {/* Animated answer panel */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 ml-9">
            <div className="w-full h-px bg-gray-100 mb-4" />
            <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
