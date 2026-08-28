import { useCallback, useEffect, useRef, useState } from "react";
import { SPEECH_LOCALES } from "./use-speech-recognition";



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

function pickVoice(locale: string) {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const lower = locale.toLowerCase();
  const base = lower.split("-")[0]!;
  return (
    voices.find((v) => v.lang.toLowerCase() === lower) ??
    voices.find((v) => v.lang.toLowerCase().replace("_", "-").startsWith(base)) ??
    null
  );
}

export function useSpeechSynthesis(language: string) {
  const [enabled, setEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const voicesReadyRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);
    const load = () => {
      voicesReadyRef.current = window.speechSynthesis.getVoices().length > 0;
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);

  const cancel = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  useEffect(() => cancel, [cancel]);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      if (!text.trim()) return;
      window.speechSynthesis.cancel();
      const locale = SPEECH_LOCALES[language] ?? "en-IN";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = locale;
      const voice = pickVoice(locale);
      if (voice) utterance.voice = voice;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      // Chrome sometimes ignores the first call before voices load.
      window.speechSynthesis.speak(utterance);
    },
    [language],
  );

  const toggleEnabled = useCallback(() => {
    setEnabled((prev) => {
      if (prev) cancel();
      return !prev;
    });
  }, [cancel]);

  return { supported, enabled, speaking, speak, cancel, toggleEnabled };
}


