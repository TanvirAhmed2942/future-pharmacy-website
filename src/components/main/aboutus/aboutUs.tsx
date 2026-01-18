"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

// Lazy load components for better performance
const Banner = dynamic(() => import("@/components/common/banner/Banner"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-200" />,
});

const MissionSection = dynamic(() => import("./missionSection"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100" />,
});

const OurStorySection = dynamic(() => import("./ourStorySection"), {
  loading: () => <div className="min-h-[500px] animate-pulse bg-gray-100" />,
});

const OurValues = dynamic(() => import("./ourValues"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100" />,
});

const ReadyToExperience = dynamic(() => import("@/components/common/readyToExperience/ReadyToExperience"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100" />,
});

function AboutUs() {
  const t = useTranslations("aboutUs");
  return (
    <div className="bg-white">
      <Banner
        topText={
          <p className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 sm:mb-4 leading-tight">
            Welcome to Optimus Health Solutions
          </p>
        }
        title={
          <span className="text-2xl lg:text-[42px] text-white font-normal">
            {t("banner.title")}
          </span>
        }
        description={<span className="italic">{t("banner.description")}</span>}
        image="/banner/about_us_banner.png"
      />
      <div className=" min-h-screen container mx-auto px-4 space-y-16">
        <MissionSection
          headline={t("headline")}
          missionTitle={t("mission.title")}
          missionDescription={t("mission.description")}
          visionTitle={t("vision.title")}
          visionDescription={t("vision.description")}
        />
        <OurStorySection
          headline={t("ourStory.headline")}
          footerDescription={t("ourStory.footerDescription")}
          storyTimeline={
            t.raw("ourStory.storyTimeline") as {
              badge: string;
              title: string;
              subtitle: string;
              description: string;
            }[]
          }
        />
        <OurValues
          headline={t("ourValues.headline")}
          values={
            t.raw("ourValues.values") as {
              title: string;
              description: string;
              src: string;
            }[]
          }
        />
      </div>
      <ReadyToExperience />
    </div>
  );
}

export default AboutUs;
