import React from "react";
import BlogCard from "./blogCard";

function BlogLayout() {
  const blog = [
    {
      title: "Blog 1",
      description: "Blog 1 description",
      image: "/blog/blog.jpg",
      date: "2025-01-01",
      author: "John Doe",
      category: "Category 1",
      tags: ["Tag 1", "Tag 2"],
      content: "Blog 1 content",
    },
    {
      title: "Blog 2",
      description: "Blog 1 description",
      image: "/blog/blog_2.jpg",
      date: "2025-01-01",
      author: "John Doe",
      category: "Category 1",
      tags: ["Tag 1", "Tag 2"],
      content: "Blog 1 content",
    },
    {
      title: "Blog 3",
      description: "Blog 1 description",
      image: "/blog/blog_3.jpg",
      date: "2025-01-01",
      author: "John Doe",
      category: "Category 1",
      tags: ["Tag 1", "Tag 2"],
      content: "Blog 1 content",
    },
    {
      title: "Blog 4",
      description: "Blog 1 description",
      image: "/blog/blog_4.jpg",
      date: "2025-01-01",
      author: "John Doe",
      category: "Category 1",
      tags: ["Tag 1", "Tag 2"],
      content: "Blog 1 content",
    },
    {
      title: "Blog 5",
      description: "Blog 1 description",
      image: "/blog/blog_5.jpg",
      date: "2025-01-01",
      author: "John Doe",
      category: "Category 1",
      tags: ["Tag 1", "Tag 2"],
      content: "Blog 1 content",
    },
    {
      title: "Blog 6",
      description: "Blog 1 description",
      image: "/blog/blog.jpg",
      date: "2025-01-01",
      author: "John Doe",
      category: "Category 1",
      tags: ["Tag 1", "Tag 2"],
      content: "Blog 1 content",
    },
  ];
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Read our latest blog posts and stay up to date with the latest news
            and updates.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 2xl:gap-8">
          {blog.map((blog) => (
            <BlogCard key={blog.title + blog.date} blog={[blog]} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogLayout;
