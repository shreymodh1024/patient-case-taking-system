import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type SavedCase = {
  id: string;
  createdAt: string;
  language: string | null;
  chiefComplaint: string | null;
  hpi: string | null;
  pastMedicalHistory: string[];
  socratesTags: string[];
  ayushResponses: string[];
  extracted: {
    fileName?: string | undefined;
    ocrSummary?: string | undefined;
    fields?: { label: string; value: string }[] | undefined;
  } | null;
};

function serverClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
          h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const savePatientCase = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      patientId: number;
      language?: string | null;
      chiefComplaint?: string | null;
      hpi?: string | null;
      pastMedicalHistory?: string[];
      socratesTags?: string[];
      ayushResponses?: string[];
      extracted?: SavedCase["extracted"];
    }) => {
      if (!Number.isInteger(input.patientId) || input.patientId <= 0) {
        throw new Error("A valid numeric patient ID is required.");
      }
      return input;
    },
  )
  .handler(async ({ data }) => {
    const { error } = await serverClient()
      .from("patient_cases")
      .insert({
        patient_id: data.patientId,
        language: data.language ?? null,
        chief_complaint: data.chiefComplaint ?? null,
        hpi: data.hpi ?? null,
        past_medical_history: data.pastMedicalHistory ?? [],
        socrates_tags: data.socratesTags ?? [],
        ayush_responses: data.ayushResponses ?? [],
        extracted: (data.extracted ?? null) as never,
      });
    if (error) return { ok: false as const, error: error.message };
    return { ok: true as const };
  });

export const listPatientCases = createServerFn({ method: "POST" })
  .inputValidator((input: { patientId: number }) => {
    if (!Number.isInteger(input.patientId) || input.patientId <= 0) {
      throw new Error("A valid numeric patient ID is required.");
    }
    return input;
  })
  .handler(async ({ data }): Promise<{ cases: SavedCase[]; error?: string }> => {
    const { data: rows, error } = await serverClient()
      .from("patient_cases")
      .select(
        "id, created_at, language, chief_complaint, hpi, past_medical_history, socrates_tags, ayush_responses, extracted",
      )
      .eq("patient_id", data.patientId)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) return { cases: [], error: error.message };

    return {
      cases: (rows ?? []).map((r) => ({
        id: r.id,
        createdAt: r.created_at,
        language: r.language,
        chiefComplaint: r.chief_complaint,
        hpi: r.hpi,
        pastMedicalHistory: r.past_medical_history ?? [],
        socratesTags: r.socrates_tags ?? [],
        ayushResponses: r.ayush_responses ?? [],
        extracted: (r.extracted ?? null) as SavedCase["extracted"],
      })),
    };
  });
