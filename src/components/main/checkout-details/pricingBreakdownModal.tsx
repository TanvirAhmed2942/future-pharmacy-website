"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

interface PricingBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingBreakdownModal({
  isOpen,
  onClose,
}: PricingBreakdownModalProps) {
  const t = useTranslations("pricingBreakdown");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{t("title")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Delivery Fee Section */}
          <div>
            <h3 className="font-semibold text-lg mb-2">
              {t("deliveryFee.title")}
            </h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t("deliveryFee.first2Miles")}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t("deliveryFee.perAdditionalMile")}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t("deliveryFee.rushHourFee")}</span>
              </li>
            </ul>
            <p className="text-xs text-gray-600 mt-2 ml-4">
              {t("deliveryFee.rushHourTime")}
            </p>
          </div>

          {/* Service Fee Section */}
          <div>
            <h3 className="font-semibold text-lg mb-2">
              {t("serviceFee.title")}
            </h3>
            <p className="text-sm text-gray-700">
              {t("serviceFee.description")}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
