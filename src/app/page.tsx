<<<<<<< Updated upstream
'use client';
=======
import React from "react";
import HeroCarousel from "../components/HeroCarousel";
import CategoriesCarousel from "../components/CategoriesCarousel";
import CustomerStories from "../components/CustomerStories";
import { serverApi } from "../utils/axios";
import image1 from "../../public/images/jewel1.webp"
import image2 from "../../public/images/jewel2.webp"
import image3 from "../../public/images/jewel3.webp"
>>>>>>> Stashed changes

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Types for better TypeScript support
interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
<<<<<<< Updated upstream
  background: string;
=======
  ctaText: string;
  imageUrl: string;
>>>>>>> Stashed changes
}

interface JewelryCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

<<<<<<< Updated upstream
const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCategoryPosition, setCurrentCategoryPosition] = useState(0);

  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      title: "Timeless Elegance",
      subtitle: "Discover our exquisite collection of handcrafted jewelry",
      background: "linear-gradient(45deg, rgba(212, 175, 55, 0.8), rgba(28, 28, 28, 0.6))"
    },
    {
      id: 2,
      title: "Crafted Perfection",
      subtitle: "Each piece tells a story of artisan mastery and luxury",
      background: "linear-gradient(45deg, rgba(28, 28, 28, 0.7), rgba(212, 175, 55, 0.5))"
    },
    {
      id: 3,
      title: "Luxury Redefined",
      subtitle: "Where sophistication meets contemporary design",
      background: "linear-gradient(45deg, rgba(212, 175, 55, 0.6), rgba(28, 28, 28, 0.7))"
    }
  ];

  const jewelryCategories: JewelryCategory[] = [
    {
      id: "earrings",
      name: "Earrings",
      description: "Elegant studs, hoops, and statement pieces that frame your face beautifully",
      icon: (
        <svg viewBox="0 0 300 200" className="w-full h-full">
          <rect width="300" height="200" fill="#F9F9F9"/>
          <circle cx="150" cy="100" r="60" fill="none" stroke="#D4AF37" strokeWidth="3"/>
          <circle cx="130" cy="80" r="8" fill="#D4AF37"/>
          <circle cx="170" cy="80" r="8" fill="#D4AF37"/>
          <path d="M130,120 Q150,140 170,120" fill="none" stroke="#D4AF37" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: "anklets",
      name: "Anklets",
      description: "Delicate chains and charms that add a touch of grace to every step",
      icon: (
        <svg viewBox="0 0 300 200" className="w-full h-full">
          <rect width="300" height="200" fill="#F9F9F9"/>
          <ellipse cx="150" cy="160" rx="80" ry="15" fill="none" stroke="#D4AF37" strokeWidth="3"/>
          <circle cx="120" cy="160" r="5" fill="#D4AF37"/>
          <circle cx="150" cy="160" r="5" fill="#D4AF37"/>
          <circle cx="180" cy="160" r="5" fill="#D4AF37"/>
        </svg>
      )
    },
    {
      id: "bracelets",
      name: "Bracelets",
      description: "From tennis bracelets to charm collections, find your perfect wrist companion",
      icon: (
        <svg viewBox="0 0 300 200" className="w-full h-full">
          <rect width="300" height="200" fill="#F9F9F9"/>
          <ellipse cx="150" cy="100" rx="70" ry="20" fill="none" stroke="#D4AF37" strokeWidth="3"/>
          <circle cx="100" cy="100" r="6" fill="#D4AF37"/>
          <circle cx="130" cy="100" r="6" fill="#D4AF37"/>
          <circle cx="170" cy="100" r="6" fill="#D4AF37"/>
          <circle cx="200" cy="100" r="6" fill="#D4AF37"/>
        </svg>
      )
    },
    {
      id: "necklaces",
      name: "Necklaces",
      description: "Statement pendants and delicate chains that enhance your neckline",
      icon: (
        <svg viewBox="0 0 300 200" className="w-full h-full">
          <rect width="300" height="200" fill="#F9F9F9"/>
          <path d="M100,80 Q150,60 200,80 Q200,120 150,140 Q100,120 100,80" fill="none" stroke="#D4AF37" strokeWidth="3"/>
          <circle cx="150" cy="100" r="12" fill="#D4AF37"/>
        </svg>
      )
    },
    {
      id: "rings",
      name: "Rings",
      description: "Engagement rings, wedding bands, and cocktail rings for every occasion",
      icon: (
        <svg viewBox="0 0 300 200" className="w-full h-full">
          <rect width="300" height="200" fill="#F9F9F9"/>
          <circle cx="150" cy="100" r="40" fill="none" stroke="#D4AF37" strokeWidth="3"/>
          <rect x="135" y="85" width="30" height="30" fill="#D4AF37" rx="5"/>
        </svg>
      )
    }
  ];

  // Auto-play hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleCategoryPrev = () => {
    setCurrentCategoryPosition((prev) => Math.max(0, prev - 1));
  };

  const handleCategoryNext = () => {
    const maxPosition = Math.max(0, jewelryCategories.length - 4);
    setCurrentCategoryPosition((prev) => Math.min(maxPosition, prev + 1));
  };
=======
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
>>>>>>> Stashed changes

  return (
    <>
      <style jsx global>{`
        :root {
          --color-primary: #1C1C1C;
          --color-primary-foreground: #FFFFFF;
          --color-secondary: #8E8E8E;
          --color-secondary-foreground: #1C1C1C;
          --color-background: #F9F9F9;
          --color-foreground: #1C1C1C;
          --color-highlight: #E5E5E5;
          --color-accent: #D4AF37;

<<<<<<< Updated upstream
          --font-heading: 'Playfair Display', serif;
          --font-body: 'Playfair Display', serif;
=======
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
>>>>>>> Stashed changes

          --radius: 0.625rem;
          --radius-sm: calc(var(--radius) - 4px);
          --radius-md: calc(var(--radius) - 2px);
          --radius-lg: var(--radius);
          --radius-xl: calc(var(--radius) + 4px);
        }

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&display=swap');

        .hero-section {
          position: relative;
          height: 100vh;
          overflow: hidden;
          font-family: var(--font-body);
        }

        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-slide.active {
          opacity: 1;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.1);
          transition: transform 8s ease-out;
        }

        .hero-slide.active .hero-bg {
          transform: scale(1);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: var(--color-primary-foreground);
          max-width: 800px;
          padding: 0 2rem;
          animation: slideUp 1s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-title {
          font-size: 4.5rem;
          font-weight: 300;
          margin-bottom: 1rem;
          line-height: 1.2;
          font-family: var(--font-heading);
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-cta {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: var(--color-accent);
          color: var(--color-primary);
          text-decoration: none;
          border-radius: var(--radius);
          font-weight: 500;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          border: none;
        }

        .hero-cta:hover {
          background: #F4D03F;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
        }

        .hero-nav {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 3;
        }

        .hero-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .hero-dot.active {
          background: var(--color-accent);
          transform: scale(1.2);
        }

        .categories-section {
          padding: 8rem 5% 6rem;
          max-width: 1400px;
          margin: 0 auto;
          font-family: var(--font-body);
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 3.5rem;
          font-weight: 300;
          color: var(--color-primary);
          margin-bottom: 1rem;
          font-family: var(--font-heading);
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: var(--color-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .categories-carousel {
          position: relative;
          overflow: hidden;
        }

        .categories-track {
          display: flex;
          gap: 2rem;
          transition: transform 0.5s ease;
          padding: 2rem 0;
        }

        .category-card {
          flex: 0 0 280px;
          background: white;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .category-image {
          width: 100%;
          height: 200px;
          position: relative;
          overflow: hidden;
          background: #F9F9F9;
        }

        .category-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(212, 175, 55, 0.1), transparent);
          transition: opacity 0.3s ease;
        }

        .category-card:hover .category-image::before {
          opacity: 0.5;
        }

        .category-info {
          padding: 2rem;
          text-align: center;
        }

        .category-name {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .category-description {
          color: var(--color-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .carousel-controls {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 3rem;
        }

        .carousel-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid var(--color-accent);
          background: transparent;
          color: var(--color-accent);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .carousel-btn:hover {
          background: var(--color-accent);
          color: var(--color-primary);
          transform: scale(1.1);
        }

        .carousel-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .section-title {
            font-size: 2.5rem;
          }

          .category-card {
            flex: 0 0 250px;
          }

          .categories-track {
            gap: 1rem;
          }

          .categories-section {
            padding: 4rem 5% 3rem;
          }
        }
      `}</style>

      <div>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-carousel">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              >
                <div
                  className="hero-bg"
                  style={{
                    background: `${slide.background}, radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 0%, rgba(28, 28, 28, 0.8) 100%)`
                  }}
                />
                <div className="hero-content">
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  <button className="hero-cta">
                    {index === 0 ? 'Explore Collection' : index === 1 ? 'Shop Now' : 'View Collection'}
                  </button>
                </div>
              </div>
            ))}
          </div>
<<<<<<< Updated upstream

          <div className="hero-nav">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="section-header">
            <h2 className="section-title">Our Collections</h2>
            <p className="section-subtitle">
              Explore our carefully curated selection of fine jewelry, each piece designed to complement your unique style and celebrate life's precious moments.
            </p>
          </div>

          <div className="categories-carousel">
            <div
              className="categories-track"
              style={{
                transform: `translateX(-${currentCategoryPosition * 300}px)`
              }}
            >
              {jewelryCategories.map((category) => (
                <div key={category.id} className="category-card">
                  <div className="category-image">
                    {category.icon}
                  </div>
                  <div className="category-info">
                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-description">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-controls">
              <button
                className="carousel-btn"
                onClick={handleCategoryPrev}
                disabled={currentCategoryPosition === 0}
                aria-label="Previous categories"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="carousel-btn"
                onClick={handleCategoryNext}
                disabled={currentCategoryPosition >= jewelryCategories.length - 4}
                aria-label="Next categories"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
=======
        )}
      </section>

      {/* ✅ Customer Stories also rendered server-side */}
      <CustomerStories />
    </div>
>>>>>>> Stashed changes
  );
};

export default HomePage;