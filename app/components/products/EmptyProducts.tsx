"use client";

import { useProductFilters } from "@/app/contexts/ProductFilterContext";

export default function EmptyProducts() {
  const { deleteFilters } = useProductFilters();

  return (
    <div className=" text-center py-16">
      <p className="text-lg font-semibold text-app-green mb-2">
        هیچ محصولی یافت نشد
      </p>
      <p className="text-sm text-app-text-light mb-4">
        سعی کنید فیلترهای خود را تنطیم کنید
      </p>
      <button
        onClick={() => {
          deleteFilters();
        }}
        className="px-5 py-2 text-sm font-medium bg-app-green text-white rounded-xl 
                    hover:bg-app-green-light transition-colors"
      >
        حذف فیلتر‌ها
      </button>
    </div>
  );
}
