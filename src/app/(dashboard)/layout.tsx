"use client";
import DashboardHeader from "@/components/dashboard/dashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/dashboardSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import withAuth from "@/hooks/withAuth";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default withAuth(DashboardLayout, {
  allowedRoles: "user",
  redirectTo: "/auth/login",
  requireAuth: true,
  protectedRoute: "/dashboard/:path*",
});
