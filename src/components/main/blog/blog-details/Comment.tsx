"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CommentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  responseCount?: number;
}

function Comment({ open, onOpenChange, responseCount = 15 }: CommentProps) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = () => {
    if (commentText.trim()) {
      console.log("Comment submitted:", commentText);
      setCommentText("");
      // Handle comment submission here
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">
              Responses ({responseCount})
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
                  R
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Raselparvezrasel
                </p>
                <Textarea
                  placeholder="What are your thoughts?"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[120px] resize-none bg-gray-50 border-gray-200 focus:bg-white"
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
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!commentText.trim()}
                className="bg-peter hover:bg-peter-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Respond
              </Button>
            </div>
          </div>

          {/* Comments List Section */}
          <div className="flex-1 overflow-y-auto p-6">
            <p className="text-sm text-gray-500 text-center py-8">
              No comments yet. Be the first to comment!
            </p>
            {/* Comments list will go here */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Comment;
