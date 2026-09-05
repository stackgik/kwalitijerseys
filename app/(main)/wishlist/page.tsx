import { getSessionUserId } from "@/app/actions/auth";
import { getWishlistedProducts } from "@/app/actions/products";
import Wishlist from "@/components/Wishlist";

const WishlistPage = async () => {
  const userId = await getSessionUserId();
  const wishlistedProducts = await getWishlistedProducts(userId);

  return <Wishlist products={wishlistedProducts} />;
};

export default WishlistPage;
