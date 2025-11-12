import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Blog {
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  content: string;
  id?: string; // Optional ID for the blog
}

function BlogCard({ blog }: { blog: Blog[] }) {
  return (
    <>
      {blog.map((blog, index) => {
        // Generate an ID if one doesn't exist
        const blogId = blog.id || `blog-${index + 1}`;
        // Get author initial for badge
        const authorInitial = blog.author.charAt(0).toUpperCase();

        return (
          <Link
            href={`/blog/blog-details/${blogId}`}
            key={blog.title + blog.date + index}
            className="block"
          >
            <Card className="py-2 bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden rounded-xl">
              <CardContent className="p-4 flex flex-col h-full">
                {/* Image */}
                <div className="relative w-full h-48 md:h-56 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105 rounded-md"
                  />
                </div>

                {/* Text Content */}
                <div className="px-4 flex flex-col flex-1">
                  {/* Title */}
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {blog.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-600 mb-6 line-clamp-3 flex-1">
                    {blog.description}
                  </p>

                  {/* Footer - Author Badge, Date, Read Time */}
                  <div className="flex items-center gap-3  border-gray-200">
                    {/* Author Initial Badge */}
                    <div className="w-10 h-10 rounded-md bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        {authorInitial}
                      </span>
                    </div>

                    {/* Date and Read Time */}
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-gray-600 font-medium">
                        {blog.date.split(" / ")[0]}
                      </p>
                      <p className="text-xs text-gray-500">6 min read</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </>
  );
}

export default BlogCard;
