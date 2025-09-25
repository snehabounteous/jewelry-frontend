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
        setProducts(res.data ?? []);
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
          <Link href={`/products/${product.id}`} key={product.id} className="group">
            <Card className="relative bg-background/80 border border-secondary/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
              <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  {product.images.length > 0 ? (
                    <Image
                      height={500}
                      width={500}
                      src={product.images[0].url}
                      alt={product.images[0].alt_text || product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                <h3 className="font-heading text-lg text-foreground line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  {renderStars(product.rating ?? 0)}
                  {product.rating && (
                    <span className="text-sm text-secondary font-medium">{product.rating}</span>
                  )}
                  {product.reviews && (
                    <span className="text-xs text-secondary">({product.reviews} reviews)</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-heading font-bold text-accent">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg line-through text-secondary font-medium">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product.id);
                  }}
                  className="w-full h-12 bg-accent hover:bg-accent/90 text-primary-foreground font-heading font-semibold rounded-lg shadow-md transition-all"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}