"use client";

import { useProductFilters } from "@/app/contexts/ProductFilterContext";
import { XIcon } from "lucide-react";
import FilterPanel from "./FilterPanel";
import { Category } from "@/types";
import clsx from "clsx";

export default function MobileFilterModal(props: {
  categories: Category[];
  hasFilter: boolean;
}) {
  const { isMobileFiltersOpen, setMobileFiltersOpen } = useProductFilters();

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-black/40 z-50",
          isMobileFiltersOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={() => setMobileFiltersOpen(false)}
      />
      <div
        className={clsx(
          "fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl max-h-[80vh] overflow-y-auto transition-transform duration-300",
          isMobileFiltersOpen ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-app-border">
          <h3 className="text-lg font-semibold text-app-green">فیلترها</h3>
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="p-2 hover:bg-app-cream rounded-lg"
          >
            <XIcon className="size-5" />
          </button>
        </div>
        <div className="p-4">
          <FilterPanel {...props} />
        </div>
      </div>
    </>
  );
}
