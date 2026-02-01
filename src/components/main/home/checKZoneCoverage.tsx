"use client";
import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useIcon from "@/hooks/useIcon";
import Loader from "@/components/common/loader/Loader";
import { TbCircleCheckFilled, TbCircleX } from "react-icons/tb";
import CommonModal from "@/components/common/commonModal/commonModal";
import { useGetZipcodeMutation } from "@/store/Apis/zipcodeApi/zipcodeApi";
import { toast } from "sonner";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

function CheckZoneCoverage() {
  const t = useTranslations("checkZoneCoverage");
  const [zip, setZip] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCovered, setIsCovered] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFoundZip, setNotFoundZip] = useState("");
  const [triggerZipCheck] = useGetZipcodeMutation();

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // If the input is cleared (or under 5 chars), hide previous success/error
  // But don't reset if we're showing the NotifyCoverage component (isCovered === false)
  useEffect(() => {
    if ((zip.length === 0 || zip.length < 5) && isCovered !== false) {
      setIsCovered(null);
      setNotFoundZip("");
    }
  }, [zip, isCovered]);

  const handleSearch = useCallback(
    async (search: string) => {
      const trimmedSearch = search.trim();

      if (!trimmedSearch) {
        setIsCovered(null);
        setNotFoundZip("");
        setError(t("errors.enterZipCode"));
        return;
      }

      if (trimmedSearch.length !== 5) {
        setError(t("errors.validZipCode"));
        return;
      }

      if (isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const res = await triggerZipCheck({ zipCode: trimmedSearch }).unwrap();
        await delay(1000); // show loader for 1s
        const exists = res.data?.isExist === true;
        if (exists) {
          setIsCovered(true);
          toast.success(t("toast.inZone"));
        } else {
          setNotFoundZip(trimmedSearch);
          setIsCovered(false);
          setZip("");
          toast.info(t("toast.notInZone"));
        }
      } catch (err) {
        console.error(err);
        toast.error(t("toast.checkFailed"));
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, triggerZipCheck, t]
  );

  const handleNotify = useCallback(
    async (email: string) => {
      if (!notFoundZip) return;
      setIsLoading(true);
      try {
        const res = await triggerZipCheck({
          zipCode: notFoundZip,
          email,
        }).unwrap();
        await delay(1000); // show loader for 1s
        toast.success(res?.message || t("toast.notifySuccess"));
        return true;
      } catch (err) {
        console.error(err);
        toast.error(t("toast.submitFailed"));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [notFoundZip, triggerZipCheck, t]
  );

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <div className="relative overflow-visible">
        <section
          className="py-8 md:py-8 w-full flex flex-col items-center justify-center transition-all duration-500"
          style={{
            transform:
              isCovered === false ? "translateX(-100%)" : "translateX(0)",
          }}
        >
          <div className="container mx-auto px-4 md:px-4 space-y-8">
            <div className="w-32 h-32 bg-[#f3ecf3] rounded-full flex items-center justify-center mx-auto p-6">
              {useIcon({ name: "check-zone-coverage" })}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-center text-peter ">
              {t("title")}
            </h1>
            <div className="flex flex-col items-center justify-center gap-4">
              <Input
                type="text"
                placeholder={t("zipCodePlaceholder")}
                className="w-full max-w-md flex items-center justify-center placeholder:text-center text-center"
                maxLength={5}
                value={zip}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow numbers
                  if (value === "" || /^[0-9]+$/.test(value)) {
                    setZip(value);
                    setError(null);
                    if (value === "") {
                      setIsCovered(null);
                      setNotFoundZip("");
                    }
                  } else {
                    setError(t("errors.numbersOnly"));
                  }
                }}
                disabled={isLoading}
              />
              {isCovered && (
                <p className="text-sm text-green-500 flex items-center justify-center gap-2">
                  <TbCircleCheckFilled className="size-5" />{" "}
                  {t("inDeliveryArea")}
                </p>
              )}
              {error && (
                <p className="text-sm text-red-500 flex items-center justify-center gap-2">
                  <TbCircleX className="size-5" /> {error}
                </p>
              )}
              <Button
                className="bg-peter hover:bg-peter-dark text-white px-4 py-2 rounded-md"
                onClick={() => handleSearch(zip.toString())}
                disabled={isLoading}
              >
                {isLoading ? t("checking") : t("check")}
              </Button>
            </div>
          </div>
        </section>

        <section
          className="absolute top-0 left-0 w-full min-h-full py-8 md:py-16 bg-white transition-all duration-500 z-10"
          style={{
            transform:
              isCovered === false ? "translateX(0)" : "translateX(100%)",
            opacity: isCovered === false ? 1 : 0,
            pointerEvents: isCovered === false ? "auto" : "none",
          }}
        >
          <NotifyCoverage
            zipCode={notFoundZip}
            isCovered={isCovered}
            setIsCovered={setIsCovered}
            setNotFoundZip={setNotFoundZip}
            onNotify={handleNotify}
            isLoading={isLoading}
          />
        </section>


      </div>
    </>
  );
}

export default CheckZoneCoverage;

const NotifyCoverage = ({
  zipCode,
  // isCovered,
  setIsCovered,
  setNotFoundZip,
  onNotify,
  isLoading,
}: {
  zipCode: string;
  isCovered: boolean | null;
  setIsCovered: React.Dispatch<React.SetStateAction<boolean | null>>;
  setNotFoundZip: React.Dispatch<React.SetStateAction<string>>;
  onNotify: (email: string) => Promise<boolean | void>;
  isLoading: boolean;
}) => {
  const t = useTranslations("checkZoneCoverage.notifyCoverage");
  const tMain = useTranslations("checkZoneCoverage");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError(tMain("errors.enterEmail"));
      return;
    }
    setError(null);
    const success = await onNotify(email.trim());
    if (success !== false) {
      setIsOpen(true);
    }
  };

  const handleBack = () => {
    setIsCovered(null);
    setNotFoundZip(""); // Clear the not found zip when going back
  };

  const handleClose = () => {
    setIsOpen(false);
    setEmail("");
    handleBack();
  };

  const handleOk = () => {
    handleClose();
  };
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 md:px-4 lg:px-6 xl:px-8 py-4 md:py-8 ">
        {/* Back button */}
        <Button
          variant="ghost"
          className="p-0 text-peter hover:text-peter-dark hover:bg-transparent mb-8 cursor-pointer"
          onClick={handleBack}
        >
          <span className="mr-2">‹</span>
          <span>{t("back")}</span>
        </Button>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-peter mb-4">{t("title")}</h1>

        {/* Description */}
        <p className="text-gray-700 mb-8">{t("description", { zipCode })}</p>

        {/* Email input */}
        <div className="mb-6">
          <Input
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-0 py-3 border-0 border-b-2 border-[#8d4585]/50 rounded-none focus-visible:ring-0 focus-visible:border-[#8d4585] text-gray-700 placeholder:text-[#8d4585]"
            disabled={isLoading}
          />
          {error && (
            <p className="text-sm text-red-500 mt-2 flex items-center gap-2">
              <TbCircleX className="size-5" /> {error}
            </p>
          )}
        </div>

        {/* Buttons */}

        <div className="flex gap-4 mb-6 items-center">
          <Button
            onClick={() => {
              handleSubmit();
            }}
            className=" bg-peter text-white rounded hover:bg-peter-dark"
            disabled={isLoading}
          >
            {isLoading ? t("submitting") : t("notifyMe")}
          </Button>
          <Button
            variant="link"
            className="text-peter font-medium hover:underline p-0 cursor-pointer"
            onClick={handleBack}
          >
            {t("tryAnotherZip")}
          </Button>
        </div>

        {/* Terms */}
        <p className="text-sm md:text-base text-gray-600 w-full">
          {t("termsText")}{" "}
          <Link
            href="/policies/Terms of Service.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-peter hover:underline"
          >
            {t("termsOfService")}
          </Link>
          ,{" "}
          <Link
            href="/policies/Privacy Policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-peter hover:underline"
          >
            {t("privacyPolicy")}
          </Link>
          , and{" "}
          <Link
            href="/policies/Privacy Policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-peter hover:underline"
          >
            {t("hipaaPolicy")}
          </Link>
        </p>
      </div>

      <CommonModal
        isOpen={isOpen}
        type="success"
        message={t("modalMessage")}
        onClose={handleClose}
        onOk={handleOk}
      />
    </>
  );
};
