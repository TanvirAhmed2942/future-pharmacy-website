"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function PasswordAnd2FA() {
  const [password, setPassword] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Password Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Password
            </h2>
            <Input
              type="password"
              placeholder="Enter your password here..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="max-w-md"
            />
          </div>
          <Button className="bg-peter hover:bg-peter-dark text-white px-6 cursor-pointer">
            Change password
          </Button>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Security</h2>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-1">
              Two-Factor Authentication (2FA)
            </h3>
            <p className="text-sm text-gray-500">
              Enable 2FA for enhanced security
            </p>
          </div>
          <Switch
            checked={is2FAEnabled}
            onCheckedChange={setIs2FAEnabled}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
