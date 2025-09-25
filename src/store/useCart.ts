"use client";

import { create } from "zustand";
import { clientApi } from "@/utils/axios";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

interface CartState {
  cart: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (item: { productId: string; quantity?: number }) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  reduceQuantity: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}
type BackendCartItem = {
  product: {
    id: string;
    name: string;
    price: string;
    image?: string;
    category_id?: string;
  };
  quantity: number;
};


export const useCart = create<CartState>((set, get) => ({
  cart: [],

  fetchCart: async () => {
    try {
      const res = await clientApi.get("/cart");
      const items = res.data.items.map((item: BackendCartItem) => ({
        id: item.product.id,
        name: item.product.name,
        price: Number(item.product.price),
        quantity: item.quantity,
        image: item.product.image || "/placeholder.png",
        category: item.product.category_id,
      }));
      set({ cart: items });
    } catch (err) {
      console.error("Error fetching cart:", err);
      set({ cart: [] });
    }
  },

  addToCart: async ({ productId, quantity = 1 }) => {
  try {
    const res = await clientApi.post("/cart/add", { productId, quantity });
    set((state) => ({
      cart: [...state.cart, {
        id: res.data.product.id,
        name: res.data.product.name,
        price: Number(res.data.product.price),
        quantity: res.data.quantity,
        image: res.data.product.image || "/placeholder.png",
        category: res.data.product.category_id,
      }]
    }));
    toast.success("Added to cart");
  } catch (err) {
    console.error("Error adding to cart:", err);
    toast.error("Failed to add product");
  }
},


  removeFromCart: async (productId: string) => {
    try {
      await clientApi.delete(`/cart/remove/${productId}`);
      await get().fetchCart();
      toast.success("Removed from cart");
    } catch (err) {
      console.error("Error removing from cart:", err);
      toast.error("Failed to remove product");
    }
  },

  reduceQuantity: async (productId: string) => {
    try {
      await clientApi.post("/cart/reduce", { productId });
      await get().fetchCart();
      toast.success("Quantity updated");
    } catch (err) {
      console.error("Error reducing quantity:", err);
      toast.error("Failed to update quantity");
    }
  },

  clearCart: async () => {
  try {
    await clientApi.delete("/cart/clear");
    set({ cart: [] });
    toast.success("Cart cleared");
  } catch (err) {
    console.error("Error clearing cart:", err);
    toast.error("Failed to clear cart");
  }
},

}));
