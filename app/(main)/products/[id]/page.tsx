import { getProductDetails, getProducts } from "@/app/actions/products";
import { ProductDetail } from "@/components/ProductDetails";
import ProductNotFound from "@/components/ProductNotFound";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  // This returns either an AppError object or data Object.
  const [productDetailsRes, productsRes] = await Promise.all([
    getProductDetails(id),
    getProducts(),
  ]);

  if (!productDetailsRes.success || !productsRes.success) {
    return <ProductNotFound />;
  }

  return (
    <ProductDetail
      productDetails={productDetailsRes.data}
      products={productsRes.data}
      currentProductId={id}
    />
  );
};

export default ProductDetailsPage;
