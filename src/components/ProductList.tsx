"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { clientApi } from "@/utils/axios";
import debounce from "lodash.debounce";
import SearchAndFilters from "./SearchAndFilters";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface Product {
  id: number | string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  material?: string;
  stone?: string;
  collection?: string;
}

interface ProductListProps {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [category, setCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState("featured");

  const handleAddToCart = async (productId: number | string) => {
    try {
      const res = await clientApi.post("/cart/add", {
        product_id: productId,
        quantity: 1,
      });
      toast.success("Added to cart!");
    } catch (err: any) {
      const msg = err.response?.data?.error || "Failed to add to cart";
      toast.error(msg);
    }
  };

  const fetchProducts = useCallback(
    async (params?: {
      keyword?: string;
      min_price?: number;
      max_price?: number;
      category_id?: string;
    }) => {
      try {
        if (!params || Object.keys(params).every((k) => !params[k as keyof typeof params])) {
          setProducts(initialProducts);
          return;
        }

        const query = new URLSearchParams(
          Object.entries(params)
            .filter(([_, v]) => v !== undefined && v !== "")
            .map(([k, v]) => [k, String(v)])
        );

        const res = await clientApi.get(`/search?${query.toString()}`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    },
    [initialProducts]
  );

  const debouncedSearchRef = useRef(
    debounce((term: string, min?: number, max?: number, cat?: string) => {
      fetchProducts({ keyword: term, min_price: min, max_price: max, category_id: cat });
    }, 500)
  );

  useEffect(() => {
    debouncedSearchRef.current(searchTerm, minPrice, maxPrice, category);
  }, [searchTerm, minPrice, maxPrice, category]);

  useEffect(() => {
    const handler = debouncedSearchRef.current;
    return () => {
      handler.cancel();
    };
  }, []);

  const handleSort = (value: string) => {
    setSortBy(value);
    let sorted = [...products];
    switch (value) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted = [...products];
    }
    setProducts(sorted);
  };

  const renderStars = (rating: number) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-accent" : "text-secondary"}`}
      />
    ));

  return (
    <div className="space-y-8 font-body">
      {/* Search & Filter Toolbar */}
      <SearchAndFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        minPrice={minPrice}
        maxPrice={maxPrice}
        category={category}
        onFilterChange={({ minPrice, maxPrice, category }) => {
          setMinPrice(minPrice);
          setMaxPrice(maxPrice);
          setCategory(category || "");
        }}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortBy={sortBy}
        onSortChange={handleSort}
      />

      {/* Product Grid/List */}
      {products.length > 0 ? (
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {products.map((product, index) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group">
              <Card className="relative bg-background/80 border border-secondary/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      height={500}
                      width={500}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
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
                    {renderStars(product.rating)}
                    <span className="text-sm text-secondary font-medium">{product.rating}</span>
                    <span className="text-xs text-secondary">({product.reviews} reviews)</span>
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
      ) : (
        <div className="text-center py-20">
          <div className="bg-background/80 rounded-xl p-12 border border-secondary/30 shadow-md max-w-md mx-auto">
            <div className="text-8xl mb-6 text-accent opacity-60">💎</div>
            <h3 className="text-2xl font-heading text-foreground mb-2">No treasures found</h3>
            <p className="text-secondary">
              {searchTerm
                ? `No products match "${searchTerm}". Try a different search.`
                : "Our collection is currently being curated."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
