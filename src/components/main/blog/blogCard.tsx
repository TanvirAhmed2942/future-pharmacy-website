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
    <Card className="border p-2 bg-[#f9f9f9] border-gray-200 shadow-none hover:shadow-md transition-shadow duration-300 border-none cursor-pointer">
      {blog.map((blog, index) => {
        // Generate an ID if one doesn't exist
        const blogId = blog.id || `blog-${index + 1}`;

        return (
          <Link
            href={`/blog/blog-details/${blogId}`}
            key={blog.title + blog.date}
          >
            <CardContent className="p-2">
              <div>
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-500">{blog.author}</p>
                  <p className="text-sm text-gray-500">{blog.date}</p>
                </div>
                <div>
                  <h2 className="text-lg font-bold mt-2">{blog.title}</h2>
                  {/* <p className="text-sm text-gray-500">{blog.description}</p> */}
                </div>
                <div className="flex lg:flex-col 2xl:flex-row gap-y-2 justify-between mt-2">
                  <p className="text-sm text-gray-500">
                    Category: {blog.category}
                  </p>
                  <p className="text-sm text-gray-500 flex gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm bg-[#a064a0] text-white px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </p>
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
