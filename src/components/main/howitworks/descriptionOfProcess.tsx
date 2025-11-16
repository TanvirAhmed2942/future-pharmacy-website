"use client";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Image data that doesn't need translation
const imageData = [
  {
    image: "/howitworks/Vector_1.png",
    imageAlt: "Pharmacists discussing prescription transfer",
    imagePosition: "right",
  },
  {
    image: "/howitworks/Vector_2.png",
    imageAlt: "Person holding prescription medication",
    imagePosition: "left",
  },
  {
    image: "/howitworks/Vector_3.png",
    imageAlt: "Pharmacist at computer scheduling services",
    imagePosition: "right",
  },
];

function PharmacyServices({
  descriptionOfProcess,
}: {
  descriptionOfProcess: { title: string; description: string }[];
}) {
  // Merge translated text with image data
  const servicesData = descriptionOfProcess.map((item, index) => ({
    ...item,
    ...imageData[index],
  }));
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Set initial positions (off-screen)
    // Image 1 (right side) - starts from right
    gsap.set(image1Ref.current, { x: 200, opacity: 0 });
    // Image 2 (left side due to flex-row-reverse) - starts from left
    gsap.set(image2Ref.current, { x: -200, opacity: 0 });
    // Image 3 (right side) - starts from right
    gsap.set(image3Ref.current, { x: 200, opacity: 0 });

    // Animate image 1 from right
    gsap.to(image1Ref.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: image1Ref.current,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate image 2 from left
    gsap.to(image2Ref.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: image2Ref.current,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate image 3 from right
    gsap.to(image3Ref.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: image3Ref.current,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });
  });

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 container mx-auto px-4 sm:px-6 md:px-8 overflow-x-scroll no-scrollbar ">
      {/* overflow-hidden */}
      <div className="space-y-16 md:space-y-20 lg:space-y-24 ">
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
          <div
            ref={image1Ref}
            className="relative w-full lg:w-1/4 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full aspect-[317/300] overflow-hidden">
              <Image
                src={servicesData[0].image}
                alt={servicesData[0].imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
          <div
            ref={image2Ref}
            className="relative w-full lg:w-1/4 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full aspect-[317/300] overflow-hidden">
              <Image
                src={servicesData[1].image}
                alt={servicesData[1].imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
          <div
            ref={image3Ref}
            className="relative w-full lg:w-1/4 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full aspect-[317/300] overflow-hidden">
              <Image
                src={servicesData[2].image}
                alt={servicesData[2].imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PharmacyServices;
