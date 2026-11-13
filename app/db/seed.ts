import { sql } from "drizzle-orm";
import { productDetails } from "@/constant";
import { db, pool } from "../db";
import { productImages, products } from "../db/schema";

const seedProduct = async () => {
  // Guard: don't seed twice
  const [{ total }] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(products);

  if (total > 0) {
    console.log(`Products table already has ${total} rows. Skipping.`);
    return;
  }

  await db.transaction(async (tx) => {
    for (const { images, ...productField } of productDetails) {
      const [inserted] = await tx
        .insert(products)
        .values({
          name: productField.name,
          description: productField.description,
          team: productField.team,
          league: productField.league,
          season: productField.season,
          priceInKobo: productField.priceInKobo,
          stock: productField.stock,
          isActive: productField.isActive,
          type: productField.type,
        })
        .returning();

      if (inserted) {
        await tx.insert(productImages).values(
          images.map((url, index) => ({
            productId: inserted.id,
            url,
            order: index,
          })),
        );
      }
    }
  });

  console.log(`✅ Seeded ${productDetails.length} products`);
};

seedProduct()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
