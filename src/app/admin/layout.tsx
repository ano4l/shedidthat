"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-brand-purple" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="bg-white border border-brand-cream-dark p-8 sm:p-10 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple/10">
              <Lock className="h-6 w-6 text-brand-purple" />
            </div>
            <h1 className="font-display text-2xl font-semibold text-brand-charcoal">
              Admin Login
            </h1>
            <p className="text-sm text-gray-500 mt-2">Sign in to manage bookings</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={loginLoading} className="btn-primary w-full">
              {loginLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-brand-purple px-4 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <h2 className="text-sm font-medium text-white/80">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="text-xs text-white/50 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
