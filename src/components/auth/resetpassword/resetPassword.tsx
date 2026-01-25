"use client";

import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/store/Apis/authApis/authApi";
import useShowToast from "@/hooks/useShowToast";
import { deleteCookie } from "@/lib/cookies";

function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();
  const { showSuccess, showError } = useShowToast();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!newPassword || !confirmPassword) {
      showError({ message: "Please fill in all fields" });
      return;
    }

    if (newPassword.length < 6) {
      showError({ message: "Password must be at least 6 characters long" });
      return;
    }

    if (newPassword !== confirmPassword) {
      showError({ message: "Passwords do not match" });
      return;
    }

    try {
      const response = await resetPasswordMutation({
        newPassword,
        confirmPassword,
      }).unwrap();

      if (response.success) {
        // Clear the forget tokens from cookies
        deleteCookie("forgetToken");
        deleteCookie("forgetOtpMatchToken");

        showSuccess({
          message: response.message || "Password reset successfully!",
        });

        // Redirect to login page after success
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      } else {
        showError({
          message:
            response.error || response.message || "Failed to reset password",
        });
      }
    } catch (error: unknown) {
      // Handle RTK Query error
      let errorMessage = "An error occurred while resetting password";

      if (error && typeof error === "object") {
        if ("data" in error && error.data && typeof error.data === "object") {
          const data = error.data as { message?: string; error?: string };
          errorMessage = data.message || data.error || errorMessage;
        } else if ("message" in error && typeof error.message === "string") {
          errorMessage = error.message;
        }
      }

      showError({ message: errorMessage });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/95 backdrop-blur-sm lg:bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg lg:shadow-xs">
      {/* Logo and Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Image
          src="/nav/Logo.svg"
          alt="logo"
          width={300}
          height={300}
          className="w-40 sm:w-48 h-fit sm:h-fit object-cover mx-auto my-2 sm:my-4"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
          Create New Password
        </h2>
        <p className="text-gray-700 text-xs sm:text-sm mb-4 sm:mb-6">
          To help keep your account safe, Optimus Health Solutions wants to make
          sure it&apos;s really you trying to sign in.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-7">
        {/* New Password */}
        <div className="space-y-2">
          <Label
            htmlFor="newPassword"
            className="text-gray-800 font-bold text-sm sm:text-md"
          >
            New Password
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password here..."
              className="w-full pr-10 text-sm sm:text-base"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              disabled={isLoading}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-gray-800 font-bold text-sm sm:text-md"
          >
            Confirm New Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter your confirm new password here..."
              className="w-full pr-10 text-sm sm:text-base"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Change Password Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-peter hover:bg-peter-dark text-white font-medium py-2 px-6 rounded-lg w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Change Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
