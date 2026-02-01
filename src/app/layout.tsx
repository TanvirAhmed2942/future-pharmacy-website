import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/common/ConditionalLayout";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import ReduxProvider from "@/store/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
import AuthRestorer from "@/components/common/AuthRestorer";
import PopoverGuard from "@/components/common/PopoverGuard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://optimushs.com"),
  title: "Optimus HS",
  description: "Optimus Health Solutions - Your fast and reliable gateway to local pharmacies",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-gray-50 `}>
        <PopoverGuard />
        {/* ReduxProvider wraps all layouts (auth, dashboard, etc.) */}
        <ReduxProvider>
          <AuthRestorer />
          <NextIntlClientProvider messages={messages} locale={locale}>
            <ConditionalLayout>
              {/* <GlobalSmoothScroll /> */}
              {children}
              <Toaster />
            </ConditionalLayout>
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
