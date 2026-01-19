import type { Metadata } from "next";
import DashboardLayoutClient from "./layout-client";

export const metadata: Metadata = {
  title: "Dashboard | Optimus HS",
  description: "Dashboard page of Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Dashboard", "User Dashboard", "Optimus Health Solutions", "Optimus HS"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "noindex, nofollow",
  openGraph: {
    title: "Dashboard | Optimus HS",
    description: "Dashboard page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard | Optimus HS",
    description: "Dashboard page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  applicationName: "Optimus Health Solutions",
  publisher: "Optimus Health Solutions",
  creator: "Optimus Health Solutions",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
