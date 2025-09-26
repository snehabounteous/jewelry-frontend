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
  images: { id: string; url: string; alt_text: string }[];
  reviews: {
    id: string;
    user_id: string;
    product_id: string;
    rating: number;
    review: string;
    created_at: string;
    updated_at: string;
  }[];
};

// Fetch all products
async function getProducts(): Promise<Product[]> {
  try {
    const res = await serverApi.get("/products");
    const products = res.data;

    // Fetch details for each product to get reviews
    const productsWithDetails: Product[] = await Promise.all(
      products.map(async (p: any) => {
        try {
          const detailRes = await serverApi.get(`/products/${p.id}/details`);
          return detailRes.data;
        } catch {
          // fallback if details API fails
          return { ...p, reviews: [], images: [] };
        }
      })
    );

    return productsWithDetails;
  } catch (error: unknown) {
    console.error("Error fetching products:", (error as ApiError).message);
    return [];
  }
}

export default async function PLPPage() {
  const products = await getProducts();

  const transformed = products.map((p) => {
    const reviewsArray = p.reviews || [];

    const rating =
      reviewsArray.length > 0
        ? reviewsArray.reduce((sum, r) => sum + r.rating, 0) / reviewsArray.length
        : 0;

    return {
      id: p.id,
      name: p.name,
      price: Number(p.price),
      originalPrice: Number(p.price) + 500,
      discount: 10,
      rating,
      reviews: reviewsArray.length,
      images:
        p.images && p.images.length > 0
          ? p.images
          : [
              {
                id: `${p.id}-0`,
                url: "/placeholder.png",
                alt_text: p.name,
              },
            ],
    };
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 text-[var(--color-secondary)]">
          Home /{" "}
          <span className="font-medium text-[var(--color-foreground)]">
            Products
          </span>
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
            Discover our luxurious, handcrafted earrings — timeless elegance for
            every occasion.
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
