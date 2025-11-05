import React from "react";
import Banner from "@/components/common/banner/Banner";
import SimpleSteps from "./simpleSteps";
import WeWillBeRight from "./weWillBeRIght";
import SafetyAndSecuritySection from "./safetyandsecuritySection";
import ReadyToExperience from "@/components/common/readyToExperience/ReadyToExperience";

function HowItWorksLayout() {
  return (
    <>
      <div>
        <Banner
          title='How It Works"- Simple, Secure and Local'
          description="We handle the coordination so you can focus on your health, while your trusted local pharmacy takes care of the rest"
          image="/banner/how_it_works.png"
        />
        <SimpleSteps />
      </div>
      <WeWillBeRight />
      <SafetyAndSecuritySection />
      <ReadyToExperience />
    </>
  );
}

export default HowItWorksLayout;
