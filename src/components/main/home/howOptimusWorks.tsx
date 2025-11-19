"use client";
import React, { ReactElement, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import useIcon from "@/hooks/useIcon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
gsap.registerPlugin(ScrollTrigger);

type WorkItem = {
  title: string;
  description: string;
  videoSrc: string;
} & (
  | { iconType: "custom"; customIcon: ReactElement | null }
  | { iconType: "lucide"; icon: LucideIcon }
);

export default function HowOptimusWorks() {
  const router = useRouter();
  const t = useTranslations("home.optimusHealthSolutions");

  const sign_up_for_optimus = useIcon({ name: "sign_up_for_optimus" });
  const schedule_your_free_same_day_delivery = useIcon({
    name: "schedule_your_free_same_day_delivery",
  });
  const we_manage_your_refills = useIcon({ name: "we_manage_your_refills" });

  // Refs for each card
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const cardRefs = [card1Ref, card2Ref, card3Ref];

  // Refs for video elements
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);
  const videoRefs = [video1Ref, video2Ref, video3Ref];

  // Track scroll state for each card
  const scrollFlippedRef = useRef<boolean[]>([false, false, false]);

  // Store ScrollTrigger instances for cleanup
  const scrollTriggerInstancesRef = useRef<ScrollTrigger[]>([]);

  // Safe video play function
  const safePlayVideo = async (video: HTMLVideoElement | null) => {
    if (!video) return;
    try {
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      }
    } catch (error) {
      // Ignore AbortError - it's expected when play is interrupted
      if (error instanceof Error && error.name !== "AbortError") {
        console.warn("Video play error:", error);
      }
    }
  };

  // Safe video pause function
  const safePauseVideo = (video: HTMLVideoElement | null) => {
    if (!video) return;
    try {
      if (!video.paused) {
        video.pause();
      }
    } catch (error) {
      console.warn("Video pause error:", error);
    }
  };

  const items: WorkItem[] = [
    {
      iconType: "custom",
      customIcon: sign_up_for_optimus,
      title: t("steps.0.title"),
      description: t("steps.0.description"),
      videoSrc: "/videos/video_1.mp4",
    },
    {
      iconType: "custom",
      customIcon: schedule_your_free_same_day_delivery,
      title: t("steps.1.title"),
      description: t("steps.1.description"),
      videoSrc: "/videos/request.mp4",
    },
    {
      iconType: "custom",
      customIcon: we_manage_your_refills,
      title: t("steps.2.title"),
      description: t("steps.2.description"),
      videoSrc:
        "/videos/deliver.mp4",
    },
  ];

  useGSAP(() => {
    
    const mm = gsap.matchMedia();

    // Helper function to create scroll trigger with specific start/end values
    const createScrollTrigger = (
      cardRef: React.RefObject<HTMLDivElement | null>,
      index: number,
      start: string,
      end: string
    ) => {
      if (!cardRef.current) return null;

      // Ensure initial state - showing back (rotated 180deg)
      gsap.set(cardRef.current, { rotationY: 180, immediateRender: true });

      // Create scroll trigger that flips card to front when entering viewport
      const st = ScrollTrigger.create({
        trigger: cardRef.current,
        start: start,
        end: end,
        markers: false,
        onEnter: () => {
          // Flip to front (0deg) when entering viewport
          gsap.to(cardRef.current, {
            rotationY: 0,
            duration: 0.6,
            ease: "power2.out",
          });
          scrollFlippedRef.current[index] = true;
          safePauseVideo(videoRefs[index].current);
        },
        onLeaveBack: () => {
          // Flip back to video (180deg) when leaving viewport
          gsap.to(cardRef.current, {
            rotationY: 180,
            duration: 0.6,
            ease: "power2.out",
          });
          scrollFlippedRef.current[index] = false;
          safePlayVideo(videoRefs[index].current);
        },
      });

      // Check if already in viewport after ScrollTrigger is created
      const checkInitialState = () => {
        if (st && cardRef.current && !scrollFlippedRef.current[index]) {
          // Check if scroll position is past the start point
          const progress = st.progress;
          if (progress > 0 || st.isActive) {
            // Manually trigger the flip if in viewport
            gsap.to(cardRef.current, {
              rotationY: 0,
              duration: 0.6,
              ease: "power2.out",
            });
            scrollFlippedRef.current[index] = true;
            safePauseVideo(videoRefs[index].current);
          }
        }
      };

      // Check after ScrollTrigger has been refreshed
      setTimeout(checkInitialState, 200);

      return st;
    };

    // Laptop dimensions (MacBook Air 1280x800 and similar)
    mm.add("(min-width: 1024px) and (max-width: 1280px)", () => {
      // Clean up previous instances
      scrollTriggerInstancesRef.current.forEach((st) => st.kill());
      scrollTriggerInstancesRef.current = [];

      cardRefs.forEach((cardRef, index) => {
        const st = createScrollTrigger(cardRef, index, "top 40%", "top 50%");
        if (st) {
          scrollTriggerInstancesRef.current.push(st);
        }
      });

      // Refresh ScrollTrigger after all animations are created
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    });

    // Larger desktops and tablets
    mm.add(
      "(min-width: 768px) and (max-width: 1023px), (min-width: 1281px)",
      () => {
        // Clean up previous instances
        scrollTriggerInstancesRef.current.forEach((st) => st.kill());
        scrollTriggerInstancesRef.current = [];

        cardRefs.forEach((cardRef, index) => {
          const st = createScrollTrigger(cardRef, index, "top 50%", "top 60%");
          if (st) {
            scrollTriggerInstancesRef.current.push(st);
          }
        });

        // Refresh ScrollTrigger after all animations are created
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      }
    );

    // Mobile: Disable scroll trigger, show front side by default
    mm.add("(max-width: 767px)", () => {
      // Clean up previous instances
      scrollTriggerInstancesRef.current.forEach((st) => st.kill());
      scrollTriggerInstancesRef.current = [];

      cardRefs.forEach((cardRef, index) => {
        if (cardRef.current) {
          // On mobile, show front side (0deg) by default
          gsap.set(cardRef.current, { rotationY: 0, immediateRender: true });
          scrollFlippedRef.current[index] = true;
          // Ensure video is paused on mobile initially
          safePauseVideo(videoRefs[index].current);
        }
      });

      // Refresh to ensure state is applied
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });

    // Cleanup function
    return () => {
      mm.revert();
      scrollTriggerInstancesRef.current.forEach((st) => st.kill());
      scrollTriggerInstancesRef.current = [];
    };
  });

  // Refresh ScrollTrigger on mount and resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle hover/touch to flip to video
  const handleMouseEnter = (index: number) => {
    if (cardRefs[index].current) {
      // Temporarily disable ScrollTrigger to prevent conflicts
      const st = scrollTriggerInstancesRef.current[index];
      if (st) {
        st.disable();
      }

      // Flip to video (180deg) on hover
      gsap.to(cardRefs[index].current, {
        rotationY: 180,
        duration: 0.6,
        ease: "power2.out",
      });
      // Play video
      safePlayVideo(videoRefs[index].current);
    }
  };

  // Handle mouse leave to flip back to front (if scrolled) or stay on back
  const handleMouseLeave = (index: number) => {
    if (cardRefs[index].current) {
      // Re-enable ScrollTrigger
      const st = scrollTriggerInstancesRef.current[index];
      if (st) {
        st.enable();
      }

      // If scrolled, flip back to front, otherwise stay on back
      const targetRotation = scrollFlippedRef.current[index] ? 0 : 180;
      gsap.to(cardRefs[index].current, {
        rotationY: targetRotation,
        duration: 0.6,
        ease: "power2.out",
      });
      // Pause video
      safePauseVideo(videoRefs[index].current);
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = (index: number) => {
    if (cardRefs[index].current) {
      // Flip to video (180deg) on touch
      gsap.to(cardRefs[index].current, {
        rotationY: 180,
        duration: 0.6,
        ease: "power2.out",
      });
      // Play video
      safePlayVideo(videoRefs[index].current);
    }
  };

  const handleTouchEnd = (index: number) => {
    if (cardRefs[index].current) {
      // On mobile, always flip back to front after touch ends
      gsap.to(cardRefs[index].current, {
        rotationY: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      // Pause video
      safePauseVideo(videoRefs[index].current);
    }
  };

  return (
    <div className="container mx-auto bg-gray-50 py-4 md:py-8 lg:py-16  ">
      <div className=" mx-auto ">
        <div className="w-full max-w-2xl md:max-w-6xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-peter mb-4 font-inter text-center">
            {t("headline")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 2xl:gap-10 px-4 md:px-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="perspective-1000"
              style={{ perspective: "1000px" }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={() => handleTouchEnd(index)}
            >
              <div
                ref={cardRefs[index]}
                className="relative w-full h-full transition-transform duration-1000"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                  // Initial state will be set by GSAP based on screen size
                }}
              >
                {/* Back side - Video */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Card className="bg-black p-0 text-center border-none shadow-none h-full w-full overflow-hidden">
                    <video
                      ref={videoRefs[index]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={item.videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Card>
                </div>

                {/* Front side - Content */}
                <div
                  className="relative w-full h-full backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Card className="bg-white p-8 text-center hover:shadow-lg transition-shadow flex flex-col border-none shadow-none h-full">
                    {/* Icon section - fixed height */}
                    <div className="flex justify-center mb-4 h-20 items-center">
                      {item.iconType === "custom" && item.customIcon}
                      {item.iconType === "lucide" &&
                        React.createElement(item.icon, {
                          className: "w-6 h-6 text-peter",
                        })}
                    </div>

                    {/* Title section - fixed height */}
                    <div className="h-fit flex items-center justify-center mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description section - flexible height with min-height */}
                    <div className="flex-1 flex items-start justify-center mb-2">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            className=" bg-peter hover:bg-peter-dark text-white py-2 cursor-pointer mt-6 lg:mt-8 2xl:mt-10"
            onClick={() => router.push("/how-it-works")}
          >
            {t("learnMore")}
          </Button>
        </div>
      </div>
    </div>
  );
}
