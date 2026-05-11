"use client";

const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "Search Your Favorite Car",
    desc: "Browse through a wide range of cars and explore detailed information including on-road price, mileage, specifications, colors, and variants.",
    highlights: ["On-road price", "Mileage", "Specifications", "Colors & variants"],
    accent: "from-[#e8151f] to-[#c0111a]",
  },
  {
    number: "02",
    icon: "⚖️",
    title: "Compare Cars Side by Side",
    desc: "Use the smart comparison feature to compare multiple cars based on price, fuel efficiency, features, performance, and more.",
    highlights: ["Price", "Fuel efficiency", "Features", "Performance"],
    accent: "from-gray-800 to-gray-700",
  },
  {
    number: "03",
    icon: "📊",
    title: "Explore Detailed Insights",
    desc: "Check complete car details such as engine specs, seating capacity, transmission type, safety features, and available color options.",
    highlights: ["Engine specs", "Seating capacity", "Transmission", "Safety features"],
    accent: "from-[#e8151f] to-[#c0111a]",
  },
  {
    number: "04",
    icon: "💰",
    title: "Find the Best Deal",
    desc: "Get estimated on-road pricing and compare variants to choose the perfect car that matches your needs and budget.",
    highlights: ["On-road pricing", "Variant comparison", "Budget match", "Best value"],
    accent: "from-gray-800 to-gray-700",
  },
  {
    number: "05",
    icon: "🧠",
    title: "Make Better Decisions",
    desc: "Caarzy simplifies car research by putting all important information in one place, helping you choose your next car with confidence.",
    highlights: ["All-in-one platform", "Simplified research", "Confident buying", "Smart choice"],
    accent: "from-[#e8151f] to-[#c0111a]",
  },
  {
    number: "06",
    icon: "🔔",
    title: "Stay Updated",
    desc: "Access regularly updated car data, pricing, and specifications to stay informed about the latest models and automotive trends.",
    highlights: ["Updated pricing", "Latest models", "New launches", "Market trends"],
    accent: "from-gray-800 to-gray-700",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-body)]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e8151f] to-[#b50d16] text-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-white/25" />

        {/* Step dots decoration */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 opacity-20">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className={`rounded-full bg-white ${i === 1 ? "w-8 h-8" : "w-4 h-4"}`} />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Simple. Smart. Fast.
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4">
              How It
              <br />
              <span className="text-white/80">Works</span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed max-w-lg">
              From searching to deciding — Caarzy makes your car buying journey
              simple, smart, and stress-free in just a few steps.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40H1440V20C1200 0 960 40 720 20C480 0 240 40 0 20V40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Step count bar */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-500 font-medium">
            <span className="text-[#e8151f] font-bold">6 simple steps</span> to find your perfect car
          </p>
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-6 bg-[#e8151f]" : "w-3 bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Steps — zigzag layout */}
      <main className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        {steps.map((step, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={i}
              className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
            >
              {/* Visual side */}
              <div className="w-full lg:w-1/2 flex-shrink-0">
                <div className={`relative rounded-3xl bg-gradient-to-br ${step.accent} p-10 text-white overflow-hidden min-h-[280px] flex flex-col justify-between`}>
                  {/* Background number */}
                  <span className="absolute -bottom-4 -right-2 text-[120px] font-black text-white/10 leading-none select-none">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-3xl border border-white/20">
                    {step.icon}
                  </div>

                  {/* Tags */}
                  <div className="relative flex flex-wrap gap-2 mt-8">
                    {step.highlights.map((tag, j) => (
                      <span
                        key={j}
                        className="text-xs font-semibold bg-white/15 border border-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-black text-[#e8151f] bg-[#e8151f]/10 px-3 py-1 rounded-full uppercase tracking-widest">
                    Step {step.number}
                  </span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
                  {step.title}
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                  {step.desc}
                </p>

                {/* Connector arrow (hidden on last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex items-center gap-2 mt-8 text-gray-300">
                    <div className="h-px w-8 bg-gray-200" />
                    <span className="text-sm font-medium text-gray-400">then</span>
                    <div className="h-px flex-1 bg-gray-200" />
                    <svg className="w-4 h-4 text-[#e8151f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </main>

      {/* Quick overview strip */}
      <section className="bg-gray-50 border-t border-gray-100 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-10">All steps at a glance</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-xl group-hover:border-[#e8151f]/30 group-hover:shadow-md transition-all duration-200">
                  {step.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#e8151f] uppercase tracking-widest">Step {step.number}</p>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5 leading-snug">{step.title}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute" />
                )}
              </div>
            ))}
          </div>

          {/* Progress line */}
          <div className="mt-10 flex items-center gap-0 max-w-3xl mx-auto">
            {steps.map((_, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="w-3 h-3 rounded-full bg-[#e8151f] flex-shrink-0" />
                {i < steps.length - 1 && <div className="h-0.5 flex-1 bg-[#e8151f]/20" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-[#e8151f] to-[#b50d16] rounded-3xl p-10 md:p-14 text-white text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/5" />
          <div className="relative">
            <div className="text-4xl mb-4">🚗</div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Find Your Car?</h2>
            <p className="text-white/75 text-base leading-relaxed max-w-xl mx-auto mb-8">
              Start your car research journey with Caarzy today. Search, compare,
              and decide with confidence using India's smart car comparison platform.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#" className="inline-flex items-center justify-center gap-2 bg-white text-[#e8151f] text-sm font-bold px-7 py-3.5 rounded-xl hover:bg-gray-50 transition-colors">
                Start Searching
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#" className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white text-sm font-bold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-colors">
                Compare Cars
              </a>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}