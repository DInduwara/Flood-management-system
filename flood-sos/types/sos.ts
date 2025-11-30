// types/sos.ts
export type WaterLevel =
  | "none"
  | "ankle"
  | "knee"
  | "waist"
  | "chest"
  | "roof";

export type EmergencyType =
  | "trapped_by_flood"
  | "evacuation_needed"
  | "medical_emergency"
  | "landslide_risk"
  | "landslide_occurred"
  | "other";

export interface SosFormData {
  fullName: string;
  phoneNumber: string;
  alternatePhone: string;

  address: string;
  landmark: string;
  district: string;
  gpsLocation: string | null;

  waterLevel: WaterLevel | "";
  safeHours: string;
  buildingType: string;
  floorLevel: string;
  additionalInfo: string;

  needsFood: boolean;
  needsWater: boolean;
  needsPower: boolean;

  phoneBatteryPercent: string;

  emergencyType: EmergencyType | "";
  numberOfPeople: string;
  hasChildren: boolean;
  hasElderly: boolean;
  hasDisabled: boolean;
  hasMedical: boolean;
}
