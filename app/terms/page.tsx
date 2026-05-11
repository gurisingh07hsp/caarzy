"use client";
 
import { useState } from "react";
 
const sections = [
  {
    id: 1,
    title: "General Use",
    icon: "📌",
    paragraphs: [
      "Caarzy is an online platform designed to help users explore, compare, and research cars, including details such as on-road prices, mileage, specifications, colors, and variants.",
      "By using this website, you agree to use the platform only for lawful purposes.",
    ],
  },
  {
    id: 2,
    title: "Information Accuracy",
    icon: "✅",
    paragraphs: [
      "We aim to provide accurate and updated vehicle information. However, prices, specifications, mileage, features, and availability may change over time.",
      "Caarzy does not guarantee that all information displayed is always complete, accurate, or up to date.",
      "Users are advised to verify details directly with authorized dealers or manufacturers before making purchasing decisions.",
    ],
  },
  {
    id: 3,
    title: "Pricing Disclaimer",
    icon: "💰",
    content: "On-road prices shown on Caarzy are estimated prices and may vary depending on:",
    items: [
      "City or state taxes",
      "Registration charges",
      "Insurance costs",
      "Dealer charges",
      "Optional accessories",
    ],
    footer: "Actual prices may differ from the displayed estimates.",
  },
  {
    id: 4,
    title: "Third-Party Links & Content",
    icon: "🔗",
    paragraphs: [
      "Our platform may contain links to third-party websites, dealerships, or external services.",
      "Caarzy is not responsible for the content, pricing, offers, or services provided by third parties.",
    ],
  },
  {
    id: 5,
    title: "User Responsibilities",
    icon: "👤",
    content: "By using Caarzy, users agree not to:",
    items: [
      "Misuse or attempt to damage the platform",
      "Copy or reproduce content without permission",
      "Use automated tools to scrape data",
      "Engage in fraudulent or unlawful activities",
    ],
  },
  {
    id: 6,
    title: "Intellectual Property",
    icon: "©️",
    paragraphs: [
      "All website content including logos, design, graphics, text, and platform features are the property of Caarzy unless otherwise stated.",
      "Unauthorized copying, reproduction, or distribution is prohibited.",
    ],
  },
  {
    id: 7,
    title: "No Purchase Guarantee",
    icon: "🚗",
    paragraphs: [
      "Caarzy is an informational platform and does not directly sell vehicles unless explicitly mentioned.",
      "Viewing or comparing cars on the platform does not guarantee availability, pricing, or dealership offers.",
    ],
  },
  {
    id: 8,
    title: "Limitation of Liability",
    icon: "⚖️",
    content: "Caarzy shall not be held liable for:",
    items: [
      "Pricing inaccuracies",
      "Vehicle availability issues",
      "Financial losses",
      "Dealer disputes",
      "Technical interruptions or website downtime",
    ],
    footer: "Users access and use the platform at their own discretion.",
  },
  {
    id: 9,
    title: "Privacy",
    icon: "🔒",
    paragraphs: [
      "By using Caarzy, you agree to our Privacy Policy regarding the collection and use of user information.",
    ],
    privacyLink: true,
  },
  {
    id: 10,
    title: "Changes to Terms",
    icon: "📝",
    paragraphs: [
      "Caarzy reserves the right to update or modify these Terms & Conditions at any time without prior notice.",
      "Continued use of the platform after changes are made constitutes acceptance of the revised terms.",
    ],
  },
  {
    id: 11,
    title: "Contact Us",
    icon: "✉️",
    paragraphs: [
      "If you have any questions regarding these Terms & Conditions, please contact the Caarzy support team through the official website contact page.",
    ],
    contactCta: true,
  },
];
 
export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<number | null>(null);
 
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-body)]">
 
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e8151f] to-[#b50d16] text-white">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-white/25" />
        <div className="absolute top-1/5 left-2/3 w-2 h-2 rounded-full bg-white/20" />
 
        {/* Car silhouette decoration */}
        <div className="absolute right-8 bottom-8 opacity-10 hidden lg:block">
          <svg width="320" height="120" viewBox="0 0 320 120" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M290 75H280L265 50C258 38 244 30 228 30H140C128 30 117 36 110 46L88 75H30C22 75 16 81 16 89V95C16 99 19 102 23 102H42C44 113 53 120 64 120C75 120 84 113 86 102H234C236 113 245 120 256 120C267 120 276 113 278 102H297C301 102 304 99 304 95V89C304 81 298 75 290 75ZM64 110C57 110 52 105 52 98C52 91 57 86 64 86C71 86 76 91 76 98C76 105 71 110 64 110ZM140 70L158 42H228C238 42 247 47 252 55L264 70H140ZM256 110C249 110 244 105 244 98C244 91 249 86 256 86C263 86 268 91 268 98C268 105 263 110 256 110Z"/>
          </svg>
        </div>
 
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            {/* <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Effective: May 2025
            </div> */}
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4">
              Terms &<br />
              <span className="text-white/80">Conditions</span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed max-w-lg">
              By accessing and using our platform, you agree to comply with the
              following terms. Please read them carefully before using our services.
            </p>
          </div>
        </div>
 
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40H1440V20C1200 0 960 40 720 20C480 0 240 40 0 20V40Z" fill="white" />
          </svg>
        </div>
      </section>
 
      {/* Acceptance Banner */}
      <div className="bg-[#fff5f5] border-b border-[#e8151f]/15">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-[#e8151f]/15 flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-[#e8151f]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm text-[#b50d16] font-medium">
            By continuing to use Caarzy, you acknowledge that you have read and agree to these Terms & Conditions.
          </p>
        </div>
      </div>
 
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
 
          {/* Sidebar TOC */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Contents</p>
              <ul className="space-y-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#section-${s.id}`}
                      onClick={() => setActiveSection(s.id)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeSection === s.id
                          ? "bg-[#e8151f]/10 text-[#e8151f]"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                      }`}
                    >
                      <span className="text-base">{s.icon}</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
 
              {/* Quick links */}
              <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Related</p>
                <a href="/privacy-policy" className="flex items-center gap-2 text-sm text-[#e8151f] font-medium hover:underline">
                  <span>🔒</span> Privacy Policy
                </a>
              </div>
            </div>
          </aside>
 
          {/* Sections */}
          <div className="flex-1 space-y-6">
            {sections.map((section, idx) => (
              <div
                key={section.id}
                id={`section-${section.id}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#e8151f]/20 transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className="flex items-center gap-4 px-8 py-6 border-b border-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-[#e8151f]/10 flex items-center justify-center text-lg flex-shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#e8151f] uppercase tracking-widest">
                      Section {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                  </div>
                </div>
 
                {/* Card Body */}
                <div className="px-8 py-6 text-gray-600 text-[15px] leading-relaxed space-y-4">
                  {"paragraphs" in section && section.paragraphs && (
                    <div className="space-y-3">
                      {section.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  )}
 
                  {"content" in section && section.content && (
                    <p>{section.content}</p>
                  )}
 
                  {"items" in section && section.items && (
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e8151f] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
 
                  {"footer" in section && section.footer && (
                    <p className="text-sm text-gray-500 italic border-t border-gray-100 pt-4">
                      {section.footer}
                    </p>
                  )}
 
                  {"privacyLink" in section && section.privacyLink && (
                    <a
                      href="/privacy-policy"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#e8151f] hover:underline"
                    >
                      View Privacy Policy
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
 
                  {"contactCta" in section && section.contactCta && (
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 mt-2 bg-[#e8151f] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#c0111a] transition-colors"
                    >
                      Go to Contact Page
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
 
            {/* Agreement footer card */}
            <div className="bg-gradient-to-br from-[#e8151f] to-[#b50d16] rounded-2xl p-8 text-white text-center">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-xl font-bold mb-2">You're all caught up</h3>
              <p className="text-white/75 text-sm max-w-md mx-auto">
                By continuing to use Caarzy, you accept these terms. If you disagree
                with any part, please discontinue use of the platform.
              </p>
            </div>
          </div>
        </div>
      </main>
 
    </div>
  );
}