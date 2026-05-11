"use client";

const segments = [
  {
    icon: "🚙",
    title: "SUVs Continue to Dominate",
    desc: "SUVs remain one of the fastest-growing vehicle segments due to their spacious interiors, road presence, and versatility.",
    tag: "Top Segment",
  },
  {
    icon: "⚡",
    title: "Rising Demand for Electric Vehicles (EVs)",
    desc: "Electric vehicles are gaining popularity because of lower running costs, eco-friendly technology, and improved charging infrastructure.",
    tag: "Fast Growing",
  },
  {
    icon: "🌿",
    title: "Hybrid Cars Gaining Attention",
    desc: "Many buyers are shifting toward hybrid vehicles for better fuel efficiency and lower emissions without compromising performance.",
    tag: "Eco Friendly",
  },
  {
    icon: "🏙️",
    title: "Compact Cars for City Driving",
    desc: "Affordable hatchbacks and compact sedans continue to attract urban buyers looking for mileage, convenience, and easy maintenance.",
    tag: "Urban Pick",
  },
];

const influenceFactors = [
  { icon: "⛽", label: "Fuel prices" },
  { icon: "💵", label: "Vehicle affordability" },
  { icon: "🔧", label: "New technology features" },
  { icon: "🛡️", label: "Safety ratings" },
  { icon: "🏛️", label: "Government policies" },
  { icon: "🎯", label: "Consumer lifestyle preferences" },
];

const compareFactors = [
  { icon: "🏷️", label: "On-road price" },
  { icon: "🛣️", label: "Mileage" },
  { icon: "🔩", label: "Engine performance" },
  { icon: "📱", label: "Features & technology" },
  { icon: "🛡️", label: "Safety features" },
  { icon: "🎨", label: "Color options" },
  { icon: "⚙️", label: "Variants" },
];

const whyFollow = [
  "Choose the right car segment",
  "Understand market demand",
  "Compare better value options",
  "Stay updated with upcoming launches",
  "Make smarter purchase decisions",
];

export default function CarTrendsPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-body)]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e8151f] to-[#b50d16] text-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-white/25" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-white/15" />

        {/* Decorative graph bars */}
        <div className="absolute right-12 bottom-8 hidden lg:flex items-end gap-2 opacity-10">
          {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
            <div key={i} className="w-6 bg-white rounded-t-md" style={{ height: `${h}px` }} />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Live Market Insights
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4">
              Car Sales
              <br />
              <span className="text-white/80">Trends</span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed max-w-lg">
              Stay updated with the latest car sales trends, popular vehicle launches,
              and automotive market insights — all in one place with Caarzy.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40H1440V20C1200 0 960 40 720 20C480 0 240 40 0 20V40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Latest Automotive Trends intro */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="text-xs font-bold text-[#e8151f] uppercase tracking-widest">Overview</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 mb-4">Latest Automotive Trends</h2>
          <p className="text-gray-500 text-base leading-relaxed">
            The automobile industry is constantly evolving with new technologies, fuel options, and customer preferences.
            From SUVs and electric vehicles to hybrid cars and budget hatchbacks, Caarzy keeps you informed about what's trending in the market.
          </p>
        </div>
      </section>

      {/* Popular Car Segments */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#e8151f] uppercase tracking-widest">Segments</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Popular Car Segments</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {segments.map((seg, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#e8151f]/20 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#e8151f]/10 flex items-center justify-center text-2xl">
                    {seg.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#e8151f] bg-[#e8151f]/10 px-2 py-1 rounded-full">
                    {seg.tag}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug">{seg.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{seg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Influences + Most Compared — 2 col */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">

          {/* What Influences */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#e8151f] to-[#c0111a] px-8 py-6">
              <span className="text-white/70 text-xs font-bold uppercase tracking-widest">Market Factors</span>
              <h2 className="text-xl font-black text-white mt-1">What Influences Car Sales?</h2>
              <p className="text-white/70 text-sm mt-1">Several factors impact car buying trends, including:</p>
            </div>
            <div className="p-6 grid grid-cols-2 gap-3">
              {influenceFactors.map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                  <span className="text-xl">{f.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Most Compared */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-6">
              <span className="text-white/50 text-xs font-bold uppercase tracking-widest">On Caarzy</span>
              <h2 className="text-xl font-black text-white mt-1">Most Compared Cars</h2>
              <p className="text-white/50 text-sm mt-1">Users frequently compare cars based on:</p>
            </div>
            <div className="p-6 space-y-2">
              {compareFactors.map((f, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#e8151f]/5 transition-colors border border-transparent hover:border-[#e8151f]/10">
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{f.label}</span>
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e8151f]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Follow Trends */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#e8151f] uppercase tracking-widest">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Why Follow Car Sales Trends?</h2>
            <p className="text-gray-500 text-base mt-3">Tracking automotive trends helps buyers make smarter decisions.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {whyFollow.map((reason, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-full px-5 py-3 shadow-sm hover:border-[#e8151f]/30 hover:shadow-md transition-all duration-200"
              >
                <span className="w-2 h-2 rounded-full bg-[#e8151f] flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore More CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-[#e8151f] to-[#b50d16] rounded-3xl p-10 md:p-14 text-white text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/5" />
          <div className="relative">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Explore More with Caarzy</h2>
            <p className="text-white/75 text-base leading-relaxed max-w-xl mx-auto mb-8">
              Caarzy makes car research simple by combining pricing, comparisons, specifications,
              and market insights in one modern platform. Stay informed and discover the latest
              trends shaping the future of the automotive industry.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#e8151f] text-sm font-bold px-7 py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Explore Cars
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white text-sm font-bold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-colors"
              >
                Compare Vehicles
              </a>
            </div> */}
          </div>
        </div>
      </section>

    </div>
  );
}