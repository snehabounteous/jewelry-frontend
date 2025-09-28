"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

export default function UserLoader() {
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(); // call /me once on mount
  }, [fetchUser]);

  return null; // this component does not render anything
}
