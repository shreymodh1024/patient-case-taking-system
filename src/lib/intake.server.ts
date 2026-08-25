import { LANGUAGE_ENGLISH_NAMES } from "./i18n";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3.7-flash";

export type IntakeTurn = { role: "assistant" | "patient"; content: string };

export type IntakeResult = {
  reply: string;
  captured: string[];
  done: boolean;
  summary: {
    chiefComplaint: string;
    hpi: string;
    pastMedicalHistory: string[];
    socratesTags: string[];
    ayushResponses: string[];
  } | null;
};

const SYSTEM = `You are a clinical intake assistant in a hospital kiosk. You are NOT a diagnostician: never give diagnoses, treatment advice, or reassurance about severity.

Your job is to interview the patient about their presenting symptom using the SOCRATES framework:
site, onset, character, radiation, associations (associated symptoms), time (timing/pattern), exacerbating (exacerbating & relieving factors), severity.

Rules:
- Ask at most TWO short, plain-language questions per turn. No jargon. No bullet lists longer than two items.
- Track which SOCRATES elements the patient has now answered across the whole conversation.
- Also gather brief past medical history (conditions, medications, allergies) once most SOCRATES items are covered.
- When all eight SOCRATES elements are covered, set done=true, thank the patient, and tell them the summary is ready for the doctor.
${"AYUSH_MODE_PLACEHOLDER"}

Always respond with ONLY a JSON object of this shape:
{
  "reply": "your message to the patient",
  "captured": ["site","onset", ...],            // every SOCRATES key covered so far
  "done": false,
  "summary": null                                 // when done=true, provide:
  // { "chiefComplaint": "...", "hpi": "clinical prose paragraph", "pastMedicalHistory": ["..."], "socratesTags": ["S: Lumbar","O: 24h ago"], "ayushResponses": ["..."] }
}`;

export async function runIntakeTurn(
  history: IntakeTurn[],
  language: string,
  extractedNote: string | null,
  ayushMode = false,
): Promise<IntakeResult> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

  const englishName = LANGUAGE_ENGLISH_NAMES[language] ?? language;
  const ayushInstruction = ayushMode
    ? `\n\nAYUSH consultation mode is enabled. After all eight SOCRATES elements are covered, ask two or three short additional questions, one at a time, about Prakriti (Vata, Pitta, or Kapha body constitution), Agni (digestive strength), and Ahara-Vihara (diet and lifestyle). Do not ask these before the standard SOCRATES questions are complete. When finished, include an "ayushResponses" array in the summary with concise answers in ${englishName}.`
    : "";
  const messages = [
    {
      role: "system",
      content:
        SYSTEM.replace("${" + "AYUSH_MODE_PLACEHOLDER}", ayushInstruction) +
        `\n\nIMPORTANT: Respond to the patient ONLY in ${englishName} (${language}), using its native script. All your questions, follow-ups, and the "reply" field must be in ${englishName}. Keep JSON keys and SOCRATES keys in English.` +
        (extractedNote ? `\n\nUploaded document data available: ${extractedNote}` : ""),
    },
    ...history.map((m) => ({
      role: m.role === "patient" ? "user" : "assistant",
      content: m.content,
    })),
  ];

  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (res.status === 429)
      throw new Error("The assistant is busy right now. Please try again in a moment.");
    if (res.status === 402)
      throw new Error("AI credits are exhausted for this kiosk. Please contact the front desk.");
    throw new Error(`Assistant unavailable (${res.status}). ${text.slice(0, 180)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const raw = data.choices?.[0]?.message?.content ?? "{}";
  let parsed: Partial<IntakeResult> = {};
  try {
    parsed = JSON.parse(raw.replace(/^```json\s*|```$/g, "").trim());
  } catch {
    parsed = { reply: raw };
  }

  return {
    reply: parsed.reply?.trim() || "Could you tell me a little more about that?",
    captured: Array.isArray(parsed.captured) ? parsed.captured : [],
    done: Boolean(parsed.done),
    summary: parsed.summary ?? null,
  };
}
