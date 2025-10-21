import Banner from "@/components/common/banner/Banner";
import React from "react";
import Benefits from "./benefit";
import InvestorsInquiryForm from "./investorsInquiryForm";

function InvestorsLayout() {
  return (
    <div>
      <Banner
        title="Invest in the Future of Prescription Delivery"
        description="Join out team and start earning on your own schedule. delivery with flexibility and get paid weekly or instantly."
        image="/banner/investors_banner.png"
      />
      <Benefits />
      <InvestorsInquiryForm />
    </div>
  );
}

export default InvestorsLayout;
