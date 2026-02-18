import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const db = supabaseAdmin as any;

// GET hair options (optionally filtered by service_id)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const serviceId = searchParams.get("service_id");

  let query = db.from("hair_options").select("*");
  if (serviceId) query = query.eq("service_id", serviceId);

  const { data, error } = await query.order("name");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ hairOptions: data });
}

// POST create a hair option
export async function POST(req: Request) {
  const body = await req.json();
  const { service_id, name, price_delta } = body;

  if (!service_id || !name) {
    return NextResponse.json({ error: "Service ID and name are required" }, { status: 400 });
  }

  const { data, error } = await db.from("hair_options").insert({
    service_id,
    name,
    price_delta: Number(price_delta) || 0,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ hairOption: data });
}

// PUT update a hair option
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) return NextResponse.json({ error: "Hair option ID required" }, { status: 400 });
  if (updates.price_delta !== undefined) updates.price_delta = Number(updates.price_delta);

  const { data, error } = await db
    .from("hair_options")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ hairOption: data });
}

// DELETE a hair option
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Hair option ID required" }, { status: 400 });

  const { error } = await db.from("hair_options").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
