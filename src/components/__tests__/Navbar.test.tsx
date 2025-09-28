import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { useUserStore } from "@/store/useUserStore";
import { useCart } from "@/store/useCart";
import { useRouter } from "next/navigation";

// Mock hooks
jest.mock("@/store/useUserStore");
jest.mock("@/store/useCart");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Navbar Component", () => {
  const mockFetchUser = jest.fn();
  const mockLogout = jest.fn();
  const mockFetchCart = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: { name: "John Doe" },
      isLoggedIn: true,
      fetchUser: mockFetchUser,
      logout: mockLogout,
    });

    (useCart as unknown as jest.Mock).mockReturnValue({
      cart: [{ id: "1", name: "Ring", price: 100, quantity: 2 }],
      fetchCart: mockFetchCart,
      removeFromCart: mockRemoveFromCart,
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    jest.clearAllMocks();
  });

  it("renders logo and navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("LUMIÈRE")).toBeInTheDocument();
    expect(screen.getByText("Collections")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("fetches user and cart on mount", () => {
    render(<Navbar />);
    expect(mockFetchUser).toHaveBeenCalled();
    expect(mockFetchCart).toHaveBeenCalled();
  });

  it("displays cart count correctly", () => {
    render(<Navbar />);
    expect(screen.getByText("2")).toBeInTheDocument(); // 2 items in cart
  });

  it("navigates on search submit", () => {
    render(<Navbar />);
    const input = screen.getByPlaceholderText("Search our collection...");
    fireEvent.change(input, { target: { value: "Ring" } });
    fireEvent.submit(input.closest("form")!);
    expect(mockPush).toHaveBeenCalledWith("/products?search=Ring");
  });

  it("handles logout click", () => {
    render(<Navbar />);
    const profileButton = screen.getByText("John Doe");
    fireEvent.click(profileButton);
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/auth");
  });

  it("removes item from cart", () => {
    render(<Navbar />);
    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);
    expect(mockRemoveFromCart).toHaveBeenCalledWith("1");
  });

  it("opens and closes mobile menu", () => {
    render(<Navbar />);
    const openButton = screen.getByLabelText("Open mobile menu");
    fireEvent.click(openButton);
    expect(screen.getByText("Collections")).toBeVisible();

    const closeButton = screen.getByLabelText("Close mobile menu");
    fireEvent.click(closeButton);
    expect(screen.queryByText("Collections")).not.toBeVisible();
  });

  it("shows login button if not logged in", () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      isLoggedIn: false,
      fetchUser: mockFetchUser,
      logout: mockLogout,
    });

    render(<Navbar />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
