"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetPaymentByIdQuery } from "@/store/Apis/paymentApi/paymentApi";
import { generateInvoicePDF } from "@/lib/generateInvoicePDF";
import useShowToast from "@/hooks/useShowToast";
import { FaFilePdf } from "react-icons/fa6";

// Format date for display
const formatDateDisplay = (dateStr: string | null | undefined): string => {
  if (!dateStr) return "N/A";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "N/A";
  }
};

// Format time for display (convert 24-hour to 12-hour)
const formatTimeDisplay = (timeStr: string | null | undefined): string => {
  if (!timeStr) return "N/A";
  try {
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  } catch {
    return "N/A";
  }
};

// Format amount as currency
const formatAmount = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) return "$0.00";
  return `$${amount.toFixed(2)}`;
};

// Get status badge color
const getStatusBadge = (status: string | undefined) => {
  if (!status)
    return { className: "bg-gray-100 text-gray-700", label: "Unknown" };

  const statusLower = status.toLowerCase();
  if (statusLower === "paid" || statusLower === "completed") {
    return {
      className: "bg-green-100 text-green-700 hover:bg-green-100",
      label: "Successful",
    };
  }
  if (statusLower === "pending") {
    return {
      className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
      label: "Pending",
    };
  }
  if (statusLower === "failed" || statusLower === "cancelled") {
    return {
      className: "bg-red-100 text-red-700 hover:bg-red-100",
      label: "Failed",
    };
  }
  return {
    className: "bg-gray-100 text-gray-700 hover:bg-gray-100",
    label: status,
  };
};

export default function PaymentsDetails() {
  const params = useParams();
  const id = params?.id as string;
  const [isDownloading, setIsDownloading] = useState(false);
  const { showSuccess, showError } = useShowToast();
  const {
    data: paymentData,
    isLoading,
    isError,
  } = useGetPaymentByIdQuery(id || "");

  const payment = paymentData?.data;
  const order = payment?.prescriptionOrderId;

  const handleDownloadInvoice = () => {
    if (!payment) {
      showError({ message: "Payment data is not available" });
      return;
    }

    try {
      setIsDownloading(true);
      generateInvoicePDF(payment);
      showSuccess({ message: "Invoice downloaded successfully" });
    } catch (error) {
      console.error("Error generating PDF:", error);
      showError({ message: "Failed to generate invoice PDF" });
    } finally {
      setIsDownloading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <p className="text-gray-500">Loading payment details...</p>
      </div>
    );
  }

  if (isError || !payment) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <p className="text-red-500">Failed to load payment details</p>
      </div>
    );
  }

  const statusBadge = getStatusBadge(payment.status);
  const transactionDate = payment.transactionDate || payment.createdAt;
  const deliveryDate = order?.deliveryDate;
  const deliveryTime = order?.deliveryTime;

  return (
    <div className="w-full space-y-7">
      {/* Grid Layout - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 w-full">
        {/* Left Column - Transaction Summary */}
        <Card className="border col-span-1 lg:col-span-6 border-gray-200">
          <CardContent className="px-6 ">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Transaction Summary
            </h2>

            <div className="space-y-6">
              {/* Amount and Payment Method Row */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Amount</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatAmount(payment.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Payment method</p>
                  <p className="text-base text-gray-900 capitalize">
                    {payment.method || "N/A"}
                  </p>
                </div>
              </div>

              {/* Date and Status Row */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Date</p>
                  <p className="text-base text-gray-900">
                    {formatDateDisplay(transactionDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Status</p>
                  <Badge className={statusBadge.className}>
                    {statusBadge.label}
                  </Badge>
                </div>
              </div>

              {/* Reference Number */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Reference Number</p>
                <p className="text-base text-gray-900">
                  {payment.transactionId || payment._id || "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Download / Actions */}
        <Card className="border col-span-1 lg:col-span-2 w-full border-gray-200">
          <CardContent className="px-6 w-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Download / Actions
            </h2>

            <div className="space-y-3 flex flex-col items-center justify-center gap-4 w-full">
              <Button
                variant="outline"
                onClick={handleDownloadInvoice}
                disabled={isDownloading || !payment}
                className="w-full justify-center h-11 bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? "Generating PDF..." : "Download Invoice (PDF)"}
              </Button>
              <div>
                <FaFilePdf size={80} className=" text-red-500" />
              </div>
              {/* <Button
                variant="outline"
                className="w-full justify-center h-11 bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-900"
              >
                Reorder Prescription
              </Button>
              <Button className="w-full justify-center h-11 bg-peter hover:bg-peter/90 text-white">
                Contact Support
              </Button> */}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column Bottom - Prescription / Request linked */}
        <Card className="border col-span-1 lg:col-span-3 border-gray-200">
          <CardContent className="px-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Prescription / Request linked
            </h2>

            <div className="space-y-5">
              {/* Prescription ID and Pharmacy */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Prescription ID</p>
                  <p className="text-base text-gray-900">
                    {order?._id ? order._id.slice(-8).toUpperCase() : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Pickup Address</p>
                  <p className="text-base text-gray-900">
                    {order?.pickupAddress || "N/A"}
                  </p>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Delivery Address</p>
                <p className="text-base text-gray-900">
                  {order?.deliveryAddress || "N/A"}
                </p>
              </div>

              {/* Delivery On */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Delivery On</p>
                <p className="text-base text-gray-900">
                  {deliveryDate && deliveryTime
                    ? `${formatDateDisplay(
                        deliveryDate
                      )} at ${formatTimeDisplay(deliveryTime)}`
                    : deliveryDate
                    ? formatDateDisplay(deliveryDate)
                    : "N/A"}
                </p>
              </div>

              {/* Delivery Instructions */}
              {order?.deliveryInstruction && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Delivery Instructions
                  </p>
                  <p className="text-base text-gray-900">
                    {order.deliveryInstruction}
                  </p>
                </div>
              )}

              {/* Billing Information */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Billing Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Name: </span>
                    <span className="text-gray-900">
                      {order?.legalName || payment.userId?.email || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Email: </span>
                    <span className="text-gray-900">
                      {order?.email || payment.userId?.email || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone: </span>
                    <span className="text-gray-900">
                      {order?.phone || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Billing Address: </span>
                    <span className="text-gray-900">
                      {order?.deliveryAddress || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column Bottom - Payment Breakdown */}
        <Card className="border col-span-1 lg:col-span-2 w-full border-gray-200">
          <CardContent className="px-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Payment Breakdown
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="text-gray-900 font-medium">
                  {formatAmount(order?.deliveryCharge)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Service Fee</span>
                <span className="text-gray-900 font-medium">
                  {formatAmount(order?.serviceCharge)}
                </span>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">
                  {formatAmount(payment.amount)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
