import { StaticImageData } from "next/image";
import { ReadonlyURLSearchParams } from "next/navigation";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: Address[];
  isAdmin?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  _id: string;
  label: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
  lat: number;
  lng: number;
}

export interface Category {
  slug: string;
  name: string;
  image?: StaticImageData;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  unit: string;
  stock: number;
  isOrganic: boolean;
  rating: number;
  reviewCount: number;
  discount: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  unit: string;
}

export interface DeliveryPartner {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  vehicleType: "bike" | "scooter" | "car";
  isActive: boolean;
  createdAt: string;
}

export interface Order {
  _id: string;
  user: string | { _id: string; name: string; email: string; phone?: string };
  items: OrderItem[];
  shippingAddress: Omit<Address, "_id" | "isDefault">;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: string;
  statusHistory: { status: string; timestamp: string; note: string }[];
  deliveryPartner: DeliveryPartner | null;
  deliveryOtp: string;
  isPaid: boolean;
  createdAt: string;
}

export interface LoginFormType {
  name: string;
  email: string;
  password: string;
}

export interface ProductCardProps {
  product: Product;
}

export interface CartContextType {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
}

export type CartActionType =
  | "ADD_TO_CART"
  | "REMOVE_FROM_CART"
  | "UPDATE_QUANTITY"
  | "CLEAR_CART"
  | "SET_CART_OPEN";

export interface CardActionPayload {
  product?: Product;
  quantity?: number;
  productId?: string;
  open?: boolean;
}

export interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

export interface ActionType<T, P> {
  type: T;
  payload?: P;
}

export interface ProductFilterContextType {
  searchParams: ReadonlyURLSearchParams;
  isMobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
  updateFilters: (filters: Record<string, string>) => void;
  deleteFilters: () => void;
}
