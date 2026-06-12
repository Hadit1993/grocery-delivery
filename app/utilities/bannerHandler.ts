"use client";

import { BANNER_VISIBILITY_KEY } from "../constants";

export function isBannerDismissed() {
  return sessionStorage.getItem(BANNER_VISIBILITY_KEY) === "true";
}

export function dismissBanner() {
  sessionStorage.setItem(BANNER_VISIBILITY_KEY, "true");
}
