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
import { CheckCircle2, XCircle, Info } from "lucide-react";

interface CommonModalProps {
  isOpen: boolean;
  type?: "success" | "error" | "info";
  icon?: React.ReactNode;
  message: string;
  title?: string;
  onClose: () => void;
  onOk?: () => void;
  okText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  type = "info",
  icon,
  message,
  title,
  onClose,
  onOk,
  okText = "OK",
  cancelText = "Cancel",
  showCancel = false,
}) => {
  // Default icons based on type
  const getDefaultIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-12 h-12 text-green-500" />;
      case "error":
        return <XCircle className="w-12 h-12 text-red-500" />;
      case "info":
      default:
        return <Info className="w-12 h-12 text-blue-500" />;
    }
  };

  // Default titles based on type
  const getDefaultTitle = () => {
    switch (type) {
      case "success":
        return "Success";
      case "error":
        return "Error";
      case "info":
      default:
        return "Information";
    }
  };

  const displayIcon = icon || getDefaultIcon();
  const displayTitle = title || getDefaultTitle();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            {displayIcon}
            <DialogTitle className="text-center text-xl">
              {displayTitle}
            </DialogTitle>
          </div>
          <DialogDescription className="text-center text-base">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-2 sm:justify-center">
          {showCancel && (
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              {cancelText}
            </Button>
          )}
          <Button
            onClick={() => {
              onOk?.();
              onClose?.();
            }}
            className="flex-1 sm:flex-none bg-peter text-white hover:bg-peter-dark"
          >
            {okText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommonModal;
