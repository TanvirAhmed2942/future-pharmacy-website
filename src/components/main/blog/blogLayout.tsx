"use client";

import React, { useState } from "react";
import BlogCard from "./blogCard";
import Banner from "@/components/common/banner/Banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import SubscribeModal from "./subsCribeModal";

function BlogLayout() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const blog = [
    {
      title: "Dear Doctor: Deborah Cobb, FNP-BC",
      description: "Blog description",
      image: "/blog/blog.jpg",
      date: "October 22 / Global",
      author: "Dr. Nick Bottaro",
      category: "Global",
      tags: [],
      content: "Blog content",
    },
    {
      title: "Dear Doctor: Deborah Cobb, FNP-BC",
      description: "Blog description",
      image: "/blog/blog_2.jpg",
      date: "October 22 / Global",
      author: "Dr. Nick Bottaro",
      category: "Global",
      tags: [],
      content: "Blog content",
    },
    {
      title: "Dear Doctor: Deborah Cobb, FNP-BC",
      description: "Blog description",
      image: "/blog/blog_3.jpg",
      date: "October 22 / Global",
      author: "Dr. Nick Bottaro",
      category: "Global",
      tags: [],
      content: "Blog content",
    },
    {
      title: "Dear Doctor: Deborah Cobb, FNP-BC",
      description: "Blog description",
      image: "/blog/blog_4.jpg",
      date: "October 22 / Global",
      author: "Dr. Nick Bottaro",
      category: "Global",
      tags: [],
      content: "Blog content",
    },
    {
      title: "Dear Doctor: Deborah Cobb, FNP-BC",
      description: "Blog description",
      image: "/blog/blog_5.jpg",
      date: "October 22 / Global",
      author: "Dr. Nick Bottaro",
      category: "Global",
      tags: [],
      content: "Blog content",
    },
    {
      title: "Dear Doctor: Deborah Cobb, FNP-BC",
      description: "Blog description",
      image: "/blog/blog.jpg",
      date: "October 22 / Global",
      author: "Dr. Nick Bottaro",
      category: "Global",
      tags: [],
      content: "Blog content",
    },
    {
      title: "Dear Doctor: Deborah Cobb, FNP-BC",
      description: "Blog description",
      image: "/blog/blog_2.jpg",
      date: "October 22 / Global",
      author: "Dr. Nick Bottaro",
      category: "Global",
      tags: [],
      content: "Blog content",
    },
    {
      title: "Dear Doctor: Deborah Cobb, FNP-BC",
      description: "Blog description",
      image: "/blog/blog_3.jpg",
      date: "October 22 / Global",
      author: "Dr. Nick Bottaro",
      category: "Global",
      tags: [],
      content: "Blog content",
    },
    {
      title: "Dear Doctor: Deborah Cobb, FNP-BC",
      description: "Blog description",
      image: "/blog/blog_4.jpg",
      date: "October 22 / Global",
      author: "Dr. Nick Bottaro",
      category: "Global",
      tags: [],
      content: "Blog content",
    },
  ];

  const filters = ["All", "Policy", "Medicares", "Operations"];

  const handleSubscribe = () => {
    setIsOpen(true);
  };

  return (
    <div className="bg-white">
      <Banner
        title="Welcome to the Optimus Health Solutions Blog"
        description="Read our latest blog posts and stay up to date with the latest news and updates."
        image="/banner/blog_banner.png"
      />
      <div className="container mx-auto px-4 md:px-4 py-8 md:py-12">
        {/* Blog Introduction Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6">
          <div className="flex items-center gap-4">
            {/* Logo placeholder - you can replace this with your actual logo */}
            <div className=" w-60 h-20 rounded-lg flex items-center justify-center border border-gray-200 p-2">
              <Image
                src={"/nav/Logo.png"}
                alt="logo"
                width={192}
                height={192}
                className="object-contain rounded-lg w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                Hello, Dear - the Optimus Health Solutions Blog
              </h1>
              <p className="text-gray-500 text-sm md:text-base">
                The Optimus Health Solutions Blog
              </p>
              <p className="text-gray-400 text-xs md:text-sm mt-1">
                478 Subscribers
              </p>
            </div>
          </div>
          <Button
            className="bg-peter hover:bg-peter-dark text-white px-6 py-2 rounded-lg"
            onClick={handleSubscribe}
          >
            Subscribe
          </Button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 md:mb-12">
          <Input
            type="text"
            placeholder="Search topics: PBM, Part D, delivery, adherence..."
            className="flex-1 bg-gray-50 border-gray-200 rounded-lg px-4 py-2 h-10"
          />
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter
                    ? "bg-peter text-white"
                    : "bg-[#f3ecf3] text-gray-700 border border-gray-200 hover:bg-[#d2b5d2]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 2xl:gap-6">
          {blog.map((blog, index) => (
            <BlogCard key={blog.title + blog.date + index} blog={[blog]} />
          ))}
        </div>
      </div>

      {isOpen && (
        <SubscribeModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubscribe={handleSubscribe}
        />
      )}
    </div>
  );
}

export default BlogLayout;
