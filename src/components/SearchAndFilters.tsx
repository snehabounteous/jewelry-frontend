"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Grid, List, Search } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { clientApi } from "@/utils/axios";

interface Category {
  id: string;
  name: string;
}

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  minPrice?: number;
  maxPrice?: number;
  category?: string; 
  onFilterChange: (filters: { minPrice?: number; maxPrice?: number; category?: string }) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function SearchAndFilters({
  searchTerm,
  onSearchChange,
  minPrice,
  maxPrice,
  category,
  onFilterChange,
  viewMode,
  setViewMode,
  sortBy,
  onSortChange,
}: FiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice );
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [localCategory, setLocalCategory] = useState(category || "");

  useEffect(() => {
  const fetchCategories = async () => {
    try {

      const res = await clientApi.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  fetchCategories();
}, []);


  useEffect(() => {
  onFilterChange({
    minPrice: localMinPrice,
    maxPrice: localMaxPrice,
    category: localCategory === "all" ? undefined : localCategory,
  });
}, [localMinPrice, localMaxPrice, localCategory, onFilterChange]);


  return (
    <div className="space-y-6 bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-secondary/30 shadow-md">
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
        <Input
          placeholder="Search our collection..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-12 bg-background border border-secondary/30 rounded-lg focus:ring-accent focus:border-accent"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Select value={localCategory} onValueChange={setLocalCategory}>
  <SelectTrigger
    className="w-[180px] bg-[var(--color-background)]/90 backdrop-blur-sm text-[var(--color-foreground)] border border-[var(--color-secondary)]/30 rounded-[var(--radius-lg)] focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
  >
    <SelectValue placeholder="Category" />
  </SelectTrigger>
  <SelectContent
    className="bg-[var(--color-background)]/95 backdrop-blur-sm text-[var(--color-foreground)] border border-[var(--color-secondary)]/30 rounded-[var(--radius-md)] shadow-lg z-[9999] overflow-y-auto max-h-64"
  >
    <SelectItem
      key="all"
      value="all"
      className="hover:bg-[var(--color-highlight)] hover:text-[var(--color-foreground)] rounded-[var(--radius-sm)]"
    >
      All
    </SelectItem>
    {categories.map((cat) => (
      <SelectItem
        key={cat.id}
        value={cat.id}
        className="hover:bg-[var(--color-highlight)] hover:text-[var(--color-foreground)] rounded-[var(--radius-sm)]"
      >
        {cat.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="Min ₹"
            value={localMinPrice}
            onChange={(e) => setLocalMinPrice(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-secondary">to</span>
          <Input
            type="number"
            placeholder="Max ₹"
            value={localMaxPrice}
            onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
            className="w-24"
          />
        </div>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="name">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex border border-secondary/30 rounded-lg overflow-hidden">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-12 bg-secondary/30" />
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
