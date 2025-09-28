"use client";

import { use, useEffect, useState } from "react";
import { OrderItem } from "@/components/orders/OrderItemRow";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { clientApi } from "@/utils/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

type OrderDetails = {
  id: string;
  total_amount: string;
  status: string | null;
  created_at: string;
  updated_at: string;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shipping: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    method: string;
    cost: string;
  };
  items: OrderItem[];
};

interface Props {
  params: Promise<{ id: string }>;
}

export default function OrderDetailsPage({ params }: Props) {
  const { id: orderId } = use(params); // <-- unwrap the params promise
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await clientApi.get(`/order/${orderId}`);
        setOrder(res.data);
      } catch (err: unknown) {
        console.error("Failed to fetch order:", err);

        let message = "Failed to fetch order details.";

        // Narrow the error to AxiosError
        if (err instanceof AxiosError) {
          message = err.response?.status === 401 ? "Please login to view this order." : message;
        }

        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="p-8 text-center text-gray-500">Loading order details...</p>;
  if (error || !order) return <p className="p-8 text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-2">Order #{order.id.slice(0, 8)}</h1>
      <p className="text-gray-500">Placed on {new Date(order.created_at).toLocaleDateString()}</p>

      {/* Order Info */}
      <Card>
        <CardHeader>
          <CardTitle>Order Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Status</span>
            <span>{order.status || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span>Total</span>
            <span>₹{order.total_amount || "0"}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Cost</span>
            <span>₹{order.shipping?.cost ?? "0"}</span>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p>
            {order.contact?.firstName ?? "N/A"} {order.contact?.lastName ?? ""}
          </p>
          <p>{order.contact?.email ?? "N/A"}</p>
          <p>{order.contact?.phone ?? "N/A"}</p>
        </CardContent>
      </Card>

      {/* Shipping Info */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p>{order.shipping?.address ?? "N/A"}</p>
          <p>
            {order.shipping?.city ?? ""}, {order.shipping?.state ?? ""} {order.shipping?.zip ?? ""}
          </p>
          <p>{order.shipping?.country ?? ""}</p>
          <p className="mt-2">Method: {order.shipping?.method ?? "N/A"}</p>
        </CardContent>
      </Card>
    </div>
  );
}
