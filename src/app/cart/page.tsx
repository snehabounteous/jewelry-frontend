"use client";

import { useCart } from "..//..//components/cart/CartProvider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select } from "@/components/ui/select";
import Image from "next/image";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 20000 ? 0 : 500;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

  if (cart.length !== 0)
    return <p className="p-8 text-center text-[var(--color-secondary)] font-heading">Your cart is empty</p>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-heading mb-6 text-[var(--color-foreground)]">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex border-b border-[var(--color-highlight)] pb-4">
              <Image src={item.image} className="w-28 h-28 object-cover rounded" alt={"image"} height={28} width={28} />
              <div className="ml-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading">{item.name}</h3>
                  <p className="text-[var(--color-secondary)]">{item.category}</p>
                  <p className="font-heading text-[var(--color-accent)] text-lg">₹{item.price.toLocaleString("en-IN")}</p>
                </div>
                <div className="flex items-center mt-2 gap-2">
                  <Select
                    value={item.quantity.toString()}
                    onValueChange={(value) => updateQuantity(item.id, parseInt(value))}
                  >
                    {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
                  </Select>
                  <Button variant="ghost" onClick={() => removeFromCart(item.id)}>Remove</Button>
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
