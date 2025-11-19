"use client";

import Banner from "@/components/common/banner/Banner";
import React from "react";
import Benefits from "./benefit";
import InvestorsInquiryForm from "./investorsInquiryForm";
import { useTranslations } from "next-intl";
function InvestorsLayout() {
  const tBanner = useTranslations("investors.banner");
  return (
    <div>
      <Banner
        title={tBanner("title")}
        description={tBanner("description")}
        image="/banner/investors_banner.png"
      />
      <Benefits />
      <InvestorsInquiryForm />
    </div>
  );
}

export default InvestorsLayout;
