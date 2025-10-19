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
      <div className="w-full h-screen flex items-center justify-between">
        <div className="w-1/2 h-full bg-peter rounded-tr-4xl rounded-br-4xl flex items-center justify-center relative">
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
        {children}
      </div>
    </div>
  );
}
