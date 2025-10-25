"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoNotificationsOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
function DashboardHeader() {
  const router = useRouter();
  return (
    <div className="w-full h-20 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger />{" "}
        <span className="text-gray-500">Welcome, John Doe</span>
      </div>

      <div className="flex items-center gap-4">
        <Button
          size="icon"
          className="bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
        >
          <IoNotificationsOutline className="size-6 text-gray-500 " />
        </Button>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/dashboard/profile")}
        >
          {" "}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-gray-500">John Doe</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
