import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const db = supabaseAdmin as any;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let query = db
    .from("booking_requests")
    .select(`*, services:service_id (name, duration_minutes), hair_options:hair_option_id (name), payment_proofs (*)`)
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Admin bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }

  return NextResponse.json({ bookings: data });
}
