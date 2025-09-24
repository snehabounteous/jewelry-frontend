import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export type OrderSummary = {
  id: string;
  total_amount: string;
  status: string | null;
  created_at: string;
  updated_at: string;
};

export default function OrderCard({ order }: { order: OrderSummary }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Order #{order.id.slice(0, 8)}</span>
          <span className="text-sm font-medium text-gray-500">{order.status}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm">
          <span>Total</span>
          <span>₹{order.total_amount}</span>
        </div>
        <Separator className="my-3" />
        <Link href={`/orders/${order.id}`} className="text-yellow-600 text-sm font-medium hover:underline">
          View Details
        </Link>
      </CardContent>
    </Card>
  );
}
