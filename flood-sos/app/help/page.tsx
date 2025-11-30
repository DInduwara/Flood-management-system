// app/help/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SectionCard } from "@/component/SectionCard";
import { TextInput, TextArea, SelectInput } from "@/component/inputs";

interface ReliefCamp {
  id: string;
  name: string;
  district: string;
  location: string;
  capacity: number;
  currentlySheltered: number;
  needs: string[];
}

const MOCK_CAMPS: ReliefCamp[] = [
  {
    id: "camp-1",
    name: "Kaduwela Maha Vidyalaya Camp",
    district: "Colombo",
    location: "Kaduwela town, main school hall",
    capacity: 400,
    currentlySheltered: 260,
    needs: ["Dry rations", "Drinking water", "Infant milk"],
  },
  {
    id: "camp-2",
    name: "Gampaha Community Centre Camp",
    district: "Gampaha",
    location: "Near main bus stand",
    capacity: 300,
    currentlySheltered: 190,
    needs: ["Mattresses", "Bedsheets"],
  },
  {
    id: "camp-3",
    name: "Kegalle Temple Premises Camp",
    district: "Kegalle",
    location: "Temple hall, upper ground",
    capacity: 200,
    currentlySheltered: 140,
    needs: ["Medical supplies", "Volunteers"],
  },
];

export default function HelpPage() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  const filteredCamps = selectedDistrict
    ? MOCK_CAMPS.filter(
        (camp) => camp.district.toLowerCase() === selectedDistrict
      )
    : MOCK_CAMPS;

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleOfferHelp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    // UI-only: later we send this to Django backend
    const formData = new FormData(e.currentTarget);
    // eslint-disable-next-line no-console
    console.log("Offer help payload (demo):", Object.fromEntries(formData));

    await new Promise((r) => setTimeout(r, 800));
    setMessage("Thank you for your support. Your offer has been recorded (demo).");

    e.currentTarget.reset();
    setSubmitting(false);
  }

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold text-slate-900">
          Offer Help &amp; Relief Camps
        </h1>
        <Link
          href="/"
          className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          ← Back to SOS
        </Link>
      </div>

      <p className="text-xs text-slate-600">
        This page is for people and organisations who can provide help:
        food, water, transport, medical support, temporary shelter, etc.
        Everything is UI-only for now; later it will connect to the Django
        backend and official coordination teams.
      </p>

      {/* Layout: camps list + offer form */}
      <section className="grid gap-6 md:grid-cols-[1.6fr,1.4fr]">
        {/* Camps list */}
        <SectionCard
          title="Nearby Relief Camps"
          icon={<span className="text-lg">🏕️</span>}
          className="bg-white"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <p className="text-xs text-slate-600">
              These are sample relief camps. Filter by district for demo.
            </p>
            <SelectInput
              label="District filter"
              className="w-40"
              value={selectedDistrict}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedDistrict(e.target.value)
              }
            >
              <option value="">All</option>
              <option value="colombo">Colombo</option>
              <option value="gampaha">Gampaha</option>
              <option value="kegalle">Kegalle</option>
            </SelectInput>
          </div>

          <div className="space-y-3">
            {filteredCamps.map((camp) => {
              const occupancy =
                (camp.currentlySheltered / camp.capacity) * 100;
              return (
                <div
                  key={camp.id}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-slate-800">
                        {camp.name}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {camp.district} • {camp.location}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700">
                      {Math.round(occupancy)}% full
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600">
                    Capacity: {camp.currentlySheltered} / {camp.capacity} people
                  </p>
                  <p className="mt-1 text-[11px] text-slate-600">
                    Needs:{" "}
                    <span className="font-medium">
                      {camp.needs.join(", ")}
                    </span>
                  </p>
                  <div className="mt-2">
                    <button
                      type="button"
                      className="rounded-full bg-blue-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-blue-700"
                    >
                      Offer help to this camp
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* Offer help form */}
        <SectionCard
          title="Register Your Help"
          icon={<span className="text-lg">🤝</span>}
          className="bg-[#EDF5FF]"
        >
          <form onSubmit={handleOfferHelp} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput
                label="Your Name / Organisation"
                name="helperName"
                required
                placeholder="Your name or organisation"
              />
              <TextInput
                label="Contact Number"
                name="helperPhone"
                required
                placeholder="07X XXX XXXX"
              />
            </div>
            <SelectInput
              label="District"
              name="helperDistrict"
              required
            >
              <option value="">Select district</option>
              <option value="colombo">Colombo</option>
              <option value="gampaha">Gampaha</option>
              <option value="kegalle">Kegalle</option>
              {/* TODO: add all districts */}
            </SelectInput>
            <TextArea
              label="What can you provide?"
              name="supportDetails"
              required
              placeholder="Example: cooked meals for 100 people per day, van for transport, medical team..."
            />
            <TextArea
              label="Preferred areas or camps"
              name="preferredAreas"
              placeholder="If you prefer specific districts, camps, or GN divisions, mention them here."
            />

            {message && (
              <p className="text-xs text-green-700 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {submitting ? "Submitting offer..." : "Submit Offer to Help"}
            </button>
          </form>
        </SectionCard>
      </section>
    </div>
  );
}
