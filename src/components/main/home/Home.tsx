"use client";
import React from "react";
import dynamic from "next/dynamic";

// Lazy load components for better performance
const MapAndFormSection = dynamic(() => import("./MapAndFormSection"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100" />,
});

const Partners = dynamic(() => import("./partners"), {
  loading: () => <div className="min-h-[200px] animate-pulse bg-gray-50" />,
});

const HowOptimusWorks = dynamic(() => import("./howOptimusWorks"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100" />,
});

const RefillSection = dynamic(() => import("./RefillSection"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100" />,
});

const OurStory = dynamic(() => import("./ourStory"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100" />,
});

const OurImpact = dynamic(() => import("../aboutus/ourImpact"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100" />,
});

const CheckZoneCoverage = dynamic(() => import("./checKZoneCoverage"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100" />,
});

const ManContactUs = dynamic(() => import("@/components/main/home/manContactUs"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100" />,
});

function Home() {
  return (
    <div className="min-h-screen  ">
      <div className="container mx-auto space-y-4">
        <MapAndFormSection />
        <Partners />
      </div>
      <HowOptimusWorks />
      <div className="container mx-auto space-y-4">
        <RefillSection />
      </div>
      <OurStory />
      <OurImpact />
      {/* <UserTestimonial /> */}
      <div className="bg-white">
        <CheckZoneCoverage />
        {/* <ContactUsSection /> */}
        <ManContactUs />
        {/* <CheckZoneCoverage />
        <ContactUsSection /> */}
      </div>
    </div>
  );
}

export default Home;
