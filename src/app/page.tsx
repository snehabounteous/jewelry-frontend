import React from "react";
import HeroCarousel from "../components/HeroCarousel";
// import CategoriesCarousel from "../components/CategoriesCarousel";
import CustomerStories from "../components/CustomerStories";
import { serverApi } from "../utils/axios";
import image1 from "../../public/images/jewel1.webp"
import image2 from "../../public/images/jewel2.webp"
import image3 from "../../public/images/jewel3.webp"

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  imageUrl: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Timeless Elegance",
    subtitle: "Discover our exquisite collection of handcrafted jewelry",
    ctaText: "Explore Collection",
    imageUrl: image1.src,
  },
  {
    id: 2,
    title: "Crafted Perfection",
    subtitle: "Each piece tells a story of artisan mastery and luxury",
    ctaText: "Shop Now",
    imageUrl: image2.src,
  },
  {
    id: 3,
    title: "Luxury Redefined",
    subtitle: "Where sophistication meets contemporary design",
    ctaText: "View Collection",
    imageUrl: image3.src,
  },
];

async function getCategories() {
  const res = await serverApi.get("/categories");
  return res.data as Category[];
}

const HomePage = async () => {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch (err) {
    console.error("Failed to fetch categories", err);
  }

  return (
    <div className="font-[Playfair_Display]">
      <HeroCarousel slides={heroSlides} />

      <section className="py-24 px-[5%] mx-auto">
        <a
          href="/products"
          className="block text-center mb-16 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
            Our Collections
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our carefully curated selection of fine jewelry, each piece
            designed to complement your unique style and celebrate life's
            precious moments.
          </p>
        </a>

        {/* {categories.length > 0 ? (
          <CategoriesCarousel categories={categories} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">No categories available.</p>
          </div>
        )} */}
      </section>

      {/* ✅ Customer Stories also rendered server-side */}
      <CustomerStories />
    </div>
  );
};

export default HomePage;
