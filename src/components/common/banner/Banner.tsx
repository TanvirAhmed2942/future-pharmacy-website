"use client";

import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  description: string;
  image: string;
};
function Banner({ title, description, image }: Props) {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[500px]">
      <Image src={image} alt={title} fill className="object-cover" priority />
      <div className="absolute top-0 left-0 w-full h-full bg-peter/50 flex flex-col items-center justify-center px-4">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 sm:mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl text-center max-w-4xl leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Banner;
