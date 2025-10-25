"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function EmailVerification() {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg">
      {/* Logo and Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Image
            src="/nav/Logo.png"
            alt="logo"
            width={300}
            height={300}
            className="w-48 h-fit object-cover mx-auto my-4"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Email Verification Code
        </h2>
        <p className="text-gray-700 text-sm mb-6">
          To help keep your account safe, Optimus Health Solutions wants to make
          sure it&apos;s really you trying to sign in.
        </p>
      </div>

      {/* Verification Code Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">
          Get a Verification Code
        </h3>
        <p className="text-gray-700 text-sm">
          To get a verification code, first confirm the email address you added
          to your account r****@coredevs.ltd. Standard rates apply.
        </p>

        {/* Verification Code Inputs */}
        <div className="flex justify-center space-x-3 mt-6">
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
              className="w-12 h-12 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:border-peter focus:ring-2 focus:ring-peter-200"
            />
          ))}
        </div>

        {/* Sign Up Button */}
        <div className="flex justify-start mt-8">
          <Button
            type="button"
            className="bg-peter hover:bg-peter-dark text-white font-medium py-2 px-6 rounded-lg mx-auto"
          >
            Sign Up
          </Button>
        </div>
      </div>

      {/* Resend Link */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-700">
          Didn&apos;t receive the code?{" "}
          <a
            href="#"
            className="text-peter hover:text-peter-dark hover:underline"
          >
            Resend
          </a>
        </p>
      </div>
    </div>
  );
}

export default EmailVerification;
