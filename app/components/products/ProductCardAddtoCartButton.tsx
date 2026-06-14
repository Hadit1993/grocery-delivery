"use client";

import { useCart } from "@/app/contexts/CartContext";
import { Product } from "@/types";
import { Plus } from "lucide-react";

export default function ProductCardAddtoCartButton({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
      }}
      className="size-7 rounded-full bg-app-orange text-white flex-center shrink-0 hover:bg-app-orange-dark
          transition-colors active:scale-95"
    >
      <Plus className="size-3.5" />
    </button>
  );
}
