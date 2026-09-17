"use server";

import { and, asc, eq, sql } from "drizzle-orm"; // 💡 Import 'sql'
import { db, pool } from "../db";
import { productImages, products, wishlistItems } from "../db/schema";
import { getSessionUserId } from "./auth";
import { AppError, handleActionError, Result } from "@/lib/error";

const getProducts = async (): Promise<Result<IProduct[]>> => {
  try {
    const res = await db
      .select({
        id: products.id,
        name: products.name,
        league: products.league,
        season: products.season,
        priceInKobo: products.priceInKobo,
        stock: products.stock,
        type: products.type,
        createdAt: products.createdAt,
        images: sql<
          string[]
        >`array_agg(${productImages.url} ORDER BY ${productImages.order} ASC)`,
      })
      .from(products)
      .leftJoin(productImages, eq(products.id, productImages.productId))
      .where(eq(products.isActive, true))
      .groupBy(products.id);

    return { success: true, data: res };
  } catch (error) {
    return handleActionError(error, "getProducts");
  }
};

const getFilteredJerseys = async (
  filters: JerseyFilters,
): Promise<Result<{ data: IProduct[]; pagination: IPagination }>> => {
  const page = Math.max(1, Number(filters.page) || 1);
  const minPriceInKobo =
    filters.minPrice != null && !isNaN(Number(filters.minPrice))
      ? Number(filters.minPrice) * 100
      : undefined;

  const maxPriceInKobo =
    filters.maxPrice != null && !isNaN(Number(filters.maxPrice))
      ? Number(filters.maxPrice) * 100
      : undefined;

  const limit = 30;
  const offset = (page - 1) * limit;

  let queryText = `
    SELECT p.id, p.name, p.league, p.season, p.price_in_kobo, p.stock, p.type, p.created_at, ARRAY_AGG(pi.url ORDER BY pi.order ASC) FILTER(WHERE pi.url IS NOT NULL) AS images, COUNT(*) OVER() as total_count
    FROM products p 
    LEFT JOIN product_images pi ON p.id = pi.product_id 
    WHERE 1 = 1 
      AND p.is_active = TRUE
    `;

  const queryValues = [];

  if (filters.team) {
    queryValues.push(filters.team);
    queryText += ` AND p.team = $${queryValues.length}`;
  }

  if (filters.league) {
    queryValues.push(filters.league);
    queryText += ` AND p.league = $${queryValues.length}`;
  }

  if (minPriceInKobo) {
    queryValues.push(minPriceInKobo);
    queryText += ` AND p.price_in_kobo >= $${queryValues.length}`;
  }

  if (maxPriceInKobo) {
    queryValues.push(maxPriceInKobo);
    queryText += ` AND p.price_in_kobo <= $${queryValues.length}`;
  }

  queryValues.push(limit);
  const limitIndex = queryValues.length;
  queryValues.push(offset);
  const offsetIndex = queryValues.length;

  queryText += ` GROUP BY p.id ORDER BY created_at DESC LIMIT $${limitIndex} OFFSET $${offsetIndex}`;

  try {
    const { rows } = await pool.query(queryText, queryValues);
    const total = rows.length > 0 ? Number(rows[0].total_count) : 0;
    const data = rows.map(({ _total_count, ...rest }) => rest);

    return {
      success: true,
      data: {
        data,
        pagination: {
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  } catch (error) {
    return handleActionError(error, "getFilteredJerseys");
  }
};

const getProductDetails = async (
  productId: string,
): Promise<Result<IProductDetails>> => {
  try {
    if (!productId || typeof productId !== "string") {
      throw new AppError("VALIDATION_ERROR", "Invalid product id");
    }

    const res = await db.query.products.findFirst({
      where: and(eq(products.id, productId), eq(products.isActive, true)),
      with: { images: { orderBy: asc(productImages.order) } },
    });

    if (!res) {
      throw new AppError("NOT_FOUND", "Jersey not found");
    }

    return { success: true, data: res };
  } catch (error) {
    return handleActionError(error, "getProductDetails");
  }
};

const addProductToWishlists = async (
  productId: string,
): Promise<Result<void>> => {
  const sessionRes = await getSessionUserId();

  if (!sessionRes.success) return sessionRes;

  try {
    await db
      .insert(wishlistItems)
      .values({ userId: sessionRes.data, productId })
      .onConflictDoNothing();

    return { success: true, data: undefined };
  } catch (error) {
    return handleActionError(error, "addProductToWishlists");
  }
};

const removeProductFromWishlists = async (
  productId: string,
): Promise<Result<void>> => {
  const sessionRes = await getSessionUserId();

  if (!sessionRes.success) return sessionRes;

  try {
    await db
      .delete(wishlistItems)
      .where(
        and(
          eq(wishlistItems.userId, sessionRes.data),
          eq(wishlistItems.productId, productId),
        ),
      );
    return { success: true, data: undefined };
  } catch (error) {
    return handleActionError(error, "removeProductFromWishlists");
  }
};

const getWishlistIds = async (userId: string): Promise<Result<string[]>> => {
  try {
    const rows = await db
      .select({ productId: wishlistItems.productId })
      .from(wishlistItems)
      .where(eq(wishlistItems.userId, userId));

    return { success: true, data: rows.map((row) => row.productId) };
  } catch (error) {
    return handleActionError(error, "getWishlistIds");
  }
};

const getWishlistedProducts = async (
  userId: string,
): Promise<Result<IProduct[]>> => {
  try {
    const rows = await db
      .select({
        id: products.id,
        name: products.name,
        league: products.league,
        season: products.season,
        priceInKobo: products.priceInKobo,
        stock: products.stock,
        createdAt: products.createdAt,
        images: sql<
          string[]
        >`array_agg(${productImages.url} ORDER BY ${productImages.order} ASC)`,
      })
      .from(wishlistItems)
      .innerJoin(products, eq(wishlistItems.productId, products.id))
      .leftJoin(productImages, eq(products.id, productImages.productId))
      .where(eq(wishlistItems.userId, userId))
      .groupBy(products.id);

    return { success: true, data: rows };
  } catch (error) {
    return handleActionError(error, "getWishlistedProducts");
  }
};

export {
  getProducts,
  getWishlistIds,
  getProductDetails,
  getFilteredJerseys,
  addProductToWishlists,
  getWishlistedProducts,
  removeProductFromWishlists,
};
