"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

const GITHUB_URL = "https://github.com/1n4NO/rainmatter-air-extension";

const steps = [
  {
    n: "1",
    title: "Download the extension",
    desc: (
      <>
        Go to the{" "}
        <a
          href={`${GITHUB_URL}/releases`}
          target="_blank"
          rel="noreferrer"
          className="text-[#6b9eff] hover:underline"
        >
          GitHub Releases page
        </a>{" "}
        and download the latest <code className="bg-[rgba(255,255,255,0.08)] px-1.5 py-0.5 rounded text-xs">rainmatter-air-*.zip</code> file. Unzip it anywhere on your computer.
      </>
    ),
  },
  {
    n: "2",
    title: "Open Chrome Extensions",
    desc: (
      <>
        In Chrome, navigate to{" "}
        <code className="bg-[rgba(255,255,255,0.08)] px-1.5 py-0.5 rounded text-xs">chrome://extensions</code> and
        toggle on <strong>Developer mode</strong> in the top-right corner.
      </>
    ),
  },
  {
    n: "3",
    title: "Load unpacked",
    desc: "Click Load unpacked and select the unzipped folder. The extension will appear in your toolbar immediately.",
  },
  {
    n: "4",
    title: "Configure your location",
    desc: "Click the extension icon → Settings. Enter your OAQ or OpenAQ API key, pick a city and station, and hit Save.",
  },
];

export function InstallButton({ className, children }: { className: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-[9999] overflow-y-auto bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="min-h-full flex items-center justify-center p-6 py-10">
          <div
            className="relative w-full max-w-lg bg-[#0b1325] border border-[rgba(120,165,255,0.18)] rounded-3xl p-8 shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)] text-[#7b93bc] hover:text-[#e6efff] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            <p className="text-[#6b9eff] text-xs font-bold tracking-[0.18em] uppercase mb-2">Coming soon</p>
            <h2 className="text-2xl font-extrabold tracking-tight mb-1">Chrome Web Store listing is on the way</h2>
            <p className="text-sm text-[#7b93bc] mb-8">
              Until then, you can install Rainmatter Air directly from GitHub in under a minute.
            </p>

            <ol className="flex flex-col gap-6">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[rgba(107,158,255,0.12)] border border-[rgba(107,158,255,0.25)] text-[#6b9eff] font-black text-sm flex items-center justify-center">
                    {s.n}
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5">{s.title}</p>
                    <p className="text-sm text-[#7b93bc] leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 pt-6 border-t border-[rgba(120,165,255,0.1)] flex flex-col sm:flex-row gap-3">
              <a
                href={`${GITHUB_URL}/releases`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center px-5 py-3 rounded-full bg-[#6b9eff] text-[#08111e] font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
              >
                Download from GitHub
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center px-5 py-3 rounded-full border border-[rgba(120,165,255,0.25)] text-[#7b93bc] font-semibold text-sm hover:text-[#e6efff] hover:border-[rgba(120,165,255,0.5)] transition-all"
              >
                View source on GitHub
              </a>
            </div>
          </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
