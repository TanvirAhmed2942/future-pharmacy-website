"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FiThumbsUp,
  // FiMessageCircle,
  // FiBookmark,
  // FiShare2,
} from "react-icons/fi";
import Comment from "./Comment";
import { useGetBlogDetailsByIdQuery } from "@/store/Apis/blogApi/blogApi";
import { baseUrl } from "@/store/Apis/baseApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useCreateBlogLikeMutation } from "@/store/Apis/blogApi/blogApi";

import useShowToast from "@/hooks/useShowToast";
function BlogDetailsLayout() {
  const params = useParams();
  const blogId = params.id as string;
  const userId = useSelector((state: RootState) => state.user.user?._id);
  const { showSuccess, showError } = useShowToast();
  const [createBlogLike, { isLoading: isSubmitting }] =
    useCreateBlogLikeMutation();
  const {
    data: blogResponse,
    isLoading,
    isError,
    refetch,
  } = useGetBlogDetailsByIdQuery(blogId);
  const blogData = blogResponse?.data;

  const [isCommentSheetOpen, setIsCommentSheetOpen] = useState(false);

  // Format the image URL - handle both relative paths and full URLs
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/blog/blog.jpg"; // fallback image
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    // Replace backslashes with forward slashes and prepend base URL
    const normalizedPath = imagePath.replace(/\\/g, "/");
    return `${baseUrl}/${normalizedPath}`;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const isLiked = useMemo(
    () => blogData?.blogLikes.includes(userId || ""),
    [blogData?.blogLikes, userId]
  );

  const handleLike = async (isLiked: boolean | undefined) => {
    try {
      await createBlogLike(blogId).unwrap();
      if (isLiked) {
        showSuccess({
          message: "Unliked successfully!",
        });
      } else {
        showSuccess({
          message: "Liked successfully!",
        });
      }
      refetch();
    } catch (error: unknown) {
      console.error("Failed to like:", error);
      showError({
        message: "Failed to like. Please try again.",
      });
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-peter"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError || !blogData) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col justify-center items-center py-20">
            <p className="text-red-500 text-lg mb-4">
              Failed to load blog details. Please try again later.
            </p>
            <Button
              onClick={() => window.history.back()}
              className="bg-peter hover:bg-peter-dark text-white"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <article className="max-w-4xl mx-auto">
        {/* Blog Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          {blogData.title}
        </h1>

        {/* Blog Meta Header - Logo, Subscribe, Date, Read Time */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
          {/* Left - Logo with tagline */}
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-peter bg-opacity-10 flex items-center justify-center flex-shrink-0">
              <span className="text-peter font-bold text-lg">O</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">
                Optimus Health Solutions
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Your fast and reliable gateway to local pharmacies.
              </p>
            </div>
          </div>

          {/* Middle - Subscribe Button */}
          <div className="w-full flex items-center justify-between gap-4 md:w-auto">
            <Button
              variant="outline"
              className="text-gray-700 hover:bg-gray-50 px-6 py-2 text-sm font-medium border-1 border-[#8f4487]"
            >
              Subscribe
            </Button>

            {/* Right - Read Time and Date */}
            <div className="text-right text-sm">
              <p className="text-gray-600">
                {blogData.blogLikes.length}{" "}
                {blogData.blogLikes.length === 1 ? "like" : "likes"}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {formatDate(blogData.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6 mb-8">
          <button
            className="text-gray-600 hover:text-peter flex items-center gap-2 transition-colors cursor-pointer"
            onClick={() => handleLike(isLiked || false)}
          >
            <FiThumbsUp
              className={`w-5 h-5 ${isLiked ? "text-peter" : "text-gray-600"}`}
            />
            {isSubmitting ? (
              "_"
            ) : (
              <span className="text-base">{blogData.blogLikes.length}</span>
            )}{" "}
          </button>
        </div>

        {/* Featured Image */}
        <div className="relative w-full aspect-video mb-10 rounded-lg overflow-hidden">
          <Image
            src={getImageUrl(blogData.image)}
            alt={blogData.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Blog Content - Using dangerouslySetInnerHTML for description */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray-800 leading-relaxed blog-content"
            dangerouslySetInnerHTML={{ __html: blogData.description }}
          />
        </div>

        {/* Blog Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-gray-600 text-sm">
            <span>Published: {formatDate(blogData.createdAt)}</span>
            <span>Updated: {formatDate(blogData.updatedAt)}</span>
          </div>
        </div>
      </article>

      {/* Comment Sheet */}
      <Comment
        open={isCommentSheetOpen}
        onOpenChange={setIsCommentSheetOpen}
        blogId={blogId}
      />
    </div>
  );
}

export default BlogDetailsLayout;
