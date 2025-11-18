import Banner from "@/components/common/banner/Banner";
import React from "react";
import PharmacyRegForm from "./PharmacyRegForm";
import HowIndependentPharmWorks from "./HowIndependentPharmWorks";
import IndependentPharmacyBenefits from "./IndependentPharmacyBenefits";
import IndependentPharmTestimonial from "./IndependentPharmTestimonial";
import { useTranslations } from "next-intl";
function IndependentPharmciesLayout() {
  const t = useTranslations("independentPharmacies.banner");
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
          Get Started Today
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-6xl  mx-auto leading-relaxed text-center ">
          Join our growing network of trusted local independent pharmacies
          delivering care directly to patients&apos; doors. As an Optimus
          partner, you&apos;ll attract new customers, improve medication
          adherence, and compete effectively with large chain pharmacies while
          staying connected to your local community.
        </p>
      </div>
      <PharmacyRegForm />
    </div>
  );
}

export default IndependentPharmciesLayout;
