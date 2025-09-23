"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function Profile() {
  const { user, setUser } = useUser();
  const isLoggedIn = !!user;

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {isLoggedIn ? `Hi, ${user.name}` : "Login"}
          <User size={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          align="end"
          sideOffset={4}
          className="w-72 z-[2000] shadow-lg rounded-md bg-white border"
        >
          {isLoggedIn ? (
            <>
              <DropdownMenuItem asChild>
                <Link href="#">My Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#">Wishlist</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#">Check Order / Initiate Return</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#">Store Finder</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#">Finishing</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Language Selector */}
              <div className="flex items-center justify-between px-2 py-1">
                <span className="text-sm">Language</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm">EN</span>
                  <div className="w-5 h-5 rounded-full overflow-hidden">
                    <div className="w-full h-1/3 bg-[#FF9933]" />
                    <div className="w-full h-1/3 bg-white" />
                    <div className="w-full h-1/3 bg-[#138808]" />
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />

              <div className="p-2">
                <Button className="w-full" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link href="#">My Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#">Wishlist</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#">Check Order / Initiate Return</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#">Store Finder</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#">Finishing</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Language Selector */}
              <div className="flex items-center justify-between px-2 py-1">
                <span className="text-sm">Language</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm">EN</span>
                  <div className="w-5 h-5 rounded-full overflow-hidden">
                    <div className="w-full h-1/3 bg-[#FF9933]" />
                    <div className="w-full h-1/3 bg-white" />
                    <div className="w-full h-1/3 bg-[#138808]" />
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />

              <div className="p-2">
                <Button className="w-full bg-black text-white hover:bg-gray-900">
                  Login
                </Button>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
