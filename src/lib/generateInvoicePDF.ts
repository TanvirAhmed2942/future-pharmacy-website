import jsPDF from "jspdf";
import type { PaymentItem } from "@/store/Apis/paymentApi/paymentApi";

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

export const generateInvoicePDF = async (
  payment: PaymentItem
): Promise<void> => {
  const doc = new jsPDF();
  const order = payment.prescriptionOrderId;

  // Colors
  const primaryColor = [142, 69, 133]; // Purple color (peter)
  const textColor = [51, 51, 51];
  const lightGray = [245, 245, 245];

  let yPos = 20;

  // Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, "F");

  // Company Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Optimus Health Solutions", 20, 25);

  // Invoice Title
  doc.setFontSize(16);
  doc.text("INVOICE", 20, 35);

  // Reset text color
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  yPos = 55;

  // Invoice Details Section
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Invoice Details", 20, yPos);

  yPos += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const invoiceNumber = payment.transactionId || payment._id || "N/A";
  const invoiceDate = formatDateDisplay(
    payment.transactionDate || payment.createdAt
  );

  doc.text(`Invoice Number: ${invoiceNumber}`, 20, yPos);
  yPos += 6;
  doc.text(`Invoice Date: ${invoiceDate}`, 20, yPos);
  yPos += 6;
  doc.text(
    `Payment Method: ${payment.method?.toUpperCase() || "N/A"}`,
    20,
    yPos
  );
  yPos += 6;
  doc.text(`Status: ${payment.status?.toUpperCase() || "N/A"}`, 20, yPos);

  // Billing Information
  yPos += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Billing Information", 20, yPos);

  yPos += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const billingName = order?.legalName || payment.userId?.email || "N/A";
  const billingEmail = order?.email || payment.userId?.email || "N/A";
  const billingPhone = order?.phone || "N/A";
  const billingAddress = order?.deliveryAddress || "N/A";

  doc.text(`Name: ${billingName}`, 20, yPos);
  yPos += 6;
  doc.text(`Email: ${billingEmail}`, 20, yPos);
  yPos += 6;
  doc.text(`Phone: ${billingPhone}`, 20, yPos);
  yPos += 6;
  doc.text(`Address: ${billingAddress}`, 20, yPos);

  // Order Information
  yPos += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Order Information", 20, yPos);

  yPos += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const orderId = order?._id ? order._id.slice(-8).toUpperCase() : "N/A";
  const pickupAddress = order?.pickupAddress || "N/A";
  const deliveryDate = order?.deliveryDate
    ? formatDateDisplay(order.deliveryDate)
    : "N/A";
  const deliveryTime = order?.deliveryTime
    ? formatTimeDisplay(order.deliveryTime)
    : "N/A";

  doc.text(`Order ID: ${orderId}`, 20, yPos);
  yPos += 6;
  doc.text(`Pickup Address: ${pickupAddress}`, 20, yPos);
  yPos += 6;
  doc.text(`Delivery Address: ${billingAddress}`, 20, yPos);
  yPos += 6;
  doc.text(`Delivery Date: ${deliveryDate}`, 20, yPos);
  yPos += 6;
  doc.text(`Delivery Time: ${deliveryTime}`, 20, yPos);

  if (order?.deliveryInstruction) {
    yPos += 6;
    doc.text(`Delivery Instructions: ${order.deliveryInstruction}`, 20, yPos);
  }

  // Payment Breakdown Table
  yPos += 12;

  // Table Header
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(20, yPos - 6, 170, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Description", 25, yPos);
  doc.text("Amount", 175, yPos, { align: "right" });

  yPos += 8;

  // Table Rows
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // Delivery Charge
  doc.text("Delivery Charge", 25, yPos);
  doc.text(formatAmount(order?.deliveryCharge), 175, yPos, { align: "right" });
  yPos += 6;

  // Service Fee
  doc.text("Service Fee", 25, yPos);
  doc.text(formatAmount(order?.serviceCharge), 175, yPos, { align: "right" });
  yPos += 6;

  // Separator line
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPos, 190, yPos);
  yPos += 4;

  // Total
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Total", 25, yPos);
  doc.text(formatAmount(payment.amount), 175, yPos, { align: "right" });

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  yPos = pageHeight - 30;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text("Thank you for using Optimus Health Solutions!", 105, yPos, {
    align: "center",
  });
  yPos += 5;
  doc.text(
    "For support, please contact us at support@optimushealth.com",
    105,
    yPos,
    { align: "center" }
  );

  // Generate filename
  const filename = `invoice-${invoiceNumber}-${new Date().getTime()}.pdf`;

  // Save the PDF
  doc.save(filename);
};
