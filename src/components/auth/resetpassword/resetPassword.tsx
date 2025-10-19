"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          Create New Password
        </h2>
        <p className="text-gray-700 text-sm mb-6">
          To help keep your account safe, Optimus Health Solutions wants to make
          sure it&apos;s really you trying to sign in.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6">
        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-gray-800 font-bold">
            New Password
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password here..."
              className="w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-gray-800 font-bold">
            Confirm New Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter your confirm new password here..."
              className="w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Change Password Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-peter hover:bg-peter-dark text-white font-medium py-2 px-6 rounded-lg"
          >
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
