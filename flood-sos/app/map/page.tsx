// app/map/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

type HazardFilter = "all" | "flood" | "landslide";

type HazardKind =
  | "flood_major"
  | "flood_minor"
  | "flood_alert"
  | "landslide_high"
  | "landslide_moderate";

interface DistrictStatus {
  id: string;
  district: string;
  hazard: HazardKind;
  severityLabel: string;
  description: string;
  peopleAffected: number;
  lastUpdated: string;
}

const MOCK_DISTRICT_STATUSES: DistrictStatus[] = [
  {
    id: "colombo-flood",
    district: "Colombo",
    hazard: "flood_major",
    severityLabel: "Major Flood",
    description: "Kelani River over spill in several GN divisions.",
    peopleAffected: 3500,
    lastUpdated: "2025-11-30 09:30",
  },
  {
    id: "gampaha-flood",
    district: "Gampaha",
    hazard: "flood_minor",
    severityLabel: "Minor Flood",
    description: "Low-lying areas near Attanagalu Oya affected.",
    peopleAffected: 1200,
    lastUpdated: "2025-11-30 09:10",
  },
  {
    id: "kegalle-landslide",
    district: "Kegalle",
    hazard: "landslide_high",
    severityLabel: "High Landslide Risk",
    description: "Soil saturation in hilly estates; evacuation advised.",
    peopleAffected: 640,
    lastUpdated: "2025-11-30 09:20",
  },
  {
    id: "ratnapura-flood",
    district: "Ratnapura",
    hazard: "flood_alert",
    severityLabel: "Flood Alert",
    description: "River levels rising; monitor closely.",
    peopleAffected: 900,
    lastUpdated: "2025-11-30 09:05",
  },
  {
    id: "nuwara-landslide",
    district: "Nuwara Eliya",
    hazard: "landslide_moderate",
    severityLabel: "Moderate Landslide Risk",
    description: "Isolated slope failures possible in high rainfall areas.",
    peopleAffected: 300,
    lastUpdated: "2025-11-30 08:55",
  },
];

function hazardFilterMatch(filter: HazardFilter, hazard: HazardKind): boolean {
  if (filter === "all") return true;
  if (filter === "flood") {
    return hazard === "flood_major" || hazard === "flood_minor" || hazard === "flood_alert";
  }
  // landslide
  return hazard === "landslide_high" || hazard === "landslide_moderate";
}

export default function MapPage() {
  const [filter, setFilter] = useState<HazardFilter>("all");

  const filteredStatuses = MOCK_DISTRICT_STATUSES.filter((item) =>
    hazardFilterMatch(filter, item.hazard)
  );

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold text-slate-900">
          Real-time Flood &amp; Landslide Map
        </h1>
        <Link
          href="/"
          className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          ← Back to SOS
        </Link>
      </div>

      {/* Summary + filters */}
      <section className="rounded-2xl bg-white px-4 py-3 shadow-sm border border-slate-100">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium text-slate-700 uppercase tracking-wide">
              Live Situation (Demo Data)
            </p>
            <p className="text-xs text-slate-500">
              Showing current flood and landslide alerts from mock data. Later
              this will connect to Django + MongoDB + official APIs.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["all", "flood", "landslide"] as HazardFilter[]).map((value) => {
              const label =
                value === "all"
                  ? "All hazards"
                  : value === "flood"
                  ? "Floods"
                  : "Landslides";
              const active = filter === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={
                    active
                      ? "rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white"
                      : "rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                  }
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map + list layout */}
      <section className="grid gap-6 md:grid-cols-[2fr,1.4fr]">
        {/* Map placeholder */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col">
          <header className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Sri Lanka – Flood &amp; Landslide Map
              </p>
              <p className="text-xs text-slate-500">
                As of 2025-11-30 09:30 (sample timestamp)
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
              >
                My location
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
              >
                Refresh
              </button>
            </div>
          </header>

          <div className="relative flex-1 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center">
            <p className="text-xs text-sky-800 text-center px-4">
              Map placeholder – later we will render a real map of Sri Lanka
              and overlay API data (flood levels, landslide risk, and SOS
              requests).
            </p>
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-slate-700">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-600" /> Major Flood
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-orange-500" /> Minor Flood
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-yellow-400" /> Flood Alert
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-800" /> High Landslide Risk
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> Moderate Landslide Risk
            </span>
          </div>
        </div>

        {/* Right panel – district alerts */}
        <aside className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col">
          <header className="mb-3">
            <p className="text-sm font-semibold text-slate-800">
              District Alerts ({filteredStatuses.length})
            </p>
            <p className="text-xs text-slate-500">
              Filter by hazard type using the chips above. These are sample
              cards; later we load them from the backend.
            </p>
          </header>

          <div className="space-y-3 overflow-auto">
            {filteredStatuses.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">
                    {item.district}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {item.lastUpdated}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] font-semibold text-slate-700">
                  {item.severityLabel}
                </p>
                <p className="mt-1 text-[11px] text-slate-600">
                  {item.description}
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Approx. people affected:{" "}
                  <span className="font-semibold">
                    {item.peopleAffected.toLocaleString("en-LK")}
                  </span>
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    className="rounded-full bg-indigo-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-indigo-700"
                  >
                    View SOS requests
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                  >
                    View relief camps
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
