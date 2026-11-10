import { getSessionUserId } from "@/app/actions/auth";
import { getWishlistedProducts } from "@/app/actions/products";
import Wishlist from "@/components/Wishlist";
import { redirect } from "next/navigation";

const WishlistPage = async () => {
  const user = await getSessionUserId();
  if (!user.success) redirect("/login");

  const result = await getWishlistedProducts(user.data);
  if (!result.success) {
    return <p>Couldn&apos;t load your wishlist. Please try again.</p>;
  }

  return <Wishlist products={result.data} />;
};

export default WishlistPage;
