import ProductCard from "@/app/components/products/ProductCard";
import { dummyProducts } from "@/assets/assets";
import { Zap } from "lucide-react";

export default function FlashDealsPage() {
  const products = dummyProducts;

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="bg-linear-to-r from-app-orange to-app-orange-dark text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex-center gap-2 mb-3">
            <Zap className="size-6 fill-white" />
            <h1 className="text-3xl font-semibold">تخفیف‌های ویژه</h1>
            <Zap className="size-6 fill-white" />
          </div>
          <div className="text-white/80 max-w-md mx-auto">
            <p>تخفیف‌های زمان‌دار روی محصولات ارگانیک محبوب شما.</p>
            فرصت را از دست ندهید!
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <Zap className="size-16 text-app-border mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-app-green mb-2">
              در حال حاضر هیچ تخفیفی وجود ندارد
            </h2>
            <p className="text-sm text-app-text-light">
              دوباره برگرد تا از پیشنهاد‌های شگفت‌انگیز ما بهره‌مند شوی
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map(
              (product) =>
                product.stock > 0 && (
                  <ProductCard key={product._id} product={product} />
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
