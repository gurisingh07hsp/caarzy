"use client";
 
import { useState } from "react";
 
const sections = [
  {
    id: 1,
    title: "Information We Collect",
    icon: "📋",
    content: null,
    subsections: [
      {
        title: "Personal Information",
        items: ["Name", "Email address", "Phone number", "Location or city"],
      },
      {
        title: "Usage Information",
        items: [
          "Browser type",
          "Device information",
          "IP address",
          "Pages visited on our website",
          "Time spent on the platform",
        ],
      },
      {
        title: "Cookies & Tracking Technologies",
        items: [
          "We may use cookies and similar technologies to improve user experience and analyze website performance.",
        ],
        isList: false,
      },
    ],
  },
  {
    id: 2,
    title: "How We Use Your Information",
    icon: "⚙️",
    content: "We use collected information to:",
    items: [
      "Improve website functionality and user experience",
      "Provide relevant car information and recommendations",
      "Respond to user inquiries and support requests",
      "Analyze website traffic and performance",
      "Send updates or promotional content (only if permitted by the user)",
    ],
  },
  {
    id: 3,
    title: "Information Sharing",
    icon: "🔗",
    content:
      "Caarzy does not sell or rent personal information to third parties. We may share limited information with trusted service providers or partners only when necessary for:",
    items: [
      "Website operations",
      "Analytics",
      "Customer support",
      "Legal compliance",
    ],
  },
  {
    id: 4,
    title: "Data Security",
    icon: "🔒",
    content: null,
    paragraphs: [
      "We implement reasonable security measures to protect user information from unauthorized access, misuse, or disclosure.",
      "However, no online platform can guarantee complete security of data transmission over the internet.",
    ],
  },
  {
    id: 5,
    title: "Third-Party Services",
    icon: "🌐",
    content: null,
    paragraphs: [
      "Our website may contain links to third-party websites, dealerships, advertisers, or external services.",
      "Caarzy is not responsible for the privacy practices or content of third-party websites.",
    ],
  },
  {
    id: 6,
    title: "Cookies Policy",
    icon: "🍪",
    content: null,
    paragraphs: [
      "Cookies help us improve website performance and personalize user experience.",
      "Users may disable cookies through browser settings, though some website features may not function properly.",
    ],
  },
  {
    id: 7,
    title: "User Rights",
    icon: "👤",
    content: "Users may request to:",
    items: [
      "Access their personal data",
      "Correct inaccurate information",
      "Delete personal information where applicable",
    ],
    footer: "Requests can be submitted through our official contact page.",
  },
  {
    id: 8,
    title: "Children's Privacy",
    icon: "🛡️",
    content:
      "Caarzy is not intended for children under the age of 13. We do not knowingly collect personal information from minors.",
  },
  {
    id: 9,
    title: "Changes to This Policy",
    icon: "📝",
    content:
      "We may update this Privacy Policy from time to time. Any updates will be posted on this page with revised effective dates where applicable.",
  },
  {
    id: 10,
    title: "Contact Us",
    icon: "✉️",
    content:
      "If you have any questions regarding this Privacy Policy or how your information is handled, please contact us through the official Caarzy website contact page.",
  },
];
 
export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<number | null>(null);
 
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-body)]">
 
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e8151f] to-[#b50d16] text-white">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/3 w-4 h-4 rounded-full bg-white/20" />
        <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-white/30" />
 
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            {/* <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Last updated: May 2025
            </div> */}
            <h1 className="text-3xl md:text-6xl font-black leading-tight mb-4">
              Privacy
              <br />
              <span className="text-white/80">Policy</span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed max-w-lg">
              At Caarzy, we value your privacy and are committed to protecting
              your personal information. Here's everything you need to know.
            </p>
          </div>
        </div>
 
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40H1440V20C1200 0 960 40 720 20C480 0 240 40 0 20V40Z" fill="white" />
          </svg>
        </div>
      </section>
 
      {/* Table of Contents + Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
 
          {/* Sidebar TOC */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Contents
              </p>
              <ul className="space-y-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#section-${s.id}`}
                      onClick={() => setActiveSection(s.id)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
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
            </div>
          </aside>
 
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {sections.map((section, idx) => (
              <div
                key={section.id}
                id={`section-${section.id}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#e8151f]/20 transition-all duration-300 overflow-hidden"
              >
                {/* Section Header */}
                <div className="flex items-center gap-4 px-8 py-6 border-b border-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-[#e8151f]/10 flex items-center justify-center text-lg flex-shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#e8151f] uppercase tracking-widest">
                      Section {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-lg font-bold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                </div>
 
                {/* Section Body */}
                <div className="px-8 py-6 text-gray-600 text-[15px] leading-relaxed space-y-4">
                  {/* Subsections (for section 1) */}
                  {"subsections" in section && section.subsections && (
                    <div className="space-y-5">
                      {section.subsections.map((sub, i) => (
                        <div key={i}>
                          <h3 className="font-semibold text-gray-800 mb-2">
                            {sub.title}
                          </h3>
                          {"isList" in sub && sub.isList === false ? (
                            <p>{sub.items[0]}</p>
                          ) : (
                            <ul className="space-y-1.5">
                              {sub.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-2.5">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e8151f] flex-shrink-0" />
                                  <span className="text-slate-700 leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
 
                  {/* Simple content */}
                  {"content" in section && section.content && !("subsections" in section) && (
                    <p>{section.content}</p>
                  )}
 
                  {/* Bullet items */}
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
 
                  {/* Paragraphs */}
                  {"paragraphs" in section && section.paragraphs && (
                    <div className="space-y-3">
                      {section.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  )}
 
                  {/* Footer note */}
                  {"footer" in section && section.footer && (
                    <p className="text-sm text-gray-500 italic border-t border-gray-100 pt-4 mt-4">
                      {section.footer}
                    </p>
                  )}
 
                  {/* Contact CTA */}
                  {section.id === 10 && (
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
          </div>
        </div>
      </main>

    </div>
  );
}