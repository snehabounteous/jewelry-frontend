"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user, setUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const isLoggedIn = !!user;

  const navLinks = ["Collections", "About", "Services", "Contact"];

  // Close profile dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Logout function
  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
    setMobileMenuOpened(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[var(--color-highlight)]">
        <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/icon.svg" alt="LUMIÈRE Logo" width={40} height={40} priority />
            <h3 className="text-[var(--color-primary)] font-heading text-xl">LUMIÈRE</h3>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-8" role="menubar">
            {navLinks.map((item) => (
              <li key={item} role="none">
                <Link
                  href="#"
                  className="text-[var(--color-primary)] font-body font-medium"
                  role="menuitem"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons & Profile */}
          <div className="flex items-center gap-2 relative">
            <button aria-label="Search" className="p-2 rounded-full hover:bg-gray-100">
              <Search size={20} color="var(--color-primary)" />
            </button>
            <button aria-label="Wishlist" className="p-2 rounded-full hover:bg-gray-100">
              <Heart size={20} color="var(--color-primary)" />
            </button>
            <button aria-label="Shopping Bag" className="p-2 rounded-full hover:bg-gray-100">
              <ShoppingBag size={20} color="var(--color-primary)" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2 px-3 py-1 border rounded-md"
              >
                {isLoggedIn ? `Hi, ${user.name}` : "Login"}
                <User size={18} />
              </button>

              {dropdownOpen && isLoggedIn && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-56 bg-[var(--color-background)] shadow-md rounded-md z-50 p-3"
                >
                  <div className="flex flex-col gap-2">
                    <Link href="#" className="text-[var(--color-primary)]">
                      My Account
                    </Link>
                    <Link href="#" className="text-[var(--color-primary)]">
                      Wishlist
                    </Link>
                    <Link href="#" className="text-[var(--color-primary)]">
                      Orders & Returns
                    </Link>
                    <hr className="my-2 border-[var(--color-highlight)]" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-[var(--color-primary)] border px-2 py-1 rounded-md hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
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

            <hr className="border-[var(--color-highlight)]" />

            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <Link href="#" className="text-[var(--color-primary)]">
                  My Account
                </Link>
                <Link href="#" className="text-[var(--color-primary)]">
                  Wishlist
                </Link>
                <Link href="#" className="text-[var(--color-primary)]">
                  Orders & Returns
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-[var(--color-primary)] border px-2 py-1 rounded-md hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="#"
                onClick={() => setMobileMenuOpened(false)}
                className="w-full text-center text-[var(--color-primary)] border px-2 py-2 rounded-md hover:bg-gray-100"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
