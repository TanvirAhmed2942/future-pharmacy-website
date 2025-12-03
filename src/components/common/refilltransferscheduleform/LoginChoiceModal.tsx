"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
interface LoginChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
  onGuestCheckout: () => void;
  description: string;
}

function LoginChoiceModal({
  isOpen,
  onClose,
  onSignIn,
  onGuestCheckout,
  description,
}: LoginChoiceModalProps) {
  const tLoginChoiceModal = useTranslations("loginChoiceModal");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-2xl border-0 p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900 text-center">
            {tLoginChoiceModal("title")}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          <p className="text-gray-600 text-center mb-6">{description}</p>

          <div className="space-y-4">
            {/* Sign In / Create Account */}
            <Button
              onClick={onSignIn}
              className="w-full h-14 bg-peter text-white hover:bg-peter-dark flex items-center justify-center gap-3"
            >
              <UserPlus className="w-5 h-5" />
              {tLoginChoiceModal("signIn")}
            </Button>

            {/* Guest Checkout */}
            <Button
              onClick={onGuestCheckout}
              variant="outline"
              className="w-full h-14 bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-3"
            >
              <User className="w-5 h-5" />
              {tLoginChoiceModal("guestCheckout")}
            </Button>
          </div>

          {/* Cancel Button */}
          <div className="mt-6 text-center">
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-gray-500 hover:text-gray-700"
            >
              {tLoginChoiceModal("cancel")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoginChoiceModal;
