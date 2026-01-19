"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function LogoutConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmationModalProps) {
  const t = useTranslations("header.profileDropdown");

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <LogOut className="w-8 h-8 text-red-600" />
            </div>
            <DialogTitle className="text-center text-xl">
              {t("confirmLogout.title") || "Confirm Logout"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-center text-base">
            {t("confirmLogout.message") ||
              "Are you sure you want to logout? You will need to login again to access your account."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-2 sm:justify-center">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 sm:flex-none"
          >
            {t("confirmLogout.cancel") || "Cancel"}
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 sm:flex-none bg-red-600 text-white hover:bg-red-700"
          >
            {t("confirmLogout.confirm") || "Logout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutConfirmationModal;
