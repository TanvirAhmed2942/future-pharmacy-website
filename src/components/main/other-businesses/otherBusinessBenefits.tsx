import React from "react";
import { Truck, Search, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function otherBusinessBenefits() {
  const benefits = [
    {
      icon: Truck,
      title: "Improve Adherence",
      description:
        "Lorem ipsum dolor sit amet consectetur. Massa nibh faucibus adipiscing aliquam posuere. ",
    },
    {
      icon: Search,
      title: "Compliance First",
      description:
        "Lorem ipsum dolor sit amet consectetur. Massa nibh faucibus adipiscing aliquam posuere.",
    },
    {
      icon: Users,
      title: "Operational Visibility",
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
            Why Work with Us
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            We provide our support to organizations that care about how their
            members get access to their medications. Our trusted services ensure
            fast, reliable delivery across your local community.
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

export default otherBusinessBenefits;
