import React from "react";
import { Truck, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GrDocumentVerified } from "react-icons/gr";
import { useTranslations } from "next-intl";
function Benefits() {
  const tWhyDriveWithUs = useTranslations("earnAsDriver.whyDriveWithUs");
  const benefits = [
    {
      icon: Truck,
      title: tWhyDriveWithUs("features.0.title"),
    },
    {
      icon: Search,
      title: tWhyDriveWithUs("features.1.title"),
    },
    {
      icon: GrDocumentVerified,
      title: tWhyDriveWithUs("features.2.title"),
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {tWhyDriveWithUs("headline")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {tWhyDriveWithUs("description")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
                      <Icon className="w-8 h-8 text-peter" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
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
