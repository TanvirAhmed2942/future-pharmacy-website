import Banner from "@/components/common/banner/Banner";
import React from "react";
import PharmacyRegForm from "./PharmacyRegForm";
import HowIndependentPharmWorks from "./HowIndependentPharmWorks";
import IndependentPharmacyBenefits from "./IndependentPharmacyBenefits";
import IndependentPharmTestimonial from "./IndependentPharmTestimonial";
import { useTranslations } from "next-intl";
function IndependentPharmciesLayout() {
  const t = useTranslations("independentPharmacies.banner");
  const tForm = useTranslations("independentPharmacies.formSection");
  return (
    <div className="bg-white">
      <Banner
        title={t("title") as string}
        description={t("description") as string}
        image="/banner/business_banner.png"
      />
      <IndependentPharmacyBenefits />
      <HowIndependentPharmWorks />
      <IndependentPharmTestimonial />
      <div className=" px-4 md:px-8  p-6">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
          {tForm("headline")}
        </h1>
        {/* <p className="text-gray-600 text-base md:text-lg max-w-6xl  mx-auto leading-relaxed text-center ">
          {tForm("description")}
         
        </p> */}
      </div>
      <PharmacyRegForm />
    </div>
  );
}

export default IndependentPharmciesLayout;
