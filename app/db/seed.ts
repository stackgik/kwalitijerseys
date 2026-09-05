import { productDetails } from "@/constant";
import { db } from "../db";
import { productImages, products } from "../db/schema";

const seedProduct = async () => {
  try {
    // Run a transaction that stays alive until all insert is done.
    await db.transaction(async (tx) => {
      // Loop through the data array
      for (let i = 0; i < productDetails.length; i++) {
        const { images, ...productField } = productDetails[i];

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
          const imageRows = images.map((url, index) => ({
            productId: inserted.id,
            url,
            order: index,
          }));

          await tx.insert(productImages).values(imageRows);
        }
      }
    });
  } catch (err) {
    console.error("❌ Seeding loop failure:", err);
  }
};

seedProduct();
