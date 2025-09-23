import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/UserContext";
import CartProvider from "@/components/cart/CartProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUMIÈRE | Buy Fine Gold, Silver and Diamond Jewelery at best prices",
  description: "Fine Jewellery Store",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CartProvider>
        <UserProvider>
          <Navbar />
          <main style={{ flex: 1, paddingTop: "80px" }}>
            {children}
          </main>
          <Footer />
          <Toaster />
        </UserProvider>
        </CartProvider>
      </body>
    </html>
  );
};

export default RootLayout;