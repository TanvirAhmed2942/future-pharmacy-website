"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
// import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function UserTestimonial() {
  const testimonials = [
    {
      name: "Jane Cooper",
      role: "Patient",
      image: "/testimonials/jane.jpg",
      text: "Lorem ipsum dolor sit amet consectetur. Sed sit tristique nisl gravida vel. Faucibus gravida eget enim magna. Mauris feugiat venenatis adipiscing pretium. Mollis quis nisi placerat sit amet purus feugiat at. In venenatis integer lectus amet rutrum.",
    },
    {
      name: "Robert Fox",
      role: "Pharmacy Owner",
      image: "/testimonials/robert.jpg",
      text: "Lorem ipsum dolor sit amet consectetur. Sed sit tristique nisl gravida vel. Faucibus gravida eget enim magna. Mauris feugiat venenatis adipiscing pretium. Mollis quis nisi placerat sit amet purus feugiat at. In venenatis integer lectus amet rutrum.",
    },
    {
      name: "Sarah Williams",
      role: "Healthcare Provider",
      image: "/testimonials/sarah.jpg",
      text: "Lorem ipsum dolor sit amet consectetur. Sed sit tristique nisl gravida vel. Faucibus gravida eget enim magna. Mauris feugiat venenatis adipiscing pretium. Mollis quis nisi placerat sit amet purus feugiat at. In venenatis integer lectus amet rutrum.",
    },
  ];

  return (
    <section className="bg-white py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-peter mb-4 font-inter">
            What our Users Say
          </h2>

          {/* Star Rating */}
          {/* <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-6 h-6 ${
                  index < 4
                    ? "fill-yellow-400 text-yellow-400"
                    : index === 4
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-yellow-200 text-yellow-200"
                }`}
                style={{
                  clipPath: index === 4 ? "inset(0 30% 0 0)" : "none",
                }}
              />
            ))}
          </div>

          <p className="text-gray-700 text-base md:text-lg font-inter">
            Average Google Rating is 4.6
          </p> */}
        </div>

        {/* Swiper Container */}
        <div className="mb-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            onSlideChange={() => {}}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Card className=" border-gray-200 rounded-lg">
                  <CardContent className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Avatar and Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg font-inter">
                            {testimonial.name}
                          </h3>
                          <p className="text-gray-500 text-sm font-inter">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <div className="flex-1">
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base font-inter">
                          {testimonial.text}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <style jsx>{`
          :global(.swiper-pagination) {
            position: relative !important;
            bottom: auto !important;
            margin-top: 2rem;
          }
          :global(.swiper-pagination-bullet) {
            width: 8px;
            height: 8px;
            background: #d1d5db;
            opacity: 1;
            transition: all 0.3s ease;
            margin: 0 4px;
            border: 1px solid #d1d5db;
          }
          :global(.swiper-pagination-bullet-active) {
            width: 32px;
            border-radius: 4px;
            background: #1f2937;
          }
        `}</style>
      </div>
    </section>
  );
}

export default UserTestimonial;
