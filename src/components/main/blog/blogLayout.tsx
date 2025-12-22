"use client";

import React, { useMemo, useState } from "react";
import BlogCard from "./blogCard";
import Banner from "@/components/common/banner/Banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import SubscribeModal from "./subsCribeModal";
import {
  useGetBlogQuery,
  useGetBlogSubscribersQuery,
} from "@/store/Apis/blogApi/blogApi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useSelector } from "react-redux";
import { selectIsSubscriberUser } from "@/store/slices/userSlice/userSlice";
import Loader from "@/components/common/loader/Loader";
function BlogLayout() {
  const isSubscriberUser = useSelector(selectIsSubscriberUser);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: subscriberStatus } = useGetBlogSubscribersQuery();
  const subscriberList = subscriberStatus?.data?.result?.data || [];
  const isSubscribedFromApi = subscriberList.some((item) => item.isSubscribed);
  const isSubscribed = isSubscriberUser || isSubscribedFromApi;
  const {
    data: blogResponse,
    isLoading,
    isError,
  } = useGetBlogQuery(
    {
      page: currentPage,
      limit: 10,
    },
    {
      pollingInterval: 30000, // 30 seconds
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const blogs = blogResponse?.data?.data || [];
  const meta = blogResponse?.meta;
  const totalSubscribers = blogResponse?.data?.allSubscriberCount || 0;

  const handleSubscribe = () => {
    setIsOpen(true);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (meta?.totalPage || 1)) {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate page numbers for pagination
  const generatePageNumbers = useMemo(() => {
    const totalPages = meta?.totalPage || 1;
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, meta?.totalPage]);

  /* Loading State */
  // if (isLoading) {
  //   return (
  //     <div className="fixed  inset-0 bg-white/50 z-50 flex items-center justify-center">
  //       <div className="flex min-h-screen justify-center items-center">
  //         <Loader />
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="bg-white ">
      {isLoading && (
        <div className="fixed  inset-0 bg-white/50 z-50 flex items-center justify-center">
          <div className="flex min-h-screen justify-center items-center">
            <Loader />
          </div>
        </div>
      )}
      <Banner
        title="Welcome to the Optimus Health Solutions Blog"
        description="Where we share insights on industry news, real stories and practical tips for independent pharmacies and the communities we serve"
        image="/banner/blog_banner.png"
      />

      <div className="container  mx-auto px-4 md:px-4 py-8 md:py-12">
        {/* Blog Introduction Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6">
          <div className="flex items-center gap-4">
            {/* Logo placeholder - you can replace this with your actual logo */}
            <div className="w-60 h-20 rounded-lg flex items-center justify-center border border-gray-200 p-2">
              <Image
                src={"/nav/Logo.png"}
                alt="logo"
                width={192}
                height={192}
                className="object-contain rounded-lg w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                Hello, Dear - the Optimus Health Solutions Blog
              </h1>
              <p className="text-gray-500 text-sm md:text-base">
                The Optimus Health Solutions Blog
              </p>
              <div className="flex items-center gap-2">
                <p className="text-gray-400 text-xs md:text-sm mt-1">
                  {totalSubscribers} Subscribers
                </p>
                <span className="text-gray-400 text-xs md:text-sm mt-1">•</span>
                <p className="text-gray-400 text-xs md:text-sm mt-1">
                  {meta?.total || 0} Articles
                </p>
              </div>
            </div>
          </div>
          <Button
            className="bg-peter hover:bg-peter-dark text-white px-6 py-2 rounded-lg"
            onClick={handleSubscribe}
            disabled={isSubscribed}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
            {/* {isSubscribed === true ? (
              <CheckCircle className="w-4 h-4 text-white" />
            ) : (
              <p>s</p>
            )} */}
          </Button>
        </div>

        {/* Search Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 md:mb-12">
          <Input
            type="text"
            placeholder="Search topics: PBM, Part D, delivery, adherence..."
            className="flex-1 bg-gray-50 border-gray-200 rounded-lg px-4 py-2 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Error State */}
        {isError && (
          <div className="flex justify-center items-center py-20">
            <p className="text-red-500 text-lg">
              Failed to load blogs. Please try again later.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredBlogs.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 text-lg">No blogs found.</p>
          </div>
        )}

        {/* Blog Grid - 4 columns */}
        {!isLoading && !isError && filteredBlogs.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>

            {/* Pagination */}
            {meta && meta.totalPage > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`cursor-pointer ${
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "hover:bg-peter/10"
                        }`}
                      />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {generatePageNumbers.map(
                      (page: number | "ellipsis", index: number) => (
                        <PaginationItem key={index}>
                          {page === "ellipsis" ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className={`cursor-pointer ${
                                currentPage === page
                                  ? "bg-peter text-white hover:bg-peter-dark"
                                  : "hover:bg-peter/10"
                              }`}
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      )
                    )}

                    {/* Next Button */}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`cursor-pointer ${
                          currentPage === meta.totalPage
                            ? "pointer-events-none opacity-50"
                            : "hover:bg-peter/10"
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>

                {/* Page Info */}
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    Page {meta.page} of {meta.totalPage} • Showing{" "}
                    {blogs.length} of {meta.total} articles
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <SubscribeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default BlogLayout;
