import React from "react";
import { Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PiChartLineUp } from "react-icons/pi";
import useIcon from "@/hooks/useIcon";
import { useTranslations } from "next-intl";
import { LuDatabaseZap } from "react-icons/lu";
import { TbBinaryTreeFilled } from "react-icons/tb";
function IndependentPharmacyBenefits() {
  const t = useTranslations("independentPharmacies.benefits");
  const tSection = useTranslations("independentPharmacies");
  // Fetch hipaa icon
  const hipaaIcon = useIcon({ name: "hipaaIcon" });

  const benefits = [
    {
      icon: Truck,
      title: t("0.title") as string,
      description: t("0.description") as string,
    },
    {
      icon: "hipaaIcon",
      customIcon: true,
      title: t("1.title") as string,
      description: t("1.description") as string,
    },
    {
      icon: LuDatabaseZap,
      title: t("2.title") as string,
      description: t("2.description") as string,
    },
    {
      icon: PiChartLineUp,
      title: t("3.title") as string,
      description: t("3.description") as string,
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 ">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {tSection("headline")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
            {tSection("description")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="border bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="p-6 md:p-8 text-center">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-[#f3ecf3] rounded-full p-4">
                      {benefit.customIcon ? (
                        <div className="w-8 h-8 text-peter flex items-center justify-center">
                          {hipaaIcon}
                        </div>
                      ) : (
                        <Icon className="w-8 h-8 text-peter" />
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

export default IndependentPharmacyBenefits;
