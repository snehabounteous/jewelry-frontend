"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import Profile from "./Profile";

export default function Navbar() {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const navLinks = ["Collections", "About", "Services", "Contact"];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[var(--color-highlight)]">
        <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/icon.svg" alt="LUMIÈRE Logo" width={40} height={40} priority />
            <h3 className="text-[var(--color-primary)] font-heading text-xl">LUMIÈRE</h3>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-8">
            {navLinks.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-[var(--color-primary)] font-body font-medium"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons & Profile */}
          <div className="flex items-center gap-3">
            <button aria-label="Search" className="p-2 rounded-full hover:bg-gray-100">
              <Search size={20} color="var(--color-primary)" />
            </button>
            <button aria-label="Wishlist" className="p-2 rounded-full hover:bg-gray-100">
              <Heart size={20} color="var(--color-primary)" />
            </button>
            <button aria-label="Shopping Bag" className="p-2 rounded-full hover:bg-gray-100">
              <ShoppingBag size={20} color="var(--color-primary)" />
            </button>

            {/* Profile dropdown from shadcn */}
            <Profile />

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
              onClick={() => setMobileMenuOpened(true)}
              aria-label="Open mobile menu"
            >
              <Menu size={20} color="var(--color-primary)" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpened && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpened(false)}
          />
          <div className="ml-auto w-64 bg-[var(--color-background)] h-full p-4 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <Link href="#" className="flex items-center gap-2">
                <Image src="/icon.svg" alt="LUMIÈRE Logo" width={30} height={30} />
                <h4 className="font-heading text-lg">LUMIÈRE</h4>
              </Link>
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => setMobileMenuOpened(false)}
                aria-label="Close mobile menu"
              >
                <X size={20} color="var(--color-primary)" />
              </button>
            </div>

            <hr className="border-[var(--color-highlight)]" />

            <div className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item}
                  href="#"
                  onClick={() => setMobileMenuOpened(false)}
                  className="text-[var(--color-primary)] font-body font-medium text-lg"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
