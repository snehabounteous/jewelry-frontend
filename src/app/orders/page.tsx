"use client";

import { useEffect, useState } from "react";
import OrderCard, { OrderSummary } from "@/components/orders/OrderCard";
import { clientApi } from "@/utils/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await clientApi.get("/order");
      setOrders(res.data);
    } catch (err: unknown) {
      console.error("Failed to fetch orders:", err);

      let message = "Failed to fetch orders. Try again later.";

      // Narrow the error to AxiosError
      if (err instanceof AxiosError) {
        message = err.response?.status === 401 ? "Please login to view your orders." : message;
      }

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="p-8 text-center text-gray-500">Loading your orders...</p>;
  }

  if (error) {
    return <p className="p-8 text-center text-red-600">{error}</p>;
  }

  if (!orders.length) {
    return <p className="p-8 text-center text-gray-500">You haven’t placed any orders yet.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      <div className="grid gap-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
