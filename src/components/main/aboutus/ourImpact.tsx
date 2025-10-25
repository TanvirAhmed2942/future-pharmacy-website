"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function OurImpact() {
  const stats = [
    {
      value: "100,000+",
      label: "Prescriptions Delivered",
    },
    {
      value: "50,000+",
      label: "Patients Served",
    },
    {
      value: "30 Mins",
      label: "Average Delivery Time",
    },
  ];

  return (
    <>
      <div className=" bg-[#f3ecf3]  px-4 py-16">
        <div className="max-w-6xl mx-auto ">
          <h1 className="text-4xl font-bold text-center text-gray-900 pb-16">
            Our Impact
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {stats.map((stat, idx) => (
              <Card key={idx} className="bg-peter border-none shadow-lg">
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </h2>
                  <p className="text-white text-sm md:text-base">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <TransferPrescriptionSection />
    </>
  );
}

export const TransferPrescriptionSection = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto py-16 px-4 flex items-center justify-center">
      <div className="w-full mx-auto">
        <Card className="border border-gray-200 shadow-sm rounded-4xl">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to experience the convenience
              <br />
              of Optimus Heath Solutions
            </h2>

            <p className="text-gray-600 text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied patients who trust us with their
              prescription delivery needs.
            </p>

            <Button
              className="bg-peter hover:bg-peter-dark text-white px-8 py-6 text-base font-medium rounded-md cursor-pointer"
              onClick={() => router.push("/transfer-prescription")}
            >
              Transfer a Prescription
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
