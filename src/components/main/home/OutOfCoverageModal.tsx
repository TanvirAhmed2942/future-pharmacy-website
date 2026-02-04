"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetZipcodeMutation } from "@/store/Apis/zipcodeApi/zipcodeApi";
import { Loader } from "lucide-react";

export type OutOfCoverageContext = "pickup" | "dropoff";

type Step = "initial" | "email" | "success";

interface OutOfCoverageModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: OutOfCoverageContext;
  zipcode?: string | null;
  /** When provided, "Request service in this ZIP code" will call this (e.g. open location picker with request-service flow). */
  onRequestService?: (zipcode: string) => void;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validateZipcode = (zip: string): boolean => {
  return /^\d{5}$/.test(zip.trim());
};

export default function OutOfCoverageModal({
  isOpen,
  onClose,
  context,
  zipcode,
  onRequestService,
}: OutOfCoverageModalProps) {
  const t = useTranslations("home.mapAndFormSection.outOfCoverage");
  const [step, setStep] = useState<Step>("initial");
  const [email, setEmail] = useState("");
  const [localZipcode, setLocalZipcode] = useState("");
  const [error, setError] = useState("");

  const [getZipcodeMutation, { isLoading: isSubmitting }] =
    useGetZipcodeMutation();

  useEffect(() => {
    if (!isOpen) {
      setStep("initial");
      setEmail("");
      setLocalZipcode("");
      setError("");
    }
  }, [isOpen]);

  const title =
    step === "initial"
      ? zipcode
        ? `${t("zipcodeTitle")} ${zipcode}`
        : context === "pickup"
          ? t("titlePickup")
          : t("titleDropoff")
      : step === "email"
        ? t("emailStepTitle")
        : t("emailSuccessTitle");

  const alertMessage =
    context === "pickup" ? t("alertMessagePickup") : t("alertMessageDropoff");

  const footerPrefix =
    context === "pickup" ? t("footerPrefixPickup") : t("footerPrefixDropoff");
  const footerHighlight =
    context === "pickup" ? t("footerHighlightPickup") : t("footerHighlightDropoff");
  const footerSuffix =
    context === "pickup" ? t("footerSuffixPickup") : t("footerSuffixDropoff");
  const coverageLinkText = t("coverageLinkText");
  const footerEnd = t("footerEnd");

  const handleRequestServiceClick = () => {
    if (zipcode && onRequestService) {
      onRequestService(zipcode);
      onClose();
      return;
    }
    setStep("email");
    setError("");
  };

  const handleEmailSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");
    const zipToUse = zipcode?.trim() || localZipcode.trim();
    if (!zipToUse) {
      setError(t("zipcodeInvalid"));
      return;
    }
    if (!validateZipcode(zipToUse)) {
      setError(t("zipcodeInvalid"));
      return;
    }
    if (!email.trim()) {
      setError(t("emailInvalid"));
      return;
    }
    if (!validateEmail(email.trim())) {
      setError(t("emailInvalid"));
      return;
    }
    const zipForApi = zipToUse.slice(0, 5);
    try {
      const result = await getZipcodeMutation({
        zipCode: zipForApi,
        email: email.trim(),
      }).unwrap();
      if (result?.success) {
        setStep("success");
      } else {
        setError((result as { message?: string })?.message ?? t("submitError"));
      }
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? (err as { data?: { message?: string } }).data?.message
          : undefined;
      setError(message ?? t("submitError"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton
        className="w-[calc(100vw-2rem)] max-w-md max-h-[90dvh] overflow-y-auto overflow-x-hidden min-w-0 p-4 sm:p-6 gap-0 bg-white rounded-xl shadow-lg "
      >
        <DialogHeader className="space-y-4 pr-8 text-left w-full">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight text-left">
            {title}
          </DialogTitle>

          {step === "initial" && (
            <>
              <div className="rounded-lg bg-[#fef3ef] px-4 py-3 w-full">
                <p className="text-sm sm:text-base text-[#b4532a] leading-snug text-center">
                  {alertMessage}
                </p>
              </div>

              <Button
                type="button"
                onClick={handleRequestServiceClick}
                className="w-full min-h-[48px] rounded-lg bg-peter hover:bg-peter-dark text-white font-medium text-base"
              >
                {t("requestServiceButton")}
              </Button>
            </>
          )}

          {step === "email" && (
            <form
              onSubmit={(e) => handleEmailSubmit(e)}
              className="space-y-4 text-center"
            >
              {!zipcode?.trim() && (
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder={t("zipcodePlaceholder")}
                  value={localZipcode}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 5);
                    setLocalZipcode(v);
                    setError("");
                  }}
                  className="w-full h-12 rounded-lg border-2 border-gray-200 focus:border-peter focus:ring-peter/20 font-mono"
                  disabled={isSubmitting}
                  aria-invalid={!!error}
                />
              )}
              {zipcode?.trim() && (
                <p className="text-sm text-gray-700 text-center">
                  <span className="font-medium">{t("zipcodeTitle")}</span> {zipcode.trim().slice(0, 5)}
                </p>
              )}
              <Input
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="w-full h-12 rounded-lg border-2 border-gray-200 focus:border-peter focus:ring-peter/20"
                disabled={isSubmitting}
                aria-invalid={!!error}
                autoComplete="email"
              />
              {error && (
                <p className="text-sm text-red-600 text-center" role="alert">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  !(zipcode?.trim() || localZipcode.trim()) ||
                  !validateZipcode(zipcode?.trim() || localZipcode.trim()) ||
                  !email.trim() ||
                  !validateEmail(email.trim())
                }
                className="w-full min-h-[48px] rounded-lg bg-peter hover:bg-peter-dark text-white font-medium text-base disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    {t("emailSubmitButton")}
                  </span>
                ) : (
                  t("emailSubmitButton")
                )}
              </Button>
            </form>
          )}

          {step === "success" && (
            <p className="text-sm text-gray-600 leading-snug text-center">
              {t("emailSuccessMessage")}
            </p>
          )}
        </DialogHeader>

        {step === "initial" && (
          <p className="mt-4 text-sm text-gray-500 leading-snug text-center">
            {footerPrefix}
            <span className="font-semibold">{footerHighlight}</span>
            {footerSuffix}
            <Link
              href="/coverage-zone"
              target="_blank"
              onClick={onClose}
              className="font-semibold text-peter hover:text-peter-dark underline focus:outline-none focus:underline"
            >
              {coverageLinkText}
            </Link>
            {footerEnd}
          </p>
        )}

        {step === "success" && (
          <div className="mt-4 w-full flex justify-center">
            <Button
              onClick={onClose}
              className="min-h-[44px] px-6 bg-peter hover:bg-peter-dark text-white font-medium"
            >
              {t("ok")}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
