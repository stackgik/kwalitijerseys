import Link from "next/link";

const ProductNotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm text-center flex flex-col items-center">
        {/* Clean 404 Visual Element */}
        <div className="mb-8 flex items-center justify-center select-none tracking-tighter">
          <span className="text-[5rem] font-black leading-none text-neutral-900">
            4
          </span>
          {/* A clean geometric replacement for the '0' */}
          <div className="mx-1 h-12 w-12 rounded-full border-[5px] border-neutral-900 border-t-neutral-200 animate-spin animation-duration:4s" />
          <span className="text-[5rem] font-black leading-none text-neutral-900">
            4
          </span>
        </div>

        {/* Your Copy Layout */}
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-neutral-400 mb-2">
          Kit not found
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-3">
          This kit isn&apos;t available
        </h2>

        <p className="text-sm text-neutral-500 leading-relaxed mb-8 max-w-xs mx-auto">
          It may have sold out, been removed, or the link might be wrong. Browse
          the shop to find what you&apos;re looking for.
        </p>

        {/* Premium Action Button */}
        <Link
          href="/shop"
          className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-neutral-800 hover:shadow active:scale-[0.98]"
        >
          Explore the Shop
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProductNotFound;
