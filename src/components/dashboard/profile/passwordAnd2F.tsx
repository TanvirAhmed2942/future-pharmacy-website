"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import PasswordModal from "./passWordModal";
import { useTwoStepVerificationMutation } from "@/store/Apis/profileApi/profileApi";
import useShowToast from "@/hooks/useShowToast";
import { Badge } from "@/components/ui/badge";

type TwofaInfoProps = {
  twoStepVerification: boolean;
};
export default function PasswordAnd2FA({
  twofaInfo,
}: {
  twofaInfo: TwofaInfoProps;
}) {
  const [password, setPassword] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(
    twofaInfo.twoStepVerification
  );
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [twoStepVerificationMutation, { isLoading: is2FALoading }] =
    useTwoStepVerificationMutation();
  const { showSuccess, showError } = useShowToast();

  // Sync state with prop when it changes (e.g., when API data loads)
  useEffect(() => {
    setIs2FAEnabled(twofaInfo.twoStepVerification);
  }, [twofaInfo.twoStepVerification]);

  // Handle 2FA toggle
  const handle2FAToggle = async (checked: boolean) => {
    // Optimistically update the UI
    const previousState = is2FAEnabled;
    setIs2FAEnabled(checked);

    try {
      const response = await twoStepVerificationMutation().unwrap();

      if (response.success) {
        // Update state from API response if available, otherwise use the checked value
        const new2FAState = response.data?.twoStepVerification ?? checked;
        setIs2FAEnabled(new2FAState);
        showSuccess({
          message:
            response.message ||
            `Two-Factor Authentication ${
              new2FAState ? "enabled" : "disabled"
            } successfully!`,
        });
      } else {
        // Revert the toggle if API call failed
        setIs2FAEnabled(previousState);
        showError({
          message:
            response.error ||
            response.message ||
            "Failed to update Two-Factor Authentication",
        });
      }
    } catch (error: unknown) {
      // Revert the toggle if API call failed
      setIs2FAEnabled(previousState);

      // Handle RTK Query error
      let errorMessage = "An error occurred while updating 2FA settings";

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
    <div className="w-full mx-auto space-y-4 sm:space-y-6  sm:px-0">
      {/* Password Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Password
            </h2>
            <Input
              type="password"
              placeholder="Enter your password here..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full max-w-md"
            />
          </div>
          <Button
            className="bg-peter hover:bg-peter-dark text-white px-6 cursor-pointer w-full md:w-auto mt-4 md:mt-0"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            Change password
          </Button>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Security</h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-1">
              Two-Factor Authentication (2FA)
            </h3>
            {is2FAEnabled !== true ? (
              <p className="text-sm text-gray-500">
                Enable 2FA for enhanced security
              </p>
            ) : (
              <Badge
                variant="outline"
                className="text-sm  bg-green-500 text-white"
              >
                Enabled
              </Badge>
            )}
          </div>
          <Switch
            checked={is2FAEnabled}
            onCheckedChange={handle2FAToggle}
            disabled={is2FALoading}
            className="cursor-pointer self-start sm:self-center disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Password Modal */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        is2FAEnabled={is2FAEnabled}
        onPasswordChange={(newPassword) => {
          setPassword(newPassword);
          // Here you would typically call an API to update the password
          console.log("Password changed to:", newPassword);
        }}
      />
    </div>
  );
}
