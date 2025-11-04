"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useIcon from "@/hooks/useIcon";
import Loader from "@/components/common/loader/Loader";
import { TbCircleCheckFilled, TbCircleX } from "react-icons/tb";
import CommonModal from "@/components/common/commonModal/commonModal";
function CheckZoneCoverage() {
  const [zip, setZip] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCovered, setIsCovered] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const coverageZipCodes = [
    "07029",
    "07101",
    "07102",
    "07103",
    "07104",
    "07105",
    "07106",
    "07107",
    "07108",
    "07112",
    "07114",
    "07175",
    "07184",
    "07188",
    "07189",
    "07191",
    "07192",
    "07193",
    "07195",
    "07198",
    "07199",
  ];

  const handleSearch = (search: string) => {
    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      setError("Please enter a zip code");
      return;
    }

    if (trimmedSearch.length !== 5) {
      setError("Please enter a valid zip code");
      return;
    }

    if (isLoading) {
      return; // Prevent multiple simultaneous searches
    }

    setIsLoading(true);

    // Simulate search delay
    setTimeout(() => {
      const isCovered = coverageZipCodes.includes(trimmedSearch);
      setIsLoading(false);

      if (isCovered) {
        setIsCovered(true);
        // alert("Your area is in our delivery zone");
      } else {
        setIsCovered(false);
        setZip("");
        // alert("Your area is not in our delivery zone");
      }
    }, 1000);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <div className="relative overflow-hidden">
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
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 ">
              Is your area in our delivery zone?
            </h1>
            <div className="flex flex-col items-center justify-center gap-4">
              <Input
                type="text"
                placeholder="Enter your zip code ex:10017"
                className="w-full max-w-md flex items-center justify-center placeholder:text-center text-center"
                maxLength={5}
                value={zip}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow numbers
                  if (value === "" || /^[0-9]+$/.test(value)) {
                    setZip(value);
                    setError(null);
                  } else {
                    setError("Please enter numbers only");
                  }
                }}
                disabled={isLoading}
              />
              {isCovered && (
                <p className="text-sm text-green-500 flex items-center justify-center gap-2">
                  <TbCircleCheckFilled className="size-5" /> You&apos;re in our
                  delivery area
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
                {isLoading ? "Checking..." : "Check"}
              </Button>
            </div>
          </div>
        </section>

        <section
          className="absolute top-0 left-0 w-full py-8 md:py-16 bg-white transition-all duration-500"
          style={{
            transform:
              isCovered === false ? "translateX(0)" : "translateX(100%)",
            opacity: isCovered === false ? 1 : 0,
            pointerEvents: isCovered === false ? "auto" : "none",
          }}
        >
          <NotifyCoverage
            zipCode={zip}
            isCovered={isCovered}
            setIsCovered={setIsCovered}
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
}: {
  zipCode: string;
  isCovered: boolean | null;
  setIsCovered: React.Dispatch<React.SetStateAction<boolean | null>>;
}) => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = () => {
    setIsOpen(true);
  };

  const handleBack = () => {
    setIsCovered(null);
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
      <div className="max-w-2xl mx-auto px-4 md:px-0 py-4 md:py-8 ">
        {/* Back button */}
        <Button
          variant="ghost"
          className="p-0 text-peter hover:text-peter-dark hover:bg-transparent mb-8 cursor-pointer"
          onClick={handleBack}
        >
          <span className="mr-2">‹</span>
          <span>Back</span>
        </Button>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-peter mb-4">Get early access</h1>

        {/* Description */}
        <p className="text-gray-700 mb-8">
          We&apos;re coming to <span className="font-bold">{zipCode}</span>{" "}
          soon. Let&apos;s stay in touch and we&apos;ll let you know when we
          arrive!
        </p>

        {/* Email input */}
        <div className="mb-6">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-0 py-3 border-0 border-b-2 border-[#8d4585]/50 rounded-none focus-visible:ring-0 focus-visible:border-[#8d4585] text-gray-700 placeholder:text-[#8d4585]"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-6 items-center">
          <Button
            onClick={() => {
              handleSubmit();
            }}
            className=" bg-peter text-white rounded hover:bg-peter-dark"
          >
            NOTIFY ME
          </Button>
          <Button
            variant="link"
            className="text-peter font-medium hover:underline p-0 cursor-pointer"
            onClick={handleBack}
          >
            TRY ANOTHER ZIP CODE
          </Button>
        </div>

        {/* Terms */}
        <p className="text-sm text-gray-600">
          By clicking notify me, I accept the{" "}
          <a href="#" className="text-peter hover:underline">
            Terms of Service
          </a>
          ,{" "}
          <a href="#" className="text-peter hover:underline">
            Privacy Policy
          </a>
          , and{" "}
          <a href="#" className="text-peter hover:underline">
            HIPAA Policy
          </a>
        </p>
      </div>

      <CommonModal
        isOpen={isOpen}
        type="success"
        message="We'll notify you when we arrive in your area"
        onClose={handleClose}
        onOk={handleOk}
      />
    </>
  );
};
