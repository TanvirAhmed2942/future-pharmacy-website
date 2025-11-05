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

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (email: string) => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  onSubscribe,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    // Reset error
    setError(null);

    // Check if email is empty
    if (!email) {
      setError("Email is required");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // If validation passes
    onSubscribe?.(email);
    setEmail("");
    onClose();
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
            Subscribe to stay updated with our latest industry news and updates
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              onKeyDown={handleKeyPress}
              className={`flex-1 `}
            />
            <Button
              onClick={handleSubmit}
              size="icon"
              className="bg-peter hover:bg-peter-dark text-white"
            >
              <ArrowRight className="w-5 h-5" />
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
