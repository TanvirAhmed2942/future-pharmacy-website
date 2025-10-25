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
import { useAuth } from "@/userInfo.authProvide";
import { useRouter } from "next/navigation";

interface NewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  description?: string;
}

function NewCustomerModal({
  isOpen,
  onClose,
  description = "Create a Optimus health Solutions account for faster checkout later. No time right now? No problem. You can check out as guest.",
}: NewCustomerModalProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

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
            New Customers
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
            {description}
          </p>

          <div className="flex gap-3">
            {/* Create Account Button */}
            <Button
              onClick={handleCreateAccount}
              className="flex-1 h-12 bg-blue-900 text-white hover:bg-blue-800 flex items-center justify-center gap-2 font-medium"
            >
              <UserPlus className="w-4 h-4" />
              Create Account
            </Button>

            {/* Checkout as Guest Button */}
            <Button
              onClick={handleGuestCheckout}
              className="flex-1 h-12 bg-peter text-white hover:bg-peter-dark flex items-center justify-center gap-2 font-medium"
            >
              <ShoppingCart className="w-4 h-4" />
              Checkout as Guest
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NewCustomerModal;
