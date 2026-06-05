"use client";

import { LoginFormType } from "@/types";
import {
  BikeIcon,
  UserIcon,
  MailIcon,
  LockKeyholeIcon,
  Loader2Icon,
} from "lucide-react";
import Link from "next/link";
import { ChangeEventHandler, useState } from "react";

const initialLoginInfo: LoginFormType = {
  name: "",
  email: "",
  password: "",
};

export default function LoginForm() {
  const [isLoginState, setLoginState] = useState(true);
  const [loginInfo, setLoginInfo] = useState(initialLoginInfo);
  const [isLoading, setLoading] = useState(false);

  const onValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name as keyof LoginFormType]: value,
    }));
  };

  return (
    <div className=" flex-1 px-4 py-12 flex-center bg-app-cream">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className=" inline-flex items-center gap-2 mb-6">
            <BikeIcon className=" size-8 text-app-green" />
            <span className=" text-2xl font-semibold text-app-green">
              تازه‌بار
            </span>
          </Link>
          <h1 className=" text-2xl font-semibold text-app-green mb-2">
            {isLoginState
              ? "وارد حساب کاربری خود شوید"
              : "حساب کاربری خود را ایجاد کنید"}{" "}
          </h1>
          <p className=" text-sm text-app-text-light">
            {isLoginState
              ? "آیا حساب کاربری ندارید؟"
              : "آیا حساب کاربری دارید؟"}
            <button
              onClick={() => setLoginState(!isLoginState)}
              className=" text-orange-500 mr-1 font-semibold hover:text-orange-600 transition-colors"
            >
              {isLoginState ? "ایجاد کنید" : "وارد شوید"}
            </button>
          </p>
        </div>
        <form action="" className=" space-y-5">
          {!isLoginState && (
            <label className=" text-sm flex flex-col gap-1">
              نام
              <div className="relative">
                <UserIcon className=" absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                <input
                  type="text"
                  value={loginInfo.name}
                  name="name"
                  onChange={onValueChange}
                  placeholder="نام شما"
                  required
                  className="w-full pr-11 pl-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                />
              </div>
            </label>
          )}
          <label className=" text-sm flex flex-col gap-1">
            ایمیل
            <div className="relative">
              <MailIcon className=" absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
              <input
                type="email"
                value={loginInfo.email}
                name="email"
                onChange={onValueChange}
                placeholder="you@example.com"
                required
                className="w-full pr-11 pl-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
              />
            </div>
          </label>
          <label className=" text-sm flex flex-col gap-1">
            رمز عبور
            <div className="relative">
              <LockKeyholeIcon className=" absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
              <input
                type="password"
                value={loginInfo.password}
                name="password"
                onChange={onValueChange}
                placeholder="••••••••••••"
                required
                className="w-full pr-11 pl-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
              />
            </div>
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className=" flex-center w-full py-3 bg-green-950 text-white font-semibold rounded-xl
             hover:bg-green-900 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2Icon className=" animate-spin" />
            ) : isLoginState ? (
              "ورود"
            ) : (
              "ثبت‌نام"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
