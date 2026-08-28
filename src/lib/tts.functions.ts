import { createServerFn } from "@tanstack/react-start";
import { synthesizeSpeech, type SynthesizeResult } from "./tts.server";

type SpeakInput = { text: string; languageCode: string };

function parseSpeakInput(input: unknown): SpeakInput {
  const data = (input ?? {}) as Record<string, unknown>;
  const text = typeof data["text"] === "string" ? data["text"].slice(0, 4000) : "";
  const languageCode =
    typeof data["languageCode"] === "string" && data["languageCode"].trim()
      ? data["languageCode"]
      : "en-IN";
  return { text, languageCode };
}

export const speakText = createServerFn({ method: "POST" })
  .inputValidator(parseSpeakInput)
  .handler(async ({ data }): Promise<SynthesizeResult> => {
    try {
      return await synthesizeSpeech(data.text, data.languageCode);
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Voice generation failed.",
      };
    }
  });
