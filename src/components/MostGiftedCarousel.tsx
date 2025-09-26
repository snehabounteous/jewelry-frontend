"use client";

import React, { useState, useEffect, useRef } from "react";
import ProductCard, { Product } from "./ProductCard";
import axios from "axios";

const CATEGORY_ID = "f0e9f46f-02c7-4de5-84ca-ae40dd6aeae2";

const MostGiftedCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemWidth = 304;

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<Product[]>(
          `http://localhost:4000/api/v1/products/category/${CATEGORY_ID}`
        );
        // Map API data to Product interface
        const mappedProducts: Product[] = res.data.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
          discount: p.discount,
          rating: p.rating,
          reviews: p.reviews,
          images: p.images.map((img: any) => ({
            id: img.id,
            url: img.url,
            alt_text: img.alt_text,
          })),
        }));
        setProducts(mappedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Carousel auto-scroll
  const extendedProducts = [...products, ...products];

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1 >= products.length ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  if (products.length === 0) return <div>Loading products...</div>;

  return (
    <div className="overflow-hidden relative">
      <div
        ref={containerRef}
        className="flex gap-6 py-8 transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${offset * itemWidth}px)` }}
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
