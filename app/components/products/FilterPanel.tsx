"use client";

import { useProductFilters } from "@/app/contexts/ProductFilterContext";
import { Category } from "@/types";
import clsx from "clsx";
import { produce } from "immer";
import { ChangeEventHandler, useState } from "react";

export default function FilterPanel({
  categories,
  hasFilter,
}: {
  categories: Category[];
  hasFilter: boolean;
}) {
  const { searchParams, updateFilters, deleteFilters } = useProductFilters();
  const [priceRange, setPriceRange] = useState<Record<string, string>>({
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
  });

  const allCategories: Category[] = [
    {
      slug: "",
      name: "همه دسته‌بندی‌ها",
    },
    ...categories,
  ];

  const onPriceRangeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    if (Number(value) >= 0) {
      setPriceRange(
        produce((prev) => {
          prev[name] = value;
        }),
      );
    }
  };

  return (
    <div className=" space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-app-green mb-3">
          دسته‌بندی‌ها
        </h3>
        <div className=" space-y-1.5">
          {allCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilters({ category: cat.slug })}
              className={clsx(
                "block w-full text-right px-3 py-2 text-sm rounded-md transition-all",
                searchParams.get("category") === cat.slug
                  ? "bg-app-green text-white"
                  : "text-app-text-light hover:bg-app-cream",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-app-green mb-3">
          محدوده قیمت
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            name="minPrice"
            placeholder="کمینه"
            value={priceRange.minPrice}
            onChange={onPriceRangeChange}
            className="w-full px-3 py-2 text-sm bg-white rounded-lg border not-focus:border-app-border"
          />
          <span className="text-app-text-light">-</span>
          <input
            type="number"
            name="maxPrice"
            placeholder="بیشینه"
            value={priceRange.maxPrice}
            onChange={onPriceRangeChange}
            className="w-full px-3 py-2 text-sm bg-white rounded-lg border not-focus:border-app-border"
          />
        </div>
        <button
          onClick={() => {
            updateFilters(priceRange);
          }}
          className="w-full py-2 text-sm text-white bg-app-green hover:bg-app-green-light rounded-lg transition-colors font-medium mt-5"
        >
          اعمال محدوده قیمت
        </button>
      </div>
      {hasFilter && (
        <button
          onClick={deleteFilters}
          className="w-full py-2 text-sm text-app-error hover:bg-red-50 rounded-lg transition-colors font-medium"
        >
          حذف تمام فیلترها
        </button>
      )}
    </div>
  );
}
