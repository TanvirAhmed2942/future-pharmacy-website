"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Clock, User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/userInfo.authProvide";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);
  const [isContactSectionOpen, setIsContactSectionOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, toggleLogin } = useAuth();
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "How It Works", href: "/how-it-works" },
  ];

  const businessItems = [
    { label: "Independent Pharmacies", href: "/independent-pharmacies" },
    { label: "Earn as a Driver", href: "/earn-as-driver" },
    { label: "Investors", href: "/investors" },
    { label: "Other Businesses", href: "/other-businesses" },
  ];

  const isActive = (href: string) => {
    if (!isHydrated) return false;
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="bg-[#1a0a1a] text-white sticky top-0 z-50">
      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-between w-full">
            {/* Mobile Menu Button - Left Side */}
            <button
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo - Centered */}
            <div className="flex items-center justify-center flex-1">
              <div className="relative w-32 h-8">
                <Link href="/">
                  <Image
                    src={"/nav/Logo.png"}
                    alt="Optimus Health Solutions Logo"
                    width={192}
                    height={48}
                    className="object-contain"
                    priority
                  />
                </Link>
              </div>
            </div>

            {/* Right Side - Login/Logout or Avatar */}
            <div className="flex items-center">
              {isLoggedIn ? (
                <Link href="/dashboard/profile" className="cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <Button
                  className="bg-peter hover:bg-peter-dark text-white text-xs px-3 py-2"
                  onClick={toggleLogin}
                >
                  Login Test
                </Button>
              )}
            </div>
          </div>

          {/* Desktop Layout - Original */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative w-48 h-12">
                <Link href="/">
                  <Image
                    src={"/nav/Logo.png"}
                    alt="Optimus Health Solutions Logo"
                    width={192}
                    height={48}
                    className="object-contain"
                    priority
                  />
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "text-white hover:text-[#ba5fb0] transition-colors",
                      isActive(item.href) && "border-b-2 py-1 border-[#8d4585]"
                    )}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}

              {/* Business Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsBusinessDropdownOpen(true)}
                onMouseLeave={() => setIsBusinessDropdownOpen(false)}
              >
                <div className="flex items-center">
                  <Link
                    href="/business"
                    className={cn(
                      "text-white hover:text-[#ba5fb0] transition-colors",
                      isActive("/business") && "border-b-2 border-[#8d4585]"
                    )}
                  >
                    Business
                  </Link>
                  <div
                    className="ml-1 cursor-pointer"
                    onMouseEnter={() => setIsBusinessDropdownOpen(true)}
                    onMouseLeave={() => setIsBusinessDropdownOpen(false)}
                  >
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isBusinessDropdownOpen && "rotate-180"
                      )}
                    />
                  </div>
                </div>

                {isBusinessDropdownOpen && (
                  <div className="absolute top-full left-0  w-64 bg-white rounded-lg shadow-lg py-2 z-50">
                    {businessItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className={cn(
                          "block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors rounded-md mx-2",
                          isActive(item.href) && "bg-gray-100 font-medium"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Test Button for Login State */}
              <Button
                className={`${
                  isLoggedIn
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-pink-500 hover:bg-pink-600"
                } text-xs px-3 py-2 flex items-center gap-2`}
                onClick={toggleLogin}
              >
                {isLoggedIn ? (
                  <>
                    <LogOut className="w-4 h-4" />
                    Logout Test
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    Login Test
                  </>
                )}
              </Button>

              {isLoggedIn ? (
                <Button
                  className="bg-white text-gray-800 hover:bg-gray-100 border-white"
                  onClick={() => router.push("/dashboard/overview")}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    className="bg-white text-gray-800 hover:bg-gray-100 border-white"
                    onClick={() => router.push("/auth/login")}
                  >
                    Login
                  </Button>
                  <Button
                    className="bg-peter hover:bg-peter-dark text-white"
                    onClick={() => router.push("/auth/signup")}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen
              ? "max-h-96 opacity-100 mt-4 pb-4"
              : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <div key={index}>
                <Link
                  href={item.href}
                  className={cn(
                    "block text-white hover:text-[#ba5fb0] transition-colors",
                    isActive(item.href) && "border-b-2 border-[#8d4585]"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}

            {/* Business Dropdown for Mobile */}
            <div>
              <Link
                href="/business"
                className={cn(
                  "block text-white hover:text-[#ba5fb0] transition-colors mb-2",
                  isActive("/business") && "border-b-2 border-[#8d4585]"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Business
              </Link>
              <div className="ml-4 space-y-2">
                {businessItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "block text-gray-300 hover:text-[#ba5fb0] transition-colors",
                      isActive(item.href) && "text-[#ba5fb0] font-medium"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
              <Button className="bg-white text-gray-800 hover:bg-gray-100 border-white w-full">
                Login
              </Button>
              <Button className="bg-peter hover:bg-peter-dark text-white w-full">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contact Information */}
      <div className="bg-[#1a0a1a] border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-52 py-3">
          {/* Mobile Layout - Collapsible */}
          <div className="block sm:hidden">
            {/* Toggle Button */}
            <button
              onClick={() => setIsContactSectionOpen(!isContactSectionOpen)}
              className="flex items-center justify-between w-full text-left text-sm text-white hover:text-peter transition-colors"
            >
              <span>Contact Information</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  isContactSectionOpen && "rotate-180"
                )}
              />
            </button>

            {/* Collapsible Content */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isContactSectionOpen
                  ? "max-h-96 opacity-100 mt-3"
                  : "max-h-0 opacity-0"
              )}
            >
              <div className="space-y-2 text-sm text-white">
                {/* Contact Details */}
                <div className="space-y-1">
                  <div>Contact Us? Please Call or Text</div>
                  <div className="text-peter font-medium">917-993-0549</div>
                  <div>Email us:</div>
                  <a
                    href="mailto:support@optimushs.com"
                    className="text-peter hover:underline font-medium"
                  >
                    support@optimushs.com
                  </a>
                </div>

                {/* Business Hours */}
                <div className="flex items-center gap-2 pt-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <div className="text-sm">
                    <div>Mon-Fri: 8a.m.-7p.m. | Sat: 8a.m.-1p.m.</div>
                    <div>Sun: Closed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Side by Side */}
          <div className="hidden sm:flex items-center justify-between text-sm text-white">
            {/* Contact Section */}
            <div className="flex items-center gap-4">
              <span>Contact Us? Please Call or Text</span>
              <span className="text-peter font-medium">917-993-0549</span>
              <div className="w-px h-4 bg-gray-600"></div>
              <span>Email us:</span>
              <a
                href="mailto:support@optimushs.com"
                className="text-peter hover:underline font-medium"
              >
                support@optimushs.com
              </a>
            </div>

            {/* Business Hours Section */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <div className="flex items-center gap-4 text-sm">
                <span className="border-r border-gray-600 pr-2">
                  Mon-Fri: 8a.m.-7p.m.
                </span>
                <span className="border-r border-gray-600 pr-2">
                  Sat: 8a.m.-1p.m.
                </span>
                <span>Sun: Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
