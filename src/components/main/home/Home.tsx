import React from "react";
import MapAndFormSection from "./MapAndFormSection";
import RefillSection from "./RefillSection";
import UserTestimonial from "./userTestimonial";
import ContactUsSection from "./contactUsSection";
import OurImpact from "../aboutus/ourImpact";
import HowOptimusWorks from "./howOptimusWorks";
import CheckZoneCoverage from "./checKZoneCoverage";

function Home() {
  return (
    <div className="min-h-screen  ">
      <div className="container mx-auto space-y-4">
        <MapAndFormSection />
        <HowOptimusWorks />
        <RefillSection />
      </div>
      <OurImpact />
      <UserTestimonial />
      <div className="bg-white">
        <CheckZoneCoverage />
        <ContactUsSection />
      </div>
    </div>
  );
}

export default Home;
