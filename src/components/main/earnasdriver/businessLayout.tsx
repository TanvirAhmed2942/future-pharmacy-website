import Banner from "@/components/common/banner/Banner";
import React from "react";
import Benefits from "./benefit";
import HowItWorksSection from "./howItWorks";
import PartnerRegistrationForm from "./driverRegForm";
import PartnerTestimonial from "./partnerTestimonial";
import Requirements from "./requirements";

function EarnAsDriverLayout() {
  return (
    <div>
      <Banner
        title="Earn with Every Delivery"
        description="Join the community of independent courier drivers supporting local pharmacies and helping patients get the prescriptions they need while you .while earning a flexible income."
        image="/banner/earn_as_driver.png"
      />
      <Benefits />
      <HowItWorksSection />
      <Requirements />
      <PartnerTestimonial />
      <PartnerRegistrationForm />
    </div>
  );
}

export default EarnAsDriverLayout;
