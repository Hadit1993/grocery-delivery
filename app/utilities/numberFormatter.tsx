import { CURRENCY_SYMBOLE } from "../constants";

export function formatPrice(price: number) {
  return `${Number(price * 1000).toLocaleString("fa-IR")} ${CURRENCY_SYMBOLE}`;
}
