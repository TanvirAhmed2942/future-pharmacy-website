import React from "react";
import Banner from "@/components/common/banner/Banner";
// import SimpleSteps from "./simpleSteps";
import WeWillBeRight from "./weWillBeRIght";
// import SafetyAndSecuritySection from "./safetyandsecuritySection";
import ReadyToExperience from "@/components/common/readyToExperience/ReadyToExperience";
import TheProcess from "./theProcess";
import PharmacyServices from "./descriptionOfProcess";

function HowItWorksLayout() {
  return (
    <>
      <Banner
        title='How It Works"- Simple, Secure and Local'
        description="We handle the coordination so you can focus on your health, while your trusted local pharmacy takes care of the rest"
        image="/banner/how_it_works.png"
      />
      {/* <SimpleSteps /> */}
      <TheProcess />
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-peter font-semibold text-lg md:text-xl lg:text-2xl 2xl:text-[28px] leading-relaxed mt-0 mb-20 px-4 md:px-8 2xl:px-0">
          Whether you&apos;re refilling, transferring, or scheduling care,
          Optimus HS connects you directly with your trusted local pharmacy to
          make it fast, reliable, and stress-free
        </p>
      </div>
      {/* <SafetyAndSecuritySection /> */}
      <PharmacyServices />
      <WeWillBeRight />
      <ReadyToExperience />
    </>
  );
}

export default HowItWorksLayout;
