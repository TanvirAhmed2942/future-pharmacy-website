import React from "react";

function HowItWorksSection() {
  const items = [
    {
      badge: "H1",
      title: "Sign Up",

      description: "Create your account in minutes.",
    },
    {
      badge: "H2",
      title: "Get Verified",

      description: "Complete our background check.",
    },
    {
      badge: "H3",
      title: "Start Delivery & Earning",

      description: "Manage and Fulfil delivery requests through our platform.",
    },
  ];

  return (
    <div className="py-16 ">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 my-16">
          How It Works
        </h1>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-2 bottom-18 w-0.5 border-l-2 border-dashed border-gray-300 " />

          <div className="space-y-12 my-16">
            {items.map((item, idx) => (
              <div key={idx} className="relative flex gap-6">
                {/* Badge circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-peter flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                    {item.badge}
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 pb-2">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorksSection;
