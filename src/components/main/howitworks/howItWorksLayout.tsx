import React from "react";
import Banner from "@/components/common/banner/Banner";
import SimpleSteps from "./simpleSteps";
import WeWillBeRight from "./weWillBeRIght";
import SafetyAndSecuritySection from "./safetyandsecuritySection";
import ReadyToExperience from "@/components/common/readyToExperience/ReadyToExperience";
// import { TransferPrescriptionSection } from "../aboutus/ourImpact";

function HowItWorksLayout() {
  return (
    <>
      <div>
        <Banner
          title="How Optimus Health Solutions Works"
          description="From your prescription to doorstep delivery in just a few simple steps."
          image="/banner/how_it_works.png"
        />
        <SimpleSteps />
      </div>
      <WeWillBeRight />
      <SafetyAndSecuritySection />
      <ReadyToExperience />
      {/* <TransferPrescriptionSection /> */}
    </>
  );
}

export default HowItWorksLayout;
