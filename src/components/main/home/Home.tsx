"use client";
import React from "react";
import MapAndFormSection from "./MapAndFormSection";
import RefillSection from "./RefillSection";
import OurImpact from "../aboutus/ourImpact";
import HowOptimusWorks from "./howOptimusWorks";
import CheckZoneCoverage from "./checKZoneCoverage";
import OurStory from "./ourStory";
import ManContactUs from "@/components/main/home/manContactUs";
import Partners from "./partners";

function Home() {
  return (
    <div className="min-h-screen  ">
      <div className="container mx-auto space-y-4">
        <MapAndFormSection />
        <Partners />
      </div>
      <HowOptimusWorks />
      <div className="container mx-auto space-y-4">
        <RefillSection />
      </div>
      <OurStory />
      <OurImpact />
      {/* <UserTestimonial /> */}
      <div className="bg-white">
        <CheckZoneCoverage />
        {/* <ContactUsSection /> */}
        <ManContactUs />
        {/* <CheckZoneCoverage />
        <ContactUsSection /> */}
      </div>
    </div>
  );
}

export default Home;
