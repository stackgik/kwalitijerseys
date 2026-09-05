"use server";

import { and, asc, eq, sql } from "drizzle-orm"; // 💡 Import 'sql'
import { db, pool } from "../db";
import { productImages, products, wishlistItems } from "../db/schema";
import { getSessionUserId } from "./auth";

const getProducts = async () => {
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

  return res;
};

const getFilteredJerseys = async (filters: JerseyFilters) => {
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
    // Get out the total rows, using a guard clause and remember it is always a string
    const total = rows.length > 0 ? Number(rows[0].total_count) : 0;

    // sanitize data to not include total count of rows
    const data = rows.map(({ total_count, ...rest }) => rest);

    return {
      success: true,
      data,
      pagination: {
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Database query failed:", error);
    return { success: false, error: "Failed to fetch jerseys" };
  }
};

const getProductDetails = async (productId: string) => {
  const response = await db.query.products.findFirst({
    where: and(eq(products.id, productId), eq(products.isActive, true)),
    with: {
      images: {
        orderBy: asc(productImages.order),
      },
    },
  });

  return response;
};

const addProductToWishlists = async (productId: string) => {
  const userId = await getSessionUserId();

  await db
    .insert(wishlistItems)
    .values({ userId, productId })
    .onConflictDoNothing();
};

const removeProductFromWishlists = async (productId: string) => {
  const userId = await getSessionUserId();

  await db
    .delete(wishlistItems)
    .where(
      and(
        eq(wishlistItems.userId, userId),
        eq(wishlistItems.productId, productId),
      ),
    );
};

const getWishlistIds = async (userId: string) => {
  const rows = await db
    .select({ productId: wishlistItems.productId })
    .from(wishlistItems)
    .where(eq(wishlistItems.userId, userId));

  return rows.map((row) => row.productId);
};

const getWishlistedProducts = async (userId: string) => {
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

  return rows;
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
