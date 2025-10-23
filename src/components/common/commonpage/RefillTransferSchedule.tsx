import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop, Phone } from "lucide-react";

interface RefillOption {
  title: string;
  description: string;
  buttonText: string;
  icon: "laptop" | "phone";
  onClick?: () => void;
}

interface RefillTransferScheduleProps {
  pageTitle?: string;
  refillOptions: RefillOption[];
}

function RefillTransferSchedule({
  pageTitle = "Refill Your Prescription",
  refillOptions,
}: RefillTransferScheduleProps) {
  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          {pageTitle}
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {refillOptions.map((option, index) => (
            <Card key={index} className="bg-gray-50 border-none shadow-sm">
              <CardContent className="p-8 md:p-10 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white rounded-lg p-4 ">
                    {option.icon === "laptop" ? (
                      <Laptop className="w-12 h-12 text-peter" />
                    ) : (
                      <Phone className="w-12 h-12 text-peter" />
                    )}
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {option.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base mb-6">
                  {option.description}
                </p>

                {/* Button */}
                <Button
                  className="bg-peter hover:bg-peter-dark text-white px-8 py-5 text-base font-medium"
                  onClick={option.onClick}
                >
                  {option.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RefillTransferSchedule;
