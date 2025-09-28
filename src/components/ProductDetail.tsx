"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { clientApi } from "@/utils/axios";
import { Heart } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useWishlist } from "@/store/useWishlist";
import { set } from "react-hook-form";

interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text?: string | null;
  created_at: string;
}

interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  created_at: string;
  updated_at: string;
  images: ProductImage[];
  reviews: Review[];
}
interface Props {
  product: Product;
}


export default function ProductDetail({ product }: Props) {

  const [quantity, setQuantity] = useState(1);

  // ✅ Fetch wishlist on load
const { items, add, remove, isInWishlist, fetchWishlist } = useWishlist();
  const { isLoggedIn } = useUserStore();
  const [isWishlisted, setIsWishlisted] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      fetchWishlist();
      setIsWishlisted(isInWishlist(product.id));
    }
  }, [isLoggedIn, fetchWishlist]);


  // Fetch wishlist from backend
  async function handleWishlistToggle() {
  try {
    if (isWishlisted) {
      await clientApi.post(`/wishlist/remove/${product.id}`);
      setIsWishlisted(false);
      toast.success("Removed from wishlist");
    } else {
      await clientApi.post("/wishlist/add", { product_id: product.id });
      setIsWishlisted(true); // <-- force red immediately
      toast.success("Added to wishlist");
    }
  } catch (error: any) {
    if (error.response?.data?.error === "Product already in wishlist") {
      setIsWishlisted(true); // <-- highlight red even if API rejects
    } else {
      toast.error("Wishlist action failed");
    }
  }
}


  function handleMinus() {
    setQuantity((prev) => Math.max(prev - 1, 1));
  }

  function handlePlus() {
    setQuantity((prev) => Math.min(prev + 1, product.stock));
  }

  async function handleAddToCart() {
    try {
      await clientApi.post("/cart/add", {
        product_id: product.id,
        quantity,
      });
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  }

  // ✅ Wishlist toggle
  

  return (
    <div className="flex justify-between w-full max-w-7xl mx-auto p-4 space-x-8 relative">
      {/* Product Image */}
      <Image
        src={product.images[0].url.trimEnd() || "/placeholder.jpg"}
        alt={product.name}
        height={200}
        width={200}
        className="object-cover h-full w-1/2"
      />

      {/* Product Info */}
      <div className="w-1/2">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-lg font-bold mt-2">₹{product.price}</p>
        <p className="text-sm text-red-500">Only {product.stock} left in stock</p>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-3 mt-4">
          <button
            onClick={handleMinus}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            -
          </button>
          <input
            type="number"
            name="quantity"
            value={quantity}
            readOnly
            className="w-16 text-center border rounded"
          />
          <button
            onClick={handlePlus}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
        >
          Add to Cart
        </button>
      </div>

      {/* Wishlist Icon */}
      <Heart
        className={`absolute top-3 right-3 h-6 w-6 cursor-pointer transition-colors ${
          isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
        }`}
        onClick={handleWishlistToggle}
      />
    </div>
  );
}
