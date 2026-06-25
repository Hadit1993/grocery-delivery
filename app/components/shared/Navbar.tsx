import { BikeIcon } from "lucide-react";
import Link from "next/link";
import NavBarSearchForm from "./NavBarSearchForm";
import NavBarActions from "./NavBarActions";

export default function NavBar() {
  return (
    <nav className=" bg-white sticky top-0 z-50 border-b border-app-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
        <div className="w-full flex items-center justify-start gap-4 lg:gap-10">
          <NavBarActions />

          <NavBarSearchForm />
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
            <Link href="/">خانه</Link>
            <Link href="/products">محصولات</Link>
            <Link href="/deals" className=" text-app-orange">
              تخفیف‌ها
            </Link>
          </div>
        </div>
        <Link
          href="/"
          className=" flex items-center gap-2 text-[22px] font-medium shrink-0"
        >
          <BikeIcon size={24} /> تازه‌بار
        </Link>
      </div>
    </nav>
  );
}
