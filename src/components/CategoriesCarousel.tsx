"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface Props {
  categories: Category[];
}

const CategoriesCarousel: React.FC<Props> = ({ categories }) => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemWidth = 304; 
  console.log("hi")

  // Clone categories to allow infinite scroll
  const extendedCategories = [...categories, ...categories];

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        const newOffset = prev + 1;
        if (newOffset >= categories.length) return 0; // loop infinitely
        return newOffset;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [categories.length]);

  return (
    <div className="overflow-hidden relative">
      <div
        ref={containerRef}
        className="flex gap-6 py-8 transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${offset * itemWidth}px)` }}
      >
        {extendedCategories.map((category, idx) => (
          <Card
            onClick={() => router.push(`/products/category/${category.id}`)}
            key={`${category.id}-${idx}`}
            className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="h-48 bg-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {category.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoriesCarousel;
