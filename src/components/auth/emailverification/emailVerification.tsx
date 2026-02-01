"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useVerifyEmailMutation,
  useResendCreateUserOtpMutation,
} from "@/store/Apis/authApis/authApi";
import useShowToast from "@/hooks/useShowToast";
import { deleteCookie, setCookie } from "@/lib/cookies";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/userSlice/userSlice";
import { getCookie } from "@/lib/cookies";
import { Loader } from "lucide-react";

function EmailVerification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [verifyEmailMutation, { isLoading }] = useVerifyEmailMutation();
  const [resendCreateUserOtpMutation, { isLoading: isResending }] =
    useResendCreateUserOtpMutation();
  const { showSuccess, showError } = useShowToast();
  const dispatch = useAppDispatch();
  const signupEmail = getCookie("signupEmail");
  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
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
      .slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex(
      (digit, index) => index >= pastedData.length && !digit
    );
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async () => {
    // Check if all 6 digits are filled
    if (code.some((digit) => !digit)) {
      showError({ message: "Please enter the complete verification code" });
      return;
    }

    // Combine the code into a string
    const otp = code.join("");

    try {
      const response = await verifyEmailMutation({ otp }).unwrap();

      if (response.success) {
        if (response.data) {


          deleteCookie("createUserToken");
          // Set token in cookie
          setCookie("token", response.data);

          // Decode JWT token to extract user info and update Redux state
          try {
            const parts = response.data.split(".");
            if (parts.length === 3) {
              const payload = JSON.parse(atob(parts[1]));

              // Create user data from token payload
              const userData = {
                _id: payload.userId || payload._id || "",
                name: payload.name || payload.fullName || "",
                email: payload.email || "",
                phone: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                country: "",
                role: payload.role || "user",
                dateOfBirth: "",
                profile: payload.profile || "",
                isLoggedIn: true,
              };

              // Update Redux store with user data
              dispatch(login(userData));

              // Store user data in localStorage for restoration on refresh
              if (typeof window !== "undefined") {
                localStorage.setItem("userData", JSON.stringify(userData));
              }
            }
          } catch (error) {
            console.warn(
              "Could not decode token, user info may be incomplete",
              error
            );
            // Even if decoding fails, we still have the token set, so user can be logged in
            // The AuthRestorer component will handle restoration on next page load
          }
        }
        showSuccess({
          message: response.message || "Email verified successfully!",
        });

        // Redirect to homepage on success
        setTimeout(() => {
          router.push("/");
        }, 1000);
        deleteCookie("signupEmail");
      } else {



        // Reset code on failure
        setCode(["", "", "", "", "", ""]);
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
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      showError({ message: errorMessage });
    }
  };

  const handleResend = async () => {
    try {
      const response = await resendCreateUserOtpMutation().unwrap();

      if (response.success) {
        showSuccess({
          message:
            response.message ||
            "OTP resent successfully! Please check your email.",
        });
        // Reset the OTP input fields
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        showError({
          message: response.error || response.message || "Failed to resend OTP",
        });
      }
    } catch (error: unknown) {
      // Handle RTK Query error
      let errorMessage = "An error occurred while resending OTP";

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
          Email Verification Code
        </h2>
        <p className="text-gray-700 text-xs sm:text-sm mb-4 sm:mb-6">
          To keep your account secure, we need to confirm your email
          address. We&apos;ve sent a 6-digit verification code to <span className="font-bold">({signupEmail})</span>
        </p>
      </div>

      {/* Verification Code Section */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-800">
          Get a Verification Code
        </h3>
        <p className="text-gray-700 text-xs sm:text-sm">
          Please enter the code below to complete your sign-up. The code
          will expire in a few minutes.<br />
          <span className="italic text-gray-500 text-xs -mt-1">* Standard rates apply.</span>
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

      {/* Resend Link */}
      <div className="text-center mt-6 sm:mt-8">
        <p className="text-xs sm:text-sm text-gray-700">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-peter hover:text-peter-dark hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? "Resending..." : "Resend"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default EmailVerification;
