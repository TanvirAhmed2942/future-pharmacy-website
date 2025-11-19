"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { HiArrowNarrowRight } from "react-icons/hi";
import Image from "next/image";
import gsap from "gsap";
import { useTranslations } from "next-intl";
function OurStory() {
  const t = useTranslations("home.ourStory");
  // const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);

  useEffect(() => {
    // Blob 1 - Slow rotation (20s)
    // gsap.to(blob1Ref.current, {
    //   rotation: 360,
    //   duration: 20,
    //   repeat: -1,
    //   ease: "linear",
    // });

    // Blob 2 - Medium rotation (15s, reverse direction)
    gsap.to(blob2Ref.current, {
      rotation: -360,
      duration: 20,
      repeat: -1,
      ease: "linear",
    });

    // Blob 3 - Fast rotation (10s)
    gsap.to(blob3Ref.current, {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <section className="py-8 md:py-16  overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-center md:text-left ">
            <h2 className="text-3xl md:text-5xl font-bold text-peter mb-6">
              {t("headline")}
            </h2>

            <p className="text-gray-700 text-sm md:text-lg leading-relaxed mb-6">
              {t("description_1st")}
            </p>

            <p className="text-gray-700 text-sm md:text-lg leading-relaxed mb-8">
              {t("description_2nd")}
            </p>

            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 text-peter hover:text-peter-dark font-semibold transition-colors"
            >
              {t("buttonText")}
              <HiArrowNarrowRight className="size-5 mt-0.5" />
            </Link>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center md:justify-end items-center">
            <div className="relative w-96 h-96 md:w-[28rem] md:h-[28rem] ">
              {/* Blob 1 - Rotating */}
              {/* <div
                ref={blob1Ref}
                className="absolute inset-0 w-full h-full origin-center"
                style={{
                  backgroundImage: "url('/home/blob_4.svg')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  scale: 1.4,
                  zIndex: 1,
                }}
              /> */}

              {/* Blob 2 - Rotating */}
              <div
                ref={blob2Ref}
                className="absolute inset-0 w-full h-full origin-center"
                style={{
                  backgroundImage: "url('/home/blob_4.svg')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  opacity: 0.7,
                  scale: 1.5,
                  zIndex: 3,
                }}
              />

              {/* Blob 3 - Rotating */}
              <div
                ref={blob3Ref}
                className="absolute inset-0 w-full h-full origin-center"
                style={{
                  backgroundImage: "url('/home/blob_4.svg')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  // opacity: 0.5,
                  scale: 1.5,
                  zIndex: 2,
                }}
              />

              {/* Image Container - Static (Does Not Rotate) */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/home/our_story.webp"
                    alt="Our Story - Optimus Health Solutions"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurStory;
