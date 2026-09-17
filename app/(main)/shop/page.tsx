import { Shop } from "@/components/Shop";
import { getFilteredJerseys, getWishlistIds } from "../../actions/products";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { handleActionError } from "@/lib/error";

type searchParamsProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const ShopPage = async ({ searchParams }: searchParamsProps) => {
  const params = await searchParams;
  const pendingWishlistId =
    typeof params.wishlist === "string" ? params.wishlist : null;

  let session;

  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    return handleActionError(error, "getSession/ShopPage");
  }

  // Extract search params safely as strings for the server action
  const rawFilters = {
    team: typeof params.team === "string" ? params.team : undefined,
    league: typeof params.league === "string" ? params.league : undefined,
    minPrice: typeof params.minPrice === "string" ? params.minPrice : undefined,
    maxPrice: typeof params.maxPrice === "string" ? params.maxPrice : undefined,
    page: typeof params.page === "string" ? params.page : undefined,
  };

  // 2. Execute getFilteredJerseys with searchParams and getWishlistIds in parallel
  const [jerseyResponse, wishlistIds] = await Promise.all([
    getFilteredJerseys(rawFilters),
    session?.user ? getWishlistIds(session.user.id) : Promise.resolve([]),
  ]);

  if (!jerseyResponse.success || !jerseyResponse.data) {
    return (
      <div className="p-8 text-center">
        Failed to load jerseys. Please refresh.
      </div>
    );
  }

  const products = jerseyResponse.data.map(({ price_in_kobo, ...rest }) => ({
    ...rest,
    priceInKobo: price_in_kobo,
  }));

  const pagination = jerseyResponse.pagination ?? {
    limit: 30,
    total: 0,
    totalPages: 0,
  };

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
