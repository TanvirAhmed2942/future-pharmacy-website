"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/slices/userSlice/userSlice";
import { logout } from "@/store/slices/userSlice/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useTranslations } from "next-intl";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);
  const [isMobileBusinessOpen, setIsMobileBusinessOpen] = useState(false);
  const [isContactSectionOpen, setIsContactSectionOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<string>("en");
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("header");

  // Get locale from cookie or localStorage
  useEffect(() => {
    const getLocale = () => {
      // Try to get from cookie first
      if (typeof document !== "undefined") {
        const cookies = document.cookie.split(";");
        const localeCookie = cookies.find((cookie) =>
          cookie.trim().startsWith("MYNEXTAPP_LOCALE=")
        );
        if (localeCookie) {
          const locale = localeCookie.split("=")[1]?.trim();
          if (locale === "es" || locale === "en") {
            return locale;
          }
        }
        // Fallback to localStorage
        const storedLocale = localStorage.getItem("locale");
        if (storedLocale === "es" || storedLocale === "en") {
          return storedLocale;
        }
      }
      return "en"; // Default to English
    };
    setCurrentLocale(getLocale());
  }, []);

  // Determine if Spanish based on current locale
  const isSpanish = currentLocale === "es";

  // Fix hydration issues by ensuring client-side rendering matches server
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Language toggle handler
  const handleLanguageToggle = () => {
    const newLocale = isSpanish ? "en" : "es";

    // 1. Update state
    setCurrentLocale(newLocale);

    // 2. Set cookie (this is what your i18n config reads!)
    if (typeof document !== "undefined") {
      document.cookie = `MYNEXTAPP_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

      // 3. Also update localStorage for backwards compatibility
      localStorage.setItem("locale", newLocale);
    }

    // 4. Refresh the router to apply new locale
    startTransition(() => {
      router.refresh();
    });
  };

  const navItems = [
    { label: t("navlink.home"), href: "/" },
    { label: t("navlink.aboutUs"), href: "/about-us" },
    { label: t("navlink.howItWorks"), href: "/how-it-works" },
  ];

  const businessItems = [
    {
      label: t("business.independentPharmacies"),
      href: "/independent-pharmacies",
    },
    { label: t("business.earnAsDriver"), href: "/earn-as-driver" },
    { label: t("business.investors"), href: "/investors" },
    { label: t("business.otherBusinesses"), href: "/other-businesses" },
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
                    src={"/nav/logo_last.svg"}
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-peter focus:ring-offset-2 rounded-full">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="User"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard/overview")}
                      className="cursor-pointer"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Go to Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        dispatch(logout());
                        router.push("/");
                      }}
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  className="bg-peter hover:bg-peter-dark text-white text-xs px-3 py-2"
                  onClick={() => router.push("/auth/login")}
                >
                  {t("login")}
                </Button>
              )}
            </div>
          </div>

          {/* Desktop Layout - Original */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative w-48 h-16">
                <Link href="/">
                  <Image
                    src={"/nav/logo_last.svg"}
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
                  <span
                    suppressHydrationWarning
                    className={cn(
                      "text-white hover:text-[#ba5fb0] transition-colors cursor-pointer",
                      (isActive("/independent-pharmacies") ||
                        isActive("/earn-as-driver") ||
                        isActive("/investors") ||
                        isActive("/other-businesses")) &&
                        "border-b-2 border-[#8d4585]"
                    )}
                  >
                    {t("business.business")}
                  </span>
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

              {/* Language Switch with next-intl functionality */}
              <div className="flex items-center gap-2">
                <label className="language-switch" htmlFor="language">
                  <input
                    id="language"
                    type="checkbox"
                    checked={isSpanish}
                    onChange={handleLanguageToggle}
                    disabled={isPending}
                  />
                  <span className="switch-track">
                    <span className="language-option inactive">EN</span>
                    <span className="language-option inactive">ES</span>
                    <span className="switch-thumb">
                      {isSpanish ? "ES" : "EN"}
                    </span>
                  </span>
                </label>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-peter focus:ring-offset-2 rounded-full">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="User"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard/overview")}
                      className="cursor-pointer"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Go to Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        dispatch(logout());
                        router.push("/");
                      }}
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    className="bg-white text-gray-800 hover:bg-gray-100 border-white"
                    onClick={() => router.push("/auth/login")}
                  >
                    {t("login")}
                  </Button>
                  <Button
                    className="bg-peter hover:bg-peter-dark text-white"
                    onClick={() => router.push("/auth/signup")}
                  >
                    {t("signup")}
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
              <div
                onClick={() => setIsMobileBusinessOpen(!isMobileBusinessOpen)}
                className="flex items-center justify-between cursor-pointer"
              >
                <span
                  suppressHydrationWarning
                  className={cn(
                    "block text-white hover:text-[#ba5fb0] transition-colors",
                    (isActive("/independent-pharmacies") ||
                      isActive("/earn-as-driver") ||
                      isActive("/investors") ||
                      isActive("/other-businesses")) &&
                      "border-b-2 border-[#8d4585]"
                  )}
                >
                  {t("business.business")}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-white transition-transform duration-300",
                    isMobileBusinessOpen && "rotate-180"
                  )}
                />
              </div>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isMobileBusinessOpen
                    ? "max-h-96 opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                )}
              >
                <div className="ml-4 space-y-2">
                  {businessItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "block text-gray-300 hover:text-[#ba5fb0] transition-colors",
                        isActive(item.href) && "text-[#ba5fb0] font-medium"
                      )}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileBusinessOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Language Switch for Mobile with next-intl functionality */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <span className="text-white text-sm">Language</span>
              <label className="language-switch" htmlFor="language-mobile">
                <input
                  id="language-mobile"
                  type="checkbox"
                  checked={isSpanish}
                  onChange={handleLanguageToggle}
                  disabled={isPending}
                />
                <span className="switch-track">
                  <span className="language-option inactive">EN</span>
                  <span className="language-option inactive">ES</span>
                  <span className="switch-thumb">
                    {isSpanish ? "ES" : "EN"}
                  </span>
                </span>
              </label>
            </div>

            {!isLoggedIn && (
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  className="bg-white text-gray-800 hover:bg-gray-100 border-white w-full"
                  onClick={() => {
                    router.push("/auth/login");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t("login")}
                </Button>
                <Button
                  className="bg-peter hover:bg-peter-dark text-white w-full"
                  onClick={() => {
                    router.push("/auth/signup");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t("signup")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Contact Information */}
      <div className="bg-[#1a0a1a] border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-18  py-3">
          {/* Mobile Layout - Collapsible */}
          <div className="block sm:hidden">
            {/* Toggle Button */}
            <button
              onClick={() => setIsContactSectionOpen(!isContactSectionOpen)}
              className="flex items-center justify-between w-full text-left text-sm text-white hover:text-peter transition-colors"
            >
              <span>{t("bottomHeader.contactInformation")}</span>
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
                  <div>{t("bottomHeader.contactUsText")}</div>
                  <div className="text-peter font-medium">917-993-0549</div>
                  <div>{t("bottomHeader.mailUs")}</div>
                  <a
                    href="mailto:support@optimushs.com"
                    className="text-peter hover:underline font-medium"
                  >
                    support@optimushs.com
                  </a>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-2 pt-2 mr-4">
                  <Clock className="w-4 h-4 text-purple-400 mt-0.5" />
                  <div className="text-sm">
                    <div>
                      {t("bottomHeader.businessHoursText")} |{" "}
                      {t("bottomHeader.businessHoursText2")}
                    </div>
                    <div>{t("bottomHeader.businessHoursText3")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Side by Side */}
          <div className="hidden sm:flex items-center justify-between text-sm text-white">
            {/* Contact Section */}
            <div className="flex items-center gap-4">
              <span>{t("bottomHeader.contactUsText")}</span>
              <span className="text-peter font-medium">917-993-0549</span>
              <div className="w-px h-4 bg-gray-600"></div>
              <span>{t("bottomHeader.mailUs")}</span>
              <a
                href="mailto:support@optimushs.com"
                className="text-peter hover:underline font-medium"
              >
                support@optimushs.com
              </a>
            </div>

            {/* Business Hours Section */}
            <div className="flex items-center gap-2 mr-3">
              <Clock className="w-4 h-4 text-purple-400" />
              <div className="flex items-center gap-4 text-sm">
                <span className="border-r border-gray-600 pr-2">
                  {t("bottomHeader.businessHoursText")}
                </span>
                <span className="border-r border-gray-600 pr-2">
                  {t("bottomHeader.businessHoursText2")}
                </span>
                <span>{t("bottomHeader.businessHoursText3")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
