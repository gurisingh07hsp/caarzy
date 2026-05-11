"use client";
 
import { useState } from "react";
 
const sections = [
  {
    id: 1,
    title: "Ownership of Content",
    icon: "🏛️",
    paragraphs: [
      "The Caarzy name, branding, logos, website interface, and all original content are owned exclusively by Caarzy.",
      "Unauthorized use, reproduction, copying, modification, distribution, republication, or exploitation of any content from this website without prior written permission is strictly prohibited.",
    ],
  },
  {
    id: 2,
    title: "Permitted Use",
    icon: "✅",
    subsections: [
      {
        title: "Users may:",
        items: [
          "Access and browse the website for personal and non-commercial use",
          "View and compare vehicle information for research purposes",
          "Share website links with proper attribution",
        ],
        allowed: true,
      },
      {
        title: "Users may not:",
        items: [
          "Copy or scrape website data using automated tools",
          "Republish content on other platforms without permission",
          "Use Caarzy branding, logos, or visuals for commercial purposes",
          "Reproduce website design or functionality",
        ],
        allowed: false,
      },
    ],
  },
  {
    id: 3,
    title: "Third-Party Trademarks",
    icon: "™️",
    paragraphs: [
      "Vehicle names, brand logos, and manufacturer trademarks displayed on Caarzy belong to their respective owners. Their appearance on this website is for informational and identification purposes only.",
      "Caarzy does not claim ownership of third-party trademarks or copyrighted materials.",
    ],
  },
  {
    id: 4,
    title: "Copyright Infringement Claims",
    icon: "⚖️",
    content:
      "If you believe that any content on Caarzy infringes your copyright or intellectual property rights, please contact us with the following details:",
    items: [
      "Your name and contact information",
      "Description of the copyrighted work",
      "URL or location of the allegedly infringing content",
      "Proof of ownership or authorization",
    ],
    footer: "Upon review, appropriate action will be taken where necessary.",
    contactCta: true,
  },
  {
    id: 5,
    title: "Changes to This Notice",
    icon: "📝",
    paragraphs: [
      "Caarzy reserves the right to modify or update this Copyright Notice at any time without prior notice.",
      "Continued use of the website constitutes acceptance of any revised terms.",
    ],
  },
];
 
export default function CopyrightPage() {
  const [activeSection, setActiveSection] = useState<number | null>(null);
 
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-body)]">
 
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e8151f] to-[#b50d16] text-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white/25" />
        <div className="absolute top-1/4 right-1/3 w-3 h-3 rounded-full bg-white/15" />
 
        {/* © watermark decoration */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 text-[180px] font-black text-white/5 leading-none select-none hidden lg:block">
          ©
        </div>
 
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              © 2026 Caarzy. All Rights Reserved.
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4">
              Copyright
              <br />
              <span className="text-white/80">Notice</span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed max-w-lg">
              All content on this website — including text, graphics, logos, images,
              layouts, and car data — is the property of Caarzy and protected under
              applicable intellectual property laws.
            </p>
          </div>
        </div>
 
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40H1440V20C1200 0 960 40 720 20C480 0 240 40 0 20V40Z" fill="white" />
          </svg>
        </div>
      </section>
 
      {/* Notice banner */}
      <div className="bg-[#fff5f5] border-b border-[#e8151f]/15">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-[#e8151f]/15 flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-[#e8151f]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm text-[#b50d16] font-medium">
            Unauthorized reproduction or use of Caarzy content without prior written permission is strictly prohibited.
          </p>
        </div>
      </div>
 
      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
 
          {/* Sidebar */}
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
 
              {/* Related links */}
              <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Related</p>
                <a href="/privacy-policy" className="flex items-center gap-2 text-sm text-[#e8151f] font-medium hover:underline">
                  <span>🔒</span> Privacy Policy
                </a>
                <a href="/terms" className="flex items-center gap-2 text-sm text-[#e8151f] font-medium hover:underline">
                  <span>📋</span> Terms & Conditions
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
                {/* Card header */}
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
 
                {/* Card body */}
                <div className="px-8 py-6 text-gray-600 text-[15px] leading-relaxed space-y-5">
 
                  {/* Paragraphs */}
                  {"paragraphs" in section && section.paragraphs && (
                    <div className="space-y-3">
                      {section.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                  )}
 
                  {/* Allowed / Not allowed subsections */}
                  {"subsections" in section && section.subsections && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {section.subsections.map((sub, i) => (
                        <div
                          key={i}
                          className={`rounded-xl p-5 border ${
                            sub.allowed
                              ? "bg-green-50 border-green-100"
                              : "bg-red-50 border-red-100"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-base">{sub.allowed ? "✅" : "🚫"}</span>
                            <h3 className={`text-sm font-bold ${sub.allowed ? "text-green-700" : "text-red-700"}`}>
                              {sub.title}
                            </h3>
                          </div>
                          <ul className="space-y-2">
                            {sub.items.map((item, j) => (
                              <li key={j} className="flex items-start gap-2.5 text-sm">
                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${sub.allowed ? "bg-green-500" : "bg-[#e8151f]"}`} />
                                <span className={sub.allowed ? "text-green-800" : "text-red-800"}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
 
                  {/* Intro content */}
                  {"content" in section && section.content && (
                    <p>{section.content}</p>
                  )}
 
                  {/* Bullet list */}
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
 
                  {/* Footer note */}
                  {"footer" in section && section.footer && (
                    <p className="text-sm text-gray-500 italic border-t border-gray-100 pt-4">
                      {section.footer}
                    </p>
                  )}
 
                  {/* Contact CTA */}
                  {"contactCta" in section && section.contactCta && (
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 mt-1 bg-[#e8151f] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#c0111a] transition-colors"
                    >
                      Report Infringement
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
 
            {/* Closing card */}
            <div className="bg-gradient-to-br from-[#e8151f] to-[#b50d16] rounded-2xl p-8 text-white text-center">
              <div className="text-4xl font-black mb-3 opacity-90">©</div>
              <h3 className="text-xl font-bold mb-2">Respecting Intellectual Property</h3>
              <p className="text-white/75 text-sm max-w-md mx-auto">
                We take copyright seriously. All original content on Caarzy is protected.
                If you have questions, reach out through our official contact page.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}