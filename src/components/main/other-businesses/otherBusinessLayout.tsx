import Banner from "@/components/common/banner/Banner";
import React from "react";
import OtherBusinessBenefits from "./otherBusinessBenefits";
import BusinessInquiryForm from "./businessInquiryForm";

function OtherBusinessLayout() {
  return (
    <div>
      <Banner
        title="Explore how Optimus Health Solutions can best serve you"
        description="Partner with Optimus Health to reliably meet the last‑mile delivery needs of your members and patients while improving outcomes and reducing costs."
        image="/banner/investors_banner.png"
      />
      <OtherBusinessBenefits />
      <BusinessInquiryForm />
    </div>
  );
}

export default OtherBusinessLayout;
