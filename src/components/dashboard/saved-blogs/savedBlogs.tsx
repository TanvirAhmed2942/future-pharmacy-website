"use client";
import React, { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink } from "lucide-react";
import Loader from "@/components/common/loader/Loader";

const ITEMS_PER_PAGE = 10;

// Interface for saved blog item
interface SavedBlogItem {
  _id: string;
  blogId: string;
  blogTitle: string;
  link: string;
  date: string;
  createdAt?: string;
}

// Mock data - Replace this with actual API call
const mockSavedBlogs: SavedBlogItem[] = [
  {
    _id: "1",
    blogId: "blog1",
    blogTitle: "Understanding Pharmacy Services",
    link: "/blog/blog-details/blog1",
    date: "2024-01-15",
  },
  {
    _id: "2",
    blogId: "blog2",
    blogTitle: "Health Tips for Winter",
    link: "/blog/blog-details/blog2",
    date: "2024-01-20",
  },
  {
    _id: "3",
    blogId: "blog3",
    blogTitle: "Medication Management Guide",
    link: "/blog/blog-details/blog3",
    date: "2024-02-01",
  },
];

function SavedBlogs() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [savedBlogs, setSavedBlogs] = useState<SavedBlogItem[]>(mockSavedBlogs);
  const isLoading = false; // TODO: Replace with actual loading state from API

  // TODO: Replace with actual API call
  // const { data: savedBlogsResponse, isLoading, isError } = useGetSavedBlogsQuery({
  //   page: currentPage,
  //   limit: ITEMS_PER_PAGE,
  // });

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

  // Calculate pagination
  const totalPages = Math.ceil(savedBlogs.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogs = savedBlogs.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const renderPageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, 5);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2
      );
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [totalPages]
  );

  const handleDelete = useCallback(
    (blogId: string) => {
      // TODO: Replace with actual API call
      // await deleteSavedBlog(blogId);
      setSavedBlogs((prev) => prev.filter((blog) => blog._id !== blogId));

      // Adjust page if current page becomes empty
      if (currentBlogs.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    },
    [currentBlogs.length, currentPage]
  );

  const handleGoTo = useCallback(
    (link: string) => {
      router.push(link);
    },
    [router]
  );

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Your Saved Blogs
      </h1>

      {isLoading && (
        <div className="w-full flex justify-center items-center py-10">
          <Loader />
        </div>
      )}

      {!isLoading && (
        <>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100">
                  <TableHead className="font-semibold text-gray-600">
                    SL
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600">
                    Blog Title
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600">
                    Link
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600">
                    Date
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentBlogs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-gray-500 py-8"
                    >
                      No saved blogs found
                    </TableCell>
                  </TableRow>
                ) : (
                  currentBlogs.map((blog, index) => (
                    <TableRow key={blog._id}>
                      <TableCell className="font-medium text-gray-900">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {blog.blogTitle}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        <a
                          href={blog.link}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            handleGoTo(blog.link);
                          }}
                        >
                          {blog.link}
                        </a>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {formatDate(blog.date)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGoTo(blog.link)}
                            className="flex items-center gap-1"
                          >
                            <ExternalLink className="size-4" />
                            Go To
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(blog._id)}
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="size-4" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {savedBlogs.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600 w-full">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, savedBlogs.length)} of {savedBlogs.length}{" "}
                entries
              </p>

              <div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1)
                            handlePageChange(currentPage - 1);
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {renderPageNumbers.map((pageNum: number, index: number) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNum);
                          }}
                          isActive={currentPage === pageNum}
                          className={
                            currentPage === pageNum
                              ? "bg-peter hover:bg-peter/80 text-white"
                              : "cursor-pointer"
                          }
                        >
                          {pageNum.toString().padStart(2, "0")}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(totalPages);
                            }}
                            className="cursor-pointer"
                          >
                            {totalPages.toString().padStart(2, "0")}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            handlePageChange(currentPage + 1);
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SavedBlogs;
