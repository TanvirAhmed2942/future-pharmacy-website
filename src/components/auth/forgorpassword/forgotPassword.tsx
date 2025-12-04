"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function ForgotPassword() {
  return (
    <div className="w-full max-w-xl mx-auto bg-white/95 backdrop-blur-sm lg:bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg lg:shadow-none">
      {/* Logo and Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Image
          src="/nav/Logo.png"
          alt="logo"
          width={300}
          height={300}
          className="w-40 sm:w-48 h-12 sm:h-14 object-cover mx-auto my-2 sm:my-4"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
          Reset Password
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm">
          Enter your registered email to receive an OTP.
        </p>
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

        {/* Send OTP Button */}
        <div className="flex justify-start">
          <Button
            type="submit"
            className="bg-peter hover:bg-peter-dark text-white font-medium py-2 px-6 rounded-lg w-full sm:w-auto"
          >
            Send OTP
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
