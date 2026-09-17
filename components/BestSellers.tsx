import { getProducts } from "@/app/actions/products";
import ProductCard from "./ProductCard";

export async function BestSellers() {
  const productsRes = await getProducts();

  if (!productsRes.success) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-xs font-semibold text-gray-500">
        Unable to load top jerseys right now. Check back shortly.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-6">
      {productsRes.data.slice(0, 4).map((jersey) => (
        <ProductCard product={jersey} key={jersey.id} />
      ))}
    </div>
  );
}
