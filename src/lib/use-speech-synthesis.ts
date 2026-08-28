import { useCallback, useEffect, useRef, useState } from "react";
import { SPEECH_LOCALES } from "./use-speech-recognition";
import { speakText } from "./tts.functions";


export const VOICE_LABELS: Record<string, { on: string; off: string; unsupported: string }> = {
  English: {
    on: "Turn off voice replies",
    off: "Turn on voice replies",
    unsupported: "Voice replies are not supported in this browser.",
  },
  हिंदी: {
    on: "आवाज़ में उत्तर बंद करें",
    off: "आवाज़ में उत्तर चालू करें",
    unsupported: "इस ब्राउज़र में वॉइस उत्तर समर्थित नहीं है।",
  },
  বাংলা: {
    on: "ভয়েস উত্তর বন্ধ করুন",
    off: "ভয়েস উত্তর চালু করুন",
    unsupported: "এই ব্রাউজারে ভয়েস উত্তর সমর্থিত নয়।",
  },
  தமிழ்: {
    on: "குரல் பதில்களை நிறுத்து",
    off: "குரல் பதில்களை இயக்கு",
    unsupported: "இந்த உலாவியில் குரல் பதில் ஆதரிக்கப்படவில்லை.",
  },
  తెలుగు: {
    on: "వాయిస్ సమాధానాలు ఆపు",
    off: "వాయిస్ సమాధానాలు ఆన్ చేయి",
    unsupported: "ఈ బ్రౌజర్‌లో వాయిస్ సమాధానాలు మద్దతు లేదు.",
  },
  मराठी: {
    on: "आवाजातील उत्तरे बंद करा",
    off: "आवाजातील उत्तरे सुरू करा",
    unsupported: "या ब्राउझरमध्ये व्हॉइस उत्तरे समर्थित नाहीत.",
  },
  ગુજરાતી: {
    on: "વૉઇસ જવાબ બંધ કરો",
    off: "વૉઇસ જવાબ ચાલુ કરો",
    unsupported: "આ બ્રાઉઝરમાં વૉઇસ જવાબ સમર્થિત નથી.",
  },
  ಕನ್ನಡ: {
    on: "ಧ್ವನಿ ಉತ್ತರಗಳನ್ನು ಆಫ್ ಮಾಡಿ",
    off: "ಧ್ವನಿ ಉತ್ತರಗಳನ್ನು ಆನ್ ಮಾಡಿ",
    unsupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಉತ್ತರ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.",
  },
};

export function useSpeechSynthesis(language: string) {
  const [enabled, setEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const runIdRef = useRef(0);

  const cancel = useCallback(() => {
    runIdRef.current += 1;
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    }
    setSpeaking(false);
  }, []);

  useEffect(() => cancel, [cancel]);

  const playClip = (base64: string, runId: number) =>
    new Promise<void>((resolve) => {
      if (runIdRef.current !== runId) return resolve();
      const audio = new Audio(`data:audio/wav;base64,${base64}`);
      audioRef.current = audio;
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
      void audio.play().catch(() => resolve());
    });

  const speak = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      cancel();
      const runId = runIdRef.current;
      setSpeaking(true);
      try {
        const result = await speakText({
          data: { text, languageCode: SPEECH_LOCALES[language] ?? "en-IN" },
        });
        if (runIdRef.current !== runId || !result.ok) return;
        for (const clip of result.audios) {
          if (runIdRef.current !== runId) return;
          await playClip(clip, runId);
        }
      } catch {
        // Voice playback is non-critical; stay silent on failure.
      } finally {
        if (runIdRef.current === runId) setSpeaking(false);
      }
    },
    [cancel, language],
  );

  const toggleEnabled = useCallback(() => {
    setEnabled((prev) => {
      if (prev) cancel();
      return !prev;
    });
  }, [cancel]);

  return { supported: true, enabled, speaking, speak, cancel, toggleEnabled };
}

