"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useIcon from "@/hooks/useIcon";
import Loader from "@/components/common/loader/Loader";

function CheckZoneCoverage() {
  const [zip, setZip] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      alert("Please enter a zip code");
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
        alert("Your area is in our delivery zone");
      } else {
        alert("Your area is not in our delivery zone");
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
      <section className=" py-8 md:py-16 flex flex-col items-center justify-center">
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
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              disabled={isLoading}
            />
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
    </>
  );
}

export default CheckZoneCoverage;
