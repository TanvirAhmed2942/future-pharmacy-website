import React from "react";
import Banner from "@/components/common/banner/Banner";
import MissionSection from "./missionSection";
import OurStorySection from "./ourStorySection";
import OurImpact from "./ourImpact";

function AboutUs() {
  return (
    <div className="bg-white">
      <Banner
        title="Your Trusted Partner for Prescription Delivery"
        description="We make prescription delivery faster, safer, and more accessible for patients across the USA."
        image="/banner/about_us_banner.png"
      />
      <div className=" min-h-screen container mx-auto px-4 space-y-16">
        <MissionSection />
        <OurStorySection />
      </div>
      <OurImpact />
    </div>
  );
}

export default AboutUs;
