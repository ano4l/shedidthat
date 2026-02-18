import { Droplets, Moon, Shield, Scissors, Wind, Heart, PlayCircle } from "lucide-react";

const tips = [
  {
    icon: Moon,
    title: "Protect Your Hair at Night",
    description:
      "Always wrap your hair with a satin or silk scarf before bed. This reduces friction, prevents frizz, and helps your style last longer. A satin pillowcase is also a great alternative.",
  },
  {
    icon: Droplets,
    title: "Keep Your Scalp Moisturised",
    description:
      "Use a lightweight oil or scalp spray every 2-3 days to keep your scalp hydrated. Focus on the roots and gently massage to promote blood circulation and healthy growth.",
  },
  {
    icon: Shield,
    title: "Don't Keep Styles Too Long",
    description:
      "Protective styles like braids and cornrows should be kept for 4-6 weeks maximum. Leaving them in too long can cause tension, breakage, and buildup on your scalp.",
  },
  {
    icon: Wind,
    title: "Avoid Excessive Heat",
    description:
      "Limit the use of flat irons, blow dryers, and curling wands. When you do use heat, always apply a heat protectant spray first. Air drying is the gentlest option for your hair.",
  },
  {
    icon: Droplets,
    title: "Wash Day Routine",
    description:
      "Use a sulfate-free shampoo and follow up with a deep conditioner. Detangle gently with a wide-tooth comb while your conditioner is in. Rinse with cool water to seal the cuticle.",
  },
  {
    icon: Scissors,
    title: "Regular Trims",
    description:
      "Trim your ends every 8-12 weeks to prevent split ends from travelling up the hair shaft. Even if you're growing your hair out, regular trims keep it healthy and looking fresh.",
  },
  {
    icon: Heart,
    title: "Be Gentle with Wet Hair",
    description:
      "Hair is most fragile when wet. Avoid brushing or pulling wet hair. Instead, use a microfibre towel to gently squeeze out excess water and detangle with a wide-tooth comb.",
  },
];

const videos = [
  { title: "How to Maintain Braids" },
  { title: "Night Routine for Protective Styles" },
  { title: "Scalp Care Between Styles" },
];

export default function TipsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-brand-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-4">Hair Education</p>
          <h1 className="section-heading mb-4">
            Hair Care Tips
          </h1>
          <p className="section-subheading max-w-xl mx-auto">
            Keep your hair healthy, strong, and beautiful between appointments
            with these expert tips.
          </p>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-cream-dark">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="bg-white p-8 lg:p-10 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-brand-gold/30 text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:text-white transition-all duration-300">
                  <tip.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-charcoal mb-3">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-4">Watch &amp; Learn</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-charcoal">
              Video Tutorials
            </h2>
            <p className="section-subheading">
              Watch and learn how to care for your hair
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <div key={i} className="bg-white border border-brand-cream-dark overflow-hidden">
                <div className="aspect-video bg-brand-cream flex flex-col items-center justify-center gap-3">
                  <PlayCircle className="h-14 w-14 text-brand-gold/30" />
                  <p className="text-xs text-gray-400">Video coming soon</p>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-brand-charcoal">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aftercare CTA */}
      <section className="py-24 lg:py-32 bg-brand-purple">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-medium uppercase tracking-editorial text-brand-gold-light mb-6">
            Personalised Care
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white leading-[1.1] mb-4">
            Need Personalised Advice?
          </h2>
          <p className="text-white/60 max-w-md mx-auto mb-10 leading-relaxed">
            Book a consultation and we&apos;ll create a custom hair care plan
            just for you.
          </p>
          <a href="/booking" className="btn-gold px-10 py-4">
            Book a Consultation
          </a>
        </div>
      </section>
    </>
  );
}
