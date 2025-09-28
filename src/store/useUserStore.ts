"use client";

import { create } from "zustand";
import { clientApi } from "@/utils/axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,
  isLoggedIn: false,

  setUser: (user) =>
    set({
      user,
      isLoggedIn: !!user,
    }),

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await clientApi.get("/auth/me"); // withCredentials is set in clientApi
      set({ user: res.data.user, isLoggedIn: true });
    } catch {
      set({ user: null, isLoggedIn: false });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      // Backend clears cookie
      await clientApi.post("/auth/logout");
    } finally {
      set({ user: null, isLoggedIn: false });
    }
  },
  
}));
