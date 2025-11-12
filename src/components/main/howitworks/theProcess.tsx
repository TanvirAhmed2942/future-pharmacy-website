"use client";

import React from "react";

function TheProcess() {
  const steps = [
    // {
    //   title: "Send Your Prescription",
    //   description:
    //     "Once your doctor sends your Rx to your selected local pharmacy, Choose your preferred local pharmacy and have your doctor send your prescription there directly. This gives you full control over where your medications are filled.",
    // },
    {
      title: "Request Delivery",
      description:
        "Our team will contact your pharmacy to refill your prescriptionsSimply use our platform to request delivery in minutes. Select pharmacy location, your delivery address, day and time of delivery. You can create an account for easy process or checkout as guest",
    },
    {
      title: "Get it Delivered",
      description:
        "Relax! Once the pharmacy receives and confirms fulfilment for pickup. We will deliver your prescription to your home, workplace, or any location of your choice quickly (in minutes), securely, and conveniently",
    },
  ];

  return (
    <section className="bg-white py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-6 md:mb-12">
          Prescription Delivery
        </h1>

        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 flex items-start gap-x-3 shadow-sm"
              >
                <div className="min-w-7 min-h-7 rounded-full bg-peter flex items-center justify-center text-white mt-0.5">
                  {index + 1}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 ">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base ">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TheProcess;
