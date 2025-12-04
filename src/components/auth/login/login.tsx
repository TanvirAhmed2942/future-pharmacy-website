"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto bg-white/95 backdrop-blur-sm lg:bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg lg:shadow-none">
      {/* Logo and Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Image
          src="/nav/Logo.svg"
          alt="logo"
          width={300}
          height={300}
          className="w-40 sm:w-48 h-fit sm:h-fit object-cover mx-auto my-2 sm:my-4"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Login to Your Account
        </h2>
      </div>

      {/* Form */}
      <form className="space-y-5 sm:space-y-7">
        {/* Email Address */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-gray-800 font-bold text-sm sm:text-md"
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

        {/* Password */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-gray-800 font-bold text-sm sm:text-md"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password here..."
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

        {/* Login Button and Forget Password Link */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
          <Button
            type="submit"
            className="bg-peter hover:bg-peter-dark text-white font-medium py-2 px-6 rounded-lg w-full sm:w-auto"
          >
            Login
          </Button>
          <Link
            href="/auth/forgot-password"
            className="text-peter hover:text-peter-dark hover:underline text-sm text-center sm:text-left"
          >
            Forget Password?
          </Link>
        </div>
      </form>

      {/* Footer Link */}
      <div className="text-center mt-4 sm:mt-6">
        <p className="text-xs sm:text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-peter hover:text-peter-dark hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
