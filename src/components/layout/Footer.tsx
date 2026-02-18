import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-purple text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.png"
                alt="She Did That"
                width={220}
                height={82}
                className="h-[4.5rem] w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              Premium hair styling services. From braids to cornrows, we create
              looks that make you feel confident and beautiful.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-medium uppercase tracking-editorial text-brand-gold-light mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                  Services &amp; Pricing
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/tips" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                  Hair Care Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-medium uppercase tracking-editorial text-brand-gold-light mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="h-4 w-4 text-brand-gold-light" />
                <span>+27 XX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="h-4 w-4 text-brand-gold-light" />
                <span>hello@shedidthat.co.za</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Instagram className="h-4 w-4 text-brand-gold-light" />
                <span>@shedidthat</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} She Did That. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-white/30">
              Crafted with care in South Africa
            </p>
            <Link href="/admin" className="text-xs text-white/20 hover:text-white/40 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
