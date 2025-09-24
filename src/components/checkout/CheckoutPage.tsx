"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/store/useCart";
import { clientApi } from "@/utils/axios";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

type AddressType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street_address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  is_default: boolean;
};

const CheckoutPage = () => {
  const { cart, fetchCart, clearCart } = useCart();
  const router = useRouter();
  const [defaultAddress, setDefaultAddress] = useState<AddressType | null>(null);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const [selectedShipping, setSelectedShipping] = useState<"standard" | "express" | "overnight">(
    "standard"
  );

  // Contact & shipping info
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [shippingAddress, setShippingAddress] = useState({
    street_address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const res = await clientApi.get("/addresses"); // all addresses
      const allAddresses: AddressType[] = res.data;

      setAddresses(allAddresses);

      // find default
      const defaultAddr = allAddresses.find((a) => a.is_default) || null;
      setDefaultAddress(defaultAddr);

      if (!defaultAddr) {
        // first-time user, show empty form
        setShowNewAddressForm(true);
      } else {
        // prefill contact and shipping info
        setContactInfo({
          firstName: defaultAddr.first_name,
          lastName: defaultAddr.last_name,
          email: defaultAddr.email,
          phone: defaultAddr.phone,
        });
        setShippingAddress({
          street_address: defaultAddr.street_address,
          city: defaultAddr.city,
          state: defaultAddr.state,
          zip: defaultAddr.zip,
          country: defaultAddr.country,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load addresses");
    } finally {
      setLoadingAddresses(false);
    }
  };

  if (!cart.length) return <p className="p-8 text-center">Your cart is empty</p>;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost =
    selectedShipping === "express" ? 99 : selectedShipping === "overnight" ? 199 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = async () => {
    try {
      let orderDetails: any;

      if (showNewAddressForm) {
        // send full contact & shipping info
        const orderDetails = {
          contact: {
            first_name: contactInfo.firstName,
            last_name: contactInfo.lastName,
            email: contactInfo.email,
            phone: contactInfo.phone,
          },
          shipping: shippingAddress,
          shippingMethod: selectedShipping,
          shippingCost: shippingCost,
        };
      } else if (defaultAddress) {
        // send only default address ID
        const orderDetails = {
          contact: {
            first_name: contactInfo.firstName,
            last_name: contactInfo.lastName,
            email: contactInfo.email,
            phone: contactInfo.phone,
          },
          shipping: shippingAddress,
          shippingMethod: selectedShipping,
          shippingCost: shippingCost,
        };
      } else {
        throw new Error("No address selected");
      }

      const { data } = await clientApi.post("/order/place", orderDetails);
      toast.success("Order placed successfully!");
      await clearCart();
      router.push("/orders");
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">Checkout</h1>
      <p className="text-gray-500 mb-8">Complete your purchase of exquisite jewelry</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>We will use this to send order updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={contactInfo.firstName}
                    onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={contactInfo.lastName}
                    onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {defaultAddress && !showNewAddressForm && (
            <Button variant="outline" onClick={() => setShowNewAddressForm(true)} className="mb-4">
              Add New Address
            </Button>
          )}

          {/* Shipping Address */}
          {showNewAddressForm && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
                <CardDescription>Where should we deliver your jewelry?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Street Address"
                  value={shippingAddress.street_address}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, street_address: e.target.value })
                  }
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, city: e.target.value })
                    }
                  />
                  <Select
                    value={shippingAddress.state}
                    onValueChange={(val) => setShippingAddress({ ...shippingAddress, state: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="ZIP"
                    value={shippingAddress.zip}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, zip: e.target.value })
                    }
                  />
                </div>
                <Select
                  value={shippingAddress.country}
                  onValueChange={(val) => setShippingAddress({ ...shippingAddress, country: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}

          {/* Shipping Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" /> Shipping Method
              </CardTitle>
              <CardDescription>Choose delivery option</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedShipping}
                onValueChange={(val) =>
                  setSelectedShipping(val as "standard" | "express" | "overnight")
                }
                className="space-y-3"
              >
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard Shipping</Label>
                  </div>
                  <span>Free</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express">Express Shipping</Label>
                  </div>
                  <span>$99</span>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    {item.name} x {item.quantity}
                  </div>
                  <div>₹{item.price.toLocaleString()}</div>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mt-2">
                <Lock className="w-4 h-4" /> Secure checkout
              </div>
              <Button onClick={handlePlaceOrder} className="w-full mt-4 bg-yellow-600 text-white">
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
