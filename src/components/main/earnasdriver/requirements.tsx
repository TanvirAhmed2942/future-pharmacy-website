"use client";
import React, { useRef } from "react";
import Image from "next/image";
import useIcon from "@/hooks/useIcon";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Requirements() {
  const icon = useIcon({ name: "check_round" });
  const textContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const requirements = [
    "Valid driver's license (at least 2 years)",
    "Clean driving record (no major violations)",
    "Reliable vehicle (2005 or newer)",
    "Smartphone with GPS capability",
    "Background check required",
    "Must be 21 years or older",
  ];

  useGSAP(() => {
    // Set initial positions (off-screen)
    gsap.set(textContentRef.current, { x: -200, opacity: 0 });
    gsap.set(imageRef.current, { x: 200, opacity: 0 });

    // Animate text from left
    gsap.to(textContentRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textContentRef.current,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate image from right
    gsap.to(imageRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });
  });

  //     <div className="max-w-7xl mx-auto">
  //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ">
  //         {/* Text Content */}
  //         <div className="space-y-6 ">
  //           <h2 className="text-4xl md:text-5xl font-bold text-peter font-inter text-left">
  //             See all our Benefits
  //           </h2>
  //           <div className="space-y-4">
  //             {benefits.map((benefit, index) => (
  //               <div key={index} className="flex items-center gap-2">
  //                 <GoCheckCircleFill className="text-peter size-6" />
  //                 <p className="text-gray-700 text-lg leading-tight md:leading-relaxed font-inter text-left font-medium text-wrap break-words whitespace-break-spaces">
  //                   {benefit}
  //                 </p>
  //               </div>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Heart Image */}
  //         <div className="hidden lg:flex justify-start lg:justify-end">
  //           <div className="relative w-full max-w-md aspect-square ">
  //             <Image
  //               src="/howitworks/heart_shape_1.png"
  //               alt="Heart shape made of pills"
  //               width={1000}
  //               height={1000}
  //               className="object-cover scale-105 mx-auto"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
  return (
    <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-8 md:py-16 px-4 sm:px-6 md:px-8 rounded-2xl sm:rounded-none mx-4 sm:mx-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center justify-center ">
          {/* Text Content */}
          <div ref={textContentRef} className="space-y-4 md:space-y-6 ">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-peter font-inter text-center sm:text-left">
              See all our Requirements
            </h2>
            <div className="space-y-3 md:space-y-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  {icon as React.ReactNode}
                  <p className="text-gray-700 text-base md:text-lg leading-snug md:leading-relaxed font-inter text-left font-medium">
                    {requirement}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="hidden lg:flex justify-center items-center "
          >
            <div className="relative  max-w-md aspect-square flex items-center justify-center">
              <Image
                src="/howitworks/car_2.webp"
                alt="Car image"
                width={1000}
                height={1000}
                priority
                sizes="(max-width: 1024px) 0vw, 100vw"
                className="object-cover scale-120 mx-auto "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Requirements;
