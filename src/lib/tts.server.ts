const SARVAM_TTS_URL = "https://api.sarvam.ai/text-to-speech";

export type SynthesizeResult =
  | { ok: true; audios: string[] }
  | { ok: false; error: string };

export async function synthesizeSpeech(
  text: string,
  languageCode: string,
): Promise<SynthesizeResult> {
  const apiKey = process.env["SARVAM_API_KEY"];
  if (!apiKey) return { ok: false, error: "Voice service is not configured." };

  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return { ok: true, audios: [] };

  const response = await fetch(SARVAM_TTS_URL, {
    method: "POST",
    headers: {
      "api-subscription-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: clean.slice(0, 450),
      target_language_code: languageCode,
      speaker: "priya",
      model: "bulbul:v3",
      pace: 1,
      enable_preprocessing: true,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    if (response.status === 401 || response.status === 403) {
      return { ok: false, error: "Voice service rejected the API key." };
    }
    if (response.status === 429) {
      return { ok: false, error: "Voice service is busy. Please try again." };
    }
    return {
      ok: false,
      error: `Voice service unavailable (${response.status}). ${detail.slice(0, 120)}`.trim(),
    };
  }

  const data = (await response.json()) as { audios?: string[] };
  return { ok: true, audios: data.audios ?? [] };
}
