import Image from "next/image";
import { Star } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="bg-black py-16"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 relative">
              <Image
                src="/icon.svg"
                alt="LUMIÈRE Logo"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-white text-2xl font-heading tracking-widest">
              LUMIÈRE
            </h3>
          </div>

          {/* Stars */}
          <div className="flex gap-2 md:order-3" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill="var(--color-accent)"
                color="var(--color-accent)"
                strokeWidth={1}
              />
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-white/70 md:order-2 text-center md:text-left">
            © 2024 LUMIÈRE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
