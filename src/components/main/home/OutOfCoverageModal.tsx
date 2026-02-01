"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type OutOfCoverageContext = "pickup" | "dropoff";

interface OutOfCoverageModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: OutOfCoverageContext;
  zipcode?: string | null;
}

export default function OutOfCoverageModal({
  isOpen,
  onClose,
  context,
  zipcode,
}: OutOfCoverageModalProps) {
  const t = useTranslations("home.mapAndFormSection.outOfCoverage");

  const title = context === "pickup" ? t("titlePickup") : t("titleDropoff");
  const description =
    context === "pickup" ? t("descriptionPickup") : t("descriptionDropoff");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
            {zipcode ? (
              <span className="mt-2 block font-medium text-gray-700">
                {t("zipcodeLabel")} {zipcode}
              </span>
            ) : null}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} variant="default" className="bg-peter hover:bg-peter-dark text-white">
            {t("ok")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
