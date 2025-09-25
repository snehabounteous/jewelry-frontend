"use client";
import { create } from "zustand";
import { clientApi } from "@/utils/axios";
import { useUserStore } from "./useUserStore";

interface WishlistState {
  items: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  fetchWishlist: () => Promise<void>;
}

export const useWishlist = create<WishlistState>((set, get) => ({
  items: [],
  add: (id) => set((state) => ({ items: [...state.items, id] })),
  remove: (id) => set((state) => ({ items: state.items.filter((pid) => pid !== id) })),
  isInWishlist: (id) => get().items.includes(id),
  fetchWishlist: async () => {
  const { isLoggedIn } = useUserStore.getState();
  if (!isLoggedIn) return;

  try {
    const res = await clientApi.get("/wishlist");
    // Map actual product IDs
    const ids = Array.isArray(res.data.items)
      ? res.data.items.map((item: any) => String(item.product.id))
      : [];
    set({ items: ids });
  } catch (err) {
    console.error("Failed to fetch wishlist", err);
    set({ items: [] });
  }
}


}));
