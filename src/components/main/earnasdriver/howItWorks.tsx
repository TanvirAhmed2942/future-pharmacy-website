import { useTranslations } from "next-intl";
import React from "react";

function HowItWorksSection() {
  const tHowItWorks = useTranslations("earnAsDriver.howItWorks");
  const items = [
    {
      badge: "1",
      title: tHowItWorks("steps.0.title"),

      description: tHowItWorks("steps.0.description"),
    },
    {
      badge: "2",
      title: tHowItWorks("steps.1.title"),

      description: tHowItWorks("steps.1.description"),
    },
    {
      badge: "3",
      title: tHowItWorks("steps.2.title"),

      description: tHowItWorks("steps.2.description"),
    },
    {
      badge: "4",
      title: tHowItWorks("steps.3.title"),

      description: tHowItWorks("steps.3.description"),
    },
  ];

  return (
    <div className="py-16 px-4 md:px-0">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 my-16">
          {tHowItWorks("headline")}
        </h1>

        <div className="relative">
          <div className="space-y-12 my-16 relative">
            {/* Vertical connecting line - positioned from first badge center to last badge center */}
            <div
              className="absolute left-6 w-0.5 top-0 bottom-20 md:bottom-10 border-l-2 border-dashed border-gray-300"
              // style={{
              //   top: "24px", // Center of first badge (half of w-12 h-12 = 24px)
              //   bottom: "28px", // Center of last badge
              // }}
            />

            {items.map((item, idx) => (
              <div key={idx} className="relative flex gap-6">
                {/* Badge circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-peter flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                    {item.badge}
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 pb-2">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorksSection;
