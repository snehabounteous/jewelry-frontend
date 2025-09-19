"use client";

import { Card, Image, Stack, Text, Title, Badge, ActionIcon } from "@mantine/core";
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
  return (
    <Card
      radius="xl"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      styles={{
        root: {
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          },
        },
      }}
    >
      <Card.Section style={{ position: 'relative' }}>
        <Image
          src={product.image}
          alt={product.name}
          height={250}
          style={{ objectFit: 'cover' }}
        />
        {product.isNew && (
          <Badge
            variant="filled"
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: 'var(--color-accent)',
            }}
          >
            New
          </Badge>
        )}
        {product.isBestseller && (
          <Badge
            variant="filled"
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: '#e11d48',
            }}
          >
            Bestseller
          </Badge>
        )}
        {product.isExclusive && (
          <Badge
            variant="filled"
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: '#7c3aed',
            }}
          >
            Exclusive
          </Badge>
        )}
        <ActionIcon
          variant="filled"
          size="lg"
          radius="xl"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'rgba(255, 255, 255, 0.9)',
            color: 'var(--color-primary)',
          }}
        >
          <Heart size={18} />
        </ActionIcon>
      </Card.Section>

      <Stack gap="md" p="md">
        <Text size="sm" c="var(--color-accent)" fw={500} style={{ fontFamily: 'var(--font-body)' }}>
          {product.category}
        </Text>
        <Title order={4} fw={400} style={{ fontFamily: 'var(--font-heading)' }}>
          {product.name}
        </Title>
        <Text size="lg" fw={600} c="var(--color-accent)" style={{ fontFamily: 'var(--font-body)' }}>
          {product.price}
        </Text>
      </Stack>
    </Card>
  );
}
