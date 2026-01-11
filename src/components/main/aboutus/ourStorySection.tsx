import React from "react";
import Image from "next/image";

function OurStorySection({
  headline,
  storyTimeline,
  footerDescription,
}: {
  headline: string;
  storyTimeline: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
  }[];
  footerDescription: string;
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
    <div className="pt-16 pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          {headline}
        </h1>

        {/* Who We Are Section */}
        {whoWeAre && (
          <div className="mb-20">
            {/* Heading - Full Width */}

            {/* Content Grid - Image aligns with paragraphs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Text Content - Left */}
              <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4 text-justify">
                <h2 className="text-3xl  font-bold text-gray-900 mb-6">
                  {whoWeAre.title}
                </h2>
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

              {/* Image - Right */}
              <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden lg:mt-18">
                <Image
                  src="/aboutus/who_we_are.webp"
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
        {whyWeDoIt &&
          (() => {
            // Parse the description to extract sub-heading, numbered list, and paragraphs
            const allLines = whyWeDoIt.description.split("\n");
            const subHeading = allLines[0]?.trim() || "";
            const numberedItems: string[] = [];
            const paragraphs: string[] = [];

            let foundEmptyLineAfterList = false;

            // Process lines starting from index 1
            for (let i = 1; i < allLines.length; i++) {
              const line = allLines[i].trim();

              // Skip empty lines but track when we find one after the list
              if (!line) {
                if (numberedItems.length > 0 && !foundEmptyLineAfterList) {
                  foundEmptyLineAfterList = true;
                }
                continue;
              }

              // Check if it's a numbered list item (starts with number followed by period)
              if (/^\d+\.\s/.test(line)) {
                numberedItems.push(line);
                foundEmptyLineAfterList = false; // Reset if we find another numbered item
              } else {
                // It's a paragraph (comes after empty line or after list)
                paragraphs.push(line);
              }
            }

            // Separate paragraphs: first paragraph goes in right column, last one goes full width
            const rightColumnParagraph = paragraphs[0] || "";
            const fullWidthParagraph = paragraphs[1] || "";

            return (
              <div className="mb-12">
                {/* Heading - Full Width */}

                {/* Content Grid - Image aligns with paragraphs */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8">
                  {/* Image - Left */}
                  <div className="relative w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden order-2 lg:order-1 lg:mt-16 ">
                    <Image
                      src="/aboutus/queue.webp"
                      alt="Pharmacist at work"
                      fill
                      className="object-fill"
                    />
                  </div>

                  {/* Text Content - Right */}
                  <div className="space-y-2 order-1 lg:order-2 text-justify">
                    {/* Sub-heading */}
                    <h2 className="text-3xl  font-bold text-gray-900 mb-4 ">
                      {whyWeDoIt.title}
                    </h2>
                    {subHeading && (
                      <p className="text-gray-700 text-base md:text-lg font-bold mb-3">
                        {subHeading}
                      </p>
                    )}
                    {/* Numbered List */}
                    {numberedItems.length > 0 && (
                      <ol className="list-none text-gray-700 text-base md:text-lg leading-relaxed space-y-2 mb-3">
                        {numberedItems.map((item, idx) => (
                          <li key={idx} className="pl-2 ">
                            <span className="">{item}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                    {/* Paragraph in right column */}
                    {rightColumnParagraph && (
                      <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4">
                        <p>{rightColumnParagraph}</p>
                        <p>{fullWidthParagraph}</p>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify">
                  {footerDescription}
                </p>
              </div>
            );
          })()}
      </div>
    </div>
  );
}

export default OurStorySection;
