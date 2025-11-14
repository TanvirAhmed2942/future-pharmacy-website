"use client";
import React, { ReactElement, useRef } from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import useIcon from "@/hooks/useIcon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      title: "Sign up for Optimus",
      description:
        "We'll coordinate with your old pharmacy or doctor to get your prescriptions.",
      videoSrc: "/videos/mosquito.mp4",
    },
    {
      iconType: "custom",
      customIcon: schedule_your_free_same_day_delivery,
      title: "Schedule your free same-day delivery",
      description:
        "We accept your insurance and deliver your prescriptions at a time  and text you when it's  that works for you.",
      videoSrc: "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4",
    },
    {
      iconType: "custom",
      customIcon: we_manage_your_refills,
      title: "We manage your refills",
      description:
        "We'll coordinate with your doctor and text you when it's  time for refills.",
      videoSrc: "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4",
    },
  ];

  useGSAP(() => {
    cardRefs.forEach((cardRef, index) => {
      if (cardRef.current) {
        // Ensure initial state - showing back (rotated 180deg)
        // The inline style already sets this, but we confirm with GSAP
        gsap.set(cardRef.current, { rotationY: 180, immediateRender: true });

        // Animate flip to front when card enters viewport
        gsap.to(cardRef.current, {
          rotationY: 0,
          duration: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 35%",
            end: "top 50%",
            markers: false,
            toggleActions: "play none none reverse",
            onEnter: () => {
              scrollFlippedRef.current[index] = true;
              // Pause video when flipped to front
              safePauseVideo(videoRefs[index].current);
            },
            onLeaveBack: () => {
              scrollFlippedRef.current[index] = false;
              // Resume video when back to initial state
              safePlayVideo(videoRefs[index].current);
            },
          },
        });
      }
    });
  });

  // Handle hover to flip to video
  const handleMouseEnter = (index: number) => {
    if (cardRefs[index].current) {
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

  return (
    <div className="container mx-auto bg-gray-50 py-4 md:py-8 lg:py-16  ">
      <div className=" mx-auto ">
        <div className="w-full max-w-2xl md:max-w-6xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-peter mb-4 font-inter text-center">
            How Optimus Health Solutions Works
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
            >
              <div
                ref={cardRefs[index]}
                className="relative w-full h-full transition-transform duration-1000"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                  transform: "rotateY(180deg)", // Initially show back (video)
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
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
