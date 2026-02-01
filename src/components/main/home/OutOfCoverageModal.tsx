"use client";

import React, { useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CHECK_ZONE_COVERAGE_SECTION_ID = "check-zone-coverage-section";

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
  const router = useRouter();

  const title = context === "pickup" ? t("titlePickup") : t("titleDropoff");
  const description =
    context === "pickup" ? t("descriptionPickup") : t("descriptionDropoff");

  const smoothScrollToElement = useCallback((element: HTMLElement) => {
    const offset = -150;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset + offset;
    const startPosition = window.pageYOffset;
    const distance = elementPosition - startPosition;
    const duration = 800;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      const easeInOutCubic = (t: number): number =>
        t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
      if (percentage < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, []);

  const handleNavigateToCheckZoneCoverage = useCallback(() => {
    onClose();
    const element = document.getElementById(CHECK_ZONE_COVERAGE_SECTION_ID);
    if (element) {
      smoothScrollToElement(element);
    } else {
      router.push("/");
      setTimeout(() => {
        const scrollToElement = () => {
          const el = document.getElementById(CHECK_ZONE_COVERAGE_SECTION_ID);
          if (el) {
            smoothScrollToElement(el);
          } else {
            let attempts = 0;
            const retry = setInterval(() => {
              attempts++;
              const el2 = document.getElementById(CHECK_ZONE_COVERAGE_SECTION_ID);
              if (el2) {
                clearInterval(retry);
                smoothScrollToElement(el2);
              } else if (attempts >= 10) {
                clearInterval(retry);
              }
            }, 100);
          }
        };
        setTimeout(scrollToElement, 600);
      }, 0);
    }
  }, [onClose, router, smoothScrollToElement]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton
        className="w-[calc(100vw-2rem)] max-w-[calc(100%-2rem)] max-h-[90dvh] overflow-y-auto p-4 sm:p-6 gap-3 sm:gap-4"
      >
        <DialogHeader className="space-y-1 sm:space-y-2">
          <DialogTitle className="text-base sm:text-lg font-semibold leading-tight pr-8">
            {title}
          </DialogTitle>
          <DialogDescription className="text-start text-sm sm:text-base leading-snug">
            {description}
            {zipcode ? (
              <span className="mt-2 block font-medium text-gray-700">
                {t("zipcodeLabel")} {zipcode}
              </span>
            ) : null}
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="ghost"
          className="w-full text-peter hover:text-peter-dark hover:bg-peter/10 text-left justify-start py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base whitespace-normal min-h-[44px]"
          onClick={handleNavigateToCheckZoneCoverage}
        >
          Check if your zip code is in our coverage area?
        </Button>
        <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2 mt-0">
          <Button
            onClick={onClose}
            variant="default"
            className="w-full sm:w-auto bg-peter hover:bg-peter-dark text-white min-h-[44px] text-sm sm:text-base"
          >
            {t("ok")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
