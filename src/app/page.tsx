import Link from "next/link";
import {
  Sparkles,
  Shield,
  Heart,
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
  Star,
  ArrowRight,
  Scissors,
} from "lucide-react";

const services = [
  {
    name: "Brownie Afro",
    description: "Warm, rich brown tones that frame your face beautifully. A natural, confident look.",
    price: "R550",
    duration: "—",
    image: "/images/brownie.jpg",
    href: "/booking",
  },
  {
    name: "Black Afro",
    description: "Classic deep black for timeless elegance. Bold, sleek, and always in style.",
    price: "R550",
    duration: "—",
    image: "/images/black afro.jpg",
    href: "/booking",
  },
  {
    name: "Goldie Afro",
    description: "Golden honey blonde that catches the light. Radiant warmth for a standout look.",
    price: "R550",
    duration: "—",
    image: "/images/goldie.jpg",
    href: "/booking",
  },
];

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "4.9", label: "Average Rating" },
  { value: "3+", label: "Years Experience" },
  { value: "100%", label: "Quality Products" },
];

const steps = [
  {
    icon: Calendar,
    title: "Choose Your Service",
    description: "Pick from box braids or cornrows and select your preferred style.",
  },
  {
    icon: Clock,
    title: "Select Date & Time",
    description: "Find an available slot that works with your schedule.",
  },
  {
    icon: CreditCard,
    title: "Make Payment",
    description: "Pay a deposit or full amount via EFT and upload your proof.",
  },
  {
    icon: CheckCircle,
    title: "Get Confirmed",
    description: "We verify your payment and confirm your booking via email.",
  },
];

const testimonials = [
  {
    quote:
      "My knotless braids were absolutely stunning. The attention to detail was incredible and the whole experience felt so luxurious. I felt like a queen walking out.",
    name: "Thandi M.",
    service: "Knotless Box Braids",
  },
  {
    quote:
      "She Did That is my go-to for cornrows. Always neat, always on time, and the vibe is so welcoming. My 10-row cornrows lasted weeks!",
    name: "Naledi K.",
    service: "Cornrows — 10 Rows",
  },
  {
    quote:
      "The booking process was so smooth and professional. I loved being able to choose my time slot and pay online. My bohemian braids were perfect.",
    name: "Amara J.",
    service: "Bohemian Box Braids",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-cream overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[85vh] items-center">
            {/* Left — Copy */}
            <div className="py-20 lg:py-32 lg:pr-16">
              <p className="section-label mb-6">Premium Hair Studio</p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-brand-charcoal leading-[1.05]">
                Beautiful Braids,{" "}
                <span className="text-brand-gold">Crafted</span> With Care
              </h1>
              <p className="mt-8 text-base text-gray-500 max-w-lg leading-relaxed">
                From knotless box braids to sleek cornrows, She Did That is your
                go-to studio for protective styles that look amazing and last.
                Book online in minutes and walk out feeling like a queen.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/booking" className="btn-primary px-8 py-4">
                  Book Appointment
                </Link>
                <Link href="/services" className="btn-secondary px-8 py-4">
                  View Pricing
                </Link>
              </div>
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full bg-brand-purple/10 border-2 border-brand-cream flex items-center justify-center"
                    >
                      <span className="text-xs font-medium text-brand-purple">
                        {["T", "N", "A", "Z"][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Loved by 500+ clients</p>
                </div>
              </div>
            </div>

            {/* Right — Hero Image */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-brand-purple/5 rounded-tl-[80px]" />
              <div className="relative h-full min-h-[600px] rounded-tl-[80px] overflow-hidden">
                <img
                  src="/images/hero.jpg"
                  alt="Beautiful braided hairstyle"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-3xl sm:text-4xl font-semibold text-brand-gold">
                  {stat.value}
                </p>
                <p className="text-sm text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="section-label mb-4">Our Products</p>
            <h2 className="section-heading">
              Shop Afro Wigs
            </h2>
            <p className="section-subheading max-w-lg mx-auto">
              Premium quality afro wigs in three stunning shades. Natural look, comfortable fit, all at one great price.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((svc, i) => (
              <div key={i} className="border border-gray-200 p-6 lg:p-8 group hover:border-brand-gold/40 transition-all duration-300">
                <div className="aspect-square mb-6 overflow-hidden bg-gray-100">
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display text-xl font-semibold text-brand-charcoal group-hover:text-brand-purple transition-colors">
                    {svc.name}
                  </h3>
                  <span className="font-display text-xl font-semibold text-brand-gold whitespace-nowrap ml-4">
                    {svc.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  {svc.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="h-3.5 w-3.5" />
                    {svc.duration}
                  </span>
                  <Link
                    href={svc.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-purple hover:text-brand-purple-dark transition-colors"
                  >
                    Buy Now <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-brand-purple transition-colors">
              View full pricing details <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About / Story Section */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-tr-[60px] rounded-bl-[60px] overflow-hidden">
                <img
                  src="/images/homepage.jpg"
                  alt="She Did That hair studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Copy */}
            <div>
              <p className="section-label mb-4">About Us</p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-brand-charcoal leading-[1.1] mb-6">
                Where Passion Meets Precision
              </h2>
              <div className="divider mb-8" />
              <p className="text-gray-500 leading-relaxed mb-4">
                She Did That was born from a love for protective styling and a belief
                that every woman deserves to feel beautiful in her natural hair. What
                started as a passion project has grown into a trusted studio known for
                quality, consistency, and care.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                We use only premium products that protect and strengthen your hair.
                Every braid is laid with intention, every cornrow with precision.
                Your hair isn&apos;t just styled — it&apos;s cared for.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Shield className="h-5 w-5 text-brand-gold mx-auto mb-2" />
                  <p className="text-xs font-medium text-brand-charcoal">Protective Styles</p>
                </div>
                <div className="text-center">
                  <Heart className="h-5 w-5 text-brand-gold mx-auto mb-2" />
                  <p className="text-xs font-medium text-brand-charcoal">Hair Health First</p>
                </div>
                <div className="text-center">
                  <Sparkles className="h-5 w-5 text-brand-gold mx-auto mb-2" />
                  <p className="text-xs font-medium text-brand-charcoal">Premium Products</p>
                </div>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-purple hover:text-brand-purple-dark transition-colors"
              >
                See Our Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="section-label mb-4">How It Works</p>
            <h2 className="section-heading">
              Book in 4 Simple Steps
            </h2>
            <p className="section-subheading max-w-lg mx-auto">
              No DMs, no back-and-forth. Just pick your style, choose a time, and pay — all online.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white border border-brand-gold/30 group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-300">
                  <step.icon className="h-6 w-6 text-brand-gold group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-xs font-medium uppercase tracking-editorial text-brand-gold mb-3">
                  Step {i + 1}
                </p>
                <h3 className="font-display text-xl font-semibold text-brand-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href="/booking" className="btn-primary px-8 py-4">
              Start Booking <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="section-label mb-4">Client Love</p>
            <h2 className="section-heading">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="border border-gray-200 p-8 text-center hover:border-brand-gold/30 hover:shadow-soft transition-all duration-300">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="divider mx-auto mb-6" />
                <p className="font-display text-lg font-semibold text-brand-charcoal">
                  {t.name}
                </p>
                <p className="text-xs text-gray-400 mt-1">{t.service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-brand-purple">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-medium uppercase tracking-editorial text-brand-gold-light mb-6">
            Ready?
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white leading-[1.1] mb-6">
            Your Next Look Starts Here
          </h2>
          <p className="text-white/60 max-w-md mx-auto mb-10 leading-relaxed">
            Don&apos;t wait — book your appointment now and let us create
            something beautiful for you. Deposits start from just R100.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="btn-gold px-10 py-4">
              Book Your Appointment
            </Link>
            <Link href="/tips" className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors px-6 py-4">
              Hair Care Tips <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
