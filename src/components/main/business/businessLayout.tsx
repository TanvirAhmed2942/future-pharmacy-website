import Banner from "@/components/common/banner/Banner";
import React from "react";
import Benefits from "./benefit";
import HowItWorksSection from "./howItWorks";
import PartnerRegistrationForm from "./partnerRegForm";
import PartnerTestimonial from "./partnerTestimonial";

function BusinessLayout() {
  return (
    <div className="bg-white">
      <Banner
        title="Partner with Our Prescription Delivery Network"
        description="Grow your pharmacy’s reach and deliver medicines seamlessly to your customers."
        image="/banner/business_banner.png"
      />
      <Benefits />
      <HowItWorksSection />
      <PartnerTestimonial />
      <PartnerRegistrationForm />
    </div>
  );
}

export default BusinessLayout;
