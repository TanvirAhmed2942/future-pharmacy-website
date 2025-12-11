"use client";
import React, { useState, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  useGetBlogCommentsByIdQuery,
  useCreateBlogCommentMutation,
  BlogComment,
} from "@/store/Apis/blogApi/blogApi";
import useShowToast from "@/hooks/useShowToast";
import { toast } from "sonner";
import { useDeleteBlogCommentMutation } from "@/store/Apis/blogApi/blogApi";
import { imgUrl } from "@/lib/img_url";
import gsap from "gsap";
interface CommentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blogId: string;
}

function Comment({ open, onOpenChange, blogId }: CommentProps) {
  const [commentText, setCommentText] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );
  const commentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { showSuccess, showError } = useShowToast();
  const {
    data: commentsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetBlogCommentsByIdQuery(blogId, {
    skip: !open, // Only fetch when sheet is open
  });

  const [createComment, { isLoading: isSubmitting }] =
    useCreateBlogCommentMutation();
  const [deleteComment] = useDeleteBlogCommentMutation();
  const comments = commentsResponse?.data || [];

  const handleDeleteComment = async (commentId: string) => {
    const commentElement = commentRefs.current[commentId];

    if (!commentElement) return;

    // Set deleting state
    setDeletingCommentId(commentId);

    // Animate slide right
    gsap.to(commentElement, {
      x: "100%",
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        // Call async function inside the callback
        deleteComment(commentId)
          .unwrap()
          .then(() => {
            showSuccess({
              message: "Comment deleted successfully!",
            });
            setDeletingCommentId(null);
            refetch();
          })
          .catch((error: unknown) => {
            console.error("Failed to delete comment:", error);
            // Reset animation on error
            gsap.to(commentElement, {
              x: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });
            setDeletingCommentId(null);
            showError({
              message: "Failed to delete comment. Please try again.",
            });
          });
      },
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Get user initials
  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  const handleSubmit = async () => {
    if (!commentText.trim()) return;

    try {
      await createComment({
        blogId,
        message: commentText.trim(),
      }).unwrap();

      setCommentText("");
      toast.success("Comment posted successfully!");
    } catch (error) {
      console.error("Failed to post comment:", error);
      toast.error("Failed to post comment. Please try again.");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">
              Responses ({comments.length})
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Comment Input Section */}
          <div className="p-6 border-b">
            <div className="flex items-start gap-3 mb-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback className="bg-peter text-white">
                  U
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="What are your thoughts?"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[120px] resize-none bg-gray-50 border-gray-200 focus:bg-white"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setCommentText("");
                  onOpenChange(false);
                }}
                className="text-gray-700 hover:bg-gray-100"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!commentText.trim() || isSubmitting}
                className="bg-peter hover:bg-peter-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Posting..." : "Respond"}
              </Button>
            </div>
          </div>

          {/* Comments List Section */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-peter"></div>
              </div>
            )}

            {/* Error State */}
            {isError && (
              <p className="text-sm text-red-500 text-center py-8">
                Failed to load comments. Please try again.
              </p>
            )}

            {/* Empty State */}
            {!isLoading && !isError && comments.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            )}

            {/* Comments List */}
            {!isLoading && !isError && comments.length > 0 && (
              <div className="space-y-6">
                {comments.map((comment: BlogComment) => {
                  const isDeleting = deletingCommentId === comment._id;
                  return (
                    <div
                      key={comment._id}
                      ref={(el) => {
                        commentRefs.current[comment._id] = el;
                      }}
                      className="flex gap-3 group relative overflow-hidden"
                    >
                      {isDeleting && (
                        <div className="absolute inset-0 bg-gray-50 bg-opacity-90 flex items-center justify-center z-10">
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-peter"></div>
                          </div>
                        </div>
                      )}
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarImage
                          src={imgUrl(comment.userId.profile)}
                          alt={`${comment.userId.first_name} ${comment.userId.last_name}`}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-peter text-white text-sm">
                          {getUserInitials(
                            comment.userId.first_name,
                            comment.userId.last_name
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {comment.userId.first_name}{" "}
                            {comment.userId.last_name}
                          </p>
                          <span className="text-xs text-gray-400">•</span>
                          <p className="text-xs text-gray-500">
                            {formatDate(comment.createdAt)}
                          </p>
                          {!isDeleting && (
                            <p className="text-xs text-gray-500 group-hover:block hidden">
                              <RiDeleteBinLine
                                size={20}
                                className=" text-gray-500 cursor-pointer hover:text-black transition-all duration-300"
                                onClick={() => handleDeleteComment(comment._id)}
                              />
                            </p>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {comment.message}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default Comment;
