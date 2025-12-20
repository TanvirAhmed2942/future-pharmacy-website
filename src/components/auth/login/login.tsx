"use client";

import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginMutation } from "@/store/Apis/authApis/authApi";
import useShowToast from "@/hooks/useShowToast";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/userSlice/userSlice";
import { setCookie } from "@/lib/cookies";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, { isLoading }] = useLoginMutation();
  const { showSuccess, showError } = useShowToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      showError({ message: "Please fill in all fields" });
      return;
    }

    try {
      const response = await loginMutation({ email, password }).unwrap();

      if (response.success && response.data) {
        // Check if 2FA is enabled (data is a string token)
        if (typeof response.data === "string") {
          // Store two-step token in cookie
          setCookie("two-step-token", response.data);

          showSuccess({
            message: response.message || "Please verify your OTP",
          });

          // Redirect to two-step verification page with redirect parameter
          const redirectUrl = redirectPath
            ? `/auth/two-step-verification?redirect=${encodeURIComponent(
                redirectPath
              )}`
            : "/auth/two-step-verification";
          setTimeout(() => {
            router.push(redirectUrl);
          }, 1000);
        } else {
          // Normal login flow (data is an object)
          // Store tokens in cookies only
          if (response.data.accessToken) {
            setCookie("token", response.data.accessToken);
          }
          if (response.data.refreshToken) {
            setCookie("refreshToken", response.data.refreshToken);
          }

          // Update Redux store with user data
          if (response.data.user) {
            const userData = {
              _id: response.data.user._id,
              name: response.data.user.fullName,
              email: response.data.user.email,
              phone: "",
              address: "",
              city: "",
              state: "",
              zip: "",
              country: "",
              role: response.data.user.role || "user",
              dateOfBirth: "",
              profile: response.data.user.profile,
              isLoggedIn: true,
            };

            dispatch(login(userData));

            // Also store user data in localStorage for restoration on refresh
            if (typeof window !== "undefined") {
              localStorage.setItem("userData", JSON.stringify(userData));
            }
          }

          showSuccess({
            message: response.message || "Login successful",
          });

          // Redirect to dashboard or the original requested path after successful login
          setTimeout(() => {
            router.push(redirectPath);
          }, 1000);
        }
      } else {
        showError({
          message: response.error || response.message || "Login failed",
        });
      }
    } catch (error: unknown) {
      // Handle RTK Query error
      let errorMessage = "An error occurred during login";

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
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Login to Your Account
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5 sm:space-y-7">
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
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password here..."
              className="w-full pr-10 text-sm sm:text-base"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              disabled={isLoading}
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
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
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
