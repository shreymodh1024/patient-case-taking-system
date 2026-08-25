import { useCallback, useEffect, useRef, useState } from "react";

export const SPEECH_LOCALES: Record<string, string> = {
  English: "en-IN",
  हिंदी: "hi-IN",
  বাংলা: "bn-IN",
  தமிழ்: "ta-IN",
  తెలుగు: "te-IN",
  मराठी: "mr-IN",
  ગુજરાતી: "gu-IN",
  ಕನ್ನಡ: "kn-IN",
};

export const SPEECH_LABELS: Record<string, { start: string; stop: string; unsupported: string }> = {
  English: {
    start: "Speak your symptoms",
    stop: "Stop listening",
    unsupported: "Voice input is not supported in this browser.",
  },
  हिंदी: {
    start: "अपने लक्षण बोलें",
    stop: "सुनना बंद करें",
    unsupported: "इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है।",
  },
  বাংলা: {
    start: "আপনার উপসর্গ বলুন",
    stop: "শোনা বন্ধ করুন",
    unsupported: "এই ব্রাউজারে ভয়েস ইনপুট সমর্থিত নয়।",
  },
  தமிழ்: {
    start: "உங்கள் அறிகுறிகளைப் பேசுங்கள்",
    stop: "கேட்பதை நிறுத்து",
    unsupported: "இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை.",
  },
  తెలుగు: {
    start: "మీ లక్షణాలను చెప్పండి",
    stop: "వినడం ఆపు",
    unsupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ మద్దతు లేదు.",
  },
  मराठी: {
    start: "तुमची लक्षणे सांगा",
    stop: "ऐकणे थांबवा",
    unsupported: "या ब्राउझरमध्ये व्हॉइस इनपुट समर्थित नाही.",
  },
  ગુજરાતી: {
    start: "તમારા લક્ષણો બોલો",
    stop: "સાંભળવાનું બંધ કરો",
    unsupported: "આ બ્રાઉઝરમાં વૉઇસ ઇનપુટ સમર્થિત નથી.",
  },
  ಕನ್ನಡ: {
    start: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಹೇಳಿ",
    stop: "ಕೇಳುವುದನ್ನು ನಿಲ್ಲಿಸಿ",
    unsupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.",
  },
};

type RecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
};

function getCtor(): (new () => RecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as any;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function useSpeechRecognition(options: {
  language: string;
  onTranscript: (text: string, isFinal: boolean) => void;
}) {
  const { language, onTranscript } = options;
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<RecognitionLike | null>(null);
  const cbRef = useRef(onTranscript);
  cbRef.current = onTranscript;

  useEffect(() => {
    setSupported(getCtor() !== null);
    return () => ref.current?.abort();
  }, []);

  const stop = useCallback(() => {
    ref.current?.stop();
    setListening(false);
  }, []);

  const start = useCallback(() => {
    const Ctor = getCtor();
    if (!Ctor) {
      setError(SPEECH_LABELS[language]?.unsupported ?? SPEECH_LABELS["English"]!.unsupported);
      return;
    }
    setError(null);
    ref.current?.abort();
    const rec = new Ctor();
    rec.lang = SPEECH_LOCALES[language] ?? "en-IN";
    rec.continuous = false;
    rec.interimResults = true;
    rec.onresult = (e: any) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) final += r[0].transcript;
        else interim += r[0].transcript;
      }
      if (final) cbRef.current(final.trim(), true);
      else if (interim) cbRef.current(interim.trim(), false);
    };
    rec.onerror = (e: any) => {
      const code = e?.error;
      if (code === "no-speech" || code === "aborted") return;
      setError(
        code === "not-allowed" || code === "service-not-allowed"
          ? "Microphone permission was denied."
          : "Voice input failed. Please try again.",
      );
    };
    rec.onend = () => setListening(false);
    ref.current = rec;
    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }, [language]);

  const toggle = useCallback(() => (listening ? stop() : start()), [listening, start, stop]);

  return { supported, listening, error, start, stop, toggle };
}
