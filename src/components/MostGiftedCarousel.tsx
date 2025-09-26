"use client";

import React, { useState, useEffect, useRef } from "react";
import ProductCard, { Product } from "./ProductCard";

interface MostGiftedCarouselProps {
  products: Product[];
}

const MostGiftedCarousel: React.FC<MostGiftedCarouselProps> = ({ products }) => {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemWidth = 304;

  const extendedProducts = [...products, ...products];

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1 >= products.length ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

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
