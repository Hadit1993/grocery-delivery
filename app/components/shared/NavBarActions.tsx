"use client";

import { useCart } from "@/app/contexts/CartContext";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  LogOutIcon,
  MapPinIcon,
  MenuIcon,
  PackageIcon,
  ShieldIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBarActions() {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();
  const { cartCount, setCartOpen } = useCart();
  const user = { name: "Hadi", email: "hadi@example.com", isAdmin: true };

  const handleLogOut = () => {
    setUserMenuOpen(false);
    router.replace("/");
  };

  return (
    <div className="flex items-center gap-3">
      <button
        className=" relative p-2 rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
          setCartOpen(true);
        }}
      >
        <ShoppingCartIcon className=" size-5 text-zinc-900" />
        {cartCount > 0 && (
          <span
            className=" absolute -top-1 -right-1 size-4 bg-app-orange 
                text-white text-[10px] rounded-full flex-center"
          >
            {cartCount}
          </span>
        )}
      </button>
      <div className="relative">
        {user ? (
          <button
            onClick={() => setUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-2"
          >
            <div className=" size-7 rounded-full bg-green-950 text-white flex-center">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <ChevronDownIcon className=" size-3 text-zinc-500" />
          </button>
        ) : (
          <div className="flex-center gap-2">
            <Link
              href="/login"
              className=" hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-950
              rounded-full hover:bg-green-950-light transition-colors"
            >
              <UserIcon size={16} /> ورود
            </Link>
            {isUserMenuOpen ? (
              <XIcon
                className="md:hidden"
                onClick={() => setUserMenuOpen(!isUserMenuOpen)}
              />
            ) : (
              <MenuIcon
                className=" md:hidden"
                onClick={() => setUserMenuOpen(!isUserMenuOpen)}
              />
            )}
          </div>
        )}
        {isUserMenuOpen && (
          <>
            <div
              className=" fixed inset-0 z-40"
              onClick={() => setUserMenuOpen(false)}
            />
            <div
              className=" absolute right-0 mt-2.5 w-56 bg-white rounded-xl 
              shadow-lg border border-app-border py-2 z-50 animate-fade-in"
            >
              {user && (
                <div className="px-4 py-2 border-b border-app-border">
                  <p className="text-sm font-medium text-zinc-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-zinc-500">{user?.email}</p>
                </div>
              )}

              <div onClick={() => setUserMenuOpen(false)}>
                {!user && (
                  <Link href="/login" className="dropdown-link">
                    <UserIcon size={16} />
                    ورود
                  </Link>
                )}
                {user && (
                  <Link href="/orders" className="dropdown-link">
                    <PackageIcon size={16} />
                    سفارش‌های من
                  </Link>
                )}
                {user && (
                  <Link href="/addresses" className="dropdown-link">
                    <MapPinIcon size={16} />
                    آدرس‌ها
                  </Link>
                )}
                <Link href="/products" className="dropdown-link md:hidden">
                  <ArrowUpRightIcon size={16} />
                  محصولات
                </Link>
                <Link href="/deals" className="dropdown-link md:hidden">
                  <ArrowUpRightIcon size={16} />
                  حراجی‌ها
                </Link>
                {user?.isAdmin && (
                  <Link href="/admin/products" className="dropdown-link">
                    <ShieldIcon className=" text-app-orange-dark" size={16} />
                    <span className=" text-app-orange-dark">پنل ادمین</span>
                  </Link>
                )}
                {user && (
                  <div className="border-t border-app-border pt-1">
                    <button
                      onClick={handleLogOut}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-error hover:bg-red-50 w-full transition-colors"
                    >
                      <LogOutIcon size={16} /> خروج
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
