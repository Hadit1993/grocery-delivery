"use client";

import { useProductFilters } from "@/app/contexts/ProductFilterContext";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const siblingCount = 1;

export default function ProductsPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const { searchParams, updateFilters } = useProductFilters();

  const page = Number(searchParams.get("page") ?? "1");

  const clampedPage = Math.min(Math.max(page, 1), totalPages);

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i <= end; i++) result.push(i);
    return result;
  };

  const getPageItems = () => {
    // Total numbers we want to show: first, last, current, siblings, plus 2 ellipses slots
    const totalNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(clampedPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(clampedPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    const items: [number | string] = [1];

    if (showLeftEllipsis) {
      items.push("left-ellipsis");
    } else {
      items.push(
        ...range(
          2,
          leftSiblingIndex - 1 >= 2 ? leftSiblingIndex - 1 : 1,
        ).filter((n) => n > 1),
      );
    }

    items.push(
      ...range(
        Math.max(leftSiblingIndex, 2),
        Math.min(rightSiblingIndex, totalPages - 1),
      ),
    );

    if (showRightEllipsis) {
      items.push("right-ellipsis");
    } else {
      items.push(
        ...range(rightSiblingIndex + 1, totalPages - 1).filter(
          (n) => n < totalPages,
        ),
      );
    }

    items.push(totalPages);

    // Dedupe while preserving order (guards against edge overlaps)
    const seen = new Set();
    return items.filter((item) => {
      const key = typeof item === "string" ? item : `n${item}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const pageItems = getPageItems();

  return (
    <div className="flex-center gap-2 mt-16">
      <button
        disabled={clampedPage === 1}
        onClick={() => {
          updateFilters({ page: `${clampedPage - 1}` });
        }}
        className="size-9 rounded-lg text-sm font-medium transition-colors bg-white text-app-text-light
         hover:bg-app-cream border disabled:opacity-40 disabled:cursor-none"
      >
        <ChevronRight className="size-4 mx-auto" />
      </button>
      {pageItems.map((item, index) => {
        if (typeof item === "string") {
          return (
            <span
              key={item + index}
              className="flex flex-center size-9 rounded-lg text-sm font-medium transition-colors 
              bg-white text-app-text-light border hover:bg-app-cream"
            >
              <MoreHorizontal className="size-4" />
            </span>
          );
        }

        return (
          <button
            key={item}
            onClick={() => {
              updateFilters({ page: `${item}` });
            }}
            className={clsx(
              "size-9 rounded-lg text-sm font-medium transition-colors",
              item === clampedPage
                ? "bg-app-green text-white hover:bg-app-green-light"
                : "bg-white text-app-text-light hover:bg-app-cream border",
            )}
          >
            {item}
          </button>
        );
      })}
      <button
        disabled={clampedPage === totalPages}
        onClick={() => {
          updateFilters({ page: `${clampedPage + 1}` });
        }}
        className="size-9 rounded-lg text-sm font-medium transition-colors bg-white text-app-text-light hover:bg-app-cream border disabled:opacity-40 disabled:cursor-none"
      >
        <ChevronLeft className="size-4 mx-auto" />
      </button>
    </div>
  );
}
