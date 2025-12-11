import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { imgUrl } from "@/lib/img_url";

export interface BlogItem {
  _id: string;
  title: string;
  date: string;
  image: string;
  description: string;
  isDeleted: boolean;
  blogLikes: string[];
  createdAt: string;
  updatedAt: string;
}

function BlogCard({ blog }: { blog: BlogItem }) {
  // Get first character of title for badge (since API doesn't have author)
  const titleInitial = blog.title.charAt(0).toUpperCase();

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Link href={`/blog/blog-details/${blog._id}`} className="block">
      <Card className="py-2 bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden rounded-xl h-full">
        <CardContent className="p-4 flex flex-col h-full">
          {/* Image */}
          <div className="relative w-full h-48 md:h-56 overflow-hidden">
            <Image
              src={imgUrl(blog.image)}
              alt={blog.title}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain transition-transform duration-300 hover:scale-105 rounded-md"
            />
          </div>

          {/* Text Content */}
          <div className="px-4 flex flex-col flex-1 mt-4">
            {/* Title */}
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {blog.title}
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-600 mb-6 line-clamp-3 flex-1">
              {blog.description}
            </p>

            {/* Footer - Title Initial Badge, Date, Read Time */}
            <div className="flex items-center gap-3 border-gray-200">
              {/* Title Initial Badge */}
              <div className="w-10 h-10 rounded-md bg-gray-900 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">
                  {titleInitial}
                </span>
              </div>

              {/* Date and Likes */}
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-600 font-medium">
                  {formatDate(blog.createdAt)}
                </p>
                <p className="text-xs text-gray-500">
                  {blog.blogLikes.length}{" "}
                  {blog.blogLikes.length === 1 ? "like" : "likes"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default BlogCard;
