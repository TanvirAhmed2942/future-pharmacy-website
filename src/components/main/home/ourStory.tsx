"use client";
import React from "react";
import Link from "next/link";
import useIcon from "@/hooks/useIcon";

function OurStory() {
  return (
    <section className="py-8 md:py-16 px-4 md:px-8">
      <div className="container mx-auto px-4 md:px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Our Story
        </h1>

        <div className="max-w-full mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-[#f3ecf3] rounded-full flex items-center justify-center mx-auto mb-6">
            {useIcon({ name: "magical_book" })}
          </div>

          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            error praesentium omnis doloremque dolores quidem fuga molestias
            delectus asperiores architecto, dicta velit illum odio quam iure
            quibusdam ad animi soluta aspernatur quo quasi quisquam, veritatis
            earum. Harum perspiciatis necessitatibus est quaerat aliquid placeat
            expedita et, dolor nemo repellat ratione vel, cupiditate tenetur
            laudantium provident assumenda inventore atque incidunt, tempore
            eligendi optio similique facilis? Similique iusto explicabo ipsam
            unde commodi. Blanditiis asperiores nam, commodi vero ex hic sint at
            nihil id natus architecto odit, distinctio veniam ipsum. Libero
            voluptate eum repudiandae laboriosam asperiores, accusantium, nulla
            aspernatur maxime sint
            <br />
            <Link href="/about-us" className="text-peter hover:underline">
              Learn More
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default OurStory;
