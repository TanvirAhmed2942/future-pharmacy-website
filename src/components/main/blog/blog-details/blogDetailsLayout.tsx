"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FiThumbsUp,
  FiMessageCircle,
  FiBookmark,
  FiShare2,
} from "react-icons/fi";
import Comment from "./Comment";
import {
  useGetBlogDetailsByIdQuery,
  useGetBlogSubscribersQuery,
  useCreateBlogLikeMutation,
  useCreateBlogSavedMutation,
  useDeleteSavedBlogMutation,
} from "@/store/Apis/blogApi/blogApi";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SubscribeModal from "../subsCribeModal";
import useShowToast from "@/hooks/useShowToast";
import { imgUrl } from "@/lib/img_url";
import Loader from "@/components/common/loader/Loader";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/slices/userSlice/userSlice";
import ShowAuthModal from "@/components/common/showforAuthModal/ShowAuthModal";
function BlogDetailsLayout() {
  const t = useTranslations("blog.details");
  const tBlog = useTranslations("blog");
  const params = useParams();
  const blogId = params.id as string;
  const userId = useSelector((state: RootState) => state.user.user?._id);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { showSuccess, showError } = useShowToast();
  const [createBlogLike, { isLoading: isSubmitting }] =
    useCreateBlogLikeMutation();
  const [createBlogSaved, { isLoading: isSaving }] =
    useCreateBlogSavedMutation();
  const [deleteSavedBlog, { isLoading: isDeleting }] =
    useDeleteSavedBlogMutation();
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const { data: subscribersData } = useGetBlogSubscribersQuery();
  const isSubscribed = useMemo(
    () =>
      subscribersData?.data?.result?.data?.some((item) => item.isSubscribed),
    [subscribersData?.data?.result?.data]
  );

  const totalSubscribers =
    subscribersData?.data?.result?.allSubscriberCount || 0;
  const {
    data: blogResponse,
    isLoading,
    isError,
    refetch,
  } = useGetBlogDetailsByIdQuery(blogId);
  const blogData = blogResponse?.data;

  const [isCommentSheetOpen, setIsCommentSheetOpen] = useState(false);

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

  const isBookmarked = useMemo(
    () => blogData?.blogSavedUsers?.includes(userId || ""),
    [blogData?.blogSavedUsers, userId]
  );

  const handleLike = async (isLiked: boolean | undefined) => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      return;
    }
    try {
      await createBlogLike(blogId).unwrap();
      if (isLiked) {
        showSuccess({
          message: t("messages.unlikedSuccess"),
        });
      } else {
        showSuccess({
          message: t("messages.likedSuccess"),
        });
      }
      refetch();
    } catch (error: unknown) {
      console.error("Failed to like:", error);
      showError({
        message: t("messages.likeFailed"),
      });
    }
  };

  const handleBookmark = async () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      return;
    }
    try {
      if (isBookmarked) {
        // Unsave/remove from saved blogs
        await deleteSavedBlog(blogId).unwrap();
        showSuccess({
          message: t("messages.removedFromSaved"),
        });
      } else {
        // Save blog
        await createBlogSaved(blogId).unwrap();
        showSuccess({
          message: t("messages.addedToSaved"),
        });
      }
      refetch();
    } catch (error: unknown) {
      console.error("Failed to save/unsave blog:", error);
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        t("messages.updateSavedFailed");
      showError({
        message: errorMessage,
      });
    }
  };

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback to execCommand for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (successful) {
          return true;
        } else {
          throw new Error("execCommand copy failed");
        }
      }
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      return false;
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: blogData?.title || t("fallback.blogPost"),
      text: blogData?.title || t("fallback.checkOutPost"),
      url: url,
    };

    try {
      // Check if Web Share API is supported
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
        showSuccess({
          message: t("messages.sharedSuccess"),
        });
      } else {
        // Fallback: Copy to clipboard
        const copied = await copyToClipboard(url);
        if (copied) {
          showSuccess({
            message: t("messages.linkCopied"),
          });
        } else {
          showError({
            message: t("messages.copyLinkFailed"),
          });
        }
      }
    } catch (error) {
      // User cancelled or error occurred
      if ((error as Error).name !== "AbortError") {
        // Fallback: Copy to clipboard if share fails
        const copied = await copyToClipboard(url);
        if (copied) {
          showSuccess({
            message: t("messages.linkCopied"),
          });
        } else {
          showError({
            message: t("messages.shareFailed"),
          });
        }
      }
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          {/* <div className="flex justify-center items-center py-20"> */}
          <Loader />
          {/* </div> */}
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
              {t("errorMessage")}
            </p>
            <Button
              onClick={() => window.history.back()}
              className="bg-peter hover:bg-peter-dark text-white"
            >
              {t("goBack")}
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
                {t("companyName")}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {t("tagline")}
              </p>
            </div>
          </div>

          {/* Middle - Subscribe Button */}
          <div className="w-full flex items-center justify-between gap-4 md:w-auto">
            <Button
              variant="outline"
              className="text-gray-700 hover:bg-gray-50 px-6 py-2 text-sm font-medium border-1 border-[#8f4487] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setIsSubscribeModalOpen(true)}
              disabled={isSubscribed === true}
            >
              {isSubscribed === true ? tBlog("subscribed") : tBlog("subscribe")}
            </Button>

            {/* Right - Read Time and Date */}
            <div className="text-right text-sm">
              <p className="text-gray-600">{totalSubscribers} {tBlog("subscribers")}</p>
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
          <button
            className="text-gray-600 hover:text-peter flex items-center gap-2 transition-colors cursor-pointer"
            onClick={() => {
              if (!isLoggedIn) {
                setIsAuthModalOpen(true);
                return;
              }
              setIsCommentSheetOpen(true);
            }}
          >
            <FiMessageCircle className="w-5 h-5 text-gray-600" />
            <span className="text-base">{blogData.comments?.length || 0}</span>
          </button>
          <button
            className="text-gray-600 hover:text-peter flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleBookmark}
            disabled={isSaving || isDeleting}
            title={
              isBookmarked ? t("removeFromSaved") : t("addToSaved")
            }
          >
            <FiBookmark
              className={`w-5 h-5 ${
                isBookmarked ? "text-peter fill-peter" : "text-gray-600"
              }`}
            />
          </button>
          <button
            className="text-gray-600 hover:text-peter flex items-center gap-2 transition-colors cursor-pointer"
            onClick={handleShare}
            title={t("sharePost")}
          >
            <FiShare2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Featured Image */}
        <div className="relative w-full aspect-video mb-10 rounded-lg overflow-hidden">
          <Image
            src={imgUrl(blogData.image)}
            alt={blogData.title}
            fill
            className="object-contain"
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
            <span>{t("published")} {formatDate(blogData.createdAt)}</span>
            <span>{t("updated")} {formatDate(blogData.updatedAt)}</span>
          </div>
        </div>
      </article>

      {/* Comment Sheet */}
      <Comment
        open={isCommentSheetOpen}
        onOpenChange={setIsCommentSheetOpen}
        blogId={blogId}
      />
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
      />
      <ShowAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default BlogDetailsLayout;
