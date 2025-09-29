"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCart } from "@/store/useCart";
import { clientApi } from "@/utils/axios";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AxiosError } from "axios";

import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, Truck, PlusCircle, Badge } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import StripeCheckout from "../StripeCheckout";

// ✅ Validation schema
const addressSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required").max(10).min(10),
  street_address: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("ZIP is required").max(6).min(6),
  country: yup.string().required("Country is required"),
});

type Address = {
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

type ShippingOption = {
  id: string;
  name: string;
  cost: number;
};
interface PaymentInfo {
  id: string;
  method: string;
  amount: number;
  status: string;
  currency: string;
}

interface OrderPayload {
  shippingMethod: string;
  shippingCost: number;
  contact?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shipping?: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  setDefault?: boolean;
  addressId?: string;
  payment: PaymentInfo;
}

const CheckoutPage = () => {
  const stripeRef = useRef<HTMLDivElement>(null);
  const { cart, fetchCart, clearCart } = useCart();
  const router = useRouter();

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [, setLoadingAddresses] = useState(true);
  const [showStripe, setShowStripe] = useState(false);
  const [stripeAmount, setStripeAmount] = useState(0);
  const [paymentData, setPaymentData] = useState<PaymentInfo | null>(null); // store form data for later

  // Shipping
  const [shippingMethod, setShippingMethod] = useState<string>("standard");
  const [shippingOptions] = useState<ShippingOption[]>([
    { id: "standard", name: "Standard Shipping", cost: 0 },
    { id: "express", name: "Express Shipping", cost: 99 },
    { id: "overnight", name: "Overnight Shipping", cost: 199 },
  ]);

  // ✅ React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      street_address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    resolver: yupResolver(addressSchema),
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoadingAddresses(true);
        const res = await clientApi.get("/address"); // make sure endpoint matches backend
        const allAddresses: Address[] = res.data;
        setAddresses(allAddresses);

        if (allAddresses.length === 0) {
          setShowNewAddressForm(true);
        } else {
          const defaultAddr = allAddresses.find((a) => a.is_default) || allAddresses[0];
          setSelectedAddress(defaultAddr || null);
          setSelectedAddressId(defaultAddr?.id || null);

          // Prefill form if editing default
          if (defaultAddr) {
            reset({
              first_name: defaultAddr.first_name,
              last_name: defaultAddr.last_name,
              email: defaultAddr.email,
              phone: defaultAddr.phone,
              street_address: defaultAddr.street_address,
              city: defaultAddr.city,
              state: defaultAddr.state,
              zip: defaultAddr.zip,
              country: defaultAddr.country,
            });
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load addresses");
      } finally {
        setLoadingAddresses(false);
      }
    };
    fetchCart();
    fetchAddresses();
  }, [fetchCart, reset]);

  if (!cart.length) return <p className="p-8 text-center">Your cart is empty</p>;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedShippingOption = shippingOptions.find((s) => s.id === shippingMethod);
  const shippingCost = selectedShippingOption?.cost ?? 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shippingCost + tax;

  // ✅ Place order handler
  const handlePlaceOrderForm = handleSubmit((data) => {
  setStripeAmount(total * 100); // total in cents
  setPaymentData(data); // save form data for order payload
  setShowStripe(true); // show StripeCheckout
});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">Checkout</h1>
      <p className="text-gray-500 mb-8">Complete your purchase</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Saved Addresses */}
          {addresses.length > 0 && !showNewAddressForm && (
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Select an address for delivery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <RadioGroup
                  value={selectedAddressId ?? ""}
                  onValueChange={(val) => {
                    setSelectedAddressId(val);
                    const addr = addresses.find((a) => a.id === val) || null;
                    setSelectedAddress(addr);
                    if (addr) {
                      reset({
                        first_name: addr.first_name,
                        last_name: addr.last_name,
                        email: addr.email,
                        phone: addr.phone,
                        street_address: addr.street_address,
                        city: addr.city,
                        state: addr.state,
                        zip: addr.zip,
                        country: addr.country,
                      });
                    }
                  }}
                  className="space-y-2"
                >
                  {addresses.map((a) => (
                    <div
                      key={a.id}
                      className="p-3 border rounded-md flex justify-between items-center"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={a.id} id={a.id} />
                        <Label htmlFor={a.id}>
                          {a.first_name} {a.last_name}, {a.street_address}, {a.city}, {a.state},{" "}
                          {a.zip}, {a.country}
                        </Label>
                      </div>
                      {a.is_default && <Badge>Default</Badge>}
                    </div>
                  ))}
                </RadioGroup>
                <Button variant="outline" onClick={() => setShowNewAddressForm(true)}>
                  <PlusCircle className="mr-1 w-4 h-4" /> Add New Address
                </Button>
              </CardContent>
            </Card>
          )}

          {/* New Address Form */}
          {showNewAddressForm && (
            <Card>
              <CardHeader>
                <CardTitle>Add Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Controller
                    name="first_name"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input placeholder="First Name" {...field} />
                        {errors.first_name && (
                          <p className="text-red-500 text-xs">{errors.first_name.message}</p>
                        )}
                      </>
                    )}
                  />
                  <Controller
                    name="last_name"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input placeholder="Last Name" {...field} />
                        {errors.last_name && (
                          <p className="text-red-500 text-xs">{errors.last_name.message}</p>
                        )}
                      </>
                    )}
                  />
                </div>

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input placeholder="Email" {...field} />
                      {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email.message}</p>
                      )}
                    </>
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input placeholder="Phone" {...field} />
                      {errors.phone && (
                        <p className="text-red-500 text-xs">{errors.phone.message}</p>
                      )}
                    </>
                  )}
                />

                <Controller
                  name="street_address"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input placeholder="Street Address" {...field} />
                      {errors.street_address && (
                        <p className="text-red-500 text-xs">{errors.street_address.message}</p>
                      )}
                    </>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input placeholder="City" {...field} />
                        {errors.city && (
                          <p className="text-red-500 text-xs">{errors.city.message}</p>
                        )}
                      </>
                    )}
                  />

                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input placeholder="State" {...field} />
                        {errors.state && (
                          <p className="text-red-500 text-xs">{errors.state.message}</p>
                        )}
                      </>
                    )}
                  />

                  <Controller
                    name="zip"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input placeholder="ZIP" {...field} />
                        {errors.zip && <p className="text-red-500 text-xs">{errors.zip.message}</p>}
                      </>
                    )}
                  />
                </div>

                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input placeholder="Country" {...field} />
                      {errors.country && (
                        <p className="text-red-500 text-xs">{errors.country.message}</p>
                      )}
                    </>
                  )}
                />

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={setAsDefault}
                    onChange={(e) => setSetAsDefault(e.target.checked)}
                    id="setDefault"
                    className="w-4 h-4"
                  />
                  <Label htmlFor="setDefault">Set as default address</Label>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Shipping Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" /> Shipping Method
              </CardTitle>
              <CardDescription>Select delivery option</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <RadioGroup
                value={shippingMethod}
                onValueChange={(val) => setShippingMethod(val)}
                className="space-y-2"
              >
                {shippingOptions.map((option) => (
                  <div
                    key={option.id}
                    className="p-3 border rounded-md flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id}>{option.name}</Label>
                    </div>
                    <span>{option.cost === 0 ? "Free" : `₹${option.cost}`}</span>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4 space-y-3">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₹{item.price.toLocaleString()}</span>
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
              <div>
                {showStripe && paymentData && (
                  <StripeCheckout
                    amountCents={stripeAmount}
                    currency="usd"
                    onPaymentSuccess={async (paymentIntent) => {
                      try {
                        const paymentMethodId =
                          typeof paymentIntent.payment_method === "string"
                            ? paymentIntent.payment_method
                            : (paymentIntent.payment_method?.id ?? "unknown");

                        const payload: OrderPayload = {
                          shippingMethod,
                          shippingCost,
                          payment: {
                            id: paymentIntent.id,
                            method: paymentMethodId,
                            amount: paymentIntent.amount,
                            status: paymentIntent.status,
                            currency: paymentIntent.currency,
                          },
                        };

                        if (showNewAddressForm) {
                          payload.contact = {
                            firstName: paymentData.first_name,
                            lastName: paymentData.last_name,
                            email: paymentData.email,
                            phone: paymentData.phone,
                          };
                          payload.shipping = {
                            address: paymentData.street_address,
                            city: paymentData.city,
                            state: paymentData.state,
                            zip: paymentData.zip,
                            country: paymentData.country,
                          };
                          payload.setDefault = setAsDefault;
                        } else if (selectedAddress) {
                          payload.addressId = selectedAddress.id;
                        }

                        const res = await clientApi.post("/order/place", payload);

                        toast.success("Order placed successfully!");
                        await clearCart();
                        const { order_id, total_amount } = res.data;
                        router.push(`/order-success?orderId=${order_id}&total=${total_amount}`);
                      } catch (err: unknown) {
                        let message = "Failed to place order";

                        if (err instanceof AxiosError) {
                          message = err.response?.data?.message ?? message;
                        }

                        toast.error(message);
                      } finally {
                        setShowStripe(false); // hide StripeCheckout after payment
                      }
                    }}
                  />
                )}
              </div>

              <Button
                onClick={handlePlaceOrderForm}
                className="w-full mt-4 bg-[var(--color-accent)] text-white"
              >
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
