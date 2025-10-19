"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function ForgotPassword() {
  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg">
      {/* Logo and Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-8 h-8 bg-peter rounded-full flex items-center justify-center mr-3">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-peter">Optimus</h1>
            <p className="text-sm text-peter font-medium">HEALTH SOLUTIONS</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Reset Password
        </h2>
        <p className="text-gray-600 text-sm">
          Enter your registered email to receive an OTP.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6">
        {/* Email Address */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-800 font-bold">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address here..."
            className="w-full"
          />
        </div>

        {/* Send OTP Button */}
        <div className="flex justify-start">
          <Button
            type="submit"
            className="bg-peter hover:bg-peter-dark text-white font-medium py-2 px-6 rounded-lg"
          >
            Send OTP
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
