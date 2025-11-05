"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useIcon from "@/hooks/useIcon";

export default function RefilSection() {
  const router = useRouter();

  // Smooth scroll function using custom animation - with mobile device detection
  const smoothScrollToElement = (element: HTMLElement) => {
    // Check if device is mobile (smaller viewport)
    const isMobile = window.innerWidth <= 768;

    // Adjust offset based on device type
    const offset = isMobile ? -15000 : -1000;

    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset + offset;
    const startPosition = window.pageYOffset;
    const distance = elementPosition - startPosition;

    // Adjust duration for mobile (faster for better mobile UX)
    const duration = isMobile ? 600 : 800;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for smoother animation
      const easeInOutCubic = (t: number): number => {
        return t < 0.5
          ? 4 * t * t * t
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      window.scrollTo({
        top: startPosition + distance * easeInOutCubic(percentage),
        behavior: "auto", // Using our custom animation instead of 'smooth'
      });

      if (percentage < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const prescriptionDelivery = useIcon({ name: "prescription_delivery" });
  const refillPrescription = useIcon({ name: "refill_prescription" });
  const calendar = useIcon({ name: "calendar" });

  const services = [
    {
      icon: prescriptionDelivery,
      iconType: "custom",
      title: "Request a Prescription Delivery",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tempor quisque velit mi senectus mauris orci auctor.",
      buttonText: "Request Now",
      buttonColor: "bg-peter hover:bg-peter-dark",
      href: "/#request-your-rx-delivered-in-minutes",
      onlineHref: "/request-your-rx-delivered-in-minutes",
    },
    {
      icon: refillPrescription,
      iconType: "custom",
      title: "Refill a Prescription",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tempor quisque velit mi senectus mauris orci auctor.",
      buttonText: "Refill Now",
      buttonColor: "bg-peter hover:bg-peter-dark",
      href: "/refill-prescription",
      onlineHref: "/refill-prescription/online",
    },
    {
      icon: "/home/transfer.png",
      iconType: "image",
      title: "Transfer a Prescription",
      description:
        "Lorem ipsum dolor sit amet consectetur. Tempor quisque velit mi senectus mauris orci auctor.",
      buttonText: "Transfer Now",
      buttonColor: "bg-peter hover:bg-peter-dark",
      href: "/transfer-prescription",
      onlineHref: "/transfer-prescription/online",
    },
    {
      icon: calendar,
      iconType: "custom",
      title: "Schedule Essential Healthcare Services",
      description:
        "Lorem ipsum dolor sit amet consectetur. mauris orci auctor.",
      buttonText: "Schedule Now",
      buttonColor: "bg-peter hover:bg-peter-dark",
      href: "/schedule-now",
      onlineHref: "/schedule-now/online",
    },
  ];

  return (
    <div className="container mx-auto bg-gray-50 py-4 md:py-8 lg:py-16 ">
      <div className=" mx-auto">
        <div className="w-full max-w-2xl md:max-w-6xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-peter mb-4 font-inter text-center">
            Services We Offer
          </h2>
          <p className="text-gray-700 text-base md:text-lg font-inter text-center px-4 md:px-0">
            When you refill, transfer prescription or schedule essential
            healthcare services through our platform, you&apos;re connecting
            with our trusted local independent pharmacies near you. Together,
            we&apos;re strengthening our communities and helping independent
            pharmacies thrive.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4  2xl:gap-10 px-4 md:px-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white p-8 text-center hover:shadow-lg transition-shadow flex flex-col border-none shadow-none "
            >
              {/* Icon section - fixed height */}
              <div className="flex justify-center mb-4 h-20  items-center">
                {service?.iconType === "custom" ? (
                  <div className=" text-peter flex items-center justify-center">
                    {service?.icon}
                  </div>
                ) : (
                  <Image
                    src={(service?.icon as string) || ""}
                    alt={service?.title || ""}
                    width={150}
                    height={150}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Title section - fixed height */}
              <div className="h-fit flex items-center justify-center mb-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {service?.title}
                </h3>
              </div>

              {/* Description section - flexible height with min-height */}
              <div className="flex-1 flex items-start justify-center mb-2 ">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service?.description}
                </p>
              </div>

              {/* Button section - fixed at bottom */}
              <div className="mt-auto">
                <Button
                  className={`${service?.buttonColor} text-white px-6 py-2 rounded-lg w-fit mx-auto font-semibold cursor-pointer`}
                  onClick={() => {
                    if (service?.href?.includes("#")) {
                      // Handle fragment navigation
                      const [path, fragment] = service.href.split("#");

                      // Check if we're already on the same page
                      const isSamePage =
                        path === window.location.pathname || path === "/";

                      if (isSamePage) {
                        // If on same page, scroll immediately
                        const element = document.getElementById(fragment);
                        if (element) {
                          smoothScrollToElement(element);
                        }
                      } else {
                        // Navigate to new page first
                        router.push(path);

                        // Wait for page to be ready, then scroll
                        const scrollToElement = () => {
                          const element = document.getElementById(fragment);
                          if (element) {
                            smoothScrollToElement(element);
                          } else {
                            // Retry if element not found yet (max 10 attempts)
                            let attempts = 0;
                            const retry = setInterval(() => {
                              attempts++;
                              const element = document.getElementById(fragment);
                              if (element) {
                                clearInterval(retry);
                                smoothScrollToElement(element);
                              } else if (attempts >= 10) {
                                clearInterval(retry);
                              }
                            }, 100);
                          }
                        };

                        // Wait a bit longer for navigation to complete
                        setTimeout(scrollToElement, 600);
                      }
                    } else {
                      router.push(service?.href || "");
                    }
                  }}
                >
                  {service?.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
