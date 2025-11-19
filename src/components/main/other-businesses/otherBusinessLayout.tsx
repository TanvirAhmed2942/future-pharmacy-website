"use client";
import Banner from "@/components/common/banner/Banner";
import React from "react";
import OtherBusinessBenefits from "./otherBusinessBenefits";
import BusinessInquiryForm from "./businessInquiryForm";
import { useTranslations } from "next-intl";

function OtherBusinessLayout() {
  const tOtherBusinesses = useTranslations("otherBusinesses");
  return (
    <div>
      <Banner
        title={
          <p>
            {tOtherBusinesses("banner.title.first")} {" "}
            <span
              className="relative font-bold bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #ffffff, #d771d0, #ffffff, #c276c2, #ffffff)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                backgroundSize: "400% 100%",
                animation: "shimmer 8s linear infinite",
              }}
            >
              Optimus Health Solutions
            </span>{" "}
            {tOtherBusinesses("banner.title.second")}
          </p>
        }
        description={tOtherBusinesses("banner.description")}
        image="/banner/investors_banner.png"
      />
      <OtherBusinessBenefits />
      <BusinessInquiryForm />
    </div>
  );
}
// TODO: Add a section for the other businesses that are partnered with us

export default OtherBusinessLayout;
