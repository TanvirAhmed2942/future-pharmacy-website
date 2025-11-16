import React from "react";
import Banner from "@/components/common/banner/Banner";
import MissionSection from "./missionSection";
import OurStorySection from "./ourStorySection";
import ReadyToExperience from "@/components/common/readyToExperience/ReadyToExperience";
import OurValues from "./ourValues";
import { useTranslations } from "next-intl";

function AboutUs() {
  const t = useTranslations("aboutUs");
  return (
    <div className="bg-white">
      <Banner
        title={t("banner.title")}
        description={t("banner.description")}
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
