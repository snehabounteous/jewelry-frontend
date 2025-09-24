import { useUserStore } from "@/store/useUserStore";
import { clientApi } from "@/utils/axios";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const { setUser } = useUserStore();
  const router = useRouter();

  const logout = async () => {
    try {
      // Remove access token
      localStorage.removeItem("accessToken");

      // Notify backend to clear refresh token cookie
      await clientApi.post("/auth/logout");

      // Reset user state
      setUser(null);

      toast.success("Logged out successfully!");
      router.push("/auth"); // redirect to login
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
    }
  };

  return logout;
};
