import EmptyProducts from "@/app/components/products/EmptyProducts";
import FilterPanel from "@/app/components/products/FilterPanel";
import MobileFilterModal from "@/app/components/products/MobileFilterModal";
import ProductCard from "@/app/components/products/ProductCard";
import ProductsPagination from "@/app/components/products/ProductsPagination";
import ProductSortDropDown from "@/app/components/products/ProductsSortDropDown";
import { ProductFilterContextProvider } from "@/app/contexts/ProductFilterContext";

import { categoriesData, dummyProducts } from "@/assets/assets";
import { Home } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const { category, organic, sort = "" } = params;
  const page = Number(params.page ?? "1");
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const totalPages = 1;

  const products = dummyProducts.filter((product) => {
    if (category) {
      return product.category === category;
    }

    return true;
  });

  const hasFilter = !!(category || organic || minPrice || maxPrice);

  const activeCategory = categoriesData.find((cat) => cat.slug === category);

  return (
    <ProductFilterContextProvider>
      <div className="min-h-screen bg-app-cream">
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
            <Link href="/" className=" hover:text-app-green transition-colors">
              <Home className="size-4" />
            </Link>
            <span className="text-app-green font-medium">
              {activeCategory ? activeCategory.name : "همه محصولات"}
            </span>
          </nav>
          <div className="flex gap-8 xl:gap-10">
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-white rounded-2xl p-4 sticky top-24">
                <FilterPanel
                  key={`${category}-${minPrice}-${maxPrice}`}
                  categories={categoriesData}
                  hasFilter={hasFilter}
                />
              </div>
            </aside>
            <main className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className=" text-2xl font-semibold text-app-green">
                    {activeCategory ? activeCategory.name : "همه محصولات"}
                  </h1>
                  <p className=" text-sm text-app-text-light mt-0.5">
                    {products.length} محصول یافت شد
                  </p>
                </div>
                <ProductSortDropDown sort={sort} />
              </div>
              {products.length === 0 ? (
                <EmptyProducts />
              ) : (
                <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-8">
                  {products.map(
                    (product) =>
                      product.stock > 0 && (
                        <ProductCard key={product._id} product={product} />
                      ),
                  )}
                </div>
              )}
              {totalPages > 1 && <ProductsPagination totalPages={totalPages} />}
            </main>
          </div>
        </div>
        <MobileFilterModal categories={categoriesData} hasFilter={hasFilter} />
      </div>
    </ProductFilterContextProvider>
  );
}
