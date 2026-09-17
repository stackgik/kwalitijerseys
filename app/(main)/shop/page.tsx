import { Shop } from "@/components/Shop";
import { getFilteredJerseys, getWishlistIds } from "../../actions/products";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Result } from "@/lib/error";

type searchParamsProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const ShopPage = async ({ searchParams }: searchParamsProps) => {
  const params = await searchParams;
  const pendingWishlistId =
    typeof params.wishlist === "string" ? params.wishlist : null;

  // No session = logged-out visitor, a normal state — not an error, no try/catch needed
  const session = await auth.api.getSession({ headers: await headers() });

  const rawFilters = {
    team: typeof params.team === "string" ? params.team : undefined,
    league: typeof params.league === "string" ? params.league : undefined,
    minPrice: typeof params.minPrice === "string" ? params.minPrice : undefined,
    maxPrice: typeof params.maxPrice === "string" ? params.maxPrice : undefined,
    page: typeof params.page === "string" ? params.page : undefined,
  };

  const [jerseyResponse, wishlistResponse] = await Promise.all([
    getFilteredJerseys(rawFilters),
    session?.user
      ? getWishlistIds(session.user.id)
      : Promise.resolve({ success: true, data: [] } as Result<string[]>),
  ]);

  if (!jerseyResponse.success) {
    return <div className="p-8 text-center">{jerseyResponse.error}</div>;
  }

  const wishlistIds = wishlistResponse.success ? wishlistResponse.data : [];

  const products = jerseyResponse.data.data.map(
    ({ price_in_kobo, ...rest }) => ({
      ...rest,
      priceInKobo: price_in_kobo,
    }),
  );

  const pagination = jerseyResponse.data.pagination;

  return (
    <Shop
      products={products}
      pagination={pagination}
      wishlistIds={wishlistIds}
      pendingWishlistId={pendingWishlistId}
    />
  );
};

export default ShopPage;
