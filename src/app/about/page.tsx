'use client';

import { useState, useEffect } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&display=swap');
        
        :root {
          --color-primary: #1C1C1C;
          --color-primary-foreground: #FFFFFF;
          --color-secondary: #8E8E8E;
          --color-secondary-foreground: #1C1C1C;
          --color-background: #F9F9F9;
          --color-foreground: #1C1C1C;
          --color-highlight: #E5E5E5;
          --color-accent: #D4AF37;
          --font-heading: 'Playfair Display', serif;
          --font-body: 'Playfair Display', serif;
          --radius: 0.625rem;
        }
        
        body {
          font-family: var(--font-body);
          background-color: var(--color-background);
          color: var(--color-foreground);
          line-height: 1.7;
        }
      `}</style>

      <div className="min-h-screen bg-[#F9F9F9]">
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className={`transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <h1 className="text-6xl md:text-7xl font-light text-[#1C1C1C] mb-8 tracking-wide">
                About LUMIÈRE
              </h1>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto"></div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-32 px-6">
          <div className="max-w-3xl mx-auto">
            
            {/* Story */}
            <div className="mb-20">
              <p className="text-xl md:text-2xl font-light text-[#1C1C1C] leading-relaxed mb-8">
                LUMIÈRE represents the art of fine jewelry craftsmanship, where each piece is 
                thoughtfully designed and meticulously created by skilled artisans.
              </p>
              <p className="text-lg text-[#8E8E8E] leading-relaxed">
                Founded on the principles of timeless elegance and exceptional quality, 
                we create jewelry that transcends trends and becomes part of your story.
              </p>
            </div>

            {/* Values - Simple Grid */}
            <div className="grid md:grid-cols-3 gap-16 mb-20">
              <div className="text-center">
                <h3 className="text-lg font-medium text-[#1C1C1C] mb-4">Craftsmanship</h3>
                <p className="text-[#8E8E8E] text-sm leading-relaxed">
                  Every piece is handcrafted with precision and care by master artisans.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-[#1C1C1C] mb-4">Quality</h3>
                <p className="text-[#8E8E8E] text-sm leading-relaxed">
                  We source only the finest materials to ensure lasting beauty.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-[#1C1C1C] mb-4">Timeless</h3>
                <p className="text-[#8E8E8E] text-sm leading-relaxed">
                  Our designs create heirlooms that endure for generations.
                </p>
              </div>
            </div>

            {/* Simple Quote */}
            <div className="text-center py-16 border-t border-[#E5E5E5]">
              <blockquote className="text-xl md:text-2xl font-light text-[#1C1C1C] italic mb-6">
               <p>&quot;True luxury lies in the perfection of every detail.&quot;</p>

              </blockquote>
              <div className="w-12 h-px bg-[#D4AF37] mx-auto"></div>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}