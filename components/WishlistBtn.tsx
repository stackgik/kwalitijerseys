"use client";

import { useAuthModal } from "@/context/AuthModalContext";
import { useWishlist } from "@/context/WishlistContext";
import { authClient } from "@/lib/auth-client";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const WishlistBtn = ({ productId }: { productId: string }) => {
  const { setIsModalOpen, setRedirectUrl } = useAuthModal();
  const { toggleWishlist, wishlisted, pendingId } = useWishlist();
  const { data: session } = authClient.useSession();
  const pathname = usePathname();

  const isLiked = wishlisted.has(productId);

  const handleWishlistClick = () => {
    if (session) {
      const wasLiked = isLiked;
      toggleWishlist(productId);
      toast.success(wasLiked ? "Removed from wishlist" : "Added to wishlist");
      return;
    }
    setRedirectUrl(`${pathname}?wishlist=${productId}`);
    setIsModalOpen(true);
  };

  return (
    <button
      onClick={handleWishlistClick}
      aria-label="Wishlist"
      disabled={pendingId === productId}
      className="group/wishlist absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs transition-all duration-200 ease-out active:scale-90 cursor-pointer z-20"
    >
      <Heart
        className={`w-4 h-4 transition-all duration-200 ease-out group-hover/wishlist:scale-115 ${
          isLiked
            ? "fill-black text-black"
            : "text-neutral-800 group-hover/wishlist:text-black"
        }`}
      />
    </button>
  );
};

export default WishlistBtn;
