"use client";

import { produce } from "immer";

import {
  ActionType,
  CardActionPayload,
  CartActionType,
  CartContextType,
  CartState,
  Product,
} from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { getCartItems, saveCartItems } from "../utilities/cartHandler";

const CartContext = createContext<CartContextType | null>(null);

const initialCartState: CartState = {
  items: getCartItems(),
  isCartOpen: false,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [{ items, isCartOpen }, dispatch] = useReducer(
    cartReducer,
    initialCartState,
  );

  useEffect(() => {
    saveCartItems(items);
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product,
        quantity,
      },
    });
  };

  const removeFromCart = (productId: string) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        productId,
      },
    });
  };

  const updateQuantity = (productId: string, quantity: number = 1) => {
    if (quantity <= 0) {
      removeFromCart(productId);

      return;
    }

    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        productId,
        quantity,
      },
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const setCartOpen = (open: boolean) => {
    dispatch({ type: "SET_CART_OPEN", payload: { open } });
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const cartReducer = produce(
  (
    state: CartState,
    { type, payload }: ActionType<CartActionType, CardActionPayload>,
  ) => {
    switch (type) {
      case "ADD_TO_CART": {
        const existing = state.items.find(
          (item) => item.product._id === payload?.product?._id,
        );

        if (existing) {
          existing.quantity++;
        } else if (payload?.product) {
          state.items.push({
            product: payload.product,
            quantity: payload.quantity ?? 1,
          });
        }

        state.isCartOpen = true;
        break;
      }

      case "REMOVE_FROM_CART":
        state.items = state.items.filter(
          (item) => item.product._id !== payload?.productId,
        );
        break;

      case "UPDATE_QUANTITY": {
        const item = state.items.find(
          (item) => item.product._id === payload?.productId,
        );

        if (item && payload?.quantity !== undefined) {
          item.quantity = payload.quantity;
        }
        break;
      }

      case "CLEAR_CART":
        state.items = [];
        state.isCartOpen = false;
        break;

      case "SET_CART_OPEN":
        state.isCartOpen = payload?.open ?? false;
        break;

      default:
        break;
    }
  },
);

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Use this hooks inside CartProvider");
  }

  return context;
}
