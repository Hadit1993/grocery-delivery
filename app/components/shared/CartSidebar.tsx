"use client";

import { CURRENCY_SYMBOLE } from "@/app/constants";
import { useCart } from "@/app/contexts/CartContext";
import clsx from "clsx";
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    cartTotal,
    isCartOpen,
    setCartOpen,
  } = useCart();
  const router = useRouter();
  const deliveryFee = cartTotal * 1000 > 500000 ? 0 : 50000;
  const grandTotal = cartTotal * 1000 + deliveryFee;

  // if (!isCartOpen) return null;

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        className={clsx(
          "fixed inset-0 bg-black/40 z-50 transition-opacity",
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />
      <aside
        className={clsx(
          "fixed left-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300",
          isCartOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-app-border">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="size-5" />
            <h2 className="text-lg font-medium">سبد خرید</h2>
            <span className="px-2 py-0.5 text-xs font-semibold bg-app-cream rounded-full">
              {items.length} محصول
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 rounded-xl hover:bg-app-cream transition-colors"
          >
            <XIcon className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col flex-center h-full text-center">
              <ShoppingBagIcon className="size-16 text-app-border mb-4" />
              <h3 className="text-lg font-medium mb-1">
                سبد خرید شما خالی است
              </h3>
            </div>
          ) : (
            items.map(
              ({ product: { _id, image, name, unit, price }, quantity }) => (
                <div
                  key={_id}
                  className="flex gap-3 bg-app-cream/60 rounded-xl p-3"
                >
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
                          onClick={() => updateQuantity(_id, quantity - 1)}
                          className="size-7 rounded-lg bg-white border border-app-border flex-center"
                        >
                          <MinusIcon className="size-3" />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(_id, quantity + 1)}
                          className="size-7 rounded-lg bg-white border border-app-border flex-center"
                        >
                          <PlusIcon className="size-3" />
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
              ),
            )
          )}
        </div>
        {items.length > 0 && (
          <div className="p-5 border-t border-app-border space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-app-text-light">مبلغ کل</span>
              <span className="font-medium">
                {" "}
                {`${Number(cartTotal * 1000).toLocaleString("fa-IR")} ${CURRENCY_SYMBOLE}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-app-text-light">هزینه ارسال</span>
              <span className="font-medium">
                {deliveryFee === 0 ? (
                  <span className="text-app-success">رایگان</span>
                ) : (
                  `${Number(deliveryFee).toLocaleString("fa-IR")} ${CURRENCY_SYMBOLE}`
                )}
              </span>
            </div>
            {deliveryFee > 0 && (
              <p className="text-xs text-app-text-light text-center">
                ارسال رایگان برای سفارش‌ّهای بالای ۵۰۰‌هزار تومان
              </p>
            )}
            <div className="flex justify-between text-base font-semibold border-t border-app-border p-3">
              <span>مبلغ نهایی</span>
              <span>{`${Number(grandTotal).toLocaleString("fa-IR")} ${CURRENCY_SYMBOLE}`}</span>
            </div>
            <button
              onClick={() => {
                setCartOpen(false);
                router.push("/checkout");
              }}
              className="w-full py-3 bg-app-orange text-white font-semibold rounded-xl hover:bg-app-orange-dark
             transition-colors flex-center gap-2 active:scale-98"
            >
              تکمیل سفارش <ArrowRightIcon className="size-4" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
