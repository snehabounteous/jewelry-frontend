/**
 * @jest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react";
import { useLogout } from "@/hooks/useLogout";
import { useUserStore } from "@/store/useUserStore";
import { clientApi } from "@/utils/axios";
import { toast } from "sonner";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock axios client
jest.mock("@/utils/axios", () => ({
  clientApi: {
    post: jest.fn(),
  },
}));

// Mock toast
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("useLogout hook", () => {
  const mockedApi = clientApi as jest.Mocked<typeof clientApi>;
  const mockedToast = toast as jest.Mocked<typeof toast>;
  const mockRouter = require("next/navigation").useRouter();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    useUserStore.setState({ user: { id: "1", name: "John", email: "j@e.com", role: "user" }, isLoggedIn: true, loading: false });
  });

  it("should logout successfully", async () => {
    mockedApi.post.mockResolvedValueOnce({});

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current(); // call logout
    });

    // should clear token
    expect(localStorage.getItem("accessToken")).toBeNull();

    // should call API
    expect(mockedApi.post).toHaveBeenCalledWith("/auth/logout");

    // should reset user
    expect(useUserStore.getState().user).toBeNull();
    expect(useUserStore.getState().isLoggedIn).toBe(false);

    // should show success toast
    expect(mockedToast.success).toHaveBeenCalledWith("Logged out successfully!");

    // should redirect
    expect(mockRouter.push).toHaveBeenCalledWith("/auth");
  });

  it("should handle logout failure", async () => {
    mockedApi.post.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current();
    });

    // should show error toast
    expect(mockedToast.error).toHaveBeenCalledWith("Logout failed");
  });
});
