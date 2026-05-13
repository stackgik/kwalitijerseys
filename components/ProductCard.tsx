import formatCurrency from "@/helper/formatCurrency";
import Image from "next/image";
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
    <Link
      href={`/products/${id}`}
      className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          // fill
        />
      </div>

      <div className="p-3 sm:p-4">
        <p className="text-xs text-gray-500 mb-1">{season}</p>
        <h3 className="font-semibold mb-4 text-sm sm:text-base line-clamp-2">
          {name}
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-lg sm:text-xl font-bold">
            {formatCurrency(price, "NGN")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
