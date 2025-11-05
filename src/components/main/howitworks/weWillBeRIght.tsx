import React from "react";
import Image from "next/image";
import { GoCheckCircleFill } from "react-icons/go";
function WeWillBeRight() {
  const benefits = [
    "Convenient home delivery",
    "Saves time and cost",
    "Secure prescription handling",
    "Real-time tracking",
    "Flexible scheduling",
    "Zero cost to deliver Rx when using our partner pharmacies",
  ];
  // return (
  //   <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-6 md:py-16 px-4 md:px-8">
  //     <div className="max-w-7xl mx-auto">
  //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ">
  //         {/* Text Content */}
  //         <div className="space-y-6 ">
  //           <h2 className="text-4xl md:text-5xl font-bold text-peter font-inter text-left">
  //             See all our Benefits
  //           </h2>
  //           <div className="space-y-4">
  //             {benefits.map((benefit, index) => (
  //               <div key={index} className="flex items-center gap-2">
  //                 <GoCheckCircleFill className="text-peter size-6" />
  //                 <p className="text-gray-700 text-lg leading-tight md:leading-relaxed font-inter text-left font-medium text-wrap break-words whitespace-break-spaces">
  //                   {benefit}
  //                 </p>
  //               </div>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Heart Image */}
  //         <div className="hidden lg:flex justify-start lg:justify-end">
  //           <div className="relative w-full max-w-md aspect-square ">
  //             <Image
  //               src="/howitworks/heart_shape_1.png"
  //               alt="Heart shape made of pills"
  //               width={1000}
  //               height={1000}
  //               className="object-cover scale-105 mx-auto"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
  return (
    <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-8 md:py-16 px-4 sm:px-6 md:px-8 rounded-2xl sm:rounded-none mx-4 sm:mx-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-peter font-inter text-center sm:text-left">
              See all our Benefits
            </h2>
            <div className="space-y-3 md:space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <GoCheckCircleFill className="text-peter size-5 md:size-6 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-base md:text-lg leading-snug md:leading-relaxed font-inter text-left font-medium">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Heart Image */}
          <div className="hidden lg:flex justify-start lg:justify-end">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/howitworks/heart_shape_1.png"
                alt="Heart shape made of pills"
                width={1000}
                height={1000}
                className="object-cover scale-105 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeWillBeRight;
