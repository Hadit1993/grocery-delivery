import { appPromoBannerData, assets } from "@/assets/assets";
import Image from "next/image";

export default function PromotionBanner() {
  return (
    <section className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 my-14 bg-green-950 rounded-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 xl:px-10">
        <div className=" text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl text-white mb-3 text-right">
            {appPromoBannerData.title}
          </h2>
          <p className="text-white/70 mb-6 max-w-md text-right">
            {appPromoBannerData.description}
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button className="px-6 py-3 bg-white/10 text-white  font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20">
              گوگل پلی
            </button>
            <button className="px-6 py-3 bg-white text-green-950  font-semibold rounded-xl hover:bg-orange-100 transition-colors">
              اپ استور
            </button>
          </div>
        </div>
        <Image
          src={assets.delivery_truck}
          alt="Delivery truck"
          className="max-w-60 sm:max-w-120 xl:pr-10"
        />
      </div>
    </section>
  );
}
