"use client";

import dynamic from "next/dynamic";

const AqiMapInner = dynamic(() => import("./aqi-map-inner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[480px] rounded-2xl border border-[rgba(120,165,255,0.13)] bg-[rgba(11,19,37,0.5)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-[#7b93bc]">
        <span className="w-5 h-5 rounded-full border-2 border-[#6b9eff] border-t-transparent animate-spin" />
        <span className="text-sm">Loading map…</span>
      </div>
    </div>
  ),
});

export default function AqiMap() {
  return <AqiMapInner />;
}
