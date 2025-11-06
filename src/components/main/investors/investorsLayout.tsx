"use client";

import Banner from "@/components/common/banner/Banner";
import React from "react";
import Benefits from "./benefit";
import InvestorsInquiryForm from "./investorsInquiryForm";

function InvestorsLayout() {
  return (
    <div>
      <Banner
        title="Invest in the Future of Prescription Delivery"
        description="join us in revolutionizing prescription delivery with a scalable business model rooted in local community healthcare delivery model"
        image="/banner/investors_banner.png"
      />
      <Benefits />
      <InvestorsInquiryForm />
    </div>
  );
}

export default InvestorsLayout;
