"use client";

import { Container, SimpleGrid, Title } from "@mantine/core";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    id: 1,
    name: "Diamond Ring",
    price: "₹25,000",
    image: "/images/ring1.jpg",
    category: "Rings",
    isNew: true,
  },
  {
    id: 2,
    name: "Gold Necklace",
    price: "₹45,000",
    image: "/images/necklace1.jpg",
    category: "Necklaces",
    isBestseller: true,
  },
  {
    id: 3,
    name: "Silver Bracelet",
    price: "₹12,000",
    image: "/images/bracelet1.jpg",
    category: "Bracelets",
    isExclusive: true,
  },
  {
    id: 4,
    name: "Pearl Earrings",
    price: "₹8,000",
    image: "/images/earrings1.jpg",
    category: "Earrings",
  },
  {
    id: 5,
    name: "Platinum Pendant",
    price: "₹60,000",
    image: "/images/pendant1.jpg",
    category: "Pendants",
  },
  {
    id: 6,
    name: "Ruby Ring",
    price: "₹35,000",
    image: "/images/ring2.jpg",
    category: "Rings",
    isNew: true,
  },
];

export default function ProductsPage() {
  return (
    <Container size="xl" py="xl">
      <Title
        order={2}
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--color-primary)",
          marginBottom: "2rem",
        }}
      >
        Our Collection
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
