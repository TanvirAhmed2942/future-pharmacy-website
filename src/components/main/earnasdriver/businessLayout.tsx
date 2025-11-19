import Banner from "@/components/common/banner/Banner";
import React from "react";
import Benefits from "./benefit";
import HowItWorksSection from "./howItWorks";
// import PartnerRegistrationForm from "./driverRegForm";
import PartnerTestimonial from "./partnerTestimonial";
import Requirements from "./requirements";
import { useTranslations } from "next-intl";
import DriverRegForm from "./driverRegForm";

function EarnAsDriverLayout() {
  const tBanner = useTranslations("earnAsDriver.banner");
  return (
    <div>
      <Banner
        title={tBanner("title")}
        description={tBanner("description")}
        image="/banner/earn_as_driver.png"
      />
      <Benefits />
      <HowItWorksSection />
      <Requirements />
      <PartnerTestimonial />
      {/* <PartnerRegistrationForm /> */}
      <DriverRegForm />
    </div>
  );
}

export default EarnAsDriverLayout;
