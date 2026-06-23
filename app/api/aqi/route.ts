import { NextResponse } from 'next/server';

const OAQ_BROKER_URL = 'https://us-central1-oaqdms.cloudfunctions.net/brokerData';
const OAQ_BASE_URL   = 'https://oaq.notf.in/v1';

export interface CityData {
  name: string;
  lat: number;
  lng: number;
  aqi: number | null;
  category: string | null;
}

const CITIES: Omit<CityData, 'aqi' | 'category'>[] = [
  { name: 'Delhi',       lat: 28.61, lng: 77.21 },
  { name: 'Mumbai',      lat: 19.08, lng: 72.88 },
  { name: 'Kolkata',     lat: 22.57, lng: 88.36 },
  { name: 'Chennai',     lat: 13.08, lng: 80.27 },
  { name: 'Bengaluru',   lat: 12.97, lng: 77.59 },
  { name: 'Hyderabad',   lat: 17.39, lng: 78.49 },
  { name: 'Ahmedabad',   lat: 23.02, lng: 72.57 },
  { name: 'Lucknow',     lat: 26.85, lng: 80.95 },
  { name: 'Jaipur',      lat: 26.91, lng: 75.79 },
  { name: 'Bhubaneswar', lat: 20.30, lng: 85.82 },
  { name: 'Nagpur',      lat: 21.14, lng: 79.09 },
  { name: 'Surat',       lat: 21.17, lng: 72.83 },
  { name: 'Pune',        lat: 18.52, lng: 73.86 },
  { name: 'Patna',       lat: 25.61, lng: 85.14 },
  { name: 'Kanpur',      lat: 26.44, lng: 80.33 },
];

// Realistic demo values so the map looks populated before the user goes live
const DEMO_AQI: Record<string, { aqi: number; category: string }> = {
  Delhi:       { aqi: 168, category: 'Moderate' },
  Mumbai:      { aqi:  72, category: 'Satisfactory' },
  Kolkata:     { aqi: 134, category: 'Moderate' },
  Chennai:     { aqi:  58, category: 'Satisfactory' },
  Bengaluru:   { aqi:  44, category: 'Good' },
  Hyderabad:   { aqi:  89, category: 'Satisfactory' },
  Ahmedabad:   { aqi: 112, category: 'Moderate' },
  Lucknow:     { aqi: 198, category: 'Moderate' },
  Jaipur:      { aqi: 145, category: 'Moderate' },
  Bhubaneswar: { aqi:  67, category: 'Satisfactory' },
  Nagpur:      { aqi:  93, category: 'Satisfactory' },
  Surat:       { aqi:  78, category: 'Satisfactory' },
  Pune:        { aqi:  62, category: 'Satisfactory' },
  Patna:       { aqi: 187, category: 'Moderate' },
  Kanpur:      { aqi: 221, category: 'Poor' },
};

// ── AQI calculation (CPCB breakpoints) ───────────────────────────────────────

const AQI_RANGES: Record<string, number[][]> = {
  pm25: [[0,30,0,50],[31,60,51,100],[61,90,101,200],[91,120,201,300],[121,250,301,400],[251,1e9,401,500]],
  pm10: [[0,50,0,50],[51,100,51,100],[101,250,101,200],[251,350,201,300],[351,430,301,400],[431,1e9,401,500]],
  no2:  [[0,40,0,50],[41,80,51,100],[81,180,101,200],[181,280,201,300],[281,400,301,400],[401,1e9,401,500]],
  so2:  [[0,40,0,50],[41,80,51,100],[81,380,101,200],[381,800,201,300],[801,1600,301,400],[1601,1e9,401,500]],
};

function subIndex(param: string, value: number): number | null {
  const ranges = AQI_RANGES[param];
  if (!ranges || !Number.isFinite(value) || value < 0) return null;
  const r = ranges.find(([, hi]) => value <= hi) ?? ranges[ranges.length - 1];
  const [lo, hi, ilo, ihi] = r;
  if (hi >= 1e9) return Math.min(500, Math.round(ilo + (value - lo)));
  return Math.min(500, Math.round(((ihi - ilo) / (hi - lo)) * (value - lo) + ilo));
}

function category(aqi: number): string {
  if (aqi <= 50)  return 'Good';
  if (aqi <= 100) return 'Satisfactory';
  if (aqi <= 200) return 'Moderate';
  if (aqi <= 300) return 'Poor';
  if (aqi <= 400) return 'Very Poor';
  return 'Severe';
}

// ── OAQ fetching ─────────────────────────────────────────────────────────────

async function getSignature(apiKey: string): Promise<string> {
  const url = `${OAQ_BROKER_URL}?action=api_session&token=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Broker HTTP ${res.status}`);
  const data = await res.json();
  const sig = data.signature ?? data.Signature;
  if (!sig || typeof sig !== 'string') throw new Error('Unexpected broker response format');
  return sig;
}

async function fetchCityAqi(city: string, sig: string): Promise<{ aqi: number; category: string } | null> {
  const url = `${OAQ_BASE_URL}/provider=cpcb/live/by_city/${encodeURIComponent(city.toLowerCase())}/map_latest.json?${sig}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    const sensors: Record<string, unknown>[] = data.sensors ?? data.stations ?? (Array.isArray(data) ? data : []);
    if (!sensors.length) return null;
    const s = sensors[0];
    const indices = (['pm25','pm10','no2','so2'] as const)
      .map(p => s[p] != null ? subIndex(p, Number(s[p])) : null)
      .filter((v): v is number => v !== null);
    if (!indices.length) return null;
    const aqi = Math.max(...indices);
    return { aqi, category: category(aqi) };
  } catch {
    return null;
  }
}

// ── Route handlers ────────────────────────────────────────────────────────────

// GET /api/aqi → demo data (no key required)
export async function GET() {
  const cities: CityData[] = CITIES.map(c => ({
    ...c,
    ...(DEMO_AQI[c.name] ?? { aqi: null, category: null }),
  }));
  return NextResponse.json({ cities, live: false, updatedAt: null });
}

// POST /api/aqi  body: { key: string } → live OAQ data
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const apiKey = typeof body?.key === 'string' ? body.key.trim() : '';
  if (!apiKey) return NextResponse.json({ error: 'API key is required' }, { status: 400 });

  try {
    const sig = await getSignature(apiKey);
    const results = await Promise.allSettled(CITIES.map(c => fetchCityAqi(c.name, sig)));
    const cities: CityData[] = CITIES.map((c, i) => {
      const r = results[i];
      const data = r.status === 'fulfilled' ? r.value : null;
      return { ...c, aqi: data?.aqi ?? null, category: data?.category ?? null };
    });
    return NextResponse.json({ cities, live: true, updatedAt: new Date().toISOString() });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
