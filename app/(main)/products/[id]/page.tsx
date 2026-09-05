import { getProductDetails, getProducts } from "@/app/actions/products";
import { ProductDetail } from "@/components/ProductDetails";
import ProductNotFound from "@/components/ProductNotFound";

// Next.js 15+ typed params as a Promise
interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const [productDetails, products] = await Promise.all([
    getProductDetails(id),
    getProducts(),
  ]);

  if (!productDetails || !products) {
    return <ProductNotFound />;
  }

  return (
    <ProductDetail
      productDetails={productDetails}
      products={products}
      currentProductId={id}
    />
  );
};

export default ProductDetailsPage;
