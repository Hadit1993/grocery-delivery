import { CURRENCY_SYMBOLE } from "@/app/constants";
import { ProductCardProps } from "@/types";
import { Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: ProductCardProps) {
  const {
    _id,
    name,
    image,
    discount,
    rating,
    reviewCount,
    price,
    originalPrice,
  } = product;

  return (
    <Link
      href={`/products/${_id}`}
      className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition-all duration-300 group animate-fade-in"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={432}
          height={432}
          className=" w-full h-full object-cover p-4 group-hover:p-2 transition-all duration-300"
        />
        <div className=" absolute top-3 left-3 flex flex-wrap gap-1.5">
          {discount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-app-orange text-white rounded-full">
              {discount}% تخفیف
            </span>
          )}
        </div>
      </div>
      <div className="p-3.5 text-zinc-700">
        <h3 className="text-sm leading-snug mb-1.5 line-clamp-2">{name}</h3>
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="size-3 text-app-warning fill-app-warning" />
            <span className=" text-xs font-medium text-app-text">
              {product.rating}
            </span>
            <span className=" text-xs text-app-text-light">
              ({reviewCount})
            </span>
          </div>
        )}
        <div className=" flex items-center justify-between">
          <div className=" flex items-center gap-1 truncate">
            <span className="text-[14px] font-medium">{`${Number(price * 1000).toLocaleString("fa-IR")} ${CURRENCY_SYMBOLE}`}</span>
            <span className=" text-[9px] text-app-text-light block">
              {product.unit}/
            </span>
            {originalPrice > price && (
              <span className=" text-[9px] text-app-text-light line-through ml-1.5">{`${Number(originalPrice * 1000).toLocaleString("fa-IR")} ${CURRENCY_SYMBOLE}`}</span>
            )}
          </div>
          <button
            // onClick={(e) => {
            //   e.stopPropagation();
            // }}
            className="size-7 rounded-full bg-app-orange text-white flex-center shrink-0 hover:bg-app-orange-dark
          transition-colors active:scale-95"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      </div>
    </Link>
  );
}
