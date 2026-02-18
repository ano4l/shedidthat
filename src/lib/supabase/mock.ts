import type { Service, HairOption } from "@/lib/types/database";

// ─── Seed Data ────────────────────────────────────────────────────────────────

export const MOCK_SERVICES: Service[] = [
  {
    id: "svc-1",
    name: "Box Braids",
    description:
      "Classic protective box braids in your choice of style — knotless, bohemian, or jumbo. Neat, long-lasting, and endlessly versatile.",
    duration_minutes: 240,
    full_price: 450,
    deposit_type: "FIXED",
    deposit_value: 150,
    has_hair_options: true,
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "svc-2",
    name: "Cornrows",
    description:
      "Sleek, neat cornrows laid flat against the scalp. Choose your number of rows for a clean, polished protective style.",
    duration_minutes: 90,
    full_price: 300,
    deposit_type: "FIXED",
    deposit_value: 100,
    has_hair_options: true,
    image_url: null,
    created_at: new Date().toISOString(),
  },
];

export const MOCK_HAIR_OPTIONS: Record<string, HairOption[]> = {
  "svc-1": [
    { id: "ho-1a", service_id: "svc-1", name: "Knotless Box Braids", price_delta: 0 },
    { id: "ho-1b", service_id: "svc-1", name: "Bohemian Box Braids", price_delta: 50 },
    { id: "ho-1c", service_id: "svc-1", name: "Jumbo Box Braids", price_delta: -50 },
  ],
  "svc-2": [
    { id: "ho-2a", service_id: "svc-2", name: "6 Rows", price_delta: 0 },
    { id: "ho-2b", service_id: "svc-2", name: "8 Rows", price_delta: 20 },
    { id: "ho-2c", service_id: "svc-2", name: "10 Rows", price_delta: 40 },
    { id: "ho-2d", service_id: "svc-2", name: "12 Rows", price_delta: 60 },
  ],
};

export const MOCK_ADMIN_BOOKINGS = [
  {
    id: "bk-1",
    customer_name: "Thandi Mokoena",
    email: "thandi@example.com",
    phone: "071 234 5678",
    start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
    payment_choice: "DEPOSIT",
    amount_due: 150,
    status: "POP_UPLOADED" as const,
    reference: "SDT-TEST-001",
    created_at: new Date().toISOString(),
    services: { name: "Box Braids", duration_minutes: 240 },
    hair_options: { name: "Knotless Box Braids" },
    payment_proofs: [
      {
        id: "pp-1",
        file_url: "https://via.placeholder.com/400x600?text=Proof+of+Payment",
        reference_used: "SDT-TEST-001",
        verification_status: "PENDING",
        review_note: null,
      },
    ],
  },
  {
    id: "bk-2",
    customer_name: "Naledi Khumalo",
    email: "naledi@example.com",
    phone: "082 345 6789",
    start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(),
    payment_choice: "FULL",
    amount_due: 340,
    status: "REQUESTED" as const,
    reference: "SDT-TEST-002",
    created_at: new Date().toISOString(),
    services: { name: "Cornrows", duration_minutes: 90 },
    hair_options: { name: "10 Rows" },
    payment_proofs: [],
  },
  {
    id: "bk-3",
    customer_name: "Amara Dlamini",
    email: "amara@example.com",
    phone: "063 456 7890",
    start_time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
    payment_choice: "DEPOSIT",
    amount_due: 150,
    status: "CONFIRMED" as const,
    reference: "SDT-TEST-003",
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    services: { name: "Box Braids", duration_minutes: 240 },
    hair_options: { name: "Bohemian Box Braids" },
    payment_proofs: [
      {
        id: "pp-3",
        file_url: "https://via.placeholder.com/400x600?text=Proof+of+Payment",
        reference_used: "SDT-TEST-003",
        verification_status: "APPROVED",
        review_note: "Payment verified. Booking confirmed!",
      },
    ],
  },
  {
    id: "bk-4",
    customer_name: "Zinhle Nkosi",
    email: "zinhle@example.com",
    phone: "079 567 8901",
    start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(),
    payment_choice: "DEPOSIT",
    amount_due: 100,
    status: "REJECTED" as const,
    reference: "SDT-TEST-004",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    services: { name: "Cornrows", duration_minutes: 90 },
    hair_options: { name: "6 Rows" },
    payment_proofs: [
      {
        id: "pp-4",
        file_url: "https://via.placeholder.com/400x600?text=Proof+of+Payment",
        reference_used: "SDT-TEST-004",
        verification_status: "REJECTED",
        review_note: "Payment reference did not match. Please resubmit.",
      },
    ],
  },
];

// ─── Mock Supabase Client ─────────────────────────────────────────────────────

function createMockQuery(sourceData: any[]) {
  let _data = [...sourceData];

  const query: any = {
    select: (_cols?: string) => query,
    order: (_col: string, _opts?: any) => query,
    eq: (col: string, val: any) => {
      _data = _data.filter((row: any) => row[col] === val);
      return query;
    },
    in: (col: string, vals: any[]) => {
      _data = _data.filter((row: any) => vals.includes(row[col]));
      return query;
    },
    single: () => {
      return Promise.resolve({ data: _data[0] || null, error: null });
    },
    then: (resolve: any, reject?: any) => {
      return Promise.resolve({ data: _data, error: null }).then(resolve, reject);
    },
  };
  return query;
}

let _authChangeCallback: ((event: string, session: any) => void) | null = null;

const MOCK_SESSION = {
  user: { id: "mock-admin", email: "admin@shedidthat.co.za" },
  access_token: "mock-token",
};

let _currentSession: any = null;

export const mockSupabase = {
  from: (table: string) => {
    if (table === "services") return createMockQuery(MOCK_SERVICES);
    if (table === "hair_options") return createMockQuery(
      Object.values(MOCK_HAIR_OPTIONS).flat()
    );
    if (table === "booking_requests") return createMockQuery([]);
    if (table === "confirmed_bookings") return createMockQuery([]);
    return createMockQuery([]);
  },
  auth: {
    getSession: async () => ({
      data: { session: _currentSession },
    }),
    onAuthStateChange: (cb: any) => {
      _authChangeCallback = cb;
      return {
        data: { subscription: { unsubscribe: () => { _authChangeCallback = null; } } },
      };
    },
    signInWithPassword: async (_creds: { email: string; password: string }) => {
      _currentSession = MOCK_SESSION;
      if (_authChangeCallback) {
        _authChangeCallback("SIGNED_IN", MOCK_SESSION);
      }
      return { error: null };
    },
    signOut: async () => {
      _currentSession = null;
      if (_authChangeCallback) {
        _authChangeCallback("SIGNED_OUT", null);
      }
      return { error: null };
    },
  },
};
