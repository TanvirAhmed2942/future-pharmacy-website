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
import { Search, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useGetPaymentQuery,
  PaymentItem,
} from "@/store/Apis/paymentApi/paymentApi";

const ITEMS_PER_PAGE = 10;

export default function Payments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRangeFilter, setDateRangeFilter] = useState("All");
  const router = useRouter();

  const { data: paymentResponse } = useGetPaymentQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const transactions = useMemo<PaymentItem[]>(
    () => paymentResponse?.data?.result || [],
    [paymentResponse?.data?.result]
  );
  const meta = paymentResponse?.data?.meta;

  const filteredTransactions = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const status = statusFilter.toLowerCase();

    return transactions.filter((transaction) => {
      const matchesSearch =
        (transaction.transactionId || "").toLowerCase().includes(q) ||
        (transaction.email || "").toLowerCase().includes(q) ||
        (transaction.method || "").toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All" ||
        (transaction.status || "").toLowerCase() === status;

      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchQuery, statusFilter]);

  const totalPages =
    meta?.totalPage ||
    Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE) ||
    1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions =
    filteredTransactions.slice(startIndex, endIndex) || filteredTransactions;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "failed":
        return "bg-red-100 text-red-700 hover:bg-red-100";
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

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Transactions list
      </h1>

      <div className="flex gap-4 mb-6 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="size-5 absolute left-3 top-1/2 transform -translate-y-2 text-gray-400" />
          <Input
            placeholder="Type Something"
            value={searchQuery}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            className="pl-10 h-12"
          />
        </div>

        <Select
          value={dateRangeFilter}
          onValueChange={(value) => {
            setDateRangeFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-48 ">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Date Range</SelectItem>
            <SelectItem value="Today">Today</SelectItem>
            <SelectItem value="This Week">This Week</SelectItem>
            <SelectItem value="This Month">This Month</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-48 ">
            <SelectValue placeholder="Status: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Status: All</SelectItem>
            <SelectItem value="Successful">Successful</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="font-semibold text-gray-600">
                Transaction ID
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Date
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Amount
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTransactions.length === 0 ? (
              <TableRow>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <TableCell key={idx} className="text-gray-700">
                    N/A
                  </TableCell>
                ))}
              </TableRow>
            ) : (
              currentTransactions.map((transaction) => {
                const id = transaction._id || "N/A";
                const transactionId = transaction.transactionId || "N/A";
                const amountText =
                  typeof transaction.amount === "number"
                    ? `$${transaction.amount.toFixed(2)}`
                    : "N/A";
                const status = transaction.status || "N/A";
                const dateText = transaction.transactionDate
                  ? new Date(transaction.transactionDate).toLocaleString()
                  : "N/A";

                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium text-gray-900">
                      {transactionId}
                    </TableCell>
                    <TableCell className="text-gray-700">{dateText}</TableCell>
                    <TableCell className="text-gray-700">
                      {amountText}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(status)}>{status}</Badge>
                    </TableCell>
                    <TableCell>
                      <button
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        onClick={() =>
                          router.push(`/dashboard/payments/details/${id}`)
                        }
                      >
                        <Eye className="size-5" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600 w-full">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredTransactions.length)} of{" "}
          {filteredTransactions.length} entries
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
          </Pagination>
        </div>
      </div>
    </div>
  );
}
