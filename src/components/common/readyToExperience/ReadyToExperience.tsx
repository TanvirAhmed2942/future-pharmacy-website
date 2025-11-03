"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

function ReadyToExperience() {
  const router = useRouter();

  // Smooth scroll function using custom animation
  const smoothScrollToElement = (element: HTMLElement) => {
    const offset = -150; // Offset to scroll a bit above the element (in pixels)
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset + offset;
    const startPosition = window.pageYOffset;
    const distance = elementPosition - startPosition;
    const duration = 800; // ms
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

      window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));

      if (percentage < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const handleNavigateToContact = () => {
    // Try to find the element on the current page
    const element = document.getElementById("contact-us");

    if (element) {
      // Element exists on current page, scroll to it
      smoothScrollToElement(element);
    } else {
      // Element not found, navigate to home page and then scroll
      router.push("/");
      setTimeout(() => {
        const scrollToElement = () => {
          const element = document.getElementById("contact-us");
          if (element) {
            smoothScrollToElement(element);
          } else {
            // Retry if element not found yet (max 10 attempts)
            let attempts = 0;
            const retry = setInterval(() => {
              attempts++;
              const element = document.getElementById("contact-us");
              if (element) {
                clearInterval(retry);
                smoothScrollToElement(element);
              } else if (attempts >= 10) {
                clearInterval(retry);
              }
            }, 100);
          }
        };
        setTimeout(scrollToElement, 600);
      }, 0);
    }
  };

  return (
    <div className="flex justify-center items-center py-16 px-4 bg-white container mx-auto">
      <Card className="bg-white rounded-xl  p-8 md:p-12  w-full text-center ">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Ready to experience the convenience <br /> of Optimus Heath Solutions
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          Join thousands of satisfied patients who trust us with their
          prescription delivery needs.
        </p>
        <Button
          onClick={handleNavigateToContact}
          className="w-fit mx-auto bg-peter hover:bg-peter-dark text-white px-8 py-6 rounded-lg text-base font-medium cursor-pointer"
        >
          Send us a Message
        </Button>
      </Card>
    </div>
  );
}

export default ReadyToExperience;
