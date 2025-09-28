"use client";

import React, { useState, useEffect, useRef } from "react";
import ProductCard, { Product } from "./ProductCard";
import { serverApi } from "@/utils/axios";

const CATEGORY_API = "/products/category/f0e9f46f-02c7-4de5-84ca-ae40dd6aeae2";
interface ReviewApi {
  id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

interface ProductImageApi {
  id: string;
  url: string;
  alt_text?: string;
}

// interface ProductApi {
//   id: string;
//   name: string;
//   price: string | number; // API might return string
//   reviews: ReviewApi[];
//   images: ProductImageApi[];
// }
const MostGiftedCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemWidth = 304;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await serverApi.get(CATEGORY_API);

        // Normalize response (API returns single product instead of array)
        const productsArray = Array.isArray(data) ? data : [data];

        // Transform for ProductCard
        const transformed: Product[] = productsArray.map((p) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          originalPrice: Number(p.price) + 500,
          discount: 10,
          rating:
            p.reviews.length > 0
              ? p.reviews.reduce((acc: number, r: ReviewApi) => acc + r.rating, 0) / p.reviews.length
              : 0,
          reviews: p.reviews.length,
          images:
            p.images.length > 0
              ? p.images.map((img: ProductImageApi, idx: number) => ({
                  id: `${p.id}-${idx}`,
                  url: img.url,
                  alt_text: img.alt_text || p.name,
                }))
              : [
                  {
                    id: `${p.id}-0`,
                    url: "/placeholder.png",
                    alt_text: p.name,
                  },
                ],
        }));
        setProducts(transformed);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1 >= products.length ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  if (products.length === 0) {
    return <p className="text-center py-8">Loading products...</p>;
  }

  const extendedProducts = [...products, ...products]; // infinite scroll feel

  return (
    <div className="overflow-hidden relative">
      <div
        ref={containerRef}
        className="flex gap-6 py-8 transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${offset * itemWidth}px)`,
        }}
      >
        {extendedProducts.map((product, idx) => (
          <div key={`${product.id}-${idx}`} className="flex-shrink-0 w-72">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostGiftedCarousel;
