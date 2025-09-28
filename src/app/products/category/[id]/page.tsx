import CategoryClientPage from "./CategoryClientPage";

export default async function ProductsByCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ works in server component
  return <CategoryClientPage categoryId={id} />; // ✅ pass down to client
}