import ProductList from "@/components/ProductList";
import { serverApi } from "@/utils/axios";
import { Metadata } from "next";

interface ApiError {
  message: string;
}

export const metadata: Metadata = {
  title: "Product Collection | My Store",
  description: "Discover our exquisite collection of handcrafted jewelry.",
};

// ⏳ ISR setting (regenerate every 60s)
export const revalidate = 60;

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  category_id: string;
  stock: number;
  created_at: string;
  updated_at: string;
  images: {
    id: string;
    product_id: string;
    url: string;
    alt_text: string;
    created_at: string;
  }[];
  reviews: {
    id: string;
    user_id: string;
    product_id: string;
    rating: number;
    comment?: string | null;
    created_at: string;
    updated_at: string;
  }[];
};

// Fetch all products
async function getProducts(): Promise<Product[]> {
  try {
    const res = await serverApi.get("/products/detailed/all");
    return res.data;
  } catch (error: unknown) {
    console.error("Error fetching products:", (error as ApiError).message);
    return [];
  }
}
interface Props {
  searchParams: { search?: string | undefined };
}

export default async function PLPPage({ searchParams }: Props) {
  const products = await getProducts();
  const searchTerm = searchParams.search ?? "";
  const filtered = searchTerm
    ? products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : products;

  const transformed = filtered.map((p) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    originalPrice: Number(p.price) + 500,
    discount: 10,
    rating:
      p.reviews.length > 0 ? p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length : 0,
    reviews: p.reviews.length,
    images: p.images.length
      ? p.images.map((img, idx) => ({
          id: `${p.id}-${idx}`,
          url: img.url,
          alt_text: img.alt_text || p.name,
        }))
      : [
          {
            id: `${p.id}-0`,
            url: "/placeholder.png",
            alt_text: p.name,
          },
        ],
  }));

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 text-[var(--color-secondary)]">
          Home / <span className="font-medium text-[var(--color-foreground)]">Products</span>
        </nav>

        {/* Header */}
        <header className="mb-12 space-y-3 text-center">
          <h1
            className="text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Collection
          </h1>
          <p
            className="text-lg text-[var(--color-secondary)] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Discover our luxurious, handcrafted jewelry — timeless elegance for every occasion.
          </p>
          <div className="w-24 h-1 mx-auto bg-[var(--color-accent)] rounded-full" />
        </header>

        {/* Product List */}
        <div className="bg-white rounded-[var(--radius-lg)] shadow-sm p-6">
          <ProductList initialProducts={transformed} />
        </div>
      </div>
    </div>
  );
}
