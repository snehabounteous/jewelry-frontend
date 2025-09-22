"use client";

import { useState, useEffect } from "react";
import { Diamond, Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import Link from "next/link";

export default function ScrollNavigation() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Collections", "About", "Services", "Contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300`}
      style={{
        background:
          scrollY > 50
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--color-accent) 0%, #B8860B 100%)",
            }}
          >
            <Diamond size={20} color="white" strokeWidth={1.5} />
          </div>
          <h3
            className="text-xl font-heading"
            style={{
              color: "var(--color-primary)",
              letterSpacing: "0.1em",
            }}
          >
            LUMIÈRE
          </h3>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <li key={link}>
              <Link
                href="#"
                className="text-[var(--color-primary)] font-body font-medium"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search size={20} color="var(--color-primary)" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Heart size={20} color="var(--color-primary)" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ShoppingBag size={20} color="var(--color-primary)" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <User size={20} color="var(--color-primary)" />
          </button>
          <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
            <Menu size={20} color="var(--color-primary)" />
          </button>
        </div>
      </div>
    </nav>
  );
}
