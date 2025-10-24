"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/common/navBar/navBar";
import Footer from "@/components/common/footer/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Check if current path is an auth page or dashboard page
  const isAuthPage = pathname.startsWith("/auth");
  const isDashboardPage = pathname.startsWith("/dashboard");

  // If it's an auth page or dashboard page, don't show NavBar and Footer
  if (isAuthPage || isDashboardPage) {
    return <>{children}</>;
  }

  // For all other pages, show NavBar and Footer
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
