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

  // Check if current path is an auth page
  const isAuthPage = pathname.startsWith("/auth");

  // If it's an auth page, don't show NavBar and Footer
  if (isAuthPage) {
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
