"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import debounce from "lodash.debounce";
import SearchAndFilters from "./SearchAndFilters";
import ProductCard, { Product } from "./ProductCard";
import { clientApi } from "@/utils/axios";
import { useWishlist } from "@/store/useWishlist";
import { useUserStore } from "@/store/useUserStore";

interface ProductListProps {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [category, setCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { isLoggedIn, loading } = useUserStore();
  const { fetchWishlist } = useWishlist();

  useEffect(() => {
    if (!loading && isLoggedIn) fetchWishlist();
  }, [loading, isLoggedIn]);

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
      } catch (err) {
        console.error("Error fetching products:", err);
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
    return () => handler.cancel();
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
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted = [...products];
    }
    setProducts(sorted);
  };

  return (
    <div className="space-y-8 font-body">
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

      {products.length > 0 ? (
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
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
