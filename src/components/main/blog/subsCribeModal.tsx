"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TbCircleX } from "react-icons/tb";
import { useSubscribeToBlogMutation } from "@/store/Apis/blogApi/blogApi";
import useShowToast from "@/hooks/useShowToast";
import { useTranslations } from "next-intl";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose }) => {
  const t = useTranslations("blog.subscribes");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError } = useShowToast();
  const [subscribeToBlog, { isLoading: isSubmitting }] =
    useSubscribeToBlogMutation();

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    // Reset error
    setError(null);

    // Check if email is empty
    if (!email.trim()) {
      setError(t("messages.emailRequired"));
      return;
    }

    // Validate email format
    if (!validateEmail(email.trim())) {
      setError(t("messages.emailInvalid"));
      return;
    }

    // If validation passes, call API
    try {
      await subscribeToBlog({ email: email.trim() }).unwrap();
      showSuccess({
        message: t("messages.success"),
      });
      setEmail("");
      onClose();
    } catch (error: unknown) {
      console.error("Failed to subscribe:", error);
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        t("messages.subscribeFailed");
      setError(errorMessage);
      showError({
        message: errorMessage,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-base font-medium text-current ">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              type="email"
              placeholder={t("placeholder")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              onKeyDown={handleKeyPress}
              className={`flex-1 `}
              disabled={isSubmitting}
            />
            <Button
              onClick={handleSubmit}
              size="icon"
              className="bg-peter hover:bg-peter-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </Button>
          </div>

          {error && (
            <p className="text-sm text-red-500 flex items-center gap-2">
              <TbCircleX className="size-4" /> {error}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeModal;
