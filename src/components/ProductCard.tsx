"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
  isExclusive?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Determine which badge to show (priority: New > Bestseller > Exclusive)
  let badgeText = "";
  let badgeColor = "";
  if (product.isNew) {
    badgeText = "New";
    badgeColor = "var(--color-accent)";
  } else if (product.isBestseller) {
    badgeText = "Bestseller";
    badgeColor = "#e11d48";
  } else if (product.isExclusive) {
    badgeText = "Exclusive";
    badgeColor = "#7c3aed";
  }

  return (
    <Link href={`/products/${product.id}`} className="text-inherit no-underline">
      <div
        className="relative rounded-xl bg-white/80 backdrop-blur-[20px] border border-white/20 cursor-pointer transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
      >
        {/* Image Section */}
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={250}
            className="object-cover w-full h-[250px] rounded-t-xl"
          />

          {/* Badge */}
          {badgeText && (
            <span
              className="absolute top-3 left-3 px-2 py-1 rounded text-white text-xs font-semibold"
              style={{ background: badgeColor }}
            >
              {badgeText}
            </span>
          )}

          {/* Heart Icon */}
          <div
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255, 255, 255, 0.9)", color: "var(--color-primary)" }}
          >
            <Heart size={18} />
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col gap-3 p-4">
          <span
            className="text-[var(--color-accent)] text-sm font-medium"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {product.category}
          </span>
          <h4
            className="text-base font-normal"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {product.name}
          </h4>
          <span
            className="text-[var(--color-accent)] text-lg font-semibold"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {product.price}
          </span>
        </div>
      </div>
    </Link>
  );
}
