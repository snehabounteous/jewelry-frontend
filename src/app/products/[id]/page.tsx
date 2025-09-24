// src/app/products/[id]/page.tsx
import ProductDetail from "@/components/ProductDetail";
import { clientApi } from "@/utils/axios";

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
  params: { id: string };
}

async function getProduct(id: string): Promise<Product> {
  const res = await clientApi.get(`/products/${id}`);
  if (res.status !== 200) throw new Error("Product not found");
  return res.data;
}

export default async function ProductPage({ params }: Props) {
  try {
    const product = await getProduct(params.id);

    return <ProductDetail product={product} />;
  } catch (error) {
    return (
      <div className="p-8 text-center text-gray-500">
        Product not found!
      </div>
    );
  }
}
