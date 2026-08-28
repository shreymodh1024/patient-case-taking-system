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

function getSynth(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  return window.speechSynthesis ?? null;
}

function pickVoice(synth: SpeechSynthesis, locale: string) {
  const voices = synth.getVoices();
  if (!voices.length) return null;
  const lang = locale.toLowerCase();
  const base = lang.split("-")[0]!;
  return (
    voices.find((v) => v.lang.toLowerCase() === lang) ??
    voices.find((v) => v.lang.toLowerCase().startsWith(base)) ??
    null
  );
}

export function useSpeechSynthesis(language: string) {
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const voicesReady = useRef(false);

  useEffect(() => {
    const synth = getSynth();
    if (!synth) return;
    setSupported(true);
    const load = () => {
      voicesReady.current = synth.getVoices().length > 0;
    };
    load();
    synth.addEventListener?.("voiceschanged", load);
    return () => {
      synth.removeEventListener?.("voiceschanged", load);
      synth.cancel();
    };
  }, []);

  const cancel = useCallback(() => {
    getSynth()?.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      const synth = getSynth();
      if (!synth || !text.trim()) return;
      synth.cancel();
      const locale = SPEECH_LOCALES[language] ?? "en-IN";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = locale;
      const voice = pickVoice(synth, locale);
      if (voice) utterance.voice = voice;
      utterance.rate = 0.98;
      utterance.pitch = 1;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      synth.speak(utterance);
    },
    [language],
  );

  const toggleEnabled = useCallback(() => {
    setEnabled((prev) => {
      if (prev) getSynth()?.cancel();
      return !prev;
    });
  }, []);

  return { supported, enabled, speaking, speak, cancel, toggleEnabled };
}
