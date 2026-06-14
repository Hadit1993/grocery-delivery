import { motion } from "framer-motion";
import { CURRENCY_SYMBOLE } from "@/app/constants";
import { useCart } from "@/app/contexts/CartContext";
import { CartItem } from "@/types";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";

export default function CartItemComponent({
  cartItem: {
    product: { _id, image, name, unit, price },
    quantity,
  },
}: {
  cartItem: CartItem;
}) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="overflow-hidden"
      layout
    >
      <div className="flex gap-3 bg-app-cream/60 rounded-xl p-3">
        <Image
          src={image}
          alt={name}
          width={432}
          height={432}
          className="size-16 rounded-lg object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold truncate">{name}</h4>
          <p className="text-xs text-app-text-light">
            {`${Number(price * 1000).toLocaleString("fa-IR")} ${CURRENCY_SYMBOLE}`}{" "}
            / {unit}
          </p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => updateQuantity(_id, quantity + 1)}
                className="size-7 rounded-lg bg-white border border-app-border flex-center"
              >
                <PlusIcon className="size-3" />
              </button>
              <span className="text-sm font-semibold w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(_id, quantity - 1)}
                className="size-7 rounded-lg bg-white border border-app-border flex-center"
              >
                <MinusIcon className="size-3" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {`${Number(price * quantity * 1000).toLocaleString("fa-IR")} ${CURRENCY_SYMBOLE}`}
              </span>
              <button
                onClick={() => removeFromCart(_id)}
                className="p-1 text-app-text-light hover:text-app-error transition-colors"
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
