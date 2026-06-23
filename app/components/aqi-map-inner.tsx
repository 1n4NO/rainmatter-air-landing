"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { CityData } from "../api/aqi/route";

function aqiColor(aqi: number | null): string {
  if (!aqi) return "#64748b";
  if (aqi <= 50)  return "#22c55e";
  if (aqi <= 100) return "#84cc16";
  if (aqi <= 200) return "#eab308";
  if (aqi <= 300) return "#f97316";
  if (aqi <= 400) return "#ef4444";
  return "#dc2626";
}

function aqiRadius(aqi: number | null): number {
  if (!aqi) return 8;
  return Math.max(9, Math.min(22, aqi / 18));
}

function tooltipHtml(city: CityData): string {
  const color = aqiColor(city.aqi);
  return `
    <div style="background:#0b1325;border:1px solid rgba(120,165,255,0.2);border-radius:10px;padding:8px 12px;color:#e6efff;min-width:110px;font-family:system-ui,sans-serif">
      <div style="font-weight:700;font-size:13px;margin-bottom:2px">${city.name}</div>
      ${city.aqi != null
        ? `<div style="font-size:22px;font-weight:900;color:${color};line-height:1.2">${city.aqi}</div>
           <div style="font-size:11px;color:${color};font-weight:600">${city.category}</div>`
        : `<div style="font-size:12px;color:#7b93bc">No data</div>`
      }
    </div>`;
}

export default function AqiMapInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cities, setCities]       = useState<CityData[]>([]);
  const [live, setLive]           = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [apiKey, setApiKey]       = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load demo data on mount
  useEffect(() => {
    fetch("/api/aqi").then(r => r.json()).then(d => setCities(d.cities ?? [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (showPanel) setTimeout(() => inputRef.current?.focus(), 50);
  }, [showPanel]);

  // Build / rebuild Leaflet map whenever cities data changes
  useEffect(() => {
    if (!containerRef.current || cities.length === 0) return;

    let map: import("leaflet").Map | null = null;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        center: [22, 82],
        zoom: 5,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      cities.forEach((city) => {
        if (!map) return;
        L.circleMarker([city.lat, city.lng], {
          radius: aqiRadius(city.aqi),
          fillColor: aqiColor(city.aqi),
          fillOpacity: 0.85,
          color: aqiColor(city.aqi),
          weight: 1.5,
          opacity: 0.6,
        })
          .bindTooltip(tooltipHtml(city), {
            direction: "top",
            offset: [0, -6],
            opacity: 1,
            className: "leaflet-aqi-tooltip",
          })
          .addTo(map);
      });
    });

    // Proper cleanup: map.remove() clears _leaflet_id so StrictMode double-mount is safe
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [cities]);

  async function fetchLive(e: React.FormEvent) {
    e.preventDefault();
    if (!apiKey.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/aqi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: apiKey.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unknown error");
      setCities(data.cities ?? []);
      setLive(true);
      setUpdatedAt(data.updatedAt);
      setShowPanel(false);
      setApiKey("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch live data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full">
      {/* Status bar */}
      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
            live
              ? "bg-green-500/15 text-green-400 border border-green-500/25"
              : "bg-white/5 text-[#7b93bc] border border-white/10"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${live ? "bg-green-400 animate-pulse" : "bg-[#7b93bc]"}`} />
            {live ? "Live" : "Demo data"}
          </span>
          {live && updatedAt && (
            <span className="text-xs text-[#7b93bc]">
              Updated {new Date(updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>
        <button
          onClick={() => { setShowPanel(v => !v); setError(null); }}
          className="text-xs font-semibold text-[#6b9eff] hover:underline"
        >
          {showPanel ? "Cancel" : live ? "Refresh live data →" : "Go live with your OAQ key →"}
        </button>
      </div>

      {/* API key panel */}
      {showPanel && (
        <form
          onSubmit={fetchLive}
          className="mb-3 flex flex-col sm:flex-row gap-2 p-4 rounded-2xl bg-[rgba(11,19,37,0.97)] border border-[rgba(120,165,255,0.18)]"
        >
          <input
            ref={inputRef}
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="oaq_live_..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(120,165,255,0.18)] text-[#e6efff] placeholder-[#7b93bc] text-sm focus:outline-none focus:border-[rgba(107,158,255,0.5)] focus:ring-1 focus:ring-[rgba(107,158,255,0.2)]"
          />
          <button
            type="submit"
            disabled={loading || !apiKey.trim()}
            className="px-5 py-2.5 rounded-xl bg-[#6b9eff] text-[#08111e] font-bold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-wait transition-all whitespace-nowrap"
          >
            {loading ? "Fetching…" : "Fetch live data"}
          </button>
          {error && <p className="w-full text-xs text-red-400 mt-1">{error}</p>}
        </form>
      )}

      {/* Map container */}
      <div className="rounded-2xl overflow-hidden border border-[rgba(120,165,255,0.13)] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div ref={containerRef} style={{ height: "480px", width: "100%" }} />
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 justify-center">
        {[
          { label: "Good",        color: "#22c55e", range: "0–50"    },
          { label: "Satisfactory",color: "#84cc16", range: "51–100"  },
          { label: "Moderate",    color: "#eab308", range: "101–200" },
          { label: "Poor",        color: "#f97316", range: "201–300" },
          { label: "Very Poor",   color: "#ef4444", range: "301–400" },
          { label: "Severe",      color: "#dc2626", range: "401+"    },
        ].map(({ label, color, range }) => (
          <span key={label} className="flex items-center gap-1.5 text-xs text-[#7b93bc]">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
            {label} <span className="text-[#4a607a]">({range})</span>
          </span>
        ))}
      </div>
    </div>
  );
}
