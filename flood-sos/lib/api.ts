// lib/api.ts
export interface SosFormData {
  fullName: string;
  phoneNumber: string;
  alternatePhone: string;
  address: string;
  landmark: string;
  district: string;
  gpsLocation: string | null;
  waterLevel: string;
  safeHours: string;
  floorLevel: string;
  additionalInfo: string;
  needsFood: boolean;
  needsWater: boolean;
  needsPower: boolean;
  phoneBatteryPercent: string;
  emergencyType: string;
  numberOfPeople: string;
  hasChildren: boolean;
  hasElderly: boolean;
  hasDisabled: boolean;
  hasMedical: boolean;
}

export interface HelpOfferForm {
  helperName: string;
  helperPhone: string;
  helperDistrict: string;
  supportDetails: string;
  preferredAreas: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function submitSosRequest(form: SosFormData) {
  const payload = {
    full_name: form.fullName,
    phone_number: form.phoneNumber,
    alternate_phone_number: form.alternatePhone || null,
    address: form.address,
    landmark: form.landmark,
    district: form.district,
    gps_location: form.gpsLocation ?? "",
    water_level: form.waterLevel || "",
    safe_hours: form.safeHours || "",
    floor_level: form.floorLevel || "",
    additional_info: form.additionalInfo || "",
    needs_food: form.needsFood,
    needs_medicine: false, // we don't collect this yet in UI
    need_power: form.needsPower,
    need_water: form.needsWater,
    phone_battery_percentage: form.phoneBatteryPercent
      ? Number(form.phoneBatteryPercent)
      : null,
    emergency_type: form.emergencyType || "",
    number_of_people: form.numberOfPeople
      ? Number(form.numberOfPeople)
      : 1,
    has_children: form.hasChildren,
    has_elderly: form.hasElderly,
    has_disabled: form.hasDisabled,
    has_medical: form.hasMedical,
  };

  const res = await fetch(`${API_BASE_URL}/sos-requests/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

export async function submitHelpOffer(form: HelpOfferForm) {
  const payload = {
    helper_name: form.helperName,
    helper_phone: form.helperPhone,
    helper_district: form.helperDistrict,
    support_details: form.supportDetails,
    preferred_areas: form.preferredAreas || "",
  };

  const res = await fetch(`${API_BASE_URL}/help-offers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}
