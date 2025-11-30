// app/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SectionCard } from "@/component/SectionCard";
import {
  TextInput,
  TextArea,
  SelectInput,
  PillCheckbox,
} from "@/component/inputs";
import type { SosFormData } from "@/lib/api";
import { submitSosRequest } from "@/lib/api";

const EMPTY_FORM: SosFormData = {
  fullName: "",
  phoneNumber: "",
  alternatePhone: "",
  address: "",
  landmark: "",
  district: "",
  gpsLocation: null,
  waterLevel: "",
  safeHours: "",
  floorLevel: "",
  additionalInfo: "",
  needsFood: false,
  needsWater: false,
  needsPower: false,
  phoneBatteryPercent: "",
  emergencyType: "",
  numberOfPeople: "1",
  hasChildren: false,
  hasElderly: false,
  hasDisabled: false,
  hasMedical: false,
};

export default function HomePage() {
  const [form, setForm] = useState<SosFormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function update<K extends keyof SosFormData>(
    key: K,
    value: SosFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!form.fullName || !form.phoneNumber) {
      setErrorMsg("Please fill in your name and phone number.");
      return;
    }

    try {
      setLoading(true);
      await submitSosRequest(form);
      setSuccessMsg(
        "Your emergency request has been sent to the coordination system."
      );
      setForm(EMPTY_FORM);
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err instanceof Error
          ? `Failed to send request: ${err.message}`
          : "Failed to send request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Emergency Banner */}
      <section className="rounded-2xl bg-red-600 text-white px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <h1 className="text-2xl font-semibold tracking-tight">
                EMERGENCY SOS
              </h1>
            </div>
            <p className="mt-1 text-sm text-red-100">
              Flood &amp; Landslide Rescue – Sri Lanka
            </p>
            <p className="mt-2 text-xs text-red-100">
              Data will be shared with verified responders and admin dashboards.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "View All",
                "Verified",
                "Map",
                "Actions Taken",
                "Emergency Contacts",
              ].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-red-700 shadow-sm hover:bg-white"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm"
            >
              English ▾
            </button>
          </div>
        </div>
      </section>

      {/* Big action buttons */}
      <div className="space-y-3">
        <Link
          href="/help"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <span>🏠</span>
          <span>Offer Help, Find Relief Camps &amp; Shelters</span>
        </Link>

        <Link
          href="/map"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          <span>📍</span>
          <span>Real-time Flood &amp; Landslide Map</span>
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Info */}
        <SectionCard
          title="Your Contact Information"
          icon={<span className="text-lg">👤</span>}
          className="bg-[#EDF5FF]"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <TextInput
                label="Full Name"
                required
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  update("fullName", e.target.value)
                }
              />
            </div>
            <TextInput
              label="Phone Number"
              required
              placeholder="07X XXX XXXX"
              value={form.phoneNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update("phoneNumber", e.target.value)
              }
            />
            <TextInput
              label="Alternate Phone"
              placeholder="Optional"
              value={form.alternatePhone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update("alternatePhone", e.target.value)
              }
            />
          </div>
        </SectionCard>

        {/* Location */}
        <SectionCard
          title="Your Location"
          icon={<span className="text-lg">📍</span>}
          className="bg-[#E9F8EE]"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-slate-700">
                <div className="font-medium">GPS Location</div>
                <div className="text-slate-500 text-[11px]">
                  {form.gpsLocation || "Not captured"}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!navigator.geolocation) return;
                  navigator.geolocation.getCurrentPosition(
                    (pos) => {
                      const value = `${pos.coords.latitude.toFixed(
                        5
                      )},${pos.coords.longitude.toFixed(5)}`;
                      update("gpsLocation", value);
                    },
                    () => {
                      // ignore error for now
                    }
                  );
                }}
                className="self-start rounded-full bg-green-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-green-700"
              >
                Get Location
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <TextInput
                  label="Address / Area"
                  placeholder="Your address or area name"
                  value={form.address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    update("address", e.target.value)
                  }
                />
              </div>
              <TextInput
                label="Landmark"
                placeholder="Nearby landmark"
                value={form.landmark}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  update("landmark", e.target.value)
                }
              />
              <SelectInput
                label="District"
                value={form.district}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  update("district", e.target.value)
                }
              >
                <option value="">Select</option>
                <option value="colombo">Colombo</option>
                <option value="gampaha">Gampaha</option>
                <option value="kalutara">Kalutara</option>
              </SelectInput>
            </div>

            <p className="mt-1 text-[11px] text-slate-500">
              Your location will be visible only to verified rescue and admin
              teams.
            </p>
          </div>
        </SectionCard>

        {/* Current Situation */}
        <SectionCard
          title="Current Situation"
          icon={<span className="text-lg">🌊</span>}
          className="bg-[#FFF9E6]"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SelectInput
              label="Water Level"
              value={form.waterLevel}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                update("waterLevel", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="none">No water</option>
              <option value="ankle">Up to ankle</option>
              <option value="knee">Knee level</option>
              <option value="waist">Waist level</option>
              <option value="chest">Above chest</option>
              <option value="roof">At roof level</option>
            </SelectInput>
            <TextInput
              label="Safe for (hours)"
              placeholder="How long can you stay safely?"
              value={form.safeHours}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update("safeHours", e.target.value)
              }
            />
            <TextInput
              label="Floor Level"
              placeholder="Ground=0, 1st=1"
              value={form.floorLevel}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update("floorLevel", e.target.value)
              }
            />
          </div>

          <div className="mt-4">
            <TextArea
              label="Additional Information"
              placeholder="Any other important details..."
              value={form.additionalInfo}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                update("additionalInfo", e.target.value)
              }
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <PillCheckbox
              label="Food"
              checked={form.needsFood}
              onChange={(v: boolean) => update("needsFood", v)}
            />
            <PillCheckbox
              label="Water"
              checked={form.needsWater}
              onChange={(v: boolean) => update("needsWater", v)}
            />
            <PillCheckbox
              label="Power"
              checked={form.needsPower}
              onChange={(v: boolean) => update("needsPower", v)}
            />
          </div>

          <div className="mt-4 max-w-xs">
            <TextInput
              label="Phone Battery %"
              placeholder="Current battery level"
              value={form.phoneBatteryPercent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update("phoneBatteryPercent", e.target.value)
              }
            />
          </div>
        </SectionCard>

        {/* Emergency Details */}
        <SectionCard
          title="Emergency Details"
          icon={<span className="text-lg">🚨</span>}
          className="bg-[#FFECEC]"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SelectInput
              label="Emergency Type"
              value={form.emergencyType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                update("emergencyType", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="trapped_by_flood">Trapped by Flood</option>
              <option value="evacuation_needed">Evacuation Needed</option>
              <option value="medical_emergency">Medical Emergency</option>
              <option value="landslide_risk">Landslide Risk</option>
              <option value="landslide_occurred">Landslide Occurred</option>
              <option value="other">Other</option>
            </SelectInput>
            <TextInput
              label="Number of People"
              type="number"
              min={1}
              value={form.numberOfPeople}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update("numberOfPeople", e.target.value)
              }
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <PillCheckbox
              label="Children"
              checked={form.hasChildren}
              onChange={(v: boolean) => update("hasChildren", v)}
            />
            <PillCheckbox
              label="Elderly"
              checked={form.hasElderly}
              onChange={(v: boolean) => update("hasElderly", v)}
            />
            <PillCheckbox
              label="Disabled"
              checked={form.hasDisabled}
              onChange={(v: boolean) => update("hasDisabled", v)}
            />
            <PillCheckbox
              label="Medical"
              checked={form.hasMedical}
              onChange={(v: boolean) => update("hasMedical", v)}
            />
          </div>
        </SectionCard>

        {/* Status & submit */}
        {errorMsg && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
            {errorMsg}
          </p>
        )}
        {successMsg && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-2">
            {successMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-4 text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-75"
        >
          <span>⚠️</span>
          <span>
            {loading ? "Sending Emergency Request..." : "SEND EMERGENCY REQUEST"}
          </span>
        </button>

        <p className="text-[11px] text-slate-500 text-center">
          Your request will be sent to the disaster management backend and made
          available to admin / responder dashboards.
        </p>
      </form>
    </div>
  );
}
