"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { clientApi } from "@/utils/axios";
import { useUser } from "../context/UserContext";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
}

interface CartContextType {
  cart: CartItem[];
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useUser();

  // Fetch cart when user changes
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;

      try {
        const res = await clientApi.get("/cart");
        console.log(res.data);
        // Ensure res.data.items exists
        if (res.data?.items?.length) {
          const cartItems: CartItem[] = res.data.items.map((item: any) => ({
            id: item.product.id,
            name: item.product.name,
            price: Number(item.product.price),
            quantity: item.quantity,
            image: item.product.image || "/placeholder.png",
            category: item.product.category_id,
          }));
          setCart(cartItems);
        } else {
          setCart([]);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        setCart([]);
      }
    };

    fetchCart();
  }, [user]);

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, updateQuantity, removeFromCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
