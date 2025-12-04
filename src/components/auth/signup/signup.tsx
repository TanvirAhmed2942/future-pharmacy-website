"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useIcon from "@/hooks/useIcon";
import { ScrollArea } from "@/components/ui/scroll-area";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto bg-white/95 backdrop-blur-sm lg:bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg lg:shadow-none flex flex-col max-h-[90vh] lg:max-h-none overflow-hidden">
      {/* Logo and Header */}
      <div className="text-center mb-4 sm:mb-6 lg:mb-8 flex-shrink-0">
        <Image
          src="/nav/Logo.png"
          alt="logo"
          width={300}
          height={300}
          className="w-40 sm:w-48 h-12 sm:h-14 object-cover mx-auto my-2 sm:my-4"
        />
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Create Your Optimus Health Solutions
        </h2>
      </div>

      {/* Scrollable Form Area - Mobile Only */}
      <ScrollArea className="flex-1 h-[calc(90vh-200px)] lg:h-auto lg:max-h-none">
        <div className="pr-4 lg:pr-0">
          {/* Form */}
          <form className="space-y-5 sm:space-y-7 w-full min-w-0">
            {/* Full Name */}
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-gray-700 font-medium text-sm sm:text-md"
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name here..."
                className="w-full text-sm sm:text-base"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-700 font-medium text-sm sm:text-md"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address here..."
                className="w-full text-sm sm:text-base"
              />
            </div>

            {/* Create Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-gray-700 font-medium text-sm sm:text-md"
              >
                Create Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your create password here..."
                  className="w-full pr-10 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-gray-700 font-medium text-sm sm:text-md"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your confirm password here..."
                  className="w-full pr-10 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Privacy Policy */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) =>
                  setAgreeToTerms(checked as boolean)
                }
                className="rounded-full bg-gray-200"
              />
              <Label
                htmlFor="terms"
                className="text-xs sm:text-sm text-gray-700"
              >
                Agree to{" "}
                <a
                  href="#"
                  className="text-peter hover:text-peter-dark hover:underline"
                >
                  Terms & Privacy Policy
                </a>
              </Label>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              className="w-full bg-peter hover:bg-peter-dark text-white font-medium py-2 px-4 rounded-lg"
            >
              Sign Up
            </Button>

            {/* Continue with Google Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full bg-purple-50 hover:bg-purple-100 text-gray-700 font-medium py-2 px-4 rounded-lg border-purple-200 cursor-pointer"
            >
              <div className="flex items-center justify-center space-x-2">
                <p>{useIcon({ name: "google" })}</p>
                <span className="text-sm sm:text-base">
                  Continue with Google
                </span>
              </div>
            </Button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-4 sm:mt-6 pb-4 lg:pb-2">
            <p className="text-xs sm:text-sm text-gray-700">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-peter hover:text-peter-dark hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Signup;
