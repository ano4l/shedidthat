import { NextRequest, NextResponse } from "next/server";
import { generateReference } from "@/lib/utils";
import { supabaseAdmin } from "@/lib/supabase/server";
import { sendPaymentInstructionsEmail } from "@/lib/email";

const db = supabaseAdmin as any;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customer_name, email, phone, service_id, hair_option_id,
      start_time, end_time, payment_choice, amount_due,
    } = body;

    if (!customer_name || !email || !phone || !service_id || !start_time || !end_time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data: booking, error } = await db
      .from("booking_requests")
      .insert({
        customer_name, email, phone, service_id,
        hair_option_id: hair_option_id || null,
        start_time, end_time, payment_choice, amount_due,
        status: "REQUESTED",
      })
      .select()
      .single();

    if (error) {
      console.error("Booking insert error:", error);
      return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }

    const reference = generateReference(booking.id);
    await db.from("booking_requests").update({ reference }).eq("id", booking.id);

    const { data: service } = await db.from("services").select("name").eq("id", service_id).single();

    sendPaymentInstructionsEmail({
      customerName: customer_name, email,
      serviceName: service?.name || "Hair Service",
      dateTime: start_time, amountDue: amount_due, reference, bookingId: booking.id,
    }).catch((err: any) => console.error("Email send error:", err));

    return NextResponse.json({ id: booking.id, reference, status: "REQUESTED" });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
