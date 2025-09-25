import ProductList from "@/components/ProductList";
import { serverApi } from "@/utils/axios";
import { Metadata } from "next";

interface ApiError {
  message: string;
}

export const metadata: Metadata = {
  title: "Product Collection | My Store",
  description: "Discover our exquisite collection of handcrafted earrings.",
};

// ⏳ ISR setting
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
  images: string[];
};

async function getProducts(): Promise<Product[]> {
  try {
    const res = await serverApi.get("/products");
    return res.data;
  } catch (error: unknown) {
    console.error("Error fetching products:", (error as ApiError).message);
    return [];
  }
}

export default async function PLPPage() {
  const products = await getProducts();

  const transformed = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    originalPrice: Number(p.price) + 500,
    discount: 10,
    rating: 4.5,
    reviews: 12,
    images: [
      {
        id: `${p.id}-0`,
        url: p.images?.[0] || "/placeholder.png",
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
            Discover our luxurious, handcrafted earrings — timeless elegance for every occasion.
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
