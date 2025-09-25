"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
}

interface Props {
  slides: HeroSlide[];
}

const HeroCarousel: React.FC<Props> = ({ slides }) => {
    const router= useRouter()
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index: number) => setCurrentSlide(index);

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br from-yellow-600/80 to-gray-900/60`} />
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white max-w-4xl px-8">
              
                <h1 className="text-5xl md:text-7xl font-light mb-4 leading-tight">
                  {slide.title}
                </h1>
              <p className="text-xl md:text-2xl font-normal mb-8 opacity-90 max-w-3xl mx-auto">
                {slide.subtitle}
              </p>
              <Button className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 px-8 py-3" onClick={() => router.push("/products")}>
                {slide.ctaText}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full border-0 transition-all duration-300 ${
              index === currentSlide ? "bg-yellow-600 scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
