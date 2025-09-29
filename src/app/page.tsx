import React from "react";
import HeroCarousel from "../components/HeroCarousel";

import CustomerStories from "../components/CustomerStories";
import { serverApi } from "../utils/axios";
import image1 from "../../public/images/jewel1.webp";
import image2 from "../../public/images/jewel2.webp";
import image3 from "../../public/images/jewel3.webp";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import MostGiftedCarousel from "@/components/MostGiftedCarousel";

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

async function getCategories(): Promise<Category[]> {
  try {
    const res = await serverApi.get("/categories");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch categories", err);
    return [];
  }
}

const HomePage = async () => {
  const [categories] = await Promise.all([getCategories()]);

  return (
    <div className="font-[Playfair_Display]">
      <HeroCarousel slides={heroSlides} />

      <section className="py-24 px-[5%] mx-auto">
        <div
          className="block text-center mb-16 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">Our Collections</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our carefully curated selection of fine jewelry, each piece designed to
            complement your unique style and celebrate life&apos;s precious moments.
          </p>
        </div>

        {categories.length > 0 ? (
          <CategoriesCarousel categories={categories} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">No categories available.</p>
          </div>
        )}
      </section>

      <section className="py-24 px-[5%] mx-auto">
        <div
          className="block text-center mb-16 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
            Checkout Our Earring Collections
          </h2>
        </div>

        <MostGiftedCarousel />
      </section>

      <CustomerStories />
    </div>
  );
};

export default HomePage;
