"use client";

import { useEffect, useState } from "react";
import ProductCard, { Product, ProductImage } from "@/components/ProductCard";
import { clientApi } from "@/utils/axios";

interface ReviewApi {
  id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}
interface WishlistApiItem {
  id: string;
  name: string;
  price: string; // API gives string
  images: { id: string; url: string; alt_text?: string }[];
  reviews: ReviewApi[]; // Array of review objects
}

interface WishlistResponse {
  id: string;
  items: WishlistApiItem[];
}

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlistData = async () => {
    setLoading(true);
    try {
      const res = await clientApi.get<WishlistResponse>("/wishlist");
      const mappedProducts: Product[] = res.data.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        images: item.images.map(
          (img): ProductImage => ({
            id: img.id,
            url: img.url.trim(),
            alt_text: img.alt_text,
          })
        ),
        reviews: item.reviews.length, // ✅ map array to number
        rating: 0, // Optional: calculate average if you have ratings in reviews
      }));
      setProducts(mappedProducts);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistData();
  }, []);

  if (loading) return <p className="text-center py-10">Loading wishlist...</p>;
  if (products.length === 0)
    return <p className="text-center py-10 text-gray-500">Your wishlist is empty.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
