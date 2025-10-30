"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RefilSection() {
  const router = useRouter();
  const services = [
    {
      icon: "/home/refill.png",
      title: "Refill a Prescription",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tempor quisque velit mi senectus mauris orci auctor.",
      buttonText: "Refill Now",
      buttonColor: "bg-peter hover:bg-peter-dark",
      href: "/refill-prescription",
    },
    {
      icon: "/home/transfer.png",
      title: "Transfer a Prescription",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tempor quisque velit mi senectus mauris orci auctor.",
      buttonText: "Transfer Now",
      buttonColor: "bg-peter hover:bg-peter-dark",
      href: "/transfer-prescription",
    },
    {
      icon: "/home/schedule.png",

      title: "Schedule Essential Healthcare Services",
      description:
        "Lorem ipsum dolor sit amet consectetur. mauris orci auctor.",
      buttonText: "Schedule Now",
      buttonColor: "bg-peter hover:bg-peter-dark",
      href: "/schedule-now",
    },
  ];

  return (
    <div className="container mx-auto bg-gray-50 py-4 md:py-8 lg:py-8 ">
      <div className=" mx-auto">
        <div className="w-full max-w-2xl md:max-w-6xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-inter text-center">
            Our Services
          </h2>
          <p className="text-gray-700 text-base md:text-lg font-inter text-center">
            When you refill, transfer prescription or schedule essential
            healthcare services through our platform, you&apos;re connecting
            with our trusted local independent pharmacies near you. Together,
            we&apos;re strengthening our communities and helping independent
            pharmacies thrive.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white p-8 text-center hover:shadow-lg transition-shadow flex flex-col "
            >
              {/* Icon section - fixed height */}
              <div className="flex justify-center mb-6 h-24  items-center">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={100}
                  height={100}
                />
              </div>

              {/* Title section - fixed height */}
              <div className="h-16 flex items-center justify-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {service.title}
                </h3>
              </div>

              {/* Description section - flexible height with min-height */}
              <div className="flex-1 flex items-start justify-center mb-6 min-h-[80px]">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Button section - fixed at bottom */}
              <div className="mt-auto">
                <Button
                  className={`${service.buttonColor} text-white px-6 py-2 rounded-lg w-fit mx-auto font-semibold cursor-pointer`}
                  onClick={() => router.push(service.href)}
                >
                  {service.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
