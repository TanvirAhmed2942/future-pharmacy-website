"use client";

import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/store/Apis/authApis/authApi";
import useShowToast from "@/hooks/useShowToast";
import { setCookie } from "@/lib/cookies";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();
  const { showSuccess, showError } = useShowToast();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!email) {
      showError({ message: "Please enter your email address" });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError({ message: "Please enter a valid email address" });
      return;
    }

    try {
      const response = await forgotPasswordMutation({ email }).unwrap();

      if (response.success) {
        // Store token if provided (for OTP verification step)
        if (response.data?.forgetToken) {
          setCookie("forgetToken", response.data.forgetToken);
        }

        showSuccess({
          message:
            response.message ||
            "OTP sent successfully! Please check your email.",
        });

        // Redirect to OTP verification or reset password page
        // Adjust the route based on your app's flow
        setTimeout(() => {
          router.push("/auth/otp-verification");
        }, 1000);
      } else {
        showError({
          message: response.error || response.message || "Failed to send OTP",
        });
      }
    } catch (error: unknown) {
      // Handle RTK Query error
      let errorMessage = "An error occurred while sending OTP";

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
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
          Reset Password
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm">
          Enter your registered email to receive an OTP.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-7">
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
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address here..."
            className="w-full text-sm sm:text-base"
            required
            disabled={isLoading}
          />
        </div>

        {/* Send OTP Button */}
        <div className="flex justify-start">
          <Button
            type="submit"
            className="bg-peter hover:bg-peter-dark text-white font-medium py-2 px-6 rounded-lg w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </Button>
        </div>
      </form>

      {/* Footer Link */}
      <div className="text-center mt-4 sm:mt-6">
        <p className="text-xs sm:text-sm text-gray-700">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="text-peter hover:text-peter-dark hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
