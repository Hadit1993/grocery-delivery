"use client";

import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="mb-6 flex items-center gap-1.5 text-sm text-app-text-light
  hover:text-app-green transition-colors"
    >
      <ArrowRightIcon className="size-4" /> بازگشت
    </button>
  );
}
