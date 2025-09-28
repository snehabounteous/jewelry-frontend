import Image from "next/image";
import { Star, Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300" aria-label="Footer">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 font-[var(--font-body)]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/icon.svg"
              alt="Lumière Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <h3
              className="text-white text-2xl font-[var(--font-heading)] tracking-widest"
              style={{ letterSpacing: "0.1em" }}
            >
              LUMIÈRE
            </h3>
          </div>
          <p className="text-sm text-gray-400">
            Elevating elegance with timeless jewelry crafted for every occasion.
          </p>
          <div className="flex mt-4 space-x-3">
            <Instagram className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
            <Facebook className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 font-[var(--font-heading)]">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products" className="text-white hover:text-[var(--color-accent)]">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white hover:text-[var(--color-accent)]">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white hover:text-[var(--color-accent)]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/policies" className="text-white hover:text-[var(--color-accent)]">
                Policies
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h4 className="text-white font-semibold mb-4 font-[var(--font-heading)]">
            Customer Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="text-white">
              Email:{" "}
              <a href="mailto:support@lumiere.com" className="text-[var(--color-accent)]">
                support@lumiere.com
              </a>
            </li>
            <li className="text-white">
              Phone:{" "}
              <a href="tel:+1800123456" className="text-[var(--color-accent)]">
                +1 (800) 123-456
              </a>
            </li>
            <li>
              <a href="/faq" className="text-white hover:text-[var(--color-accent)]">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4 font-[var(--font-heading)]">Stay Updated</h4>
          <p className="text-sm text-gray-400 mb-3">
            Subscribe to receive exclusive offers and new collection updates.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l-md text-black focus:outline-none font-[var(--font-body)]"
            />
            <button
              type="submit"
              className="bg-yellow-600 px-4 py-2 rounded-r-md text-white font-medium hover:bg-yellow-700 font-[var(--font-heading)]"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6 mt-8">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
          <p className="text-xs text-gray-500 font-[var(--font-body)]">
            © {new Date().getFullYear()} Lumière. All rights reserved.
          </p>
          <div className="flex gap-1" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="var(--color-accent)" color="var(--color-accent)" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
