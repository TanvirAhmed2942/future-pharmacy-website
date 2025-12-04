"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UserPlus } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/slices/userSlice/userSlice";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface NewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  description?: string;
}

function NewCustomerModal({
  isOpen,
  onClose,
  description,
}: NewCustomerModalProps) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const router = useRouter();
  const t = useTranslations("checkUserStatusModal");

  // Use provided description or fallback to translation
  const modalDescription = description || t("description");

  const handleCreateAccount = () => {
    onClose();
    router.push("/auth/signup");
  };

  const handleGuestCheckout = () => {
    onClose();
    router.push("/checkout-details");
  };

  // If user is logged in, redirect directly to checkout with prepopulated data
  React.useEffect(() => {
    if (isLoggedIn && isOpen) {
      onClose();
      // Navigate to checkout with user data
      router.push("/checkout-details");
    }
  }, [isLoggedIn, isOpen, onClose, router]);

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
            {modalDescription}
          </p>

          <div className="flex gap-3">
            {/* Create Account Button */}
            <Button
              onClick={handleCreateAccount}
              className="flex-1 h-12 bg-blue-900 text-white hover:bg-blue-800 flex items-center justify-center gap-2 font-medium"
            >
              <UserPlus className="w-4 h-4" />
              {t("loginSignup")}
            </Button>

            {/* Checkout as Guest Button */}
            <Button
              onClick={handleGuestCheckout}
              className="flex-1 h-12 bg-peter text-white hover:bg-peter-dark flex items-center justify-center gap-2 font-medium"
            >
              <ShoppingCart className="w-4 h-4" />
              {t("checkoutAsGuest")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NewCustomerModal;
