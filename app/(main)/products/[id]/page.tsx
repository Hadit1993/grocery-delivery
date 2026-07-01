import ProductBackButton from "@/app/components/products/ProductBackButton";
import ProductCard from "@/app/components/products/ProductCard";
import ProductCartSection from "@/app/components/products/ProductCartSection";
import { formatPrice } from "@/app/utilities/numberFormatter";
import { categoriesData, dummyProducts } from "@/assets/assets";
import DummyReviewsSection from "@/assets/DummyReviewsSection";
import clsx from "clsx";
import { ArrowLeftIcon, HomeIcon, LeafIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = dummyProducts.find((prod) => prod._id === id);
  const relatedProducts = dummyProducts.filter((prod) => prod._id !== id);
  const categoryLabel = categoriesData.find(
    (cat) => cat.slug === product?.category,
  )?.name;

  if (!product) {
    return <div>محصول یافت نشد</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
          <Link href="/" className="hover:text-app-green transition-colors">
            <HomeIcon className="size-4" />
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-app-green transition-colors"
          >
            محصولات
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-app-green transition-colors"
          >
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-app-green font-medium truncate max-w-50">
            {product.name}
          </span>
        </nav>
        <ProductBackButton />
        <div className="bg-white/50 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative flex-center p-8 md:p-12 min-h-80 md:min-h-120">
              <Image
                width={432}
                height={432}
                src={product.image}
                alt={product.name}
                className="max-h-90 w-auto object-contain"
              />
              <div className=" absolute top-5 right-5 flex flex-wrap gap-1.5">
                {product.isOrganic && (
                  <span
                    className="flex items-center gap-1 px-2.5 py-1
                    text-xs font-semibold bg-app-green text-white rounded-full"
                  >
                    <LeafIcon className="size-3" /> ارگانیک
                  </span>
                )}
                {product.discount > 0 && (
                  <span
                    className="px-2.5 py-1
                    text-xs font-semibold bg-app-orange text-white rounded-full"
                  >
                    {product.discount}% تخفیف
                  </span>
                )}
              </div>
            </div>
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <span className="text-xs font-medium text-app-text-light tracking-wider mb-2">
                {categoryLabel}
              </span>
              <h1 className="text-2xl md:text-3xl font-semibold text-app-green mb-3">
                {product.name}
              </h1>
              {product.rating > 0 && (
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={clsx(
                          "size-4",
                          star <= Math.round(product.rating)
                            ? "text-app-warning fill-app-warning"
                            : "text-app-border",
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-app-text-light">
                    {product.reviewCount} بازخورد
                  </span>
                </div>
              )}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl md:text-4xl font-semibold text-app-green">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-app-text-light line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-sm text-app-text-light leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="text-sm text-app-success font-medium">
                    {product.stock} محصول موجود است
                  </span>
                ) : (
                  <span className="text-sm text-app-error font-medium">
                    محصول ناموجود است
                  </span>
                )}
              </div>
              <ProductCartSection product={product} />
            </div>
          </div>
        </div>
        {product.reviewCount > 0 && <DummyReviewsSection product={product} />}
        {relatedProducts.length > 0 && (
          <section className="mt-12 mb-44">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-app-green">
                  محصولات مرتبط
                </h2>
                <p className="text-sm text-app-text-light mt-1">
                  مشاهده بیشتر از {categoryLabel}
                </p>
              </div>
              <Link
                className="text-sm font-semibold text-app-orange hover:text-app-orange-dark 
            flex items-center gap-1 transition-colors"
                href={`/products?category=${product.category}`}
              >
                مشاهده همه <ArrowLeftIcon className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8">
              {relatedProducts.slice(0, 5).map((rp) => (
                <ProductCard key={rp._id} product={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
