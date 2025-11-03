"use client";

import React, { ReactElement } from "react";
import { Search, Users, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useIcon from "@/hooks/useIcon";

type BenefitItem = {
  title: string;
  description: string;
} & (
  | { iconType: "custom"; customIcon: ReactElement | null }
  | { iconType: "lucide"; icon: LucideIcon }
);

function Benefits() {
  const growing_market = useIcon({ name: "growing_market" });
  const benefits: BenefitItem[] = [
    {
      iconType: "custom",
      customIcon: growing_market,
      title: "Growing Market",
      description:
        "Lorem ipsum dolor sit amet consectetur. Massa nibh faucibus adipiscing aliquam posuere. ",
    },
    {
      iconType: "lucide",
      icon: Search,
      title: "Tech-Driven Model",
      description:
        "Lorem ipsum dolor sit amet consectetur. Massa nibh faucibus adipiscing aliquam posuere.",
    },
    {
      iconType: "lucide",
      icon: Users,
      title: "Scalable Nationwide",
      description:
        "Lorem ipsum dolor sit amet consectetur. Massa nibh faucibus adipiscing aliquam posuere.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Invest with Us?
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Discover the Compelling reasons to invest in Optimus Health
            Solutions, a leader in prescription delivery.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
            // Using benefit.icon directly instead of assigning to const Icon
            return (
              <Card
                key={index}
                className="border bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="p-6 md:p-8 text-center">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-[#f3ecf3] rounded-full p-4">
                      <div className="w-8 h-8 text-peter">
                        {benefit.iconType === "custom" && benefit.customIcon}
                        {benefit.iconType === "lucide" &&
                          React.createElement(benefit.icon, {
                            className: "w-8 h-8 text-peter",
                          })}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
