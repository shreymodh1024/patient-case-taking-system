import { useSyncExternalStore } from "react";
import { getDict } from "./i18n";

export type Role = "assistant" | "patient";

export type ChatMessage = {
  role: Role;
  content: string;
  time: string;
};

export type ExtractedDoc = {
  fileName: string;
  fields: { label: string; value: string }[];
};

export type SocratesKey =
  | "site"
  | "onset"
  | "character"
  | "radiation"
  | "associations"
  | "time"
  | "exacerbating"
  | "severity";

export const SOCRATES_LABELS: Record<SocratesKey, string> = {
  site: "Site",
  onset: "Onset",
  character: "Character",
  radiation: "Radiation",
  associations: "Associated symptoms",
  time: "Timing",
  exacerbating: "Exacerbating / relieving",
  severity: "Severity",
};

export type Summary = {
  chiefComplaint: string;
  hpi: string;
  pastMedicalHistory: string[];
  socratesTags: string[];
  ayushResponses: string[];
};

export type KioskState = {
  language: string;
  consented: boolean;
  abhaId: string | null;
  messages: ChatMessage[];
  captured: SocratesKey[];
  extracted: ExtractedDoc | null;
  summary: Summary | null;
  confirmed: boolean;
  priorityAlert: boolean;
  ayushMode: boolean;
};

const STORAGE_KEY = "medikiosk-session";

export const initialState: KioskState = {
  language: "English",
  consented: false,
  abhaId: null,
  messages: [],
  captured: [],
  extracted: null,
  summary: null,
  confirmed: false,
  priorityAlert: false,
  ayushMode: false,
};

export function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

let state: KioskState = initialState;
let hydrated = false;
const listeners = new Set<() => void>();

function read(): KioskState {
  if (typeof window === "undefined") return initialState;
  if (!hydrated) {
    hydrated = true;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) state = { ...initialState, ...(JSON.parse(raw) as KioskState) };
    } catch {
      /* ignore */
    }
  }
  return state;
}

export function setKioskState(
  patch: Partial<KioskState> | ((s: KioskState) => Partial<KioskState>),
) {
  const current = read();
  const next = { ...current, ...(typeof patch === "function" ? patch(current) : patch) };
  state = next;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function resetKiosk() {
  state = initialState;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function useKiosk(): KioskState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => read(),
    () => initialState,
  );
}

export function getGreeting(language: string): ChatMessage {
  return { role: "assistant", content: getDict(language).greeting, time: "" };
}

export function effectiveMessages(state: KioskState): ChatMessage[] {
  if (state.messages.length === 0) return [getGreeting(state.language)];
  const hasPatient = state.messages.some((m) => m.role === "patient");
  if (!hasPatient && state.messages[0]?.role === "assistant") {
    return [getGreeting(state.language), ...state.messages.slice(1)];
  }
  return state.messages;
}

export const MOCK_EXTRACTION: ExtractedDoc = {
  fileName: "Prescription_March2026.pdf",
  fields: [
    { label: "Diagnosis", value: "Hypertension" },
    { label: "Medication", value: "Amlodipine 5mg" },
    { label: "Last visit", value: "March 2026" },
  ],
};
