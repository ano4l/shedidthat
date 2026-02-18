"use client";

import { useState, useEffect } from "react";
import { formatDateTime, formatCurrency, cn } from "@/lib/utils";
import { BOOKING_STATUSES } from "@/lib/constants";
import {
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
  FileText,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import type { BookingStatus } from "@/lib/types/database";

interface AdminBooking {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  start_time: string;
  end_time: string;
  payment_choice: string;
  amount_due: number;
  status: BookingStatus;
  reference: string;
  created_at: string;
  services: { name: string; duration_minutes: number } | null;
  hair_options: { name: string } | null;
  payment_proofs: {
    id: string;
    file_url: string;
    reference_used: string;
    verification_status: string;
    review_note: string | null;
  }[];
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    const url =
      filter === "all"
        ? "/api/admin/bookings"
        : `/api/admin/bookings?status=${filter}`;
    const res = await fetch(url);
    const data = await res.json();
    setBookings(data.bookings || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const handleAction = async (bookingId: string, action: "APPROVE" | "REJECT") => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: bookingId,
          action,
          note: reviewNote,
        }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setSelectedBooking(null);
        setReviewNote("");
        fetchBookings();
      }
    } catch {
      alert("Action failed");
    }
    setActionLoading(false);
  };

  const statusFilters = ["all", "REQUESTED", "POP_UPLOADED", "CONFIRMED", "REJECTED", "CANCELLED"];

  return (
    <section className="py-8 bg-white min-h-[80vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl font-semibold text-brand-charcoal">
            Bookings
          </h1>
          <button
            onClick={fetchBookings}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-purple transition-colors"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {statusFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 text-xs font-medium whitespace-nowrap transition-all duration-200",
                filter === f
                  ? "bg-brand-purple text-white"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-brand-purple/40"
              )}
            >
              {f === "all" ? "All" : BOOKING_STATUSES[f as BookingStatus]?.label || f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-brand-purple" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white border border-gray-200 text-center py-16">
            <p className="text-gray-400">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="bg-white border border-gray-200 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-lg font-semibold text-brand-charcoal truncate">
                        {b.customer_name}
                      </h3>
                      <span
                        className={cn(
                          "px-2.5 py-0.5 text-xs font-medium",
                          BOOKING_STATUSES[b.status]?.color
                        )}
                      >
                        {BOOKING_STATUSES[b.status]?.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 text-sm text-gray-500">
                      <span>{b.services?.name || "—"}</span>
                      <span>{formatDateTime(b.start_time)}</span>
                      <span>
                        {formatCurrency(b.amount_due)} ({b.payment_choice})
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Ref: {b.reference} | {b.email} | {b.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {b.payment_proofs?.length > 0 && (
                      <a
                        href={b.payment_proofs[0].file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-brand-purple hover:text-brand-purple-dark transition-colors"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        View POP
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {(b.status === "POP_UPLOADED" || b.status === "REQUESTED") && (
                      <button
                        onClick={() => {
                          setSelectedBooking(b);
                          setReviewNote("");
                        }}
                        className="btn-primary text-xs py-2 px-4"
                      >
                        <Eye className="h-3.5 w-3.5" /> Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white border border-gray-200 p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <h2 className="font-display text-xl font-semibold text-brand-charcoal mb-6">
                Review Booking
              </h2>
              <div className="space-y-3 text-sm mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-400">Customer</span>
                  <span className="font-medium text-brand-charcoal">{selectedBooking.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Service</span>
                  <span className="font-medium text-brand-charcoal">
                    {selectedBooking.services?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date &amp; Time</span>
                  <span className="font-medium text-brand-charcoal">
                    {formatDateTime(selectedBooking.start_time)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount</span>
                  <span className="font-medium text-brand-gold">
                    {formatCurrency(selectedBooking.amount_due)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reference</span>
                  <span className="font-mono font-medium text-brand-charcoal">
                    {selectedBooking.reference}
                  </span>
                </div>
                {selectedBooking.payment_proofs?.length > 0 && (
                  <div>
                    <span className="text-gray-400">Proof of Payment</span>
                    <a
                      href={selectedBooking.payment_proofs[0].file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-1 text-brand-purple hover:text-brand-purple-dark transition-colors"
                    >
                      View uploaded file
                      <ExternalLink className="inline h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="label">Admin Note (optional)</label>
                <textarea
                  className="input min-h-[80px]"
                  placeholder="Add a note..."
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleAction(selectedBooking.id, "APPROVE")
                  }
                  disabled={actionLoading}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-green-700 disabled:opacity-50"
                >
                  {actionLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" /> Approve
                    </>
                  )}
                </button>
                <button
                  onClick={() =>
                    handleAction(selectedBooking.id, "REJECT")
                  }
                  disabled={actionLoading}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-red-700 disabled:opacity-50"
                >
                  {actionLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <XCircle className="h-4 w-4" /> Reject
                    </>
                  )}
                </button>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full mt-4 text-sm text-gray-400 hover:text-brand-charcoal py-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
