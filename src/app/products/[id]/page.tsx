// src/app/products/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
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
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  Truck, 
  Shield, 
  Gem,
  Star,
  Minus,
  Plus
} from "lucide-react";
import Image from "next/image";

// Enhanced product data
const products = [
  {
    id: 1,
    name: "Eternal Elegance Diamond Ring",
    price: 1299,
    originalPrice: 1499,
    images: [
      "/images/ring1.jpg",
      "/images/ring1-side.jpg", 
      "/images/ring1-detail.jpg",
      "/images/ring1-hand.jpg"
    ],
    category: "Engagement Rings",
    description: "A stunning solitaire diamond ring featuring a brilliant-cut 1-carat diamond set in 18k white gold. This timeless piece symbolizes eternal love and commitment.",
    longDescription: "Crafted with meticulous attention to detail, this engagement ring features a premium VS1 clarity diamond that sparkles brilliantly from every angle. The classic six-prong setting maximizes light reflection while securely holding the precious stone.",
    isNew: true,
    isBestseller: false,
    isExclusive: true,
    rating: 4.8,
    reviewCount: 127,
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"],
    materials: ["18k White Gold", "18k Yellow Gold", "18k Rose Gold"],
    features: [
      "1 Carat Brilliant Cut Diamond",
      "VS1 Clarity, F Color Grade", 
      "18k Gold Band",
      "Six-Prong Setting",
      "Lifetime Warranty",
      "Free Resizing"
    ],
    specifications: {
      "Metal Type": "18k White Gold",
      "Diamond Weight": "1.00 Carat",
      "Diamond Cut": "Round Brilliant",
      "Diamond Color": "F",
      "Diamond Clarity": "VS1",
      "Setting Style": "Solitaire",
      "Band Width": "2mm"
    },
    inStock: true,
    stockCount: 8
  },
  // Add other products...
];

const StarRating: React.FC<{ rating: number; size?: number }> = ({ rating, size = 16 }) => {
  return (
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
};

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);
  
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  if (!product) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p className="text-xl text-gray-500">Product not found!</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { title: 'Home', href: '/' },
    { title: 'Jewelry', href: '/products' },
    { title: product.category, href: `/category/${product.category.toLowerCase()}` },
    { title: product.name, href: '#' },
  ];

  const incrementQuantity = (): void => {
    if (quantity < product.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div style={{ 
      padding: "1rem 2rem", 
      maxWidth: "1400px", 
      margin: "0 auto",
      fontFamily: "var(--font-body)"
    }}>
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 mb-8 text-sm">
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            <a 
              href={item.href} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
              style={{ color: "var(--color-text-muted)" }}
            >
              {item.title}
            </a>
          </div>
        ))}
      </nav>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "3rem",
        marginBottom: "3rem"
      }}>
        {/* Image Gallery */}
        <div>
          <Card className="mb-4" style={{ borderRadius: "0.75rem", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}>
            <CardContent className="p-0">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </CardContent>
          </Card>
          
          {/* Thumbnail Gallery */}
          <div className="flex items-center space-x-2">
            {product.images.map((image, index) => (
              <Card 
                key={index}
                className="cursor-pointer transition-all duration-200 hover:shadow-md"
                style={{ 
                  border: selectedImage === index ? "2px solid var(--color-accent)" : "1px solid var(--color-highlight)",
                  width: "80px",
                  height: "80px",
                  borderRadius: "0.5rem"
                }}
                onClick={() => setSelectedImage(index)}
              >
                <CardContent className="p-0">
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
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
            {product.isExclusive && <Badge className="bg-violet-100 text-violet-800">Exclusive</Badge>}
          </div>

          {/* Title & Rating */}
          <div>
            <h1 
              className="mb-2"
              style={{ 
                fontFamily: "var(--font-heading)",
                color: "var(--color-text-dark)",
                fontSize: "2.5rem",
                fontWeight: 300
              }}
            >
              {product.name}
            </h1>
            <div className="flex items-center space-x-2">
              <StarRating rating={product.rating} />
              <span 
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end space-x-2">
            <span 
              className="text-3xl font-semibold"
              style={{ 
                color: "var(--color-accent)",
                fontSize: "2rem"
              }}
            >
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span 
                className="text-lg line-through"
                style={{ color: "var(--color-text-muted)" }}
              >
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Description */}
          <p 
            className="text-base leading-relaxed"
            style={{ color: "var(--color-text-dark)", lineHeight: 1.6 }}
          >
            {product.description}
          </p>

          <Separator />

          {/* Size Selection */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text-dark)" }}
            >
              Ring Size
            </label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select your size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Material Selection */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text-dark)" }}
            >
              Metal Type
            </label>
            <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Choose metal" />
              </SelectTrigger>
              <SelectContent>
                {product.materials.map((material) => (
                  <SelectItem key={material} value={material}>
                    {material}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text-dark)" }}
            >
              Quantity
            </label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10"
              >
                <Minus size={16} />
              </Button>
              <span className="w-16 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= product.stockCount}
                className="h-10 w-10"
              >
                <Plus size={16} />
              </Button>
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              {product.stockCount} items in stock
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 mt-6">
            <Button
              size="lg"
              disabled={!selectedSize || !selectedMaterial}
              className="flex-1 h-12 text-white font-medium"
              style={{ 
                background: "var(--color-primary)",
                borderRadius: "0.5rem"
              }}
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart
            </Button>
            
            <Button
              variant={isWishlisted ? "default" : "outline"}
              size="icon"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`h-12 w-12 ${isWishlisted ? 'bg-red-500 text-white' : 'border-red-500 text-red-500 hover:bg-red-50'}`}
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
              <Truck size={16} color="var(--color-accent)" />
              <span 
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                Free Shipping
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield size={16} color="var(--color-accent)" />
              <span 
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                Lifetime Warranty
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Gem size={16} color="var(--color-accent)" />
              <span 
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                Certified Authentic
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Card style={{ marginTop: "2rem", borderRadius: "0.75rem", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}>
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
              <p className="text-base leading-relaxed">
                {product.longDescription}
              </p>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span 
                      className="font-medium"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      {key}:
                    </span>
                    <span style={{ color: "var(--color-text-muted)" }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <ul className="space-y-2 text-base">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <p 
                className="text-base"
                style={{ color: "var(--color-text-muted)" }}
              >
                Customer reviews will be displayed here.
              </p>
            </TabsContent>

            <TabsContent value="care" className="mt-6">
              <ul className="space-y-2 text-base">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Clean with a soft, lint-free cloth
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Store in a jewelry box or soft pouch
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Avoid contact with chemicals and perfumes
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Professional cleaning recommended annually
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Remove before swimming or exercising
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailsPage;