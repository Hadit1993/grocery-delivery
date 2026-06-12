"use client";

import { CartItem } from "@/types";
import { CART_KEY } from "../constants";

export function getCartItems(): CartItem[] {
  const savedCartItems = localStorage.getItem(CART_KEY);

  return savedCartItems ? JSON.parse(savedCartItems) : [];
}

export function saveCartItems(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}
