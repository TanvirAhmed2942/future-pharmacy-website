import React from "react";
import Banner from "@/components/common/banner/Banner";
// import SimpleSteps from "./simpleSteps";
import WeWillBeRight from "./weWillBeRIght";
// import SafetyAndSecuritySection from "./safetyandsecuritySection";
import ReadyToExperience from "@/components/common/readyToExperience/ReadyToExperience";
import TheProcess from "./theProcess";
import PharmacyServices from "./descriptionOfProcess";
import { useTranslations } from "next-intl";

function HowItWorksLayout() {
  const t = useTranslations("howItWorks");
  return (
    <>
      <Banner
        title={t("banner.title")}
        description={t("banner.description")}
        image="/banner/how_it_works.png"
      />
      {/* <SimpleSteps /> */}
      <TheProcess
        headline={t("headline")}
        steps={
          t.raw("steps") as {
            title: string;
            description: string;
          }[]
        }
      />
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-peter font-semibold text-lg md:text-xl lg:text-2xl 2xl:text-[30px] leading-relaxed mt-0 mb-20 px-4 md:px-8 2xl:px-0">
          {t("message")}
        </p>
      </div>
      {/* <SafetyAndSecuritySection /> */}
      <PharmacyServices
        descriptionOfProcess={
          t.raw("descriptionOfProcess") as {
            title: string;
            description: string;
          }[]
        }
      />
      <WeWillBeRight />
      <ReadyToExperience />
    </>
  );
}

export default HowItWorksLayout;
