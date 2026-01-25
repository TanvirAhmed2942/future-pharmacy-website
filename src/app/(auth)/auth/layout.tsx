import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Auth | Optimus HS",
  description: "Authentication page of Optimus Health Solutions",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: ["Auth", "Authentication", "Login", "Signup", "Optimus Health Solutions", "Optimus HS"],
  authors: [{ name: "Optimus Health Solutions" }],
  robots: "index, follow",
  openGraph: {
    title: "Auth | Optimus HS",
    description: "Authentication page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auth | Optimus HS",
    description: "Authentication page of Optimus Health Solutions",
    images: "/icon.svg",
  },
  applicationName: "Optimus Health Solutions",
  publisher: "Optimus Health Solutions",
  creator: "Optimus Health Solutions",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="antialiased ">
      <div className="w-full min-h-screen flex flex-col lg:flex-row items-center lg:justify-between relative overflow-hidden">
        {/* Left Section - Purple Background with Image */}
        <div className="w-full lg:w-1/2 h-screen lg:h-screen bg-peter lg:rounded-tr-[4rem] lg:rounded-br-[4rem] lg:rounded-bl-none flex items-center justify-center relative z-0 lg:z-auto py-4 lg:py-8">
          <div className="w-9/12 h-9/12 max-w-md max-h-md aspect-square relative">
            <Image
              src="/auth/auth-left-img.png"
              alt="logo"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
        {/* Right Section - Login Form */}
        <div className="w-full lg:w-1/2 absolute lg:relative top-0 left-0 lg:top-auto lg:left-auto z-10 lg:z-auto flex items-center justify-center min-h-screen lg:min-h-0 py-2 lg:py-3 overflow-y-auto lg:overflow-y-visible">
          {children}
        </div>
      </div>
    </div>
  );
}
