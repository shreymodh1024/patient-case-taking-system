const SARVAM_TTS_URL = "https://api.sarvam.ai/text-to-speech";

const MAX_CHARS = 450;

function chunkText(text: string): string[] {
  const sentences = text.match(/[^.!?।\n]+[.!?।\n]*/g) ?? [text];
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if (sentence.length > MAX_CHARS) {
      if (current.trim()) chunks.push(current.trim());
      current = "";
      for (let i = 0; i < sentence.length; i += MAX_CHARS) {
        chunks.push(sentence.slice(i, i + MAX_CHARS));
      }
      continue;
    }
    if (current.length + sentence.length > MAX_CHARS) {
      if (current.trim()) chunks.push(current.trim());
      current = "";
    }
    current += sentence;
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.slice(0, 6);
}

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

  const audios: string[] = [];
  for (const chunk of chunkText(clean)) {
    const response = await fetch(SARVAM_TTS_URL, {
      method: "POST",
      headers: {
        "api-subscription-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: chunk,
        target_language_code: languageCode,
        speaker: "anushka",
        model: "bulbul:v2",
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
    for (const audio of data.audios ?? []) audios.push(audio);
  }

  return { ok: true, audios };
}
