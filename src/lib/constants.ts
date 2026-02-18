export const BUSINESS_HOURS = {
  start: 8, // 8 AM
  end: 18, // 6 PM
  slotInterval: 30, // 30-minute intervals
  daysOff: [0] as number[], // Sunday = 0
};

export const BANKING_DETAILS = {
  bankName: "FNB (First National Bank)",
  accountName: "SheDidThat Hair Studio",
  accountNumber: "62XXXXXXXX",
  branchCode: "250655",
  accountType: "Cheque Account",
};

export const MAX_POP_SIZE_MB = 10;
export const ACCEPTED_POP_TYPES = ["application/pdf", "image/jpeg", "image/png"];

export const BOOKING_STATUSES = {
  REQUESTED: { label: "Requested", color: "bg-yellow-100 text-yellow-800" },
  POP_UPLOADED: { label: "POP Uploaded", color: "bg-blue-100 text-blue-800" },
  CONFIRMED: { label: "Confirmed", color: "bg-green-100 text-green-800" },
  REJECTED: { label: "Rejected", color: "bg-red-100 text-red-800" },
  CANCELLED: { label: "Cancelled", color: "bg-gray-100 text-gray-800" },
} as const;
