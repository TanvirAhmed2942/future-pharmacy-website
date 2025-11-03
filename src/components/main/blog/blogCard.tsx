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
    <Card className="bg-white p-4 border-gray-200 max-w-sm shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden rounded-lg">
      {blog.map((blog, index) => {
        // Generate an ID if one doesn't exist
        const blogId = blog.id || `blog-${index + 1}`;

        return (
          <Link
            href={`/blog/blog-details/${blogId}`}
            key={blog.title + blog.date + index}
            className="block"
          >
            <CardContent className="p-0">
              <div className="flex flex-col h-full">
                {/* Image - rounded top corners only */}
                <div className="relative w-full h-56 md:h-64 lg:h-72 overflow-hidden rounded-lg">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                  />
                </div>

                {/* Text Content */}
                <div className="py-4 md:py-5 flex-1 flex flex-col">
                  {/* Author */}
                  <p className="text-sm text-gray-700 mb-2">{blog.author}</p>

                  {/* Title */}
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2 flex-1">
                    {blog.title}
                  </h2>

                  {/* Date/Category */}
                  <p className="text-sm text-gray-500 mt-auto">{blog.date}</p>
                </div>
              </div>
            </CardContent>
          </Link>
        );
      })}
    </Card>
  );
}

export default BlogCard;
