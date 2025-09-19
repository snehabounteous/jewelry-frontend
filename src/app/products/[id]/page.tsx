// src/app/products/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { 
  Card, 
  Image, 
  Stack, 
  Title, 
  Text, 
  Badge, 
  Button, 
  Group, 
  Divider, 
  ActionIcon,
  Rating,
  Tabs,
  List,
  Select,
  NumberInput,
  Breadcrumbs,
  Anchor
} from "@mantine/core";
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  Truck, 
  Shield, 
  Gem,
  Ruler,
  Star
} from "lucide-react";

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

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Text size="xl" c="var(--color-text-muted)">Product not found!</Text>
      </div>
    );
  }

  const breadcrumbItems = [
    { title: 'Home', href: '/' },
    { title: 'Jewelry', href: '/products' },
    { title: product.category, href: `/category/${product.category.toLowerCase()}` },
    { title: product.name, href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} c="var(--color-text-muted)">
      {item.title}
    </Anchor>
  ));

  return (
    <div style={{ 
      padding: "1rem 2rem", 
      maxWidth: "1400px", 
      margin: "0 auto",
      fontFamily: "var(--font-body)"
    }}>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        style={{ marginBottom: "2rem" }}
        separatorMargin="md"
      >
        {breadcrumbItems}
      </Breadcrumbs>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "3rem",
        marginBottom: "3rem"
      }}>
        {/* Image Gallery */}
        <div>
          <Card radius="lg" shadow="sm" style={{ marginBottom: "1rem" }}>
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              height={500}
              style={{ objectFit: "cover" }}
            />
          </Card>
          
          {/* Thumbnail Gallery */}
          <Group gap="sm">
            {product.images.map((image, index) => (
              <Card 
                key={index}
                radius="md" 
                style={{ 
                  cursor: "pointer",
                  border: selectedImage === index ? "2px solid var(--color-accent)" : "1px solid var(--color-highlight)",
                  width: "80px",
                  height: "80px"
                }}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  height={76}
                  style={{ objectFit: "cover" }}
                />
              </Card>
            ))}
          </Group>
        </div>

        {/* Product Info */}
        <Stack gap="md">
          {/* Badges */}
          <Group gap="xs">
            {product.isNew && <Badge color="blue" variant="light">New</Badge>}
            {product.isBestseller && <Badge color="red" variant="light">Bestseller</Badge>}
            {product.isExclusive && <Badge color="violet" variant="light">Exclusive</Badge>}
          </Group>

          {/* Title & Rating */}
          <div>
            <Title 
              order={1} 
              style={{ 
                fontFamily: "var(--font-heading)",
                color: "var(--color-text-dark)",
                fontSize: "2.5rem",
                marginBottom: "0.5rem"
              }}
            >
              {product.name}
            </Title>
            <Group gap="sm" align="center">
              <Rating value={product.rating} fractions={2} readOnly size="sm" />
              <Text size="sm" c="var(--color-text-muted)">
                {product.rating} ({product.reviewCount} reviews)
              </Text>
            </Group>
          </div>

          {/* Price */}
          <Group align="end" gap="sm">
            <Text 
              size="xl" 
              fw={600}
              style={{ 
                color: "var(--color-accent)",
                fontSize: "2rem"
              }}
            >
              ${product.price.toLocaleString()}
            </Text>
            {product.originalPrice && (
              <Text 
                size="lg" 
                td="line-through" 
                c="var(--color-text-muted)"
              >
                ${product.originalPrice.toLocaleString()}
              </Text>
            )}
          </Group>

          {/* Description */}
          <Text size="md" c="var(--color-text-dark)" style={{ lineHeight: 1.6 }}>
            {product.description}
          </Text>

          <Divider />

          {/* Size Selection */}
          <div>
            <Text size="sm" fw={500} mb="xs" c="var(--color-text-dark)">
              Ring Size
            </Text>
            <Select
              placeholder="Select your size"
              data={product.sizes}
              value={selectedSize}
              onChange={(value) => setSelectedSize(value || "")}
              style={{ maxWidth: "200px" }}
            />
          </div>

          {/* Material Selection */}
          <div>
            <Text size="sm" fw={500} mb="xs" c="var(--color-text-dark)">
              Metal Type
            </Text>
            <Select
              placeholder="Choose metal"
              data={product.materials}
              value={selectedMaterial}
              onChange={(value) => setSelectedMaterial(value || "")}
              style={{ maxWidth: "200px" }}
            />
          </div>

          {/* Quantity */}
          <div>
            <Text size="sm" fw={500} mb="xs" c="var(--color-text-dark)">
              Quantity
            </Text>
            <NumberInput
              value={quantity}
              onChange={(value) => setQuantity(Number(value) || 1)}
              min={1}
              max={product.stockCount}
              style={{ maxWidth: "120px" }}
            />
            <Text size="xs" c="var(--color-text-muted)" mt="xs">
              {product.stockCount} items in stock
            </Text>
          </div>

          {/* Action Buttons */}
          <Group gap="md" mt="lg">
            <Button
              size="lg"
              radius="md"
              leftSection={<ShoppingCart size={20} />}
              style={{ 
                background: "var(--color-primary)",
                flex: 1,
                height: "50px"
              }}
              disabled={!selectedSize || !selectedMaterial}
            >
              Add to Cart
            </Button>
            
            <ActionIcon
              size="xl"
              variant={isWishlisted ? "filled" : "outline"}
              color="red"
              onClick={() => setIsWishlisted(!isWishlisted)}
              style={{ height: "50px", width: "50px" }}
            >
              <Heart size={20} />
            </ActionIcon>
            
            <ActionIcon
              size="xl"
              variant="outline"
              color="gray"
              style={{ height: "50px", width: "50px" }}
            >
              <Share2 size={20} />
            </ActionIcon>
          </Group>

          {/* Trust Badges */}
          <Group gap="md" mt="lg">
            <Group gap="xs">
              <Truck size={16} color="var(--color-accent)" />
              <Text size="xs" c="var(--color-text-muted)">Free Shipping</Text>
            </Group>
            <Group gap="xs">
              <Shield size={16} color="var(--color-accent)" />
              <Text size="xs" c="var(--color-text-muted)">Lifetime Warranty</Text>
            </Group>
            <Group gap="xs">
              <Gem size={16} color="var(--color-accent)" />
              <Text size="xs" c="var(--color-text-muted)">Certified Authentic</Text>
            </Group>
          </Group>
        </Stack>
      </div>

      {/* Product Details Tabs */}
      <Card radius="lg" shadow="sm" style={{ marginTop: "2rem" }}>
        <Tabs defaultValue="description" variant="pills">
          <Tabs.List>
            <Tabs.Tab value="description">Description</Tabs.Tab>
            <Tabs.Tab value="specifications">Specifications</Tabs.Tab>
            <Tabs.Tab value="features">Features</Tabs.Tab>
            <Tabs.Tab value="reviews">Reviews ({product.reviewCount})</Tabs.Tab>
            <Tabs.Tab value="care">Care Instructions</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="description" pt="lg">
            <Text size="md" style={{ lineHeight: 1.7 }}>
              {product.longDescription}
            </Text>
          </Tabs.Panel>

          <Tabs.Panel value="specifications" pt="lg">
            <Stack gap="sm">
              {Object.entries(product.specifications).map(([key, value]) => (
                <Group key={key} justify="space-between">
                  <Text fw={500} c="var(--color-text-dark)">{key}:</Text>
                  <Text c="var(--color-text-muted)">{value}</Text>
                </Group>
              ))}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="features" pt="lg">
            <List spacing="sm" size="md">
              {product.features.map((feature, index) => (
                <List.Item key={index}>{feature}</List.Item>
              ))}
            </List>
          </Tabs.Panel>

          <Tabs.Panel value="reviews" pt="lg">
            <Text size="md" c="var(--color-text-muted)">
              Customer reviews will be displayed here.
            </Text>
          </Tabs.Panel>

          <Tabs.Panel value="care" pt="lg">
            <List spacing="sm" size="md">
              <List.Item>Clean with a soft, lint-free cloth</List.Item>
              <List.Item>Store in a jewelry box or soft pouch</List.Item>
              <List.Item>Avoid contact with chemicals and perfumes</List.Item>
              <List.Item>Professional cleaning recommended annually</List.Item>
              <List.Item>Remove before swimming or exercising</List.Item>
            </List>
          </Tabs.Panel>
        </Tabs>
      </Card>
    </div>
  );
}