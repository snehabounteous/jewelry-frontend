/**
 * @jest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react";
import { useLogout } from "@/hooks/useLogout";
import { useUserStore } from "@/store/useUserStore";
import { clientApi } from "@/utils/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// -----------------------------
// Mock modules
// -----------------------------
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("@/utils/axios", () => ({
  clientApi: {
    post: jest.fn(),
  },
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("useLogout hook", () => {
  const mockedApi = clientApi as jest.Mocked<typeof clientApi>;
  const mockedToast = toast as jest.Mocked<typeof toast>;
  const mockRouter = useRouter() as jest.Mocked<ReturnType<typeof useRouter>>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    // Initialize user store
    useUserStore.setState({
      user: { id: "1", name: "John", email: "j@e.com", role: "user" },
      isLoggedIn: true,
      loading: false,
    });
  });

  it("should logout successfully", async () => {
    mockedApi.post.mockResolvedValueOnce({}); // mock successful API call

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current(); // call logout
    });

    // Should clear token
    expect(localStorage.getItem("accessToken")).toBeNull();

    // Should call API
    expect(mockedApi.post).toHaveBeenCalledWith("/auth/logout");

    // Should reset user store
    expect(useUserStore.getState().user).toBeNull();
    expect(useUserStore.getState().isLoggedIn).toBe(false);

    // Should show success toast
    expect(mockedToast.success).toHaveBeenCalledWith("Logged out successfully!");

    // Should redirect
    expect(mockRouter.push).toHaveBeenCalledWith("/auth");
  });

  it("should handle logout failure", async () => {
    mockedApi.post.mockRejectedValueOnce(new Error("Network error")); // simulate failure

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current();
    });

    // Should show error toast
    expect(mockedToast.error).toHaveBeenCalledWith("Logout failed");
  });
});
