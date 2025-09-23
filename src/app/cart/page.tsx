"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/store/useCart";
import { Select } from "@radix-ui/react-select";
import Image from "next/image";
import { useEffect } from "react";

export default function CartPage() {
  const { cart, fetchCart, removeFromCart, reduceQuantity, clearCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart.length) return <p className="p-8 text-center">Your cart is empty</p>;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 20000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex border-b pb-4">
              <Image src={item.image} alt={item.name} width={112} height={112} className="rounded" />
              <div className="ml-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3>{item.name}</h3>
                  <p className="text-sm">{item.category}</p>
                  <p className="text-lg font-bold">₹{item.price.toLocaleString()}</p>
                </div>
                <div className="flex gap-2 mt-2 items-center">
                  <Select
                    value={item.quantity.toString()}
                    onValueChange={() => reduceQuantity(item.id)}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
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
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <Button onClick={clearCart}>Clear Cart</Button>
        </div>
      </div>
    </div>
  );
}
