// src/app/products/[id]/components/ProductDetail.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Share2, ShoppingCart, Truck, Shield, Gem, Star, Minus, Plus } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  sizes: string[];
  materials: string[];
  isNew: boolean;
  isBestseller: boolean;
  isExclusive: boolean;
  stockCount: number;
  description: string;
  longDescription: string;
  features: string[];
  specifications: Record<string, string>;
  category: string;
}

interface Props {
  product: Product;
}

const StarRating: React.FC<{ rating: number; size?: number }> = ({ rating, size = 16 }) => (
  <div className="flex items-center space-x-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ))}
  </div>
);

export default function ProductDetail({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const incrementQuantity = () => quantity < product.stockCount && setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const breadcrumbItems = product
    ? [
        { title: "Home", href: "/" },
        { title: "Jewelry", href: "/products" },
        {
          title: product.category ? product.category : "Unknown",
          href: product.category ? `/category/${product.category.toLowerCase()}` : "#",
        },
        { title: product.name, href: "#" },
      ]
    : [];

  return (
    <div className="max-w-[1400px] mx-auto p-4 sm:p-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 mb-8 text-sm">
        {breadcrumbItems.map((item, i) => (
          <div key={i} className="flex items-center">
            {i > 0 && <span className="mx-2 text-gray-400">/</span>}
            <a href={item.href} className="text-gray-600 hover:text-gray-900">
              {item.title}
            </a>
          </div>
        ))}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Image Gallery */}
        <div>
          <Card className="mb-4">
            <CardContent className="p-0">
              <Image
                src={product.images[selectedImage] || "/placeholder.jpg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </CardContent>
          </Card>

          <div className="flex items-center space-x-2">
            {(product.images || []).map((img, idx) => (
              <Card
                key={idx}
                className="cursor-pointer transition-all duration-200"
                style={{
                  border:
                    selectedImage === idx
                      ? "2px solid var(--color-accent)"
                      : "1px solid var(--color-highlight)",
                  width: "80px",
                  height: "80px",
                  borderRadius: "0.5rem",
                }}
                onClick={() => setSelectedImage(idx)}
              >
                <CardContent className="p-0">
                  <Image
                    src={img || "/placeholder.jpg"}
                    alt={`${product.name} view ${idx + 1}`}
                    width={76}
                    height={76}
                    className="w-full h-full object-cover rounded-md"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          {/* Badges */}
          <div className="flex items-center space-x-2">
            {product.isNew && <Badge className="bg-blue-100 text-blue-800">New</Badge>}
            {product.isBestseller && <Badge className="bg-red-100 text-red-800">Bestseller</Badge>}
            {product.isExclusive && (
              <Badge className="bg-violet-100 text-violet-800">Exclusive</Badge>
            )}
          </div>

          {/* Title & Rating */}
          <div>
            <h1 className="mb-2 text-4xl font-light">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <StarRating rating={product.rating} />
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-semibold text-accent">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg line-through text-gray-500">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-base leading-relaxed">{product.description}</p>
          <Separator />

          {/* Size & Material */}
          <div>
            <label className="block text-sm font-medium mb-2">Ring Size</label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select your size" />
              </SelectTrigger>
              <SelectContent>
                {(product.sizes || []).map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Metal Type</label>
            <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Choose metal" />
              </SelectTrigger>
              <SelectContent>
                {(product.materials || []).map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity & Actions */}
          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center space-x-2 mb-1">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </Button>
              <span className="w-16 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= product.stockCount}
              >
                <Plus size={16} />
              </Button>
            </div>
            <p className="text-xs text-gray-500">{product.stockCount} items in stock</p>
          </div>

          <div className="flex items-center space-x-3 mt-6">
            <Button
              size="lg"
              //   disabled={!selectedSize || !selectedMaterial}
              className="flex-1 h-12 text-white font-medium bg-primary rounded-md"
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart
            </Button>
            <Button
              variant={isWishlisted ? "default" : "outline"}
              size="icon"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`h-12 w-12 ${isWishlisted ? "bg-red-500 text-white" : "border-red-500 text-red-500 hover:bg-red-50"}`}
            >
              <Heart size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <Share2 size={20} />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center space-x-4 mt-6">
            <div className="flex items-center space-x-1">
              <Truck size={16} className="text-accent" />
              <span className="text-xs text-gray-500">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield size={16} className="text-accent" />
              <span className="text-xs text-gray-500">Lifetime Warranty</span>
            </div>
            <div className="flex items-center space-x-1">
              <Gem size={16} className="text-accent" />
              <span className="text-xs text-gray-500">Certified Authentic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <p>{product.longDescription}</p>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="space-y-3">
                {Object.entries(product.specifications || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-medium">{key}:</span>
                    <span className="text-gray-500">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <ul className="space-y-2">
                {(product.features || []).map((f, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    {f}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6 text-gray-500">
              Customer reviews will be displayed here.
            </TabsContent>

            <TabsContent value="care" className="mt-6">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>Clean with a soft, lint-free cloth
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>Store in a jewelry box or soft pouch
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>Avoid contact with chemicals and perfumes
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>Professional cleaning recommended annually
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>Remove before swimming or exercising
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
