"use client";
import React from "react";
import { Pill, RefreshCw, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function RefilSection() {
  const router = useRouter();
  const services = [
    {
      icon: <Pill className="w-12 h-12 text-peter" />,
      title: "Refill a Prescription",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tempor quisque velit mi senectus mauris orci auctor.",
      buttonText: "Refill Now",
      buttonColor: "bg-peter hover:bg-peter-dark",
      href: "/refill-prescription",
    },
    {
      icon: (
        <div className="relative">
          <div className="flex gap-2">
            <div className="w-8 h-8 border-4 border-peter rounded-full relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-peter rounded-full"></div>
            </div>
            <div className="w-8 h-8 border-4 border-peter rounded-full relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-peter rounded-full"></div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <RefreshCw className="w-6 h-6 text-peter" />
          </div>
        </div>
      ),
      title: "Transfer a Prescription",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tempor quisque velit mi senectus mauris orci auctor.",
      buttonText: "Transfer Now",
      buttonColor: "bg-peter hover:bg-peter-dark",
      href: "/transfer-prescription",
    },
    {
      icon: (
        <div className="relative">
          <Calendar className="w-12 h-12 text-peter" />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-peter rounded-full flex items-center justify-center">
            <Clock className="w-3 h-3 text-white" />
          </div>
        </div>
      ),
      title: "Schedule Essential Healthcare Services",
      description:
        "Lorem ipsum dolor sit amet consectetur. mauris orci auctor.",
      buttonText: "Schedule Now",
      buttonColor: "bg-peter hover:bg-peter-dark",
      href: "/schedule-now",
    },
  ];

  return (
    <div className="container mx-auto bg-gray-50 py-16  mt-16">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>
              <Button
                className={`${service.buttonColor} text-white px-6 py-2 rounded-lg font-semibold`}
                onClick={() => router.push(service.href)}
              >
                {service.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Clock({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
