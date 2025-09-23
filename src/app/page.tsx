import ProductCard from "@/components/ProductCard";


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
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      {/* Hero Section, Featured Products, Services, Testimonials, CTA */}
      <section 
        className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8" 
        aria-labelledby="featured-collection"
      >
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 
              id="featured-collection" 
              className="text-5xl font-light text-gray-900 tracking-tight"
            >
              Featured Collection
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
              Handpicked masterpieces that embody our commitment to excellence and timeless beauty
            </p>
          </div>

          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
            role="list"
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}