"use client";

import React, { ReactElement } from "react";
import { Users, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useIcon from "@/hooks/useIcon";
import { useTranslations } from "next-intl";
import { TbBinaryTreeFilled } from "react-icons/tb";
type BenefitItem = {
  title: string;
  description: string;
} & (
  | { iconType: "custom"; customIcon: ReactElement | null }
  | { iconType: "lucide"; icon: LucideIcon }
  | { iconType: "reactIcon"; icon: ReactElement }
);

function Benefits() {
  const tWhyInvestWithUs = useTranslations("investors.whyInvestWithUs");
  const growing_market = useIcon({ name: "growing_market" });
  const hipaaIcon = useIcon({ name: "hipaaIcon" });
  const teamIcon = useIcon({ name: "team" });
  const benefits: BenefitItem[] = [
    {
      iconType: "custom",
      customIcon: growing_market,
      title: tWhyInvestWithUs("features.0.title"),
      description: tWhyInvestWithUs("features.0.description"),
    },
    {
      iconType: "custom",
      customIcon: hipaaIcon,
      title: tWhyInvestWithUs("features.1.title"),
      description: tWhyInvestWithUs("features.1.description"),
    },
    {
      iconType: "reactIcon",
      icon: TbBinaryTreeFilled as unknown as ReactElement,
      title: tWhyInvestWithUs("features.2.title"),
      description: tWhyInvestWithUs("features.2.description"),
    },
    {
      iconType: "custom",
      customIcon: teamIcon,
      title: tWhyInvestWithUs("features.3.title"),
      description: tWhyInvestWithUs("features.3.description"),
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 ">
      <div className=" container  mx-auto px-4 md:px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {tWhyInvestWithUs("headline")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {tWhyInvestWithUs("description")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
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
                      <div className=" text-peter flex items-center justify-center">
                        {benefit.iconType === "custom" && (
                          <div className="w-8 h-8 text-peter flex items-center justify-center">
                            {benefit.customIcon}
                          </div>
                        )}
                        {benefit.iconType === "lucide" && (
                          <div className=" text-peter flex items-center justify-center">
                            {React.createElement(benefit.icon, {
                              className: "w-8 h-8 text-peter",
                            })}
                          </div>
                        )}
                        {benefit.iconType === "reactIcon" && (
                          <div className=" text-peter flex items-center justify-center">
                            {React.createElement(
                              benefit.icon as unknown as React.ElementType,
                              {
                                className: "w-8 h-8 text-peter",
                              }
                            )}
                          </div>
                        )}
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
