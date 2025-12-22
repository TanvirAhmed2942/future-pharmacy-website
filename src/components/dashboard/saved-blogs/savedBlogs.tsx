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
import {
  useGetSavedBlogsQuery,
  useDeleteSavedBlogMutation,
  BlogItem,
} from "@/store/Apis/blogApi/blogApi";
import useShowToast from "@/hooks/useShowToast";

const ITEMS_PER_PAGE = 10;

function SavedBlogs() {
  const router = useRouter();
  const { showSuccess, showError } = useShowToast();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: savedBlogsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetSavedBlogsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const [deleteSavedBlog, { isLoading: isDeleting }] =
    useDeleteSavedBlogMutation();

  const savedBlogs = useMemo<BlogItem[]>(
    () => savedBlogsResponse?.data || [],
    [savedBlogsResponse?.data]
  );
  const meta = savedBlogsResponse?.meta;

  // Format date for display, preferring updatedAt as the authoritative value
  const formatDate = (updatedAt?: string, dateString?: string) => {
    const format = (value?: string | null) => {
      if (!value) return null;
      const parsed = new Date(value);
      if (isNaN(parsed.getTime())) return null;
      return parsed.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    };

    // 1) Prefer updatedAt (ISO from backend)
    const fromUpdatedAt = format(updatedAt);
    if (fromUpdatedAt) return fromUpdatedAt;

    // 2) Fallback to dateString after normalizing double dashes
    const normalizedDate = dateString?.replace(/--/g, "-");
    const fromDate = format(normalizedDate);
    if (fromDate) return fromDate;

    // 3) Last resort: show raw updatedAt/dateString
    return updatedAt || dateString || "";
  };

  // Calculate pagination
  const totalPages = meta?.totalPage || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const totalItems = meta?.total ?? savedBlogs.length;
  const endDisplay = Math.min(startIndex + savedBlogs.length, totalItems);

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
    async (blogId: string) => {
      try {
        await deleteSavedBlog(blogId).unwrap();
        showSuccess({ message: "Blog removed from saved list" });

        // Adjust page if current page becomes empty
        if (savedBlogs.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          refetch();
        }
      } catch (error: unknown) {
        const errorMessage =
          (error as { data?: { message?: string } })?.data?.message ||
          "Failed to remove blog from saved list";
        showError({ message: errorMessage });
      }
    },
    [
      deleteSavedBlog,
      savedBlogs.length,
      currentPage,
      refetch,
      showSuccess,
      showError,
    ]
  );

  const handleGoTo = useCallback(
    (blogId: string) => {
      router.push(`/blog/blog-details/${blogId}`);
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

      {isError && (
        <div className="w-full flex justify-center items-center py-10">
          <p className="text-red-500 text-lg">Failed to load saved blogs.</p>
        </div>
      )}

      {!isLoading && !isError && (
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
                {savedBlogs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-gray-500 py-8"
                    >
                      No saved blogs found
                    </TableCell>
                  </TableRow>
                ) : (
                  savedBlogs.map((blog, index) => (
                    <TableRow key={blog._id}>
                      <TableCell className="font-medium text-gray-900">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {blog.title}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        <a
                          href={`/blog/blog-details/${blog._id}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            handleGoTo(blog._id);
                          }}
                        >
                          /blog/blog-details/{blog._id}
                        </a>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {formatDate(blog.updatedAt, blog.date)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGoTo(blog._id)}
                            className="flex items-center gap-1"
                            disabled={isDeleting}
                          >
                            <ExternalLink className="size-4" />
                            Go To
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(blog._id)}
                            className="flex items-center gap-1"
                            disabled={isDeleting}
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

          {savedBlogs.length > 0 && meta && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600 w-full">
                Showing {totalItems === 0 ? 0 : startIndex + 1} to {endDisplay}{" "}
                of {totalItems} entries
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
