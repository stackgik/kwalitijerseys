import { X } from "lucide-react";

// Reusable Shadcn-style Sheet component
type SheetProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

// Come Back to this...
const SideSheet = ({ isOpen, onClose, title, children }: SheetProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-visibility duration-300 ${isOpen ? "visible" : "invisible"}`}
    >
      {/* Backdrop Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      {/* Sliding Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-full sm:max-w-md bg-white p-6 shadow-2xl flex flex-col gap-6 transform transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1) ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pr-1">{children}</div>
      </div>
    </div>
  );
};

export default SideSheet;
