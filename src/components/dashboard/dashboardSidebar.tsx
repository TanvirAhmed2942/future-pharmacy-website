import { CreditCard, Home, Inbox, LogOut } from "lucide-react";

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

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/overview",
    icon: Home,
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
  return (
    <Sidebar className="border-none">
      <SidebarContent className="rounded-2xl bg-peter m-4 ">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-center my-10">
            <Image
              src="/nav/dashboard_logo.png"
              alt="logo"
              width={200}
              height={200}
            />
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-10">
            <SidebarMenu>
              {items.map((item) => (
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
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
