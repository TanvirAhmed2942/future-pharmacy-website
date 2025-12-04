import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Auth",
  description: "Auth",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="antialiased bg-white">
      <div className="w-full min-h-screen flex flex-col lg:flex-row items-center lg:justify-between relative">
        {/* Left Section - Purple Background with Image */}
        <div className="w-full lg:w-1/2 h-screen lg:h-screen bg-peter lg:rounded-tr-4xl lg:rounded-br-4xl lg:rounded-bl-none flex items-center justify-center relative z-0 lg:z-auto">
          <div className="w-10/12 h-10/12 max-w-lg max-h-lg aspect-square relative">
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
        <div className="w-full lg:w-1/2 absolute lg:relative top-0 left-0 lg:top-auto lg:left-auto z-10 lg:z-auto flex items-center justify-center min-h-screen lg:min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
}
