// src/app/order-success/OrderSuccessContent.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const total = searchParams.get("total");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      {/* Success animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex justify-center mb-6"
      >
        <CheckCircle2 className="w-20 h-20 text-green-600" />
      </motion.div>

      <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
      <p className="text-gray-600 mb-8">
        We’ve received your order and will send you a confirmation email shortly.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Here are your order details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Order ID</span>
            <span>{orderId || "N/A"}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="font-medium">Total Paid</span>
            <span className="text-lg font-semibold">₹{total || "0"}</span>
          </div>
          <Separator />
          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <Package className="w-4 h-4" />
            <span>Your order is being prepared for shipment.</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button onClick={() => router.push("/orders")} className="bg-yellow-600 text-white">
          <ShoppingBag className="w-4 h-4 mr-2" /> View Orders
        </Button>
        <Button variant="outline" onClick={() => router.push("/products")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
