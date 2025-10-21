import Banner from "@/components/common/banner/Banner";
import React from "react";
import Benefits from "./benefit";
import HowItWorksSection from "./howItWorks";
import PartnerRegistrationForm from "./driverRegForm";
import PartnerTestimonial from "./partnerTestimonial";

function EarnAsDriverLayout() {
  return (
    <div>
      <Banner
        title="Partner with Our Prescription Delivery Network"
        description="Grow your pharmacy’s reach and deliver medicines seamlessly to your customers."
        image="/banner/earn_as_driver.png"
      />
      <Benefits />
      <HowItWorksSection />
      <PartnerTestimonial />
      <PartnerRegistrationForm />
    </div>
  );
}

export default EarnAsDriverLayout;
