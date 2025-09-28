"use client";

import { FC, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar } from "@/components/ui/avatar";

interface ProfileProps {
  user: { id: string; name: string } | null;
  logout: () => Promise<void>;
}

const Profile: FC<ProfileProps> = ({ user, logout }) => {
  const [open, setOpen] = useState(false);

  if (!user) {
    return null; // or show login button
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button>
          <Avatar>{user.name.charAt(0)}</Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-4">
        <p className="font-medium mb-2">{user.name}</p>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
