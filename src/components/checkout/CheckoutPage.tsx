'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Lock, Truck, ArrowLeft } from 'lucide-react';

const CheckoutPage = () => {
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('card');

  const cartItems = [
    {
      id: 1,
      name: "Eternal Diamond Ring",
      category: "Rings",
      price: 12999,
      quantity: 1,
      image: "💍",
      size: "Size 7"
    },
    {
      id: 2,
      name: "Royal Sapphire Necklace",
      category: "Necklaces", 
      price: 24999,
      quantity: 1,
      image: "📿",
      length: "18 inches"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = selectedShipping === 'express' ? 99 : selectedShipping === 'overnight' ? 199 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shippingCost + tax;

  return (
    <div style={{
      '--color-primary': '#1C1C1C',
      '--color-primary-foreground': '#FFFFFF',
      '--color-secondary': '#8E8E8E',
      '--color-secondary-foreground': '#1C1C1C',
      '--color-background': '#F9F9F9',
      '--color-foreground': '#1C1C1C',
      '--color-highlight': '#E5E5E5',
      '--color-accent': '#D4AF37',
      '--font-heading': 'Playfair Display, serif',
      '--font-body': 'Playfair Display, serif',
      fontFamily: 'var(--font-body)',
      backgroundColor: 'var(--color-background)',
      minHeight: '100vh'
    } as React.CSSProperties}>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <Button variant="ghost" size="sm" className="p-0 h-auto font-normal">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span style={{ color: 'var(--color-secondary)' }}>Back to Cart</span>
          </Button>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            Checkout
          </h1>
          <p style={{ color: 'var(--color-secondary)' }}>Complete your purchase of exquisite jewelry</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: 'var(--font-heading)' }}>Contact Information</CardTitle>
                <CardDescription>We will use this to send order updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: 'var(--font-heading)' }}>Shipping Address</CardTitle>
                <CardDescription>Where should we deliver your jewelry?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="Enter street address" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter city" />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP/Postal Code</Label>
                    <Input id="zip" placeholder="Enter ZIP code" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  <Truck className="w-5 h-5" />
                  Shipping Method
                </CardTitle>
                <CardDescription>Choose your preferred delivery option</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping} className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <div>
                        <Label htmlFor="standard" className="font-medium">Standard Shipping</Label>
                        <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>5-7 business days</p>
                      </div>
                    </div>
                    <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>Free</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="express" id="express" />
                      <div>
                        <Label htmlFor="express" className="font-medium">Express Shipping</Label>
                        <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>2-3 business days</p>
                      </div>
                    </div>
                    <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>$99</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="overnight" id="overnight" />
                      <div>
                        <Label htmlFor="overnight" className="font-medium">Overnight Shipping</Label>
                        <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>Next business day</p>
                      </div>
                    </div>
                    <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>$199</span>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </CardTitle>
                <CardDescription>All transactions are secure and encrypted</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                </RadioGroup>
                
                {selectedPayment === 'card' && (
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" placeholder="Name on card" />
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox id="saveCard" />
                  <Label htmlFor="saveCard" className="text-sm">
                    Save payment information for future purchases
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle style={{ fontFamily: 'var(--font-heading)' }}>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>
                          {item.category} • {item.size || item.length}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold" style={{ color: 'var(--color-accent)' }}>
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Order Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span style={{ color: 'var(--color-accent)' }}>${total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-xs" style={{ color: 'var(--color-secondary)' }}>
                  <Lock className="w-4 h-4" />
                  <span>Secure SSL encrypted checkout</span>
                </div>

                {/* Place Order Button */}
                <Button 
                  className="w-full py-3 text-white font-semibold" 
                  style={{ backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
                >
                  Complete Purchase
                </Button>

                <p className="text-xs text-center" style={{ color: 'var(--color-secondary)' }}>
                  By placing this order, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;