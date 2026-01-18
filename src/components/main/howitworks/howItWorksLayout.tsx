"use client";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

// Lazy load components for better performance
const Banner = dynamic(() => import("@/components/common/banner/Banner"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-200" />,
});

const TheProcess = dynamic(() => import("./theProcess"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100" />,
});

const PharmacyServices = dynamic(() => import("./descriptionOfProcess"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100" />,
});

const WeWillBeRight = dynamic(() => import("./weWillBeRIght"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100" />,
});

const ReadyToExperience = dynamic(() => import("@/components/common/readyToExperience/ReadyToExperience"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100" />,
});

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
      <div className="max-w-[90rem] mx-auto">
        <p className="text-center text-peter italic text-lg md:text-xl lg:text-2xl 2xl:text-[30px] leading-relaxed mt-0 mb-20 px-4 md:px-8 2xl:px-0">
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
