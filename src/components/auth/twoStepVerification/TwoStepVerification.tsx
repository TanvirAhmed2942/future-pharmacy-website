"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useTwo_StepVerificationMutation } from "@/store/Apis/authApis/authApi";
import useShowToast from "@/hooks/useShowToast";
import { setCookie, deleteCookie } from "@/lib/cookies";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/userSlice/userSlice";
import { Loader } from "lucide-react";

function TwoStepVerification() {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard/overview";
  const dispatch = useAppDispatch();
  const [twoStepVerificationMutation, { isLoading }] =
    useTwo_StepVerificationMutation();
  const { showSuccess, showError } = useShowToast();

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    const newCode = [...code];
    for (let i = 0; i < pastedData.length && i < 4; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex(
      (digit, index) => index >= pastedData.length && !digit
    );
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 3;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async () => {
    // Check if all 4 digits are filled
    if (code.some((digit) => !digit)) {
      showError({ message: "Please enter the complete verification code" });
      return;
    }

    // Combine the code into a string
    const otp = code.join("");

    try {
      const response = await twoStepVerificationMutation(otp).unwrap();

      if (response.success && response.data) {
        // Delete the two-step token as it's no longer needed
        deleteCookie("two-step-token");

        // Check if response.data is an object (normal login response)
        if (typeof response.data === "object" && response.data !== null) {
          // Store tokens in cookies
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
        }

        showSuccess({
          message: response.message || "Verification successful!",
        });

        // Redirect to dashboard or the original requested path after successful verification
        setTimeout(() => {
          router.push(redirectPath);
        }, 1000);
      } else {
        // Reset code on failure
        setCode(["", "", "", ""]);
        inputRefs.current[0]?.focus();
        showError({
          message: response.error || response.message || "Verification failed",
        });
      }
    } catch (error: unknown) {
      // Handle RTK Query error
      let errorMessage = "An error occurred during verification";

      if (error && typeof error === "object") {
        if ("data" in error && error.data && typeof error.data === "object") {
          const data = error.data as { message?: string; error?: string };
          errorMessage = data.message || data.error || errorMessage;
        } else if ("message" in error && typeof error.message === "string") {
          errorMessage = error.message;
        }
      }

      // Reset code on error
      setCode(["", "", "", ""]);
      inputRefs.current[0]?.focus();
      showError({ message: errorMessage });
    }
  };

  const handleRetry = () => {
    // Delete the two-step token before redirecting
    deleteCookie("two-step-token");
    router.push("/auth/login");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm lg:bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg lg:shadow-xs">
      {/* Logo and Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center mb-2 sm:mb-4">
          <Image
            src="/nav/Logo.svg"
            alt="logo"
            width={300}
            height={300}
            className="w-40 sm:w-48 h-fit sm:h-fit object-cover mx-auto my-2 sm:my-4"
          />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
          OTP Verification Codes
        </h2>
        <p className="text-gray-700 text-xs sm:text-sm mb-4 sm:mb-6">
          To help keep your account safe, Optimus Health Solutions wants to make
          sure it&apos;s really you trying to sign in.
        </p>
      </div>

      {/* Verification Code Section */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-800">
          2 Step Verification
        </h3>
        <p className="text-gray-700 text-xs sm:text-sm">
          Enter the 4-digit code sent to your email address.
        </p>

        {/* Verification Code Inputs */}
        <div className="flex justify-center space-x-2 sm:space-x-3 mt-4 sm:mt-6">
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-10 h-10 sm:w-12 sm:h-12 text-center text-base sm:text-lg font-bold border-2 border-gray-300 rounded-lg focus:border-peter focus:ring-2 focus:ring-peter-200"
            />
          ))}
        </div>

        {/* Verify Button */}
        <div className="flex justify-start mt-6 sm:mt-8">
          <Button
            type="button"
            onClick={handleVerify}
            disabled={isLoading || code.some((digit) => !digit)}
            className="bg-peter hover:bg-peter-dark text-white font-medium py-2 px-6 rounded-lg mx-auto w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <><p className="flex items-center justify-center gap-2">Verifying...<Loader className="animate-spin size-4 text-white" /></p></> : "Verify"}
          </Button>
        </div>
      </div>

      {/* Retry Link */}
      <div className="text-center mt-6 sm:mt-8">
        <button
          type="button"
          onClick={handleRetry}
          className="text-peter hover:text-peter-dark hover:underline text-xs sm:text-sm"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default TwoStepVerification;
