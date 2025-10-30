import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
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
}

function BlogCard({ blog }: { blog: Blog[] }) {
  return (
    <Card className="border p-2 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      {blog.map((blog) => (
        <CardContent key={blog.title + blog.date} className="p-2">
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
              <p className="text-sm text-gray-500">{blog.description}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-sm text-gray-500">Category: {blog.category}</p>
              <p className="text-sm text-gray-500 flex gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-[#a064a0] text-white  px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </CardContent>
      ))}
    </Card>
  );
}

export default BlogCard;
