import React from "react";
import MapAndFormSection from "./MapAndFormSection";
import RefillSection from "./RefillSection";
import UserTestimonial from "./userTestimonial";
import ContactUsSection from "./contactUsSection";

function Home() {
  return (
    <div className="min-h-screen  px-4 ">
      <div className="container mx-auto space-y-4">
        <MapAndFormSection />
        <RefillSection />
      </div>
      <UserTestimonial />
      <div className="bg-white">
        <ContactUsSection />
      </div>
    </div>
  );
}

export default Home;
