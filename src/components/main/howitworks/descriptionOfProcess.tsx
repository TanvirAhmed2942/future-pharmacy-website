import React from "react";
import Image from "next/image";

const servicesData = [
  {
    id: 1,
    title: "Transfer Prescription",
    description:
      "It only takes a minute to transfer your prescription from your old pharmacy to your preferred local one. We'll securely send your details to the new pharmacy and confirm the transfer within a day. Once it's ready, you'll be notified to schedule your delivery wherever and whenever you need it.",
    image: "/howitworks/service_1.svg",
    imageAlt: "Pharmacists discussing prescription transfer",
    imagePosition: "right",
  },
  {
    id: 2,
    title: "Refill Prescription",
    description:
      "When you need a refill? Simply submit your refill request through our platform. We'll connect with your selected local pharmacy to process it quickly. Once filled, you'll get an instant update to track or schedule your delivery right to your doorstep.",
    image: "/howitworks/service_2.svg",
    imageAlt: "Person holding prescription medication",
    imagePosition: "left",
  },
  {
    id: 3,
    title: "Schedule Essential Healthcare Services",
    description:
      "Easily schedule vaccinations, health screenings, or wellness consultations at your preferred local pharmacy. We'll coordinate your appointment details and confirm your slot instantly. It's convenient, community-based care -handled securely and at no extra cost to you.",
    image: "/howitworks/service_3.svg",
    imageAlt: "Pharmacist at computer scheduling services",
    imagePosition: "right",
  },
];

function PharmacyServices() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 container mx-auto px-4 sm:px-6 md:px-8">
      <div className="space-y-16 md:space-y-20 lg:space-y-24">
        {/* First Service - Transfer Prescription */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center mx-auto">
          {/* Text Content */}
          <div className="space-y-4 md:space-y-5 lg:w-3/4 lg:pr-8 max-w-5xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {servicesData[0].title}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-full">
              {servicesData[0].description}
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full lg:w-1/4">
            <div className="relative w-full h-56 sm:h-64 md:h-72 max-w-lg mx-auto lg:w-full lg:max-w-none rounded-xl overflow-hidden shadow-lg">
              <Image
                src={servicesData[0].image}
                alt={servicesData[0].imageAlt}
                fill
                className="object-cover"
                // sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>

        {/* Second Service - Refill Prescription */}
        <div className="flex flex-col lg:flex-row-reverse gap-8 md:gap-12 items-center justify-between mx-auto ">
          {/* Text Content */}
          <div className="space-y-4 md:space-y-5 lg:w-3/4 lg:pr-8 max-w-5xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {servicesData[1].title}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-full">
              {servicesData[1].description}
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full lg:w-1/4">
            <div className="relative w-full h-56 sm:h-64 md:h-72 max-w-lg mx-auto lg:w-full lg:max-w-none rounded-xl overflow-hidden shadow-lg">
              <Image
                src={servicesData[1].image}
                alt={servicesData[1].imageAlt}
                fill
                className="object-cover"
                // sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>

        {/* Third Service - Schedule Essential Healthcare Services */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center mx-auto">
          {/* Text Content */}
          <div className="space-y-4 md:space-y-5 lg:w-3/4 lg:pr-8 max-w-5xl ">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {servicesData[2].title}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-full">
              {servicesData[2].description}
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full lg:w-1/4">
            <div className="relative w-full h-56 sm:h-64 md:h-72 max-w-lg mx-auto lg:w-full lg:max-w-none rounded-xl overflow-hidden shadow-lg">
              <Image
                src={servicesData[2].image}
                alt={servicesData[2].imageAlt}
                fill
                className="object-cover"
                // sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PharmacyServices;
