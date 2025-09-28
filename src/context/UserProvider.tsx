// src/context/UserProvider.tsx
"use client"; // must be a client component

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { clientApi } from "@/utils/axios";
import { ExternalToast, toast } from "sonner";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await clientApi.get("/auth/me");
      setUser(res.data.user);
      setIsLoggedIn(true);
    } catch (err) {
      setUser(null);
      setIsLoggedIn(false);
      toast.error("Failed to fetch user", err as ExternalToast);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await clientApi.post("/auth/logout");
    } finally {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  // ✅ Only fetch user once on mount
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, loading, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook for easy access
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
