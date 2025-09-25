"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { clientApi } from "@/utils/axios";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    stock: number;
  };
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await clientApi.get("/wishlist");
      setItems(res.data.items || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await clientApi.delete(`/wishlist/remove/${productId}`);
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const clearWishlist = async () => {
    try {
      await clientApi.delete("/wishlist/clear");
      setItems([]);
    } catch (err) {
      console.error("Error clearing wishlist:", err);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      await clientApi.post("/cart/add", {
        product_id: productId,
        quantity: 1,
      });

      toast.success("Item added to cart 🛒");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add item to cart");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <p className="text-center py-10">Loading wishlist...</p>;
  if (items.length === 0)
    return <p className="text-center py-10 text-gray-500">Your wishlist is empty.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <Button variant="destructive" onClick={clearWishlist}>
          <Trash2 className="mr-2" size={16} />
          Clear Wishlist
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(({ id, product }) => (
          <Card key={id} className="rounded-xl shadow-sm">
            <CardContent className="p-4">
              <Link href={`/products/${product.id}`}>
                <div className="w-full h-56 bg-gray-100 flex items-center justify-center rounded-lg mb-4">
                  <span className="text-gray-400">No Image</span>
                </div>
              </Link>
              <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{product.description}</p>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xl font-bold text-accent">
                  ₹{Number(product.price).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button className="flex-1" onClick={() => addToCart(product.id)}>
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => removeItem(product.id)}
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
