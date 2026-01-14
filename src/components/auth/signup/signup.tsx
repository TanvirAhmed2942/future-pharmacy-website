"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useIcon from "@/hooks/useIcon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSignupMutation } from "@/store/Apis/authApis/authApi";
import useShowToast from "@/hooks/useShowToast";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/userSlice/userSlice";
import { setCookie } from "@/lib/cookies";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  agreeToTerms: boolean;
}

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const router = useRouter();
  const [signupMutation, { isLoading }] = useSignupMutation();
  const { showSuccess, showError } = useShowToast();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    if (!agreeToTerms) {
      showError({ message: "You must agree to the Terms & Privacy Policy" });
      return;
    }

    try {
      // Transform form data to match API structure
      const signupData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phoneNumber,
        password: data.password,
        role: "user", // Fixed role as per requirement
        agreement: agreeToTerms,
      };

      const response = await signupMutation(signupData).unwrap();

      if (response.success) {
        // Store createUserToken in cookie if provided
        if (response.data?.createUserToken) {
          setCookie("createUserToken", response.data.createUserToken);
        }

        // If accessToken and refreshToken are provided, store them and log the user in
        if (response.data?.accessToken && response.data?.refreshToken) {
          setCookie("token", response.data.accessToken);
          setCookie("refreshToken", response.data.refreshToken);

          // Update Redux store with user data
          if (response.data.user) {
            const userData = {
              _id: response.data.user._id,
              name: response.data.user.fullName,
              email: response.data.user.email,
              phone: signupData.phone,
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

            // Store user data in localStorage for restoration on refresh
            if (typeof window !== "undefined") {
              localStorage.setItem("userData", JSON.stringify(userData));
            }
          }

          showSuccess({
            message: response.message || "Account created successfully!",
          });

          setTimeout(() => {
            router.push("/auth/email-verification");
          }, 1000);
        } else {
          // If no accessToken/refreshToken, but createUserToken exists, show success and redirect
          showSuccess({
            message:
              response.message ||
              "Account created successfully! Please verify your email.",
          });

          setTimeout(() => {
            router.push("/auth/email-verification");
          }, 1500);
        }
      } else {
        // Reset form on failure
        reset();
        setAgreeToTerms(false);
        showError({
          message: response.error || response.message || "Signup failed",
        });
      }
    } catch (error: unknown) {
      // Handle RTK Query error
      let errorMessage = "An error occurred during signup";

      if (error && typeof error === "object") {
        if ("data" in error && error.data && typeof error.data === "object") {
          const data = error.data as { message?: string; error?: string };
          errorMessage = data.message || data.error || errorMessage;
        } else if ("message" in error && typeof error.message === "string") {
          errorMessage = error.message;
        }
      }

      // Reset form on error
      reset();
      setAgreeToTerms(false);
      showError({ message: errorMessage });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/95 backdrop-blur-sm lg:bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg lg:shadow-none flex flex-col max-h-[90vh] lg:max-h-auto overflow-hidden">
      {/* Logo and Header */}
      <div className="text-center mb-4 sm:mb-6 lg:mb-6 flex-shrink-0">
        <Image
          src="/nav/Logo.svg"
          alt="logo"
          width={300}
          height={300}
          className="w-40 sm:w-48 h-fit sm:h-fit object-cover mx-auto my-2 sm:my-4"
        />
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Create your Optimus Health Solutions Account
        </h2>
      </div>

      {/* Scrollable Form Area - Mobile Only */}
      <ScrollArea className="flex-1 h-[calc(90vh-200px)] lg:h-auto lg:max-h-none">
        <div className="pr-4 lg:pr-0">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4  w-full min-w-0"
          >
            {/* First Name and Last Name - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-gray-700 font-medium text-sm sm:text-md"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name here..."
                  className={cn(
                    "w-full text-sm sm:text-base",
                    errors.firstName && "border-red-500"
                  )}
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs ">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-gray-700 font-medium text-sm sm:text-md"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name here..."
                  className={cn(
                    "w-full text-sm sm:text-base",
                    errors.lastName && "border-red-500"
                  )}
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters",
                    },
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
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
                className={cn(
                  "w-full text-sm sm:text-base",
                  errors.email && "border-red-500"
                )}
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-gray-700 font-medium text-sm sm:text-md"
              >
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone number here..."
                className={cn(
                  "w-full text-sm sm:text-base",
                  errors.phoneNumber && "border-red-500"
                )}
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone number must contain only numbers",
                  },
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs">
                  {errors.phoneNumber.message}
                </p>
              )}
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
                  placeholder="Enter your password here..."
                  className={cn(
                    "w-full pr-10 text-sm sm:text-base",
                    errors.password && "border-red-500"
                  )}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
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
                  href="/policies/terms-of-service"
                  className="text-peter hover:text-peter-dark hover:underline"
                >
                  Terms of Service
                </a>
                &nbsp;and&nbsp;
                <a
                  href="/policies/privacy-policy"
                  className="text-peter hover:text-peter-dark hover:underline"
                >
                  &nbsp;Privacy Policy
                </a>
              </Label>
            </div>
            {!agreeToTerms && (
              <p className="text-red-500 text-xs">
                You must agree to the Terms & Privacy Policy
              </p>
            )}

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-peter hover:bg-peter-dark text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
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
