"use client";

export function TestModeBanner() {
  if (process.env.NEXT_PUBLIC_TEST_MODE !== "true") return null;

  return (
    <div className="bg-brand-gold text-white text-center py-2 px-4 text-xs font-medium tracking-wide z-50 sticky top-0">
      🧪 TEST MODE — No real data is saved. Admin login: <strong>admin@shedidthat.co.za</strong> / any password
    </div>
  );
}
