"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/store/useCart";
import Image from "next/image";
import { useEffect } from "react";
import { Trash2, ShoppingBag, Sparkles, Truck, Gift } from "lucide-react";
import {useRouter} from "next/navigation";

// types.ts
export type CartProduct = {
  id: string;
  name: string;
  description: string;
  price: string; // string from backend
  category_id: string;
  stock: number;
  created_at: string;
  updated_at: string;
};

export type CartItem = {
  id: string;
  quantity: number;
  product: CartProduct;
};

export type Cart = {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  items: CartItem[];
};


export default function CartPage() {
  const { cart, fetchCart, removeFromCart, reduceQuantity, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart.length) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto py-16 px-4">
          <Card className="max-w-md mx-auto text-center shadow-lg border-0" style={{ backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-lg)' }}>
            <CardContent className="pt-16 pb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-highlight)' }}>
                <ShoppingBag className="w-10 h-10" style={{ color: 'var(--color-accent)' }} />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-foreground)' }}>Your cart is empty</h2>
              <p className="mb-8" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>Discover our exquisite jewelry collection and add some sparkle to your cart</p>
              <Button className="font-semibold px-8" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)', borderRadius: 'var(--radius)' }}>
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 20000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
              <Sparkles className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
            </div>
            <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-foreground)' }}>
              Shopping Cart
            </h1>
          </div>
          <p style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>Review your selected jewelry pieces</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0" style={{ backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-lg)' }}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-foreground)' }}>
                    <ShoppingBag className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    Cart Items ({cart.length})
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearCart}
                    className="hover:bg-opacity-10"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {cart.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative group">
                        <div className="w-24 h-24 overflow-hidden shadow-lg" style={{ borderRadius: 'var(--radius)', backgroundColor: 'var(--color-highlight)' }}>
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            width={96} 
                            height={96} 
                            className="w-full h-full object-fit group-hover:scale-110 transition-transform duration-300" 
                          />
                        </div>
                        <div className="absolute -top-1 -right-1">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
                            <Sparkles className="w-3 h-3" style={{ color: 'var(--color-primary)' }} />
                          </div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-foreground)' }}>{item.name}</h3>
                            {/* <Badge variant="secondary" className="text-xs border-0" style={{ backgroundColor: 'var(--color-highlight)', color: 'var(--color-secondary)' }}>
                              {item.category}
                            </Badge> */}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 hover:bg-opacity-10"
                            style={{ color: 'var(--color-secondary)' }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-xs mb-1" style={{ color: 'var(--color-secondary)' }}>Quantity</p>
                              <Select
                                value={item.quantity.toString()}
                                onValueChange={(value) => {
                                  // Since we don't have updateQuantity, we'll use reduceQuantity for now
                                  // You may want to implement updateQuantity in your store later
                                  console.log(`Update quantity to ${value} for item ${item.id}`);
                                }}
                              >
                                <SelectTrigger className="w-20 h-9" style={{ borderRadius: 'var(--radius-sm)', borderColor: 'var(--color-highlight)' }}>
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
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-xs mb-1" style={{ color: 'var(--color-secondary)' }}>Price</p>
                            <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}>
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>₹{item.price.toLocaleString()} each</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < cart.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 sticky top-4" style={{ backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-lg)' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-foreground)' }}>
                  <Gift className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>Subtotal</span>
                  <span className="font-semibold" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                    <span style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>Shipping</span>
                  </div>
                  <div className="text-right">
                    {shipping === 0 ? (
                      <Badge className="border-0" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)' }}>
                        FREE
                      </Badge>
                    ) : (
                      <span className="font-semibold" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-body)' }}>₹{shipping.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="text-xs p-3 border" style={{ 
                    color: 'var(--color-secondary)', 
                    backgroundColor: 'var(--color-highlight)', 
                    borderRadius: 'var(--radius)', 
                    borderColor: 'var(--color-highlight)',
                    fontFamily: 'var(--font-body)'
                  }}>
                    <p className="flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      Free shipping on orders over ₹20,000
                    </p>
                  </div>
                )}

                <Separator style={{ backgroundColor: 'var(--color-highlight)' }} />
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-foreground)' }}>Total</span>
                  <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}>
                    ₹{total.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-3 pt-4">
                  <Button 
                    className="w-full font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{ 
                      backgroundColor: 'var(--color-accent)', 
                      color: 'var(--color-primary)',
                      borderRadius: 'var(--radius)',
                      fontFamily: 'var(--font-body)'
                    }}
                    size="lg"
                    onClick={() => router.push("/checkout")}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={()=>router.push("/products")}
                    className="w-full border-2 font-medium hover:bg-opacity-10"
                    style={{ 
                      borderColor: 'var(--color-highlight)', 
                      color: 'var(--color-foreground)',
                      borderRadius: 'var(--radius)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    Continue Shopping
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                    <span>Authenticated Jewelry</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                    <span>30-Day Return Policy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}