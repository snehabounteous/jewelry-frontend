"use client";

import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";
import { useEffect, useState } from "react";
import { clientApi } from "@/utils/axios";

interface CategoryMap {
  [key: string]: string;
}

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [categories, setCategories] = useState<CategoryMap>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await clientApi.get("/categories");
        const map: CategoryMap = {};
        res.data.forEach((cat: any) => {
          map[cat.id] = cat.name;
        });
        setCategories(map);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 20000 ? 0 : 500;
  const total = subtotal + shipping;
  const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

  if (!cart || cart.length === 0) {
    return (
      <p className="p-8 text-center text-[var(--color-secondary)] font-heading">
        Your cart is empty
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-heading mb-6 text-[var(--color-foreground)]">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex border-b border-[var(--color-highlight)] pb-4"
            >
              <Image
                src={item.image || "/placeholder.png"}
                alt={item.name}
                width={112}
                height={112}
                className="w-28 h-28 object-cover rounded"
              />
              <div className="ml-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading">{item.name}</h3>
                  {item.category && categories[item.category] && (
                    <p className="text-[var(--color-secondary)]">
                      {categories[item.category]}
                    </p>
                  )}
                  <p className="font-heading text-[var(--color-accent)] text-lg">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex items-center mt-2 gap-2">
                  <Select
                    value={item.quantity.toString()}
                    onValueChange={(value) =>
                      updateQuantity(item.id, parseInt(value))
                    }
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button variant="ghost" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border p-6 rounded space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Button className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90">
            CHECKOUT
          </Button>
        </div>
      </div>
    </div>
  );
}
