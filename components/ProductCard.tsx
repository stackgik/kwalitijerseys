import formatCurrency from "@/helper/formatCurrency";
import Link from "next/link";
import { toast } from "sonner";

type ProductProps = {
  id: number;
  name: string;
  team: string;
  league: string;
  season: string;
  price: number;
  image: string;
};

const ProductCard = ({ product }: { product: ProductProps }) => {
  const { id, image, name, season, price } = product || {};

  const addItem = (product: ProductProps) => {
    const message = `${name} jersey has been added to the cart`;
    const formattedMessage =
      message.charAt(0).toUpperCase() + message.slice(1).toLowerCase();
    toast.success(formattedMessage, {
      position: "top-right",
    });
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <Link href={`/products/${id}`} className="block">
        <div className="aspect-square bg-gray-100 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-3 sm:p-4">
        <p className="text-xs text-gray-500 mb-1">{season}</p>
        <h3 className="font-semibold mb-4 text-sm sm:text-base line-clamp-2">
          {name}
        </h3>
        {/* <p className="text-xs text-gray-600 mb-2">{league}</p> */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-lg sm:text-xl font-bold">
            {formatCurrency(price, "NGN")}
          </p>
          <button
            onClick={() => addItem(product)}
            className="flex items-center justify-center gap-1.5 bg-black text-white px-4 py-1.5 text-xs sm:text-sm rounded-full hover:bg-gray-800 transition-colors w-full sm:w-auto cursor-pointer"
          >
            <span className="sm:inline">Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
