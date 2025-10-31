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
    <div className="w-full max-w-xl mx-auto bg-white p-8 rounded-lg">
      {/* Logo and Header */}
      <div className="text-center mb-8">
        {/* <div className="flex items-center justify-center mb-4">
          <div className="w-8 h-8 bg-peter rounded-full flex items-center justify-center mr-3">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-peter">Optimus</h1>
            <p className="text-sm text-peter font-medium">HEALTH SOLUTIONS</p>
          </div>
        </div> */}
        <Image
          src="/nav/Logo.png"
          alt="logo"
          width={300}
          height={300}
          className="w-48 h-14 object-cover mx-auto my-4"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Login to Your Account
        </h2>
        {/* <h3 className="text-lg font-bold text-gray-800">
          Optimus Health Solutions
        </h3> */}
      </div>

      {/* Form */}
      <form className="space-y-7">
        {/* Email Address */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-800 font-bold text-md">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address here..."
            className="w-full"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-800 font-bold text-md">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password here..."
              className="w-full pr-10"
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
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className="bg-peter hover:bg-peter-dark text-white font-medium py-2 px-6 rounded-lg"
          >
            Login
          </Button>
          <Link
            href="/auth/forgot-password"
            className="text-peter hover:text-peter-dark hover:underline text-sm"
          >
            Forget Password?
          </Link>
        </div>
      </form>

      {/* Footer Link */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-700">
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
