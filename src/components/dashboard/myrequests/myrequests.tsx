"use client";
import React, { useMemo, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Search } from "lucide-react";
import {
  useGetMyRequestsQuery,
  MyRequestItem,
} from "@/store/Apis/dashboard/myrequestApi/myrequestApi";
import Loader from "@/components/common/loader/Loader";

const ITEMS_PER_PAGE = 10;

export default function MyRequests() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const {
    data: requestsResponse,
    isLoading,
    isError,
  } = useGetMyRequestsQuery({ page: currentPage, limit: ITEMS_PER_PAGE });

  const requests = useMemo<MyRequestItem[]>(
    () => requestsResponse?.data || [],
    [requestsResponse?.data]
  );
  const meta = requestsResponse?.meta;

  // Filter requests based on search and status
  const filteredRequests = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const status = statusFilter.toLowerCase();

    return requests.filter((request) => {
      const matchesSearch =
        request._id.toLowerCase().includes(q) ||
        (request.legalName || "").toLowerCase().includes(q) ||
        (request.pharmacyName || "").toLowerCase().includes(q) ||
        (request.pickupAddress || "").toLowerCase().includes(q) ||
        (request.deliveryAddress || "").toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All" ||
        (request.status || "").toLowerCase() === status;

      return matchesSearch && matchesStatus;
    });
  }, [requests, searchQuery, statusFilter]);

  // Pagination info from API (meta). If not available, fallback to filtered length.
  const totalPages =
    meta?.totalPage || Math.ceil(filteredRequests.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRequests =
    filteredRequests.slice(startIndex, endIndex) || filteredRequests;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
      case "in-progress":
        return "bg-cyan-100 text-cyan-700 hover:bg-cyan-100";
      case "completed":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

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
      }
    },
    [totalPages]
  );

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  }, []);

  return (
    <div className="w-full ">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Request List</h1>

      {isLoading && (
        <div className="w-full flex justify-center items-center py-10">
          <Loader />
        </div>
      )}

      {isError && (
        <div className="w-full flex justify-center items-center py-10">
          <p className="text-red-500 text-lg">Failed to load requests.</p>
        </div>
      )}

      <div className="flex gap-4 mb-6 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="size-5 absolute left-3 top-1/2 transform -translate-y-2 text-gray-400 " />
          <Input
            placeholder="Type Something"
            value={searchQuery}
            onChange={(e) => {
              handleSearch(e.target.value);
              // setCurrentPage(1);
            }}
            className="pl-10 h-12"
          />
        </div>

        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full sm:w-48 ">
            <SelectValue
              placeholder="Status: All"
              className="placeholder:text-gray-400 placeholder:text-[16px] h-12"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Status: All</SelectItem>
            <SelectItem value="In-Progress">In-Progress</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="font-semibold text-gray-600">
                Request ID
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Pharmacy Name
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Delivery Address
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Date & Time
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Amount
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRequests.length === 0 ? (
              <TableRow>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <TableCell key={idx} className="text-gray-700">
                    N/A
                  </TableCell>
                ))}
              </TableRow>
            ) : (
              currentRequests.map((request) => {
                const requestId = request._id || "N/A";
                const pharmacyName = request.pickupAddress || "N/A";
                // const pickup = request.pickupAddress || "N/A";
                const delivery = request.deliveryAddress || "N/A";
                const hasDateOrTime =
                  request.deliveryDate || request.deliveryTime;
                const deliveryDateTime = hasDateOrTime
                  ? `${request.deliveryDate || "N/A"} ${
                      request.deliveryTime || ""
                    }`.trim()
                  : "N/A";
                const amountText =
                  typeof request.amount === "number"
                    ? `$${request.amount}`
                    : "N/A";
                const status = request.status || "N/A";

                return (
                  <TableRow key={request._id}>
                    <TableCell className="font-medium text-gray-900">
                      {requestId}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {pharmacyName}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      <div className="space-y-1">
                        {/* <p>Pickup: {pickup}</p> */}
                        <p>{delivery}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {deliveryDateTime}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {amountText}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(status)}>{status}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className=" flex items-center justify-between mt-6 ">
        <p className="text-sm text-gray-600 w-full">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredRequests.length)} of{" "}
          {filteredRequests.length} entries
        </p>

        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
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
          </Pagination>{" "}
        </div>
      </div>
    </div>
  );
}
