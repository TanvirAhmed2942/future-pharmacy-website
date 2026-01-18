"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

// Lazy load components for better performance
const Banner = dynamic(() => import("@/components/common/banner/Banner"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-200" />,
});

const IndependentPharmacyBenefits = dynamic(() => import("./IndependentPharmacyBenefits"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100" />,
});

const HowIndependentPharmWorks = dynamic(() => import("./HowIndependentPharmWorks"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100" />,
});

const IndependentPharmTestimonial = dynamic(() => import("./IndependentPharmTestimonial"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100" />,
});

const PharmacyRegForm = dynamic(() => import("./PharmacyRegForm"), {
  loading: () => <div className="min-h-[500px] animate-pulse bg-gray-100" />,
});
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
