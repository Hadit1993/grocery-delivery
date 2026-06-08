import { dummyProducts } from "@/assets/assets";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import ProductCard from "../products/ProductCard";

export default function PopularProducts() {
  const products = dummyProducts.slice(0, 10);

  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold">پر بازدیدترین محصولات</h2>
            <p className=" text-sm text-app-text-light mt-1">
              محبوب ترین محصولات این فصل
            </p>
          </div>
          <Link
            href="/products"
            className=" text-sm font-semibold text-app-orange hover:text-app-orange-dark flex items-center gap-1 transition-colors"
          >
            مشاهده همه <ArrowLeftIcon className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
