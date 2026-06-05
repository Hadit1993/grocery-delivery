import Image from "next/image";
import { heroSectionData } from "@/assets/assets";
import LoginForm from "../components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-app-green relative items-center justify-center">
        <Image
          src={heroSectionData.hero_image}
          alt="hero"
          className="absolute inset-0 object-cover h-full bg-center opacity-10"
          priority
        />
        <div className=" relative text-center px-12">
          <h2 className=" text-4xl font-semibold text-white mb-4">
            به تازه بار خوش آمدید
          </h2>
          <p className=" text-white/60 text-xl max-w-sm mx-auto">
            ارسال محصولات تازه با تولید ارگانیک درب منزل شما
          </p>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
