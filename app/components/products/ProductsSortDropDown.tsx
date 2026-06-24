"use client";

import { useProductFilters } from "@/app/contexts/ProductFilterContext";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

export default function ProductSortDropDown({ sort }: { sort: string }) {
  const { setMobileFiltersOpen, updateFilters } = useProductFilters();

  return (
    <div className="flex flex-col lg:items-center gap-3">
      <button
        className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm bg-white
                 rounded-xl border border-app-border hover:bg-app-cream transition-colors"
        onClick={() => setMobileFiltersOpen(true)}
      >
        <SlidersHorizontal className="size-4" /> فیلترها
      </button>
      <div className="relative">
        <select
          value={sort}
          onChange={(e) => updateFilters({ sort: e.target.value })}
          className=" appearance-none pl-3 pr-8 py-2 text-sm bg-white rounded-xl border border-app-border
                   focus:border-app-green outline-none cursor-pointer"
        >
          <option value="">جدیدترین</option>
          <option value="price_asc">کم‌ترین قیمت</option>
          <option value="price_desc">بیشترین قیمت</option>
          <option value="rating">بیشترین امتیاز</option>
          <option value="name">الفبا</option>
        </select>
        <ChevronDown
          className=" absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-app-text-light
                   pointer-events-none"
        />
      </div>
    </div>
  );
}
