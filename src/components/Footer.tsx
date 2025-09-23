"use client";

import { Diamond, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{ background: "var(--color-primary)" }}
      aria-label="Footer"
    >
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex items-center gap-4" aria-label="Brand logo">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-accent) 0%, #B8860B 100%)",
              }}
            >
              <Diamond size={20} color="white" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3
              className="text-white text-xl font-heading"
              style={{ letterSpacing: "0.1em" }}
            >
              LUMIÈRE
            </h3>
          </div>

          {/* Copyright */}
          <p
            className="text-sm"
            style={{ color: "rgba(255, 255, 255, 0.6)", fontFamily: "var(--font-body)", order: 2 }}
          >
            © 2024 Lumière. All rights reserved.
          </p>

          {/* Stars */}
          <div className="flex gap-4" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill="var(--color-accent)"
                color="var(--color-accent)"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
