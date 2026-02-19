"use client";

import { useState, useEffect } from "react";
import { formatCurrency, cn } from "@/lib/utils";
import {
  Plus,
  Trash2,
  Loader2,
  ChevronDown,
  ChevronRight,
  Save,
  X,
} from "lucide-react";
import type { Service, HairOption, DepositType } from "@/lib/types/database";

interface ServiceForm {
  name: string;
  description: string;
  duration_minutes: string;
  full_price: string;
  deposit_type: DepositType;
  deposit_value: string;
  has_hair_options: boolean;
}

interface HairOptionForm {
  name: string;
  price_delta: string;
}

const emptyServiceForm: ServiceForm = {
  name: "",
  description: "",
  duration_minutes: "180",
  full_price: "",
  deposit_type: "PERCENTAGE",
  deposit_value: "50",
  has_hair_options: false,
};

const emptyHairOptionForm: HairOptionForm = {
  name: "",
  price_delta: "0",
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [hairOptions, setHairOptions] = useState<Record<string, HairOption[]>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // New service form
  const [showNewService, setShowNewService] = useState(false);
  const [newService, setNewService] = useState<ServiceForm>(emptyServiceForm);

  // Expanded service (to show hair options)
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // New hair option form
  const [newHairOption, setNewHairOption] = useState<HairOptionForm>(emptyHairOptionForm);
  const [hairOptionServiceId, setHairOptionServiceId] = useState<string | null>(null);

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [svcRes, hairRes] = await Promise.all([
        fetch("/api/admin/services"),
        fetch("/api/admin/hair-options"),
      ]);
      const svcData = await svcRes.json();
      const hairData = await hairRes.json();

      setServices(svcData.services || []);

      // Group hair options by service_id
      const grouped: Record<string, HairOption[]> = {};
      for (const opt of hairData.hairOptions || []) {
        if (!grouped[opt.service_id]) grouped[opt.service_id] = [];
        grouped[opt.service_id].push(opt);
      }
      setHairOptions(grouped);
    } catch {
      // silent
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create service
  const handleCreateService = async () => {
    if (!newService.name || !newService.full_price) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setNewService(emptyServiceForm);
        setShowNewService(false);
        fetchData();
      }
    } catch {
      alert("Failed to create service");
    }
    setSaving(false);
  };

  // Delete service
  const handleDeleteService = async (id: string) => {
    if (!confirm("Delete this service and all its hair options?")) return;
    try {
      await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
      fetchData();
    } catch {
      alert("Failed to delete service");
    }
  };

  // Toggle hair options
  const handleToggleHairOptions = async (service: Service) => {
    try {
      await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: service.id, has_hair_options: !service.has_hair_options }),
      });
      fetchData();
    } catch {
      alert("Failed to update service");
    }
  };

  // Create hair option
  const handleCreateHairOption = async (serviceId: string) => {
    if (!newHairOption.name) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/hair-options", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          name: newHairOption.name,
          price_delta: newHairOption.price_delta,
        }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setNewHairOption(emptyHairOptionForm);
        setHairOptionServiceId(null);
        fetchData();
      }
    } catch {
      alert("Failed to create hair option");
    }
    setSaving(false);
  };

  // Delete hair option
  const handleDeleteHairOption = async (id: string) => {
    if (!confirm("Delete this hair option?")) return;
    try {
      await fetch(`/api/admin/hair-options?id=${id}`, { method: "DELETE" });
      fetchData();
    } catch {
      alert("Failed to delete hair option");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-brand-rose" />
      </div>
    );
  }

  return (
    <section className="py-8 bg-white min-h-[80vh]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl font-semibold text-brand-charcoal">
            Services & Hair Options
          </h1>
          <button
            onClick={() => setShowNewService(!showNewService)}
            className="btn-primary text-xs py-2 px-4"
          >
            <Plus className="h-3.5 w-3.5" /> Add Service
          </button>
        </div>

        {/* New Service Form */}
        {showNewService && (
          <div className="glass-rose p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-lg font-semibold text-brand-charcoal">
                New Service
              </h3>
              <button onClick={() => setShowNewService(false)} className="text-brand-muted/40 hover:text-brand-muted">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="label">Service Name *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. Knotless Box Braids"
                  value={newService.name}
                  onChange={(e) => setNewService((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Description</label>
                <textarea
                  className="input min-h-[60px]"
                  placeholder="Brief description of the service"
                  value={newService.description}
                  onChange={(e) => setNewService((p) => ({ ...p, description: e.target.value }))}
                />
              </div>
              <div>
                <label className="label">Price (ZAR) *</label>
                <input
                  type="number"
                  className="input"
                  placeholder="e.g. 800"
                  value={newService.full_price}
                  onChange={(e) => setNewService((p) => ({ ...p, full_price: e.target.value }))}
                />
              </div>
              <div>
                <label className="label">Duration (minutes)</label>
                <input
                  type="number"
                  className="input"
                  placeholder="e.g. 180"
                  value={newService.duration_minutes}
                  onChange={(e) => setNewService((p) => ({ ...p, duration_minutes: e.target.value }))}
                />
              </div>
              <div>
                <label className="label">Deposit Type</label>
                <select
                  className="input"
                  value={newService.deposit_type}
                  onChange={(e) => setNewService((p) => ({ ...p, deposit_type: e.target.value as DepositType }))}
                >
                  <option value="PERCENTAGE">Percentage</option>
                  <option value="FIXED">Fixed Amount</option>
                </select>
              </div>
              <div>
                <label className="label">
                  Deposit Value {newService.deposit_type === "PERCENTAGE" ? "(%)" : "(ZAR)"}
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder={newService.deposit_type === "PERCENTAGE" ? "e.g. 50" : "e.g. 200"}
                  value={newService.deposit_value}
                  onChange={(e) => setNewService((p) => ({ ...p, deposit_value: e.target.value }))}
                />
              </div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="has_hair_options"
                  checked={newService.has_hair_options}
                  onChange={(e) => setNewService((p) => ({ ...p, has_hair_options: e.target.checked }))}
                  className="h-4 w-4 accent-brand-rose"
                />
                <label htmlFor="has_hair_options" className="text-sm text-brand-muted">
                  This service has hair type options (e.g. different lengths/styles at different prices)
                </label>
              </div>
            </div>
            <button
              onClick={handleCreateService}
              disabled={saving || !newService.name || !newService.full_price}
              className="btn-primary mt-6 text-xs py-2.5 px-6"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><Save className="h-3.5 w-3.5" /> Create Service</>}
            </button>
          </div>
        )}

        {/* Services List */}
        {services.length === 0 ? (
          <div className="glass text-center py-16">
            <p className="text-brand-muted mb-4">No services yet</p>
            <button
              onClick={() => setShowNewService(true)}
              className="btn-primary text-xs py-2 px-4"
            >
              <Plus className="h-3.5 w-3.5" /> Add Your First Service
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((svc) => {
              const isExpanded = expandedId === svc.id;
              const svcHairOptions = hairOptions[svc.id] || [];

              return (
                <div key={svc.id} className="glass overflow-hidden">
                  {/* Service Row */}
                  <div className="p-5 flex items-center justify-between">
                    <div
                      className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : svc.id)}
                    >
                      {svc.has_hair_options ? (
                        isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-brand-muted/40 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-brand-muted/40 flex-shrink-0" />
                        )
                      ) : (
                        <div className="w-4" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-lg font-semibold text-brand-charcoal truncate">
                            {svc.name}
                          </h3>
                          {svc.has_hair_options && (
                            <span className="text-[10px] font-medium uppercase tracking-wider text-brand-rose bg-brand-rose/10 px-2 py-0.5 rounded">
                              Hair Options
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-xs text-brand-muted/60">
                          <span>{svc.duration_minutes} min</span>
                          <span>
                            Deposit: {svc.deposit_type === "PERCENTAGE" ? `${svc.deposit_value}%` : formatCurrency(svc.deposit_value)}
                          </span>
                          {svc.has_hair_options && (
                            <span>{svcHairOptions.length} option{svcHairOptions.length !== 1 ? "s" : ""}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <span className="font-display text-xl font-semibold text-brand-rose">
                        {formatCurrency(svc.full_price)}
                      </span>
                      <button
                        onClick={() => handleDeleteService(svc.id)}
                        className="text-brand-muted/30 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Hair Options Panel */}
                  {isExpanded && svc.has_hair_options && (
                    <div className="border-t border-brand-charcoal/[0.06] bg-brand-cream/50 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-medium uppercase tracking-editorial text-brand-rose">
                          Hair Options for {svc.name}
                        </h4>
                        <button
                          onClick={() => setHairOptionServiceId(hairOptionServiceId === svc.id ? null : svc.id)}
                          className="text-xs text-brand-rose hover:text-brand-rose-light transition-colors flex items-center gap-1"
                        >
                          <Plus className="h-3 w-3" /> Add Option
                        </button>
                      </div>

                      {svcHairOptions.length === 0 ? (
                        <p className="text-sm text-brand-muted py-2">No hair options yet. Add one above.</p>
                      ) : (
                        <div className="space-y-2">
                          {svcHairOptions.map((opt) => (
                            <div
                              key={opt.id}
                              className="flex items-center justify-between bg-white/60 border border-brand-charcoal/[0.06] rounded-xl px-4 py-3"
                            >
                              <span className="text-sm font-medium text-brand-charcoal">{opt.name}</span>
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-brand-rose">
                                  {opt.price_delta > 0
                                    ? `+${formatCurrency(opt.price_delta)}`
                                    : opt.price_delta === 0
                                    ? "Included"
                                    : formatCurrency(opt.price_delta)}
                                </span>
                                <button
                                  onClick={() => handleDeleteHairOption(opt.id)}
                                  className="text-brand-muted/30 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Hair Option Form */}
                      {hairOptionServiceId === svc.id && (
                        <div className="mt-4 flex items-end gap-3">
                          <div className="flex-1">
                            <label className="label">Option Name</label>
                            <input
                              type="text"
                              className="input"
                              placeholder="e.g. Waist Length"
                              value={newHairOption.name}
                              onChange={(e) => setNewHairOption((p) => ({ ...p, name: e.target.value }))}
                            />
                          </div>
                          <div className="w-32">
                            <label className="label">Price +/- (ZAR)</label>
                            <input
                              type="number"
                              className="input"
                              placeholder="0"
                              value={newHairOption.price_delta}
                              onChange={(e) => setNewHairOption((p) => ({ ...p, price_delta: e.target.value }))}
                            />
                          </div>
                          <button
                            onClick={() => handleCreateHairOption(svc.id)}
                            disabled={saving || !newHairOption.name}
                            className="btn-primary text-xs py-2.5 px-4 whitespace-nowrap"
                          >
                            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Add"}
                          </button>
                          <button
                            onClick={() => {
                              setHairOptionServiceId(null);
                              setNewHairOption(emptyHairOptionForm);
                            }}
                            className="text-brand-muted/40 hover:text-brand-muted py-2.5"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
