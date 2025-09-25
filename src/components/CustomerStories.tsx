"use client";

import React from "react";

const reviews = [
  {
    name: "Ariana",
    text: "The diamond necklace I purchased exceeded all expectations. The craftsmanship is exquisite and it's become my most treasured piece. LUMIÈRE truly understands elegance.",
    icon: "💎",
  },
  {
    name: "Sophia",
    text: "Never thought buying jewelry online would be this seamless. The personalized service and attention to detail made my mother's birthday truly special.",
    icon: "🎁",
  },
  {
    name: "Meera",
    text: "The gold earrings I gifted to my sister on her wedding were absolutely stunning. She couldn't stop admiring them! I'm completely obsessed with LUMIÈRE's collection.",
    icon: "👂",
  },
  {
    name: "Riya",
    text: "LUMIÈRE has completely transformed my jewelry collection. Each piece tells a story and the quality is unmatched. I feel like royalty every time I wear them.",
    icon: "👑",
  },
  {
    name: "Kavya",
    text: "The engagement ring from LUMIÈRE made the proposal perfect. The brilliance and sparkle caught everyone's attention. Thank you for making our moment magical!",
    icon: "💍",
  },
  {
    name: "Anisha",
    text: "Outstanding customer service and breathtaking jewelry. The pearl bracelet I ordered arrived beautifully packaged and fits perfectly. LUMIÈRE is now my go-to for luxury jewelry.",
    icon: "📿",
  },
];

const CustomerStories: React.FC = () => {
  // duplicate reviews for seamless scroll
  const allReviews = [...reviews, ...reviews];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Customer Stories
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Discover what our customers say about their LUMIÈRE experience
          </p>
        </div>

        {/* Reviews Track */}
        <div className="overflow-hidden relative">
          <div className="flex gap-8 animate-[scroll_30s_linear_infinite] w-max">
            {allReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 w-80 flex-shrink-0 shadow-md border border-gray-200 transform transition hover:-translate-y-2 hover:shadow-2xl relative"
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-t-2xl" />

                <h3 className="text-center font-semibold text-lg mb-4">
                  {review.name}
                </h3>
                {/* Star Rating */}
                <div className="flex justify-center gap-1 mb-4 text-yellow-400 text-xl">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                </div>
                <p className="text-gray-600 text-sm md:text-base italic text-center mb-6">
                  {review.text}
                </p>
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-300 flex items-center justify-center shadow-md text-2xl">
                  {review.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mt-10">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === 0 ? "bg-yellow-400" : "bg-gray-300"
                }`}
              />
            ))}
        </div>
      </div>

      {/* Scroll Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-[scroll_30s_linear_infinite] {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CustomerStories;
