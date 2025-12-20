"use client";

import { CreditCard, Inbox, LogOut } from "lucide-react";
import { TbLayoutDashboard } from "react-icons/tb";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/userSlice/userSlice";

// Menu items.
const items = [
  {
    title: "Overview",
    url: "/dashboard/overview",
    icon: TbLayoutDashboard,
  },
  {
    title: "My Requests",
    url: "/dashboard/my-requests",
    icon: Inbox,
  },
  {
    title: "Payments",
    url: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Logout",
    url: "/auth/login",
    icon: LogOut,
  },
];

export function DashboardSidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <Sidebar className="border-none">
      <SidebarContent className="rounded-2xl bg-peter m-4 ">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-center my-10">
            {/* <div className="w-full h-full"> */}
            <Image
              src="/nav/dashboard_logo.png"
              alt="logo"
              width={1000}
              height={1000}
              className="w-full h-14"
            />
            {/* </div> */}
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-10">
            <SidebarMenu>
              {items.map((item) => {
                // Handle logout separately
                if (item.title === "Logout") {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-white cursor-pointer"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                // Regular menu items with links
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex items-center gap-2 text-white"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
