"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingBag, Heart } from "lucide-react";
import Image from "next/image";
import { clientApi } from "@/utils/axios";
import { toast } from "sonner";
import { useWishlist } from "@/store/useWishlist";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export interface ProductImage {
  id: string;
  url: string;
  alt_text?: string;
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  images: ProductImage[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const rating = product.rating ?? 0;
  const reviews = product.reviews ?? 0;
  const images = product.images ?? [];
  const router = useRouter();

  const { items, add, remove, isInWishlist, fetchWishlist } = useWishlist();
  const { isLoggedIn } = useUserStore();
  const [isWishlisted, setIsWishlisted] = useState(false);
  useEffect(() => {
    if (isLoggedIn) fetchWishlist();
  }, [isLoggedIn, fetchWishlist]);

  // Update local state whenever wishlist changes
  useEffect(() => {
    setIsWishlisted(isInWishlist(String(product.id)));
  }, [items, product.id, isInWishlist]);
  const handleAddToCart = async () => {
    try {
      await clientApi.post("/cart/add", { product_id: product.id, quantity: 1 });
      toast.success("Added to cart!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to add to cart");
    }
  };

  const handleWishlistToggle = async () => {
    try {
      if (isWishlisted) {
        await clientApi.delete(`/wishlist/remove/${product.id}`);
        remove(String(product.id));
        toast.success("Removed from wishlist");
      } else {
        await clientApi.post("/wishlist/add", { product_id: product.id });
        add(String(product.id));
        toast.success("Added to wishlist");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Wishlist action failed");
    }
  };

  const handleCardClick = () => {
    router.push(`/products/${product.id}`); // Navigate to PDP
  };


  return (
    <Card className="relative bg-background/80 border border-secondary/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
    onClick={() => router.push(`/products/${product.id}`)}>
      <CardHeader className="p-0 relative">
        <div className="relative aspect-square overflow-hidden">
          {images.length > 0 ? (
            <Image
              height={500}
              width={500}
              src={images[0].url.trimEnd()}
              alt={images[0].alt_text || product.name}
              className="w-full h-full object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
              No Image
            </div>
          )}

          {product.discount && (
            <Badge className="absolute top-3 left-3 bg-accent text-primary-foreground px-3 py-1 text-xs font-semibold rounded-md shadow-md">
              {product.discount}% OFF
            </Badge>
          )}

          <Heart
            className={`absolute top-3 right-3 h-5 w-5 cursor-pointer transition-colors ${
              isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleWishlistToggle();
            }}
          />
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <h3 className="font-heading text-lg text-foreground line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => {
            if (rating >= i + 1) {
              // full star
              return (
                <svg
                  key={i}
                  className="h-4 w-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
                </svg>
              );
            } else {
              // empty star
              return <Star key={i} className="h-4 w-4 text-gray-300" />;
            }
          })}

          <span className="text-sm text-secondary font-medium">{rating.toFixed(1)}</span>
          <span className="text-xs text-secondary">({reviews} reviews)</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-heading font-bold text-accent">
            ₹{new Intl.NumberFormat("en-IN").format(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-lg line-through text-secondary font-medium">
              ₹{new Intl.NumberFormat("en-IN").format(product.originalPrice)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full h-12 bg-accent hover:bg-accent/90 text-primary-foreground font-heading font-semibold rounded-lg shadow-md transition-all"
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
