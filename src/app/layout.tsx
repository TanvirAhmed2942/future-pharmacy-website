import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/common/ConditionalLayout";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import ReduxProvider from "@/store/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
import AuthRestorer from "@/components/common/AuthRestorer";

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
