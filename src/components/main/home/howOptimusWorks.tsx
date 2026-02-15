"use client";
import React, { ReactElement } from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import useIcon from "@/hooks/useIcon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type WorkItem = {
  title: string;
  descriptionTopText: string;
  descriptionBottomText: string;
} & (
    | { iconType: "custom"; customIcon: ReactElement | null }
    | { iconType: "lucide"; icon: LucideIcon }
  );

export default function HowOptimusWorks() {
  const router = useRouter();
  const t = useTranslations("home.optimusHealthSolutions");

  const sign_up_for_optimus = useIcon({ name: "sign_up_for_optimus" });
  const schedule_your_free_same_day_delivery = useIcon({
    name: "schedule_your_free_same_day_delivery",
  });
  const we_manage_your_refills = useIcon({ name: "we_manage_your_refills" });

  const items: WorkItem[] = [
    {
      iconType: "custom",
      customIcon: sign_up_for_optimus,
      title: t("steps.0.title"),
      descriptionTopText: t("steps.0.descriptionTopText"),
      descriptionBottomText: t("steps.0.descriptionBottomText"),
    },
    {
      iconType: "custom",
      customIcon: schedule_your_free_same_day_delivery,
      title: t("steps.1.title"),
      descriptionTopText: t("steps.1.descriptionTopText"),
      descriptionBottomText: t("steps.1.descriptionBottomText"),
    },
    {
      iconType: "custom",
      customIcon: we_manage_your_refills,
      title: t("steps.2.title"),
      descriptionTopText: t("steps.2.descriptionTopText"),
      descriptionBottomText: t("steps.2.descriptionBottomText"),
    },
  ];

  return (
    <div className="relative mx-auto w-full  px-4 sm:px-6 lg:px-8 py-4 md:py-8 lg:py-16 overflow-hidden">
      {/* Blurred Background on the left (~70%) */}
      <div className="absolute left-0 top-0 bottom-0 w-full  lg:w-[65%] xl:w-[75%] 2xl:w-[74%]  z-0">
        <div
          className="absolute inset-0 bg-cover bg-center blur-xs"
          style={{
            backgroundImage: 'url("/home/bg_image.webp")',
          }}
        />
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Unblurred section on the right (~30%) - delivery image */}
      <div className="absolute right-0 top-0 bottom-0 w-[28%]  lg:w-[35%] xl:w-[28%] 2xl:w-[26%] z-10 hidden lg:block">
        <div
          className="h-full w-full bg-no-repeat bg-center bg-fill"
          style={{
            // backgroundImage: 'url("/home/delivery_5.png")',
            backgroundImage: 'url("/home/delivery_6.jpg")',
          }}
        />
      </div>

      {/* Content - positioned on the left side over blurred background */}
      <div className="relative z-10">
        <div className="w-full  lg:w-[65%] xl:w-[75%] 2xl:w-[74%] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Title */}
          <div className="mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-peter mb-4 font-inter text-center">
              {t("headline1")}{" "}
              <span
                className="relative text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-peter bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #ffffff, #d771d0, #ffffff, #c276c2, #ffffff)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  backgroundSize: "400% 100%",
                  animation: "shimmer 8s linear infinite",
                }}
              >
                Optimus Health Solutions
              </span>{" "}
              {t("headline2")}
            </h2>
          </div>

          {/* Cards Grid - arranged horizontally, constrained to left side */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 xl:gap-6 2xl:gap-8 mb-6">
            {items.map((item, index) => (
              <Card
                key={index}
                className="bg-white/85 backdrop-blur-[1px] p-6 sm:p-7 lg:p-6 xl:p-8 text-center hover:shadow-lg transition-shadow flex flex-col border-none shadow-lg h-full"
              >
                {/* Icon section - fixed height */}
                <div className="flex justify-center mb-4 h-20 items-center">
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
                <div className="flex-1 flex items-start justify-center mb-2">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.descriptionTopText}
                    <br />
                    <br />
                    {item.descriptionBottomText}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Learn More Button - centered */}
          <div className="flex justify-center">
            <Button
              className="bg-peter hover:bg-peter-dark text-white py-2 cursor-pointer mt-6 lg:mt-8 2xl:mt-10"
              onClick={() => router.push("/how-it-works")}
            >
              {t("learnMore")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
