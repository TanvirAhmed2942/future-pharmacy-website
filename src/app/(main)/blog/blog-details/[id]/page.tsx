import BlogDetailsLayout from "@/components/main/blog/blog-details/blogDetailsLayout";
import React from "react";

function Page() {
  // We're using useParams inside BlogDetailsLayout to get the ID
  return (
    <div className="min-h-screen bg-white">
      <BlogDetailsLayout />
    </div>
  );
}

export default Page;
