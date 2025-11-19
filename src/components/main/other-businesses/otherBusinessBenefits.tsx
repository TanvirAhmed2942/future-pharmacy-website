import React, { ReactElement } from "react";
import { Truck, Search, Users, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useIcon from "@/hooks/useIcon";
import { useTranslations } from "next-intl";

type BenefitItem = {
  title: string;
  description: string;
} & (
  | { iconType: "custom"; customIcon: ReactElement | null }
  | { iconType: "lucide"; icon: LucideIcon }
);

function OtherBusinessBenefits() {
  const dataIcon = useIcon({ name: "data" }); 
  const tOtherBusinesses = useTranslations("otherBusinesses.whyWorkWithUs");
  const benefits: BenefitItem[] = [
    {
      iconType: "lucide",
      icon: Truck,
      title: tOtherBusinesses("features.0.title"),  
      description:
        tOtherBusinesses("features.0.description"),
    },
    {
      iconType: "lucide",
      icon: Search,
      title: tOtherBusinesses("features.1.title"),
      description:
        tOtherBusinesses("features.1.description"),
    },
    {
      iconType: "lucide",
      icon: Users,
      title: tOtherBusinesses("features.2.title"),
      description:
        tOtherBusinesses("features.2.description"),
    },
    {
      iconType: "custom",
      customIcon: dataIcon,
      title: tOtherBusinesses("features.3.title"),
      description:
        tOtherBusinesses("features.3.description"),
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 ">
      <div className=" container  mx-auto px-4 md:px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {tOtherBusinesses("headline")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {tOtherBusinesses("description")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
            return (
              <Card
                key={index}
                className="border bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="p-6 md:p-8 text-center">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-[#f3ecf3] rounded-full p-4">
                      {benefit.iconType === "custom" && (
                        <div className="w-8 h-8 text-peter flex items-center justify-center">
                          {benefit.customIcon}
                        </div>
                      )}
                      {benefit.iconType === "lucide" && (
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

export default OtherBusinessBenefits;
