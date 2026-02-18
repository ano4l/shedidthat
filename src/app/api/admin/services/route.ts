import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const db = supabaseAdmin as any;

// GET all services
export async function GET() {
  const { data, error } = await db
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ services: data });
}

// POST create a service
export async function POST(req: Request) {
  const body = await req.json();
  const { name, description, duration_minutes, full_price, deposit_type, deposit_value, has_hair_options } = body;

  if (!name || !duration_minutes || !full_price) {
    return NextResponse.json({ error: "Name, duration, and price are required" }, { status: 400 });
  }

  const { data, error } = await db.from("services").insert({
    name,
    description: description || "",
    duration_minutes: Number(duration_minutes),
    full_price: Number(full_price),
    deposit_type: deposit_type || "PERCENTAGE",
    deposit_value: Number(deposit_value) || 50,
    has_hair_options: has_hair_options || false,
    image_url: null,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ service: data });
}

// PUT update a service
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) return NextResponse.json({ error: "Service ID required" }, { status: 400 });

  // Convert numeric fields
  if (updates.duration_minutes) updates.duration_minutes = Number(updates.duration_minutes);
  if (updates.full_price) updates.full_price = Number(updates.full_price);
  if (updates.deposit_value) updates.deposit_value = Number(updates.deposit_value);

  const { data, error } = await db
    .from("services")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ service: data });
}

// DELETE a service
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Service ID required" }, { status: 400 });

  // Delete associated hair options first
  await db.from("hair_options").delete().eq("service_id", id);

  const { error } = await db.from("services").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
