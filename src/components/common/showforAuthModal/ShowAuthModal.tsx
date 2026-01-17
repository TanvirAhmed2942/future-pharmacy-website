"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface ShowAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ShowAuthModal({ isOpen, onClose }: ShowAuthModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("authModal");

  const handleContinue = () => {
    onClose();
    // Redirect to login with current path as redirect parameter
    const loginUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
    router.push(loginUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-2xl border-0 p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900 text-center">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
            {t("description")}
          </p>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 text-gray-700 hover:bg-gray-100"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleContinue}
              className="flex-1 h-12 bg-peter text-white hover:bg-peter-dark font-medium"
            >
              {t("continue")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShowAuthModal;