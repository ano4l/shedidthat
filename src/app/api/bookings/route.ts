import { NextRequest, NextResponse } from "next/server";
import { generateReference } from "@/lib/utils";

const TEST_MODE = process.env.NEXT_PUBLIC_TEST_MODE === "true";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer_name, email, phone, service_id, start_time, end_time } = body;

    if (!customer_name || !email || !phone || !service_id || !start_time || !end_time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (TEST_MODE) {
      const mockId = `test-${Date.now()}`;
      const reference = generateReference(mockId);
      return NextResponse.json({ id: mockId, reference, status: "REQUESTED" });
    }

    const { supabaseAdmin: db } = await import("@/lib/supabase/server");
    const { sendPaymentInstructionsEmail } = await import("@/lib/email");
    const { hair_option_id, payment_choice, amount_due } = body;
    const admin = db as any;

    const { data: booking, error } = await admin
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
    await admin.from("booking_requests").update({ reference }).eq("id", booking.id);

    const { data: service } = await admin.from("services").select("name").eq("id", service_id).single();

    sendPaymentInstructionsEmail({
      customerName: customer_name, email,
      serviceName: service?.name || "Hair Service",
      dateTime: start_time, amountDue: amount_due, reference, bookingId: booking.id,
    }).catch((err) => console.error("Email send error:", err));

    return NextResponse.json({ id: booking.id, reference, status: "REQUESTED" });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
