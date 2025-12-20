"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChangePasswordVerficationMutation } from "@/store/Apis/authApis/authApi";
import useShowToast from "@/hooks/useShowToast";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  is2FAEnabled: boolean;
  apiResponse: {
    success?: boolean;
    message?: string;
    error?: string;
    data?: string;
  } | null;
  onPasswordChange: (newPassword: string) => void;
}

function PasswordModal({
  isOpen,
  onClose,
  is2FAEnabled,
  apiResponse,
  onPasswordChange,
}: PasswordModalProps) {
  // State for 2FA enabled flow
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword2FA, setNewPassword2FA] = useState("");
  const [confirmPassword2FA, setConfirmPassword2FA] = useState("");

  // State for 2FA disabled flow
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error states
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  // API hooks
  const [changePasswordVerficationMutation, { isLoading: isChangingPassword }] =
    useChangePasswordVerficationMutation();
  const { showSuccess, showError } = useShowToast();

  // Log API response to understand what it contains
  useEffect(() => {
    if (apiResponse && isOpen) {
      console.log("Change Password API Response:", apiResponse);
      // TODO: Based on apiResponse, determine what to show in the modal
      // The user will tell us what each response should do
    }
  }, [apiResponse, isOpen]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setOtp("");
      setIsOtpVerified(false);
      setNewPassword2FA("");
      setConfirmPassword2FA("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOtpError("");
      setPasswordError("");
      setPasswordMatchError("");
    }
  }, [isOpen]);

  // Handle OTP verification - just validate format, API will verify
  const handleOtpVerification = () => {
    // Validate OTP is 4 digits and numbers only
    if (otp.length !== 4) {
      setOtpError("OTP must be 4 digits");
      return;
    }
    if (!/^\d+$/.test(otp)) {
      setOtpError("OTP must contain only numbers");
      return;
    }
    // OTP format is valid, proceed to password step
    setIsOtpVerified(true);
    setOtpError("");
  };

  // Handle password change for 2FA enabled
  const handlePasswordChange2FA = async () => {
    // Clear previous errors
    setPasswordError("");
    setPasswordMatchError("");

    // Validation
    if (newPassword2FA !== confirmPassword2FA) {
      setPasswordMatchError("Passwords do not match");
      return;
    }
    if (newPassword2FA.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    try {
      // Send OTP and new password to API (no oldPassword needed when 2FA is enabled)
      // API will validate the OTP
      const response = await changePasswordVerficationMutation({
        otp: otp, // Send OTP for verification
        newPassword: newPassword2FA,
      }).unwrap();

      if (response.success) {
        showSuccess({
          message: response.message || "Password changed successfully!",
        });
        onPasswordChange(newPassword2FA);
        onClose();
      } else {
        showError({
          message:
            response.error || response.message || "Failed to change password",
        });
      }
    } catch (error: unknown) {
      let errorMessage = "An error occurred while changing password";

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

  // Handle password change for 2FA disabled
  const handlePasswordChange = async () => {
    // Clear previous errors
    setPasswordError("");
    setPasswordMatchError("");

    // Validation
    if (!currentPassword) {
      setPasswordError("Please enter your current password");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await changePasswordVerficationMutation({
        oldPassword: currentPassword,
        newPassword: newPassword,
      }).unwrap();

      if (response.success) {
        showSuccess({
          message: response.message || "Password changed successfully!",
        });
        onPasswordChange(newPassword);
        onClose();
      } else {
        showError({
          message:
            response.error || response.message || "Failed to change password",
        });
      }
    } catch (error: unknown) {
      let errorMessage = "An error occurred while changing password";

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

  // Handle OTP input change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOtp(value);
    setOtpError("");
  };

  // const handleResendOtp = () => {
  //   console.log("Resend OTP");
  // };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            {is2FAEnabled
              ? "Enter your 2FA code to proceed with password change"
              : "Enter your current password and new password"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {is2FAEnabled ? (
            // 2FA Enabled Flow
            <>
              {!isOtpVerified ? (
                // OTP Input Step
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Enter 4-digit OTP
                      </label>
                      {/* <p
                        className="text-sm text-gray-500 mb-2 cursor-pointer hover:text-[#8d4585]"
                        onClick={handleResendOtp}
                      >
                        Resend OTP
                      </p> */}
                    </div>
                    <Input
                      type="text"
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder="0000"
                      className="text-center text-2xl tracking-widest"
                      maxLength={4}
                    />
                    {otpError && (
                      <p className="text-red-500 text-sm mt-1">{otpError}</p>
                    )}
                  </div>
                  <Button
                    onClick={handleOtpVerification}
                    disabled={otp.length !== 4}
                    className="w-full bg-peter hover:bg-peter-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Verify OTP
                  </Button>
                </div>
              ) : (
                // New Password Step
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      New Password
                    </label>
                    <Input
                      type="password"
                      value={newPassword2FA}
                      onChange={(e) => {
                        setNewPassword2FA(e.target.value);
                        setPasswordError("");
                        setPasswordMatchError("");
                      }}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Confirm New Password
                    </label>
                    <Input
                      type="password"
                      value={confirmPassword2FA}
                      onChange={(e) => {
                        setConfirmPassword2FA(e.target.value);
                        setPasswordMatchError("");
                      }}
                      placeholder="Confirm new password"
                    />
                    {passwordMatchError && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordMatchError}
                      </p>
                    )}
                    {passwordError && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordError}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            // 2FA Disabled Flow
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Current Password
                </label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    setPasswordError("");
                  }}
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  New Password
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPasswordError("");
                    setPasswordMatchError("");
                  }}
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordMatchError("");
                  }}
                  placeholder="Confirm new password"
                />
                {passwordMatchError && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordMatchError}
                  </p>
                )}
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:flex-1"
          >
            Cancel
          </Button>
          {is2FAEnabled ? (
            isOtpVerified && (
              <Button
                onClick={handlePasswordChange2FA}
                disabled={isChangingPassword}
                className="w-full sm:flex-1 bg-peter hover:bg-peter-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChangingPassword ? "Saving..." : "Save Password"}
              </Button>
            )
          ) : (
            <Button
              onClick={handlePasswordChange}
              disabled={isChangingPassword}
              className="w-full sm:flex-1 bg-peter hover:bg-peter-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChangingPassword ? "Saving..." : "Save Password"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PasswordModal;
