"use client";

import { ProductFilterContextType } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

const ProductFilterContext = createContext<ProductFilterContextType | null>(
  null,
);

export function ProductFilterContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const updateFilters = (filters: Record<string, string>) => {
    // console.log("key", key, "value", value);
    const newParams = new URLSearchParams(searchParams);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    if (!Object.keys(filters).includes("page")) {
      newParams.delete("page");
    }

    if (isMobileFiltersOpen) {
      setMobileFiltersOpen(false);
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const deleteFilters = () => {
    const newParams = new URLSearchParams(searchParams);

    ["category", "organic", "minPrice", "maxPrice"].forEach((filter) => {
      if (newParams.has(filter)) {
        newParams.delete(filter);
      }
    });

    if (isMobileFiltersOpen) {
      setMobileFiltersOpen(false);
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <ProductFilterContext.Provider
      value={{
        searchParams,
        isMobileFiltersOpen,
        setMobileFiltersOpen,
        updateFilters,
        deleteFilters,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
}

export function useProductFilters() {
  const context = useContext(ProductFilterContext);

  if (!context) {
    throw new Error("use this hook inside ProductFilterContextProvider");
  }

  return context;
}
