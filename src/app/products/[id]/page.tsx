// src/app/products/[id]/page.tsx
import ProductDetail, { Product } from "@/components/ProductDetail";
import { clientApi } from "@/utils/axios";

interface Props {
  params: Promise<{ id: string }>; // params is a Promise
}

async function getProduct(id: string): Promise<Product> {
  const res = await clientApi.get(`/products/${id}`);
  if (res.status !== 200) throw new Error("Product not found");
  return res.data;
}

export default async function ProductPage({ params }: Props) {
  try {
    const { id } = await params; // ✅ await the params promise
    const product = await getProduct(id);

    return <ProductDetail product={product} />; // ✅ valid
  } catch {
    return (
      <div className="p-8 text-center text-gray-500">
        Product not found!
      </div>
    );
  }
}
