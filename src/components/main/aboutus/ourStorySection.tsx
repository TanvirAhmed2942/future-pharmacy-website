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
    paragraph1?: string;
    paragraph2?: string;
    features?: string[];
    emphasizedText?: string;
    paragraph3?: string;
    paragraph4?: string;
    introText?: string;
    numberedList?: string[];
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
      <div className="container mx-auto ">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          {headline}
        </h1>

        {/* Who We Are Section */}
        {whoWeAre && (
          <div className="mb-20">
            {/* Content Grid - Image aligns with paragraphs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8">
              {/* Text Content - Left */}
              <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {whoWeAre.title}
                  </h2>
                  <div className="w-16 h-1 bg-peter mb-6"></div>
                </div>

                {whoWeAre.paragraph1 && (
                  <p className="text-justify">{whoWeAre.paragraph1}</p>
                )}

                {whoWeAre.paragraph2 && (
                  <p className="text-justify">{whoWeAre.paragraph2}</p>
                )}

                {/* Features Grid - 2x2 with borders */}
                {whoWeAre.features && Array.isArray(whoWeAre.features) && (
                  <div className="grid grid-cols-2 gap-0 py-4  border-gray-300 my-4">
                    {whoWeAre.features.map((feature: string, idx: number) => (
                      <div
                        key={idx}
                        className={` px-4 py-2 lg:text-sm 2xl:text-base ${idx < 2 ? "border-b-2 border-gray-300" : ""
                          } ${idx % 2 === 0 ? "border-r-2  border-gray-300" : ""
                          }`}
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                )}

                {whoWeAre.emphasizedText && (
                  <p className="italic text-justify">
                    {whoWeAre.emphasizedText}
                  </p>
                )}

                {whoWeAre.paragraph3 && (
                  <p className="text-justify xl:hidden 2xl:block">
                    {whoWeAre.paragraph3}
                  </p>
                )}
              </div>

              {/* Image - Right */}
              <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden lg:mt-18">
                <Image
                  src="/aboutus/who_we_are.png"
                  alt="Pharmacy shelves with medications"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                />
              </div>
            </div>

            {whoWeAre.paragraph3 && (
              <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify hidden xl:block  2xl:hidden mb-4">
                {whoWeAre.paragraph3}
              </p>
            )}

            {/* Full width paragraph at bottom */}
            {whoWeAre.paragraph4 && (
              <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify">
                {whoWeAre.paragraph4}
              </p>
            )}
          </div>
        )}

        {/* Why We Do It Section */}
        {whyWeDoIt && (
          <div className="mb-12">
            {/* Title, Intro Text, and Numbered List - Full Width */}
            <div className="mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {whyWeDoIt.title}
                </h2>
                <div className="w-16 h-1 bg-peter mb-4"></div>
              </div>

              {whyWeDoIt.introText && (
                <p className="text-gray-700 text-base font-semibold md:text-lg leading-relaxed mb-4">
                  {whyWeDoIt.introText}
                </p>
              )}

              {/* Numbered List */}
              {whyWeDoIt.numberedList &&
                Array.isArray(whyWeDoIt.numberedList) && (
                  <ol className="list-none text-gray-700 text-normal font-medium md:text-lg leading-relaxed space-y-2 mb-6">
                    {whyWeDoIt.numberedList.map((item, idx) => (
                      <li key={idx} className="pl-2">
                        <span>
                          {idx + 1}. {item}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
            </div>

            {/* Content Grid - Image on left (3 cols), paragraphs on right (9 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-8">
              {/* Image - Left (3 columns) */}
              <div className="relative w-full h-[250px] lg:h-[600px] rounded-lg overflow-hidden order-2 lg:order-1 lg:col-span-8">
                <Image
                  src="/aboutus/iStock_why_we_do_it.jpg"
                  alt="Pharmacist at work"
                  fill
                  className="object-cover  "
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                />
              </div>

              {/* Paragraphs - Right (9 columns) */}
              <div className="space-y-4 order-1 lg:order-2 lg:col-span-4 text-justify">
                {whyWeDoIt.paragraph1 && (
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {whyWeDoIt.paragraph1}
                  </p>
                )}

                {whyWeDoIt.paragraph2 && (
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {whyWeDoIt.paragraph2}
                  </p>
                )}

                {whyWeDoIt.paragraph3 && (
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed xl:hidden 2xl:block">
                    {whyWeDoIt.paragraph3}
                  </p>
                )}
              </div>
            </div>

            {whyWeDoIt.paragraph3 && (
              <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify xl:block  2xl:hidden mb-4">
                {whyWeDoIt.paragraph3}
              </p>
            )}

            {/* Full width paragraph at bottom */}
            {whyWeDoIt.paragraph4 && (
              <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify">
                {whyWeDoIt.paragraph4}
              </p>
            )}
          </div>
        )}

        {footerDescription && (
          <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify">
            {footerDescription}
          </p>
        )}
      </div>
    </div>
  );
}

export default OurStorySection;
