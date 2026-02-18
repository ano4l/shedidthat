import { NextRequest, NextResponse } from "next/server";
import { generateTimeSlots } from "@/lib/utils";
import { parseISO } from "date-fns";

const TEST_MODE = process.env.NEXT_PUBLIC_TEST_MODE === "true";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date");
  const duration = parseInt(searchParams.get("duration") || "60", 10);

  if (!dateStr) {
    return NextResponse.json({ error: "date is required" }, { status: 400 });
  }

  const date = parseISO(dateStr);

  if (TEST_MODE) {
    const slots = generateTimeSlots(date, duration, [], []);
    return NextResponse.json({
      slots: slots.map((s) => ({
        start: s.start.toISOString(),
        end: s.end.toISOString(),
        label: s.label,
      })),
    });
  }

  const { supabaseAdmin } = await import("@/lib/supabase/server");
  const { startOfDay, endOfDay } = await import("date-fns");
  const dayStart = startOfDay(date).toISOString();
  const dayEnd = endOfDay(date).toISOString();

  const { data: confirmed } = await supabaseAdmin
    .from("confirmed_bookings")
    .select("start_time, end_time")
    .gte("start_time", dayStart)
    .lte("start_time", dayEnd);

  const { data: pending } = await supabaseAdmin
    .from("booking_requests")
    .select("start_time, end_time")
    .in("status", ["REQUESTED", "POP_UPLOADED"])
    .gte("start_time", dayStart)
    .lte("start_time", dayEnd);

  const slots = generateTimeSlots(date, duration, confirmed || [], pending || []);

  return NextResponse.json({
    slots: slots.map((s) => ({
      start: s.start.toISOString(),
      end: s.end.toISOString(),
      label: s.label,
    })),
  });
}
