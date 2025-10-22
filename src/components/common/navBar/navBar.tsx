"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "How It Works", href: "/how-it-works" },
  ];

  const businessItems = [
    { label: "Independent Pharmacies", href: "/independent-pharmacies" },
    { label: "Earn as a Driver", href: "/earn-as-driver" },
    { label: "Investors", href: "/investors" },
  ];

  const isActive = (href: string) => {
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
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative w-48 h-12">
              <Image
                src={"/nav/Logo.png"}
                alt="Optimus Health Solutions Logo"
                width={192}
                height={48}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
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
          <div className="hidden lg:flex items-center space-x-4">
            <Button className="bg-white text-gray-800 hover:bg-gray-100 border-white">
              Login
            </Button>
            <Button className="bg-peter hover:bg-peter-dark text-white">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-end">
            <p className="text-sm text-gray-300">
              Need Help? Please Call or Text{" "}
              <a href="tel:917-993-0549" className="text-peter hover:underline">
                917-993-0549
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
