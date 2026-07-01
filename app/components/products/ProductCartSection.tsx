"use client";

import { useCart } from "@/app/contexts/CartContext";
import { Product } from "@/types";
import clsx from "clsx";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function ProductCartSection({ product }: { product: Product }) {
  const [localQuantity, setLocalQuantity] = useState(1);
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const cartItem = items.find((item) => item.product._id === product._id);
  const inCart = !!cartItem;
  const displayQunatity = inCart ? cartItem.quantity : localQuantity;

  const handleMinus = () => {
    if (inCart) {
      if (cartItem.quantity > 1)
        updateQuantity(product._id, cartItem.quantity - 1);
      else removeFromCart(product._id);
    } else {
      setLocalQuantity(Math.max(1, localQuantity - 1));
    }
  };

  const handlePlus = () => {
    if (inCart) updateQuantity(product._id, cartItem.quantity + 1);
    else setLocalQuantity(localQuantity + 1);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border border-app-border rounded-xl overflow-hidden">
        <button
          onClick={handlePlus}
          className="p-3 hover:bg-app-cream transition-colors"
        >
          <PlusIcon className="size-4" />
        </button>
        <span className="px-5 text-sm font-semibold min-w-10 text-center">
          {displayQunatity}
        </span>
        <button
          onClick={handleMinus}
          className="p-3 hover:bg-app-cream transition-colors"
        >
          <MinusIcon className="size-4" />
        </button>
      </div>
      <button
        disabled={product.stock === 0}
        onClick={() => {
          if (!inCart) {
            addToCart(product, localQuantity);
          }
        }}
        className={clsx(
          `flex-1 py-3 font-semibold rounded-xl transition-colors flex-center 
        gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]`,
          inCart
            ? "bg-app-cream text-app-green border border-app-green"
            : "bg-app-orange text-white hover:bg-app-orange-dark",
        )}
      >
        {inCart ? "به سبد خرید افزوده شده" : "افزودن به سبد خرید"}
      </button>
    </div>
  );
}
