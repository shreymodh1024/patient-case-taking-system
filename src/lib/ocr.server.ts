import { LANGUAGE_ENGLISH_NAMES } from "./i18n";

const OCR_SPACE_URL = "https://api.ocr.space/parse/image";
const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3.7-flash";
const OCR_MAX_FILE_BYTES = 1_000_000;

export type OcrReportSummary = {
  fileName: string;
  summaryText: string;
  fields: { label: string; value: string }[];
};

type OcrSpaceResponse = {
  IsErroredOnProcessing?: boolean;
  ErrorMessage?: string[] | string;
  ParsedResults?: { ParsedText?: string }[];
};

export type ScanReportInput = {
  fileName: string;
  mimeType: string;
  base64Data: string;
  language: string;
};

export function parseScanReportInput(input: unknown): ScanReportInput {
  const value = input as Partial<ScanReportInput> | null;
  return {
    fileName: typeof value?.fileName === "string" ? value.fileName.slice(0, 200) : "report",
    mimeType: typeof value?.mimeType === "string" ? value.mimeType.slice(0, 100) : "application/octet-stream",
    base64Data: typeof value?.base64Data === "string" ? value.base64Data : "",
    language: typeof value?.language === "string" && value.language ? value.language : "English",
  };
}

function estimateBase64Bytes(base64Data: string) {
  const clean = base64Data.replace(/\s/g, "");
  const padding = clean.endsWith("==") ? 2 : clean.endsWith("=") ? 1 : 0;
  return Math.max(0, Math.floor((clean.length * 3) / 4) - padding);
}

function base64ToBlob(base64Data: string, mimeType: string) {
  const binary = atob(base64Data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mimeType || "application/octet-stream" });
}

async function extractTextWithOcrSpace(
  fileName: string,
  mimeType: string,
  base64Data: string,
): Promise<string> {
  const apiKey = process.env["OCR_SPACE_API_KEY"];
  if (!apiKey) throw new Error("OCR is not configured yet. Please contact the front desk.");
  if (!base64Data) throw new Error("The selected report file is empty. Please choose another file.");

  const fileBytes = estimateBase64Bytes(base64Data);
  if (fileBytes > OCR_MAX_FILE_BYTES) {
    throw new Error(
      "That report is too large for scanning. Please upload a compressed PDF or one clear JPG/PNG page under 1 MB.",
    );
  }

  const form = new FormData();
  form.append("apikey", apiKey);
  form.append("file", base64ToBlob(base64Data, mimeType), fileName);
  form.append("filetype", mimeType === "application/pdf" ? "PDF" : "AUTO");
  form.append("isOverlayRequired", "false");
  form.append("detectOrientation", "true");
  form.append("scale", "true");
  form.append("OCREngine", "2");

  const res = await fetch(OCR_SPACE_URL, { method: "POST", body: form });
  if (!res.ok) {
    if (res.status === 413) {
      throw new Error(
        "That report is too large for scanning. Please upload a compressed PDF or one clear JPG/PNG page under 1 MB.",
      );
    }
    throw new Error(`Document scanning service unavailable (${res.status}). Please try again.`);
  }
  const data = (await res.json()) as OcrSpaceResponse;
  if (data.IsErroredOnProcessing) {
    const msg = Array.isArray(data.ErrorMessage) ? data.ErrorMessage.join(" ") : data.ErrorMessage;
    throw new Error(msg || "The document could not be read. Please try a clearer file.");
  }
  const text = (data.ParsedResults ?? [])
    .map((r) => r.ParsedText?.trim() ?? "")
    .filter(Boolean)
    .join("\n\n");
  if (!text) {
    throw new Error(`No readable text was found in ${fileName}. Try a clearer scan or photo.`);
  }
  return text.slice(0, 12_000);
}

async function summarizeForDoctor(
  fileName: string,
  ocrText: string,
  language: string,
): Promise<{ summaryText: string; fields: { label: string; value: string }[] }> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

  const englishName = LANGUAGE_ENGLISH_NAMES[language] ?? language;
  const system = `You are a medical-records summarizer for a hospital intake kiosk. Given raw OCR text extracted from an old medical report, produce a concise briefing for the doctor.
Rules:
- Only state facts present in the text. Never invent values or give diagnoses beyond what the document says.
- Write the summaryText and all field labels/values in ${englishName} (${language}) using its native script.
- Extract up to 6 key fields (e.g. Diagnosis, Medications, Lab values, Report date, Doctor/Hospital, Follow-up advice) — only fields actually present in the document.
Respond with ONLY a JSON object:
{
  "summaryText": "2-4 sentence clinical briefing of this old report for the doctor",
  "fields": [{ "label": "...", "value": "..." }]
}`;

  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: `File: ${fileName}\n\nOCR text:\n${ocrText}` },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (res.status === 429)
      throw new Error("The summarizer is busy right now. Please try again in a moment.");
    if (res.status === 402)
      throw new Error("AI credits are exhausted for this kiosk. Please contact the front desk.");
    throw new Error(`Summarizer unavailable (${res.status}). ${text.slice(0, 180)}`);
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const raw = data.choices?.[0]?.message?.content ?? "{}";
  let parsed: { summaryText?: string; fields?: { label: string; value: string }[] } = {};
  try {
    parsed = JSON.parse(raw.replace(/^```json\s*|```$/g, "").trim());
  } catch {
    parsed = { summaryText: raw };
  }
  return {
    summaryText: parsed.summaryText?.trim() || ocrText.slice(0, 500),
    fields: Array.isArray(parsed.fields) ? parsed.fields.slice(0, 6) : [],
  };
}

export async function scanMedicalReport(
  fileName: string,
  mimeType: string,
  base64Data: string,
  language: string,
): Promise<OcrReportSummary> {
  const ocrText = await extractTextWithOcrSpace(fileName, mimeType, base64Data);
  const summary = await summarizeForDoctor(fileName, ocrText, language);
  return { fileName, ...summary };
}
