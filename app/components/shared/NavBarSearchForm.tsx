"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

export default function NavBarSearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }

    setSearchQuery("");
  };

  return (
    <form
      onSubmit={handleSearch}
      className=" hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm"
    >
      <div className=" relative w-full">
        <SearchIcon className=" absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
        <input
          type="text"
          placeholder="جستجوی محصولات..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pr-8 p-2 bg-orange-50 rounded-full ring ring-app-orange/15 focus:ring-app-orange/30"
        />
      </div>
    </form>
  );
}
