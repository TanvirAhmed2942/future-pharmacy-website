"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShowPhoneNumberProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber?: string;
  title?: string;
}

function ShowPhoneNumber({
  isOpen,
  onClose,
  phoneNumber = "(555) 123-4567",
  title = "Contact Phone Number",
}: ShowPhoneNumberProps) {
  const [copied, setCopied] = useState(false);

  // Copy handler - using the Clipboard API which is more reliable
  const handleCopy = async () => {
    if (!phoneNumber || typeof window === "undefined") {
      console.log("Phone number or window is undefined");
      return;
    }

    try {
      // Use modern Clipboard API
      if (navigator.clipboard) {
        console.log("Using Clipboard API to copy:", phoneNumber);
        await navigator.clipboard.writeText(phoneNumber);
        console.log("Successfully copied:", phoneNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }
    } catch (clipboardErr) {
      console.error("Clipboard API error:", clipboardErr);
    }

    // Fallback for older browsers
    console.log("Using textarea fallback...");
    try {
      const textarea = document.createElement("textarea");
      textarea.value = phoneNumber;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      textarea.style.top = "-9999px";

      document.body.appendChild(textarea);

      // For iOS Safari
      const range = document.createRange();
      range.selectNodeContents(textarea);
      const sel = window.getSelection();

      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }

      textarea.select();
      const result = document.execCommand("copy");

      document.body.removeChild(textarea);

      if (result) {
        console.log("Successfully copied using textarea fallback");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (fallbackErr) {
      console.error("Fallback error:", fallbackErr);
    }
  };

  // Only render the dialog on the client side
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Return null on server-side
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="text-lg font-medium text-gray-900">
            {phoneNumber}
          </span>
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            type="button"
            className={`flex items-center gap-2 ${
              copied ? "bg-green-100 text-green-700" : ""
            }`}
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            variant="default"
            onClick={onClose}
            type="button"
            className="bg-peter hover:bg-peter-dark text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShowPhoneNumber;
