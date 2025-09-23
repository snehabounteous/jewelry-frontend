import ProductList from "@/components/ProductList";
import { serverApi } from "@/utils/axios";
import { Metadata } from "next";


interface ApiError {
  message: string;
}

export const metadata: Metadata = {
  title: "Earrings Collection | My Store",
  description: "Discover our exquisite collection of handcrafted earrings.",
};

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
    console.log("Hitting URL:", `${process.env.NEXT_PUBLIC_API_URL}/products`);
    const res = await serverApi.get("/products");
    console.log("Fetched products:", res.data);
    return res.data;
  } catch (error: unknown) {
    console.error("Error fetching products:", (error as ApiError).message);
    return [];
  }
}
export default async function PLPPage() {
  const products = await getProducts();

  const transformed = products.map((p) => ({
    id: Number(p.id),
    name: p.name,
    price: Number(p.price),
    originalPrice: Number(p.price) + 500,
    discount: 10,
    rating: 4.5,
    reviews: 12,
    image: p.images?.[0] || "/placeholder.png",
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4 py-10">
        <nav className="text-sm mb-6 text-muted-foreground">
          Home / <span className="font-medium text-foreground">Earrings</span>
        </nav>

        <header className="mb-10 space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Earrings Collection</h1>
          <p className="text-muted-foreground">Discover our luxurious, handcrafted earrings.</p>
        </header>

        {/* Pass transformed products */}
        <ProductList initialProducts={transformed} />
      </div>
    </div>
  );
}
