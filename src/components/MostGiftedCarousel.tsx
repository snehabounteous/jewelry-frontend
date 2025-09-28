"use client";

import React, { useState, useEffect, useRef } from "react";
import ProductCard, { Product } from "./ProductCard";
import { serverApi } from "@/utils/axios"; // adjust path if needed

const CATEGORY_API =
  "/products/category/f0e9f46f-02c7-4de5-84ca-ae40dd6aeae2";

const MostGiftedCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemWidth = 304;
  const extendedProducts = [...products, ...products]; // for infinite loop feel

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await serverApi.get(CATEGORY_API);

        // Normalize response (API returns single product instead of array)
        const productsArray = Array.isArray(data) ? data : [data];
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Auto-scroll carousel
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
