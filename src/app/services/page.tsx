import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { formatCurrency } from "@/lib/utils";
import type { Service } from "@/lib/types/database";

async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("full_price", { ascending: true });

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }
  return data || [];
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* Header */}
      <section className="bg-brand-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-4">Our Menu</p>
          <h1 className="section-heading mb-4">
            Price Guide
          </h1>
          <p className="section-subheading max-w-lg mx-auto">
            Premium styling for every occasion. Choose the service you&apos;d love to try.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <div className="card text-center py-16">
              <p className="text-gray-500">
                Services are being updated. Please check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-cream-dark">
              {services.map((service) => {
                const depositAmount =
                  service.deposit_type === "PERCENTAGE"
                    ? Math.ceil((service.full_price * service.deposit_value) / 100)
                    : service.deposit_value;

                return (
                  <div
                    key={service.id}
                    className="bg-white p-8 lg:p-10 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-display text-2xl font-semibold text-brand-charcoal group-hover:text-brand-purple transition-colors duration-200">
                        {service.name}
                      </h3>
                      <span className="font-display text-2xl font-semibold text-brand-purple whitespace-nowrap ml-4">
                        {formatCurrency(service.full_price)}
                      </span>
                    </div>
                    <div className="divider mb-4" />
                    <p className="text-sm text-gray-500 mb-5 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {service.duration_minutes} min
                        </span>
                        <span>
                          Deposit from {formatCurrency(depositAmount)}
                        </span>
                      </div>
                      <Link
                        href={`/booking?service=${service.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-purple hover:text-brand-purple-dark transition-colors"
                      >
                        Book <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt-16">
            <Link href="/booking" className="btn-primary px-10 py-4">
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
