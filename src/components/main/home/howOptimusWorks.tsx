"use client";
import React, { ReactElement } from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import useIcon from "@/hooks/useIcon";

type WorkItem = {
  title: string;
  description: string;
} & (
  | { iconType: "custom"; customIcon: ReactElement | null }
  | { iconType: "lucide"; icon: LucideIcon }
);

export default function HowOptimusWorks() {
  const sign_up_for_optimus = useIcon({ name: "sign_up_for_optimus" });
  const schedule_your_free_same_day_delivery = useIcon({
    name: "schedule_your_free_same_day_delivery",
  });
  const we_manage_your_refills = useIcon({ name: "we_manage_your_refills" });
  const items: WorkItem[] = [
    {
      iconType: "custom",
      customIcon: sign_up_for_optimus,
      title: "Sign up for Optimus",
      description:
        "We'll coordinate with your old pharmacy or doctor to get your prescriptions.",
    },
    {
      iconType: "custom",
      customIcon: schedule_your_free_same_day_delivery,

      title: "Schedule your free same-day delivery",
      description:
        "We accept your insurance and deliver your prescriptions at a time  and text you when it's  that works for you.",
    },
    {
      iconType: "custom",
      customIcon: we_manage_your_refills,

      title: "We manage your refills",
      description:
        "We'll coordinate with your doctor and text you when it's  time for refills.",
    },
  ];

  return (
    <div className="container mx-auto bg-gray-50 py-4 md:py-8 lg:py-16 ">
      <div className=" mx-auto">
        <div className="w-full max-w-2xl md:max-w-6xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-peter mb-4 font-inter text-center">
            How Optimus Health Solutions Works
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 2xl:gap-10 px-4 md:px-6">
          {items.map((item, index) => (
            <Card
              key={index}
              className="bg-white p-8 text-center hover:shadow-lg transition-shadow flex flex-col border-none shadow-none "
            >
              {/* Icon section - fixed height */}
              <div className="flex justify-center mb-4 h-20  items-center">
                {item.iconType === "custom" && item.customIcon}
                {item.iconType === "lucide" &&
                  React.createElement(item.icon, {
                    className: "w-6 h-6 text-peter",
                  })}
              </div>

              {/* Title section - fixed height */}
              <div className="h-fit flex items-center justify-center mb-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
              </div>

              {/* Description section - flexible height with min-height */}
              <div className="flex-1 flex items-start justify-center mb-2 ">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
