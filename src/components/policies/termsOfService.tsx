import React from "react";
import Banner from "../common/banner/Banner";

function TermsOfService() {
  const sections = [
    {
      title: "Introduction",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Vitae massa sit door sed odio. Ut id lorem posuere purus facilisi tincidunt. Ac sit volutpat pulvinar dolor ut sagittis. Ultricies morbi ante convallis aliquam odio vehicula tincidunt consequat diam. Cursus blandit sodales tellus in nisl tempor. Sagittis lobortis egestas diam porta neque arcu. Nec nunc et malesuada praesent.",
    },
    {
      title: "Eligibility",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Vitae massa sit door sed odio. Ut id lorem posuere purus facilisi tincidunt. Ac sit volutpat pulvinar dolor ut sagittis.",
    },
    {
      title: "Use of Service",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Vitae massa sit door sed odio. Ut id lorem posuere purus facilisi tincidunt. Ac sit volutpat pulvinar dolor ut sagittis. Ultricies morbi ante convallis aliquam odio vehicula tincidunt consequat diam. Cursus blandit sodales tellus in nisl tempor. Sagittis lobortis egestas diam porta neque arcu. Nec nunc et malesuada praesent.",
    },
    {
      title: "Orders & Deliveries",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Vitae massa sit door sed odio. Ut id lorem posuere purus facilisi tincidunt. Ac sit volutpat pulvinar dolor ut sagittis.",
    },
    {
      title: "Payment & Billing",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Vitae massa sit door sed odio. Ut id lorem posuere purus facilisi tincidunt. Ac sit volutpat pulvinar dolor ut sagittis. Ultricies morbi ante convallis aliquam odio vehicula tincidunt consequat diam. Cursus blandit sodales tellus in nisl tempor. Sagittis lobortis egestas diam porta neque arcu. Nec nunc et malesuada praesent.",
    },
    {
      title: "User Responsibilities",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Cursus blandit sodales tellus in nisl tempor. Sagittis lobortis egestas diam porta neque arcu. Nec nunc et malesuada praesent.",
    },
    {
      title: "Company Rights",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Vitae massa sit door sed odio. Ut id lorem posuere purus facilisi tincidunt.",
    },
    {
      title: "Limitation of Liability",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Vitae massa sit door sed odio. Ut id lorem posuere purus facilisi tincidunt. Ac sit volutpat pulvinar dolor ut sagittis.",
    },
    {
      title: "Data Privacy & Security",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Banner
        title="Terms of Service"
        description="Please read these terms carefully before using our services."
        image="/policies/terms_of_service.png"
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
