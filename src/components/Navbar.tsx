"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Profile from "./Profile";
import { useCart } from "@/store/useCart";
import { useUserStore } from "@/store/useUserStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useUserStore();

  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

  // Updated navLinks with routes
  const navLinks = [
    { name: "Collections", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  // ✅ get cart + user state
  const { cart, fetchCart, removeFromCart } = useCart();

  // ✅ fetch cart only when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn, fetchCart]);

  // 👉 total count (sum of quantities)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-[var(--color-primary)] font-body font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons & Profile */}
          <div className="flex items-center gap-3">
            <button aria-label="Search" className="p-2 rounded-full hover:bg-gray-100">
              <Search size={20} color="var(--color-primary)" />
            </button>

            {/* Wishlist link */}
            <Link href="/wishlist" aria-label="Wishlist">
              <div className="p-2 rounded-full hover:bg-gray-100">
                <Heart size={20} color="var(--color-primary)" />
              </div>
            </Link>

            {/* 🛍️ Cart Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <button
                    aria-label="Shopping Bag"
                    className="p-2 rounded-full hover:bg-[var(--color-highlight)] transition-colors"
                  >
                    <ShoppingBag size={22} color="var(--color-primary)" />
                  </button>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-[var(--color-primary-foreground)] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                      {cartCount}
                    </span>
                  )}
                </div>
              </PopoverTrigger>

              <PopoverContent
                className="w-96 p-5 rounded-[var(--radius-lg)] bg-[var(--color-background)] shadow-xl border border-[var(--color-highlight)]"
              >
                <h4 className="font-heading text-lg text-[var(--color-primary)] mb-4">
                  Your Cart
                </h4>

                {cart.length === 0 ? (
                  <p className="text-[var(--color-secondary)] font-body text-sm">
                    Your cart is empty.
                  </p>
                ) : (
                  <div className="flex flex-col gap-4 max-h-72 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 border-b border-[var(--color-highlight)] pb-3"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-[var(--radius-md)] object-cover border border-[var(--color-highlight)]"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-body font-medium text-[var(--color-primary)]">
                            {item.name}
                          </p>
                          <p className="text-xs text-[var(--color-secondary)]">
                            {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-500 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {cart.length > 0 && (
                  <div className="mt-5 space-y-3">
                    {/* Total */}
                    <div className="flex justify-between items-center font-body">
                      <span className="text-[var(--color-secondary)]">Subtotal:</span>
                      <span className="font-medium text-[var(--color-primary)]">
                        ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                      </span>
                    </div>

                    {/* Checkout button */}
                    <Link href="/cart" className="block">
                      <button className="w-full bg-[var(--color-accent)] text-[var(--color-primary-foreground)] font-heading py-2 rounded-[var(--radius-md)] shadow hover:opacity-90 transition-opacity">
                        View Cart & Checkout
                      </button>
                    </Link>
                  </div>
                )}
              </PopoverContent>
            </Popover>

            {/* Profile dropdown */}
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
              <Link href="/" className="flex items-center gap-2">
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
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpened(false)}
                  className="text-[var(--color-primary)] font-body font-medium text-lg"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
