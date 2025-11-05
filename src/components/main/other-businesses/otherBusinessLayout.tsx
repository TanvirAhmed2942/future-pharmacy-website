"use client";
import Banner from "@/components/common/banner/Banner";
import React from "react";
import OtherBusinessBenefits from "./otherBusinessBenefits";
import BusinessInquiryForm from "./businessInquiryForm";

function OtherBusinessLayout() {
  return (
    <div>
      <Banner
        title={
          <p>
            Explore how{" "}
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
            can best serve you
          </p>
        }
        description="Partner with Optimus Health to reliably meet the last‑mile delivery needs of your members and patients while improving outcomes and reducing costs."
        image="/banner/investors_banner.png"
      />
      <OtherBusinessBenefits />
      <BusinessInquiryForm />
    </div>
  );
}
// TODO: Add a section for the other businesses that are partnered with us

export default OtherBusinessLayout;
