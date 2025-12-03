"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

interface OrderSummaryProps {
  formData: {
    email: string;
    contactNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
  onPrevious: () => void;
  onComplete: () => void;
}

export default function OrderSummary({
  formData,
  onPrevious,
  onComplete,
}: OrderSummaryProps) {
  const t = useTranslations("orderSummary");
  return (
    <div className="px-6 relative min-h-[600px]">
      <div className="flex items-center gap-3 mb-6 relative z-20">
        <Button
          onClick={onPrevious}
          variant="outline"
          size="sm"
          className="p-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
      </div>

      <div className="space-y-4 relative z-20">
        {/* Contact and Delivery Details */}
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">{t("details.name")}</span>
            <span className="font-medium">
              {formData.firstName} {formData.lastName}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">{t("details.contactNumber")}</span>
            <span className="font-medium">{formData.contactNumber}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">{t("details.pickupAddress")}</span>
            <span className="font-medium">CVS Pharmacy Broadway</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">{t("details.deliverAddress")}</span>
            <span className="font-medium">7th Avenue, New York, NY</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">{t("details.date")}</span>
            <span className="font-medium">{t("details.today")}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">{t("details.time")}</span>
            <span className="font-medium">{t("details.now")}</span>
          </div>
        </div>

        {/* Price Details */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {t("priceDetails.title")}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">
                {t("priceDetails.deliveryFee")}
              </span>
              <span className="font-medium">$7.99</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">
                {t("priceDetails.serviceFee")}
              </span>
              <span className="font-medium">$1.09</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">
                {t("priceDetails.processingFee")}
              </span>
              <span className="font-medium">$1.09</span>
            </div>
            <div className="flex justify-between py-2 border-b-2 border-gray-300">
              <span className="text-lg font-semibold text-gray-900">
                {t("priceDetails.totalUSD")}
              </span>
              <span className="text-lg font-bold text-gray-900">$10.17</span>
            </div>
          </div>
        </div>

        {/* Legal Agreement Text */}
        <p className="text-sm text-gray-600">
          {t("legalAgreement.text")}{" "}
          <button className="text-peter hover:underline">
            {t("legalAgreement.termsOfService")}
          </button>
          ,{" "}
          <button className="text-peter hover:underline">
            {t("legalAgreement.paymentsTermsOfService")}
          </button>{" "}
          {t("legalAgreement.and")}{" "}
          <button className="text-peter hover:underline">
            {t("legalAgreement.nondiscriminationPolicy")}
          </button>
          , {t("legalAgreement.acknowledge")}{" "}
          <button className="text-peter hover:underline">
            {t("legalAgreement.privacyPolicy")}
          </button>
          .
        </p>

        {/* Complete Payment Button */}
        <Button
          onClick={onComplete}
          className="w-full bg-peter hover:bg-peter-dark text-white py-3 rounded-lg font-semibold"
        >
          {t("completePayment")}
        </Button>
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
        <Image
          src="/watermark.webp"
          alt="watermark"
          width={1000}
          height={1000}
          className="object-contain w-60 h-60 -rotate-45 opacity-100"
        />
      </div>
    </div>
  );
}
