import React from "react";
import Image from "next/image";

function OurStorySection({
  headline,
  storyTimeline,
}: {
  headline: string;
  storyTimeline: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
  }[];
}) {
  // Extract sections from timeline
  const whoWeAre = storyTimeline.find(
    (item) =>
      item.title.toLowerCase().includes("who we are") || item.badge === "H1"
  );
  const whyWeDoIt = storyTimeline.find(
    (item) =>
      item.title.toLowerCase().includes("why we do it") || item.badge === "H2"
  );

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          {headline}
        </h1>

        {/* Who We Are Section */}
        {whoWeAre && (
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Text Content - Left */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {whoWeAre.title}
                </h2>
                <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4">
                  {whoWeAre.description.includes("\n") ? (
                    whoWeAre.description
                      .split("\n")
                      .filter((p) => p.trim())
                      .map((paragraph, idx) => (
                        <p key={idx}>{paragraph.trim()}</p>
                      ))
                  ) : (
                    <p>{whoWeAre.description}</p>
                  )}
                </div>
              </div>

              {/* Image - Right */}
              <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/home/our_story.webp"
                  alt="Pharmacy shelves with medications"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Why We Do It Section */}
        {whyWeDoIt && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8">
              {/* Image - Left */}
              <div className="relative w-full h-[300px] lg:h-[400px] rounded-lg overflow-hidden order-2 lg:order-1">
                <Image
                  src="/home/our_story.webp"
                  alt="Pharmacist at work"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Content - Right */}
              <div className="space-y-4 order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {whyWeDoIt.title}
                </h2>
                <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4">
                  {whyWeDoIt.description.includes("\n") ? (
                    whyWeDoIt.description
                      .split("\n")
                      .slice(0, -1)
                      .filter((p) => p.trim())
                      .map((paragraph, idx) => (
                        <p key={idx}>{paragraph.trim()}</p>
                      ))
                  ) : (
                    <p>{whyWeDoIt.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Full Width Paragraph Below */}
            {whyWeDoIt.description.includes("\n") && (
              <div className="mt-8">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
                  {whyWeDoIt.description.split("\n").slice(-1)[0].trim()}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OurStorySection;
