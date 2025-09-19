import ProductCard from "@/components/ProductCard";
import {
  Box,
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Grid,
  Paper,
  Center,
  Badge,
  SimpleGrid,
} from "@mantine/core";
import { Star, ChevronRight, Play, Crown } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Eternal Diamond Ring",
    price: "$12,999",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
    category: "Rings",
    isNew: true,
  },
  {
    id: 2,
    name: "Royal Sapphire Necklace",
    price: "$24,999",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    category: "Necklaces",
    isBestseller: true,
  },
  {
    id: 3,
    name: "Golden Aurora Earrings",
    price: "$8,499",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
    category: "Earrings",
  },
  {
    id: 4,
    name: "Platinum Heritage Watch",
    price: "$45,999",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400",
    category: "Watches",
    isExclusive: true,
  },
];

export default function HomePage() {
  return (
    <Box style={{ background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)" }}>
      {/* Hero Section, Featured Products, Services, Testimonials, CTA */}
      <Container size="xl" py="6rem" component="section" aria-labelledby="featured-collection">
        <Stack gap="3rem" align="center">
          <Stack gap="md" align="center">
            <Title id="featured-collection" order={1} size="3rem" fw={300} ta="center">
              Featured Collection
            </Title>
            <Text size="lg" ta="center" maw={600} c="var(--color-text-dark)">
              Handpicked masterpieces that embody our commitment to excellence and timeless beauty
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl" role="list">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
