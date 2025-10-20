"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us", active: true },
    { label: "How It Works", href: "/how-it-works" },
    {
      label: "Business",
      href: "/business",
      hasDropdown: true,
      dropdownItems: [
        { label: "Independent Pharmacies", href: "/independent-pharmacies" },
        { label: "Earn as a Driver", href: "/earn-as-driver" },
        { label: "Investors", href: "/investors" },
      ],
    },
  ];

  return (
    <div className="bg-[#1a0a1a] text-white">
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
                <a
                  href={item.href}
                  className={`text-white hover:text-peter transition-colors ${
                    item.active ? "border-b-2 border-peter pb-1" : ""
                  }`}
                  onMouseEnter={() =>
                    item.hasDropdown && setIsBusinessDropdownOpen(true)
                  }
                  onMouseLeave={() =>
                    item.hasDropdown && setIsBusinessDropdownOpen(false)
                  }
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="inline ml-1 w-4 h-4" />
                  )}
                </a>

                {/* Business Dropdown */}
                {item.hasDropdown && isBusinessDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                    onMouseEnter={() => setIsBusinessDropdownOpen(true)}
                    onMouseLeave={() => setIsBusinessDropdownOpen(false)}
                  >
                    {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                      <a
                        key={dropdownIndex}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                      >
                        {dropdownItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              className="bg-white text-gray-800 hover:bg-gray-100 border-white"
            >
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
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <div key={index}>
                  <a
                    href={item.href}
                    className={`block text-white hover:text-peter transition-colors ${
                      item.active ? "border-b-2 border-peter pb-1" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <a
                          key={dropdownIndex}
                          href={dropdownItem.href}
                          className="block text-gray-300 hover:text-peter transition-colors"
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                <Button
                  variant="outline"
                  className="bg-white text-gray-800 hover:bg-gray-100 border-white w-full"
                >
                  Login
                </Button>
                <Button className="bg-peter hover:bg-peter-dark text-white w-full">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
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
