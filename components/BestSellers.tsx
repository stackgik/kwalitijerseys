import { getProducts } from "@/app/actions/products";
import ProductCard from "./ProductCard";

export async function BestSellers() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-6">
      {products.slice(0, 4).map((jersey) => (
        <ProductCard product={jersey} key={jersey.id} />
      ))}
    </div>
  );
}
