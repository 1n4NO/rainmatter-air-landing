const GITHUB_URL = "https://github.com/rainmatter/rainmatter-air-extension";
const CHROME_STORE_URL = "https://chrome.google.com/webstore/detail/rainmatter-air";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: "Live & cached",
    desc: "Auto-refreshes in the background. Even when offline the last good reading is always visible.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Dual API support",
    desc: "Connects to OpenAQ v3 or Rainmatter's own OAQ platform (oaq.notf.in). Switch sources in Settings.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "CPCB AQI",
    desc: "Displays indicative AQI using India's official CPCB breakpoints across six pollution categories.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
      </svg>
    ),
    title: "Page overlay",
    desc: "Optional floating badge on any webpage shows the current AQI at a glance without opening the popup.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: "Private by design",
    desc: "API key stays on your device only. No tracking, no analytics, no data ever leaves your browser.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Open source",
    desc: "MIT licensed. Audit the code, run it locally, or contribute — everything is on GitHub.",
  },
];

const steps = [
  { n: "1", title: "Install the extension", desc: "Add Rainmatter Air from the Chrome Web Store with one click." },
  { n: "2", title: "Enter your API key",    desc: "Sign up for a free OAQ or OpenAQ key and paste it in Settings." },
  { n: "3", title: "Pick your station",     desc: "Set your city and station ID. The extension does the rest." },
];

const pollutants = ["PM2.5", "PM10", "NO₂", "SO₂", "CO", "O₃"];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070e1c] text-[#e6efff] overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-[#070e1c]/80 backdrop-blur border-b border-[rgba(120,165,255,0.1)]">
        <span className="font-extrabold text-lg tracking-tight">
          Rainmatter{" "}
          <span className="gradient-text">Air</span>
        </span>
        <div className="flex items-center gap-5 text-sm font-medium text-[#7b93bc]">
          <a href="#features" className="hover:text-[#e6efff] transition-colors hidden sm:block">Features</a>
          <a href="#how-it-works" className="hover:text-[#e6efff] transition-colors hidden sm:block">How it works</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer"
             className="flex items-center gap-1.5 hover:text-[#e6efff] transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.41-.01 2.74 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>
            </svg>
            GitHub
          </a>
          <a href={CHROME_STORE_URL} target="_blank" rel="noreferrer"
             className="px-4 py-2 rounded-full bg-[#6b9eff] text-[#08111e] font-bold hover:opacity-90 transition-opacity">
            Install free
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-28 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#6b9eff] opacity-[0.06] blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-purple-600 opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />

        <p className="text-[#6b9eff] text-xs font-bold tracking-[0.18em] uppercase mb-4">
          Rainmatter Foundation
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 max-w-3xl mx-auto">
          Know the air<br />
          <span className="gradient-text">you&rsquo;re breathing</span>
        </h1>
        <p className="text-[#7b93bc] text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          A free Chrome extension that puts live air quality in your toolbar —
          powered by OAQ and OpenAQ, built for Indian cities.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={CHROME_STORE_URL} target="_blank" rel="noreferrer"
             className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#6b9eff] text-[#08111e] font-bold text-base hover:opacity-90 active:scale-95 transition-all shadow-[0_0_30px_rgba(107,158,255,0.3)]">
            Add to Chrome — it&rsquo;s free
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer"
             className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-[rgba(120,165,255,0.25)] text-[#7b93bc] font-semibold text-base hover:text-[#e6efff] hover:border-[rgba(120,165,255,0.5)] transition-all">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.41-.01 2.74 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Real popup screenshot */}
        <div className="mt-20 flex justify-center animate-float">
          <img
            src="/screenshots/popup.png"
            alt="Rainmatter Air popup showing AQI gauge and pollutant readings"
            width={320}
            className="rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_50px_rgba(107,158,255,0.12)] border border-[rgba(120,165,255,0.15)]"
          />
        </div>
      </section>

      {/* ── Pollutants ticker ── */}
      <div className="border-y border-[rgba(120,165,255,0.1)] py-4 bg-[rgba(11,19,37,0.5)]">
        <div className="flex gap-10 justify-center flex-wrap px-6">
          {pollutants.map((p) => (
            <span key={p} className="text-xs font-bold tracking-widest uppercase text-[#7b93bc]">{p}</span>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section id="features" className="py-28 px-6 max-w-5xl mx-auto">
        <p className="text-center text-[#6b9eff] text-xs font-bold tracking-[0.18em] uppercase mb-3">Features</p>
        <h2 className="text-center text-4xl font-extrabold tracking-tight mb-16">
          Everything you need,<br className="hidden sm:block" /> nothing you don&rsquo;t
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title}
                 className="p-6 rounded-2xl bg-[rgba(11,19,37,0.97)] border border-[rgba(120,165,255,0.13)] hover:border-[rgba(120,165,255,0.3)] transition-colors group">
              <div className="w-11 h-11 rounded-xl bg-[rgba(107,158,255,0.1)] text-[#6b9eff] flex items-center justify-center mb-4 group-hover:bg-[rgba(107,158,255,0.18)] transition-colors">
                {f.icon}
              </div>
              <h3 className="font-bold text-base mb-2">{f.title}</h3>
              <p className="text-sm text-[#7b93bc] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Screenshots ── */}
      <section className="py-28 px-6 max-w-5xl mx-auto">
        <p className="text-center text-[#6b9eff] text-xs font-bold tracking-[0.18em] uppercase mb-3">Screenshots</p>
        <h2 className="text-center text-4xl font-extrabold tracking-tight mb-16">See it in action</h2>
        <div className="flex flex-col sm:flex-row items-start justify-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <img
              src="/screenshots/popup.png"
              alt="Popup dashboard showing AQI gauge, location, and pollutant breakdown"
              width={300}
              className="rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(107,158,255,0.1)] border border-[rgba(120,165,255,0.15)]"
            />
            <p className="text-sm text-[#7b93bc] text-center">Popup dashboard</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src="/screenshots/settings.png"
              alt="Settings page for configuring API endpoint, provider, and location"
              width={300}
              className="rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(107,158,255,0.1)] border border-[rgba(120,165,255,0.15)]"
            />
            <p className="text-sm text-[#7b93bc] text-center">Settings page</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src="/screenshots/overlay.png"
              alt="Compact AQI overlay badge on a webpage"
              width={180}
              className="rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(107,158,255,0.1)] border border-[rgba(120,165,255,0.15)]"
            />
            <p className="text-sm text-[#7b93bc] text-center">Page overlay</p>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-28 px-6 bg-[rgba(11,19,37,0.5)] border-y border-[rgba(120,165,255,0.08)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#6b9eff] text-xs font-bold tracking-[0.18em] uppercase mb-3">Setup</p>
          <h2 className="text-4xl font-extrabold tracking-tight mb-16">Up and running in minutes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[rgba(107,158,255,0.12)] border border-[rgba(107,158,255,0.25)] text-[#6b9eff] font-black text-lg flex items-center justify-center mb-5">
                  {s.n}
                </div>
                <h3 className="font-bold text-base mb-2">{s.title}</h3>
                <p className="text-sm text-[#7b93bc] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Data sources ── */}
      <section className="py-28 px-6 max-w-4xl mx-auto">
        <p className="text-center text-[#6b9eff] text-xs font-bold tracking-[0.18em] uppercase mb-3">Data</p>
        <h2 className="text-center text-4xl font-extrabold tracking-tight mb-5">Trusted data sources</h2>
        <p className="text-center text-[#7b93bc] text-base max-w-lg mx-auto mb-14 leading-relaxed">
          Connect to Rainmatter&rsquo;s own OAQ network or the global OpenAQ platform.
          Switch sources anytime from Settings.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-[rgba(11,19,37,0.97)] border border-[rgba(120,165,255,0.13)] hover:border-[rgba(120,165,255,0.3)] transition-colors">
            <span className="inline-block px-2.5 py-1 rounded-full bg-[rgba(107,158,255,0.1)] text-[#6b9eff] text-xs font-bold tracking-wide mb-4">RECOMMENDED</span>
            <h3 className="text-xl font-bold mb-3">OAQ — oaq.notf.in</h3>
            <p className="text-[#7b93bc] text-sm leading-relaxed mb-4">
              Rainmatter&rsquo;s own air-quality platform aggregating data from CPCB, Aurassure, and Airnet sensor networks across Indian cities.
            </p>
            <a href="https://oaq.notf.in" target="_blank" rel="noreferrer"
               className="text-[#6b9eff] text-sm font-semibold hover:underline">Get an API key →</a>
          </div>
          <div className="p-8 rounded-2xl bg-[rgba(11,19,37,0.97)] border border-[rgba(120,165,255,0.13)] hover:border-[rgba(120,165,255,0.3)] transition-colors">
            <span className="inline-block px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.06)] text-[#7b93bc] text-xs font-bold tracking-wide mb-4">GLOBAL</span>
            <h3 className="text-xl font-bold mb-3">OpenAQ v3</h3>
            <p className="text-[#7b93bc] text-sm leading-relaxed mb-4">
              Open global air quality data covering 100+ countries. Use a numeric location ID from explore.openaq.org to connect.
            </p>
            <a href="https://openaq.org" target="_blank" rel="noreferrer"
               className="text-[#6b9eff] text-sm font-semibold hover:underline">Learn more →</a>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-[#6b9eff] opacity-[0.05] blur-[120px] rounded-full"/>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5 relative">
          Start breathing<br /><span className="gradient-text">with awareness</span>
        </h2>
        <p className="text-[#7b93bc] text-base max-w-md mx-auto mb-10 leading-relaxed relative">
          Free, open source, and takes under two minutes to set up.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
          <a href={CHROME_STORE_URL} target="_blank" rel="noreferrer"
             className="px-8 py-4 rounded-full bg-[#6b9eff] text-[#08111e] font-bold text-base hover:opacity-90 active:scale-95 transition-all shadow-[0_0_40px_rgba(107,158,255,0.3)]">
            Add to Chrome — it&rsquo;s free
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer"
             className="px-8 py-4 rounded-full border border-[rgba(120,165,255,0.25)] text-[#7b93bc] font-semibold text-base hover:text-[#e6efff] hover:border-[rgba(120,165,255,0.5)] transition-all">
            Star on GitHub
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[rgba(120,165,255,0.1)] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#7b93bc]">
          <span>
            Built by{" "}
            <a href="https://github.com/1n4NO" target="_blank" rel="noreferrer"
               className="text-[#6b9eff] hover:underline">@1n4NO</a>
            {" "}· MIT License
          </span>
          <div className="flex items-center gap-6">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-[#e6efff] transition-colors">GitHub</a>
            <a href={`${GITHUB_URL}/blob/main/PRIVACY.md`} target="_blank" rel="noreferrer" className="hover:text-[#e6efff] transition-colors">Privacy</a>
            <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noreferrer" className="hover:text-[#e6efff] transition-colors">Issues</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
