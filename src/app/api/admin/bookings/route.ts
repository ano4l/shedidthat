import { NextRequest, NextResponse } from "next/server";
import { MOCK_ADMIN_BOOKINGS } from "@/lib/supabase/mock";

const TEST_MODE = process.env.NEXT_PUBLIC_TEST_MODE === "true";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  if (TEST_MODE) {
    const bookings = status
      ? MOCK_ADMIN_BOOKINGS.filter((b) => b.status === status)
      : MOCK_ADMIN_BOOKINGS;
    return NextResponse.json({ bookings });
  }

  const { supabaseAdmin } = await import("@/lib/supabase/server");

  let query = supabaseAdmin
    .from("booking_requests")
    .select(`*, services:service_id (name, duration_minutes), hair_options:hair_option_id (name), payment_proofs (*)`)
    .order("created_at", { ascending: false });

  if (status) {
    query = (query as any).eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Admin bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }

  return NextResponse.json({ bookings: data });
}
