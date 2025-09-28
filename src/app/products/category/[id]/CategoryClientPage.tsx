"use client";

import { useState, useEffect } from "react";
import { clientApi } from "@/utils/axios";
import ProductCard from "@/components/ProductCard";

interface ProductImage {
  id: string;
  url: string;
  alt_text?: string;
}
// interface Review {
//   id: string;
//   user_id: string;
//   rating: number;
//   comment?: string;
//   created_at: string;
// }

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

interface ProductImageApi {
  id: string;
  url: string;
  alt_text?: string;
}

interface ReviewApi {
  id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

interface ProductApi {
  id: string;
  name: string;
  description?: string;
  price: string | number; // API may return string
  originalPrice?: string | number;
  discount?: string | number;
  reviews?: ReviewApi[];
  images: ProductImageApi[];
}

export default function CategoryClientPage({ categoryId }: { categoryId: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await clientApi.get<ProductApi[]>(`/products/category/${categoryId}`);

      const mappedProducts: Product[] = res.data.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: Number(p.price),
        originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
        discount: p.discount ? Number(p.discount) : undefined,
        rating: p.reviews?.length
          ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
          : undefined,
        reviews: p.reviews?.length ?? undefined,
        images: p.images.map((img) => ({
          id: img.id,
          url: img.url,
          alt_text: img.alt_text,
        })),
      }));

      setProducts(mappedProducts);
    } catch (err: unknown) {
      console.error("Error fetching products by category:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [categoryId]);

  

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
