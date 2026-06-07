import { heroSectionData } from "@/assets/assets";
import { ArrowRightIcon, LeafIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className=" relative overflow-hidden min-h-135 mb-10 
    rounded-3xl flex items-center"
    >
      <Image
        src={heroSectionData.hero_image}
        alt="hero image"
        className=" absolute inset-0 h-full w-full object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-l from-app-green via-app-green/65 to-transparent" />
      <div className=" relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className=" max-w-xl xl:pl-10">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold 
            text-orange-300 bg-orange-300/10 rounded-full mb-5"
          >
            <LeafIcon className=" size-3" /> تازه و ارگانیک
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">
            خانواده خود را از
            <span className="text-orange-300"> بهترین‌های طبیعت</span>
            {"  "}
            بهره مند کنید
          </h1>
          <p className="text-base text-white/70 leading-relaxed mb-8 max-w-md">
            {heroSectionData.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className=" px-7 py-3 bg-orange-400 text-white font-semibold rounded-full
                 hover:bg-orange-500 transition-all flex-center gap-2 active:scale-[0.98]"
            >
              <ArrowRightIcon className="size-4" /> همین حالا خرید کنید
            </Link>
            <Link
              href="/products"
              className=" px-7 py-3 bg-white/10 text-white font-semibold rounded-full
                 hover:bg-white/20 transition-all border border-white/20"
            >
              دسته‌بندی‌ها را مشاهده کنید
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
