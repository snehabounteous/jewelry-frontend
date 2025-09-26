import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard, { Product } from "../ProductCard";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/store/useWishlist";
import { useUserStore } from "@/store/useUserStore";
import { clientApi } from "@/utils/axios";
import React from "react";

// Mock next/navigation
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement('img', props),
}));

// Mock Zustand stores
const addMock = jest.fn();
jest.mock("@/store/useWishlist", () => ({
  useWishlist: () => ({
    items: [],
    add: addMock,
    remove: jest.fn(),
    isInWishlist: jest.fn().mockReturnValue(false),
    fetchWishlist: jest.fn(),
  }),
}));

jest.mock("@/store/useUserStore", () => ({
  useUserStore: () => ({
    isLoggedIn: true,
  }),
}));

// Mock axios
jest.mock("@/utils/axios", () => ({
  clientApi: { post: jest.fn().mockResolvedValue({}) },
}));

const product: Product = {
  id: "1",
  name: "Test Ring",
  price: 1000,
  discount: 10,
  rating: 4.5,
  reviews: 10,
  images: [{ id: "img1", url: "/ring.jpg", alt_text: "Test Ring Image" }],
};

describe("<ProductCard />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("navigates to product page on card click", () => {
    render(<ProductCard product={product} />);
    const card = screen.getByTestId("product-card");
    fireEvent.click(card);
    expect(pushMock).toHaveBeenCalledWith("/products/1");
  });

  test("wishlist toggle works", () => {
    render(<ProductCard product={product} />);
    const heartIcon = screen.getByTestId("wishlist-heart");
    fireEvent.click(heartIcon);
    expect(addMock).toHaveBeenCalledWith("1");
  });

  test("add to cart works", async () => {
    render(<ProductCard product={product} />);
    const addBtn = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(addBtn);
    expect(clientApi.post).toHaveBeenCalledWith("/cart/add", {
      product_id: product.id,
      quantity: 1,
    });
  });
});
