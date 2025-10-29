import React from "react";
import Image from "next/image";

function WeWillBeRight() {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-6 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-peter font-inter text-center md:text-left">
              We&apos;ll be right over dear
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed font-inter text-center md:text-left">
              Once we have your prescription, we&apos;ll text you to schedule
              your free delivery whenever and wherever you need it. There just
              needs to be someone – a friend, a doorman, a colleague – to
              receive and sign for your medication when it arrives.
            </p>
          </div>

          {/* Heart Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/howitworks/heart_shape_1.png"
                alt="Heart shape made of pills"
                width={1000}
                height={1000}
                className="object-cover scale-95"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeWillBeRight;
