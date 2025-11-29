"use client";
import React from "react";
import Image from "next/image";

interface Partner {
  name: string;
  logo: string;
  alt: string;
}

function Partners() {
  // Partner companies - you can replace these with actual logo paths
  const partners: Partner[] = [
    {
      name: "CVS Pharmacy",
      logo: "/partners/red.png", // Replace with actual logo path
      alt: "CVS Pharmacy Logo",
    },
    {
      name: "Walgreens",
      logo: "/partners/cvs.png", // Replace with actual logo path
      alt: "Walgreens Logo",
    },
    {
      name: "Rite Aid",
      logo: "/partners/red.png", // Replace with actual logo path
      alt: "Rite Aid Logo",
    },
    {
      name: "Walmart Pharmacy",
      logo: "/partners/cvs.png", // Replace with actual logo path
      alt: "Walmart Pharmacy Logo",
    },
    {
      name: "Target Pharmacy",
      logo: "/partners/red.png", // Replace with actual logo path
      alt: "Target Pharmacy Logo",
    },
    {
      name: "Kroger Pharmacy",
      logo: "/partners/cvs.png", // Replace with actual logo path
      alt: "Kroger Pharmacy Logo",
    },
    {
      name: "Kroger Pharmacy",
      logo: "/partners/red.png", // Replace with actual logo path
      alt: "Kroger Pharmacy Logo",
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Partners Row - Horizontal layout like the image */}
        <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16 overflow-x-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-12 md:h-16 lg:h-20 flex-shrink-0"
            >
              <Image
                src={partner.logo}
                alt={partner.alt}
                width={120}
                height={60}
                className="object-contain h-full w-auto"
                style={{
                  filter: "grayscale(100%) brightness(0) contrast(1.5)",
                  height: "100%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Alternative: If you want a simpler approach with just text placeholders */}
        {/* Uncomment this section if logos are not available */}
        {/*
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-full h-20 md:h-24 lg:h-28 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <span className="text-gray-800 font-semibold text-sm md:text-base text-center">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
        */}
      </div>
    </section>
  );
}

export default Partners;
