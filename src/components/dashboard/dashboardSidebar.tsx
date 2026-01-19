"use client";

import { useState } from "react";
import { Bookmark, CreditCard, Inbox, LogOut } from "lucide-react";
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
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/userSlice/userSlice";
import { clearCheckoutData } from "@/store/slices/checkoutSlice";
import { cn } from "@/lib/utils";
import LogoutConfirmationModal from "@/components/common/logoutconfirmation/LogoutConfirmationModal";

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
    title: "Saved Blogs",
    url: "/dashboard/saved-blogs",
    icon: Bookmark,
  },
  {
    title: "Logout",
    url: "/auth/login",
    icon: LogOut,
  },
];

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Check if a link is active
  const isActive = (url: string) => {
    if (url === "/dashboard/overview") {
      return pathname === "/dashboard/overview";
    }
    return pathname.startsWith(url);
  };

  // Show logout confirmation modal
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // Actually perform logout after confirmation
  const confirmLogout = () => {
    dispatch(clearCheckoutData());
    dispatch(logout());
    // Also manually clear all persisted data from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("persist:checkout");
      localStorage.removeItem("persist:root");
      // Clear any other persist keys that might exist
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("persist:")) {
          localStorage.removeItem(key);
        }
      });
    }
    router.push("/auth/login");
  };

  return (
    <Sidebar className="border-none">
      <SidebarContent className="rounded-2xl bg-peter m-4 ">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-center my-10">
            {/* <div className="w-full h-full"> */}
            <Image
              src="/nav/Logo_footer.svg"
              alt="logo"
              width={1000}
              height={1000}
              className="w-full h-20 object-contain"
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
                        onClick={handleLogoutClick}
                        className="flex items-center gap-2 text-white cursor-pointer hover:text-red-500 active:text-red-500"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                // Regular menu items with links
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      isActive={active}
                    >
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center gap-2 text-white transition-colors hover:bg-white/20 hover:text-white",
                          active && "bg-white/20 font-semibold hover:bg-white/20 hover:text-white"
                        )}
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

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </Sidebar>
  );
}
