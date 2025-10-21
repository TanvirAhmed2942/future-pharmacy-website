import React from "react";
import { FileText, CheckCircle, Truck, Home } from "lucide-react";

function SimpleSteps() {
  const steps = [
    {
      number: 1,
      title: "Request Prescription Delivery",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nisl ultricies purus justo enim odio. Cursus lobortis malesuada quis sollicitudin amet tincidunt fames duis eget.",
      icon: FileText,
    },
    {
      number: 2,
      title: "Pharmacy Receives and Confirms Fulfilment",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nisl ultricies purus justo enim odio. Cursus lobortis malesuada quis sollicitudin amet tincidunt fames duis eget.",
      icon: CheckCircle,
    },
    {
      number: 3,
      title: "Driver Picks Up Medicine",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nisl ultricies purus justo enim odio. Cursus lobortis malesuada quis sollicitudin amet tincidunt fames duis eget.",
      icon: Truck,
    },
    {
      number: 4,
      title: "Delivery to Your Doorstep",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nisl ultricies purus justo enim odio. Cursus lobortis malesuada quis sollicitudin amet tincidunt fames duis eget.",
      icon: Home,
    },
  ];

  return (
    <div className="bg-white py-16 md:py-24 px-4 font-inter">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-16 font-inter">
          Our Simple 4-Step Process
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step) => {
            const Icon = step.icon;
            const isEven = step.number % 2 === 0;

            return (
              <div
                key={step.number}
                className={`flex items-start gap-4 ${
                  isEven
                    ? "md:flex-row-reverse md:justify-end"
                    : "md:justify-start"
                }`}
              >
                <div className="bg-purple-100 rounded-full p-3 flex-shrink-0 mt-1">
                  <Icon className="w-6 h-6 text-peter" />
                </div>
                <div className={`flex-1 ${isEven ? "md:text-right" : ""}`}>
                  <h3 className="text-lg font-bold text-black mb-3 font-inter">
                    {step.number}. {step.title}
                  </h3>
                  <p className="text-black text-sm leading-relaxed font-inter">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SimpleSteps;
