"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingBag } from "lucide-react";
import { clientApi } from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";

interface ProductImage {
  id: string;
  url: string;
  alt_text?: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  images: ProductImage[];
}

export default function CategoryClientPage({ categoryId }: { categoryId: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await clientApi.get(`/products/category/${categoryId}`);
        const mappedProducts = (res.data ?? []).map((p: any) => ({
          ...p,
          price: Number(p.price), // convert price string to number if needed
          rating: p.reviews?.length
            ? p.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / p.reviews.length
            : 0,
          reviews: p.reviews?.length ?? 0, // number of reviews
        }));
        setProducts(mappedProducts);
      } catch (err) {
        console.error("Error fetching products by category:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handleAddToCart = async (productId: string) => {
    try {
      await clientApi.post("/cart/add", { product_id: productId, quantity: 1 });
      toast.success("Added to cart!");
    } catch (err: any) {
      const msg = err.response?.data?.error || "Failed to add to cart";
      toast.error(msg);
    }
  };

  const renderStars = (rating = 0) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-accent" : "text-secondary"}`}
      />
    ));

  if (loading) {
    return <div className="text-center py-20 text-secondary">Loading...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-background/80 rounded-xl p-12 border border-secondary/30 shadow-md max-w-md mx-auto">
          <div className="text-8xl mb-6 text-accent opacity-60">💎</div>
          <h3 className="text-2xl font-heading text-foreground mb-2">No treasures found</h3>
          <p className="text-secondary">This category doesn’t have any products yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-body max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-heading text-foreground mb-6">Category Products</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
