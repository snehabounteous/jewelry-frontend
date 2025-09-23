export type OrderItem = {
  id: string;
  product_id: string;
  quantity: number;
  price: string;
};

export default function OrderItemRow({ item }: { item: OrderItem }) {
  return (
    <div className="flex justify-between text-sm py-2 border-b last:border-0">
      <div>Product #{item.product_id.slice(0, 8)}</div>
      <div>x{item.quantity}</div>
      <div>₹{item.price}</div>
    </div>
  );
}
