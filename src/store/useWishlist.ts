"use client";
import { create } from "zustand";
import { clientApi } from "@/utils/axios";
import { useUserStore } from "./useUserStore";
import { toast } from "sonner";

export interface WishlistState {
  items: string[]; // IDs for quick lookup
  products: any[]; // full product objects from API
  add: (id: string) => void;
  remove: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  fetchWishlist: () => Promise<void>;
}
interface WishlistProduct {
  id: string;
  name: string;
  description: string;
  price: string | number;
  category_id?: string;
  stock?: number;
  images?: {
    id: string;
    product_id: string;
    url: string;
    alt_text?: string;
  }[];
  reviews?: any[];
}

export const useWishlist = create<WishlistState>((set, get) => ({
  items: [],
  products: [],
  add: (id: string) => set((state) => ({ items: [...state.items, id] })),
  remove: (id: string) =>
    set((state) => ({
      items: state.items.filter((pid) => pid !== id),
      products: state.products.filter((p) => String(p.id) !== id),
    })),
  isInWishlist: (id: string) => get().items.includes(id),
  fetchWishlist: async () => {
    const { isLoggedIn } = useUserStore.getState();
    if (!isLoggedIn) return;

    try {
      const res = await clientApi.get("/wishlist");
      const products: WishlistProduct[] = Array.isArray(res.data.items) ? res.data.items : [];
      const ids = products.map((item: WishlistProduct) => String(item.id));
      set({ items: ids, products });
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
      set({ items: [], products: [] });
    }
  },
}));
