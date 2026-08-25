import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { FileText, Loader as Loader2, Plus, Send, ArrowRight, AlertTriangle } from "lucide-react";
import { intakeTurn } from "@/lib/intake.functions";
import {
  MOCK_EXTRACTION,
  SOCRATES_LABELS,
  nowLabel,
  setKioskState,
  useKiosk,
  effectiveMessages,
  type SocratesKey,
} from "@/lib/kiosk-store";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Symptom Interview — MediKiosk" },
      {
        name: "description",
        content:
          "Describe your symptoms to the MediKiosk clinical assistant, which asks structured SOCRATES follow-up questions and reads your uploaded reports.",
      },
      { property: "og:title", content: "Symptom Interview — MediKiosk" },
      {
        property: "og:description",
        content: "AI-guided symptom intake using the SOCRATES clinical framework.",
      },
    ],
  }),
  component: ChatScreen,
});

const KEYS = Object.keys(SOCRATES_LABELS) as SocratesKey[];

const EMERGENCY_PHRASES: Record<string, string[]> = {
  English: [
    "severe chest pain",
    "unbearable chest pain",
    "crushing chest pain",
    "can't breathe",
    "cannot breathe",
    "sudden weakness",
    "fainted",
  ],
  हिंदी: [
    "तेज़ सीने में दर्द",
    "सीने में तेज दर्द",
    "सांस नहीं आ रही",
    "अचानक कमजोरी",
    "बेहोश हो गया",
    "बेहोश हो गई",
  ],
  বাংলা: ["তীব্র বুকে ব্যথা", "শ্বাস নিতে পারছি না", "হঠাৎ দুর্বলতা", "অজ্ঞান হয়ে গেছি"],
  தமிழ்: ["கடுமையான மார்பு வலி", "மூச்சு விட முடியவில்லை", "திடீர் பலவீனம்", "மயங்கி விழுந்தேன்"],
  తెలుగు: ["తీవ్రమైన ఛాతీ నొప్పి", "శ్వాస తీసుకోలేకపోతున్నాను", "ఆకస్మిక బలహీనత", "స్పృహ తప్పింది"],
  मराठी: [
    "तीव्र छातीत दुखणे",
    "श्वास घेता येत नाही",
    "अचानक अशक्तपणा",
    "बेशुद्ध पडलो",
    "बेशुद्ध पडले",
  ],
  ગુજરાતી: ["તીવ્ર છાતીમાં દુખાવો", "શ્વાસ લઈ શકતો નથી", "અચાનક નબળાઈ", "બેભાન થઈ ગયો"],
  ಕನ್ನಡ: ["ತೀವ್ರ ಎದೆ ನೋವು", "ಉಸಿರಾಡಲು ಆಗುತ್ತಿಲ್ಲ", "ಹಠಾತ್ ದೌರ್ಬಲ್ಯ", "ಪ್ರಜ್ಞೆ ತಪ್ಪಿದೆ"],
};

function isEmergencyMessage(text: string, language: string) {
  const normalized = text.toLocaleLowerCase();
  const englishPhrases = EMERGENCY_PHRASES["English"] ?? [];
  const phrases = EMERGENCY_PHRASES[language] ?? englishPhrases;
  return (
    phrases.some((phrase) => normalized.includes(phrase.toLocaleLowerCase())) ||
    englishPhrases.some((phrase) => normalized.includes(phrase))
  );
}

function ChatScreen() {
  const state = useKiosk();
  const t = useT();
  const send = useServerFn(intakeTurn);
  const navigate = useNavigate();
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = effectiveMessages(state);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, state.extracted, busy]);

  const submit = async () => {
    const text = draft.trim();
    if (!text || busy) return;
    setError(null);
    setDraft("");
    const history = [
      ...state.messages,
      { role: "patient" as const, content: text, time: nowLabel() },
    ];
    setKioskState({ messages: history });
    if (isEmergencyMessage(text, state.language)) {
      setKioskState({ priorityAlert: true });
      return;
    }
    setBusy(true);
    try {
      const result = await send({
        data: {
          history: history.map((m) => ({ role: m.role, content: m.content })),
          language: state.language,
          ayushMode: state.ayushMode,
          extractedNote: state.extracted
            ? `${state.extracted.fileName}: ${state.extracted.fields
                .map((f) => `${f.label} ${f.value}`)
                .join(", ")}`
            : null,
        },
      });
      setKioskState((s) => ({
        messages: [...s.messages, { role: "assistant", content: result.reply, time: nowLabel() }],
        captured: Array.from(
          new Set([
            ...s.captured,
            ...result.captured.filter((c): c is SocratesKey => c in SOCRATES_LABELS),
          ]),
        ),
        summary: result.summary
          ? {
              ...result.summary,
              ayushResponses: result.summary.ayushResponses ?? s.summary?.ayushResponses ?? [],
            }
          : s.summary,
      }));
    } catch (e) {
      setError(e instanceof Error ? e.message : t.genericError);
    } finally {
      setBusy(false);
    }
  };

  const upload = () => {
    if (uploading) return;
    setUploading(true);
    window.setTimeout(() => {
      setKioskState({ extracted: MOCK_EXTRACTION });
      setUploading(false);
    }, 1400);
  };

  const capturedCount = state.captured.length;

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-12 md:py-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="flex h-[700px] flex-col overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-zinc-950/5">
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-950/5 bg-white px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-clinical-teal/10 font-medium text-clinical-teal">
                AI
              </span>
              <div>
                <p className="text-sm font-semibold text-zinc-900">{t.assistantName}</p>
                <p className="text-xs text-zinc-500">{t.assistantSubtitle}</p>
              </div>
            </div>
            <div className="hidden gap-1 sm:flex">
              {KEYS.map((k) => (
                <span
                  key={k}
                  title={SOCRATES_LABELS[k]}
                  className={`h-1.5 w-6 rounded-full ${
                    state.captured.includes(k) ? "bg-clinical-teal" : "bg-zinc-200"
                  }`}
                />
              ))}
            </div>
          </header>

          <div ref={scrollRef} className="flex flex-1 flex-col gap-8 overflow-y-auto p-6">
            {messages.map((m, i) =>
              m.role === "assistant" ? (
                <div key={i} className="flex max-w-[80%] flex-col gap-2">
                  <div className="rounded-2xl rounded-tl-none bg-zinc-100 p-4">
                    <p className="text-pretty text-base leading-relaxed text-zinc-800">
                      {m.content}
                    </p>
                  </div>
                  <span className="px-1 text-[10px] font-medium uppercase text-zinc-400">
                    AI{m.time ? ` • ${m.time}` : ""}
                  </span>
                </div>
              ) : (
                <div key={i} className="flex max-w-[80%] flex-col items-end gap-2 self-end">
                  <div className="rounded-2xl rounded-tr-none bg-clinical-teal p-4">
                    <p className="text-pretty text-sm leading-relaxed text-primary-foreground">
                      {m.content}
                    </p>
                  </div>
                  <span className="px-1 text-[10px] font-medium uppercase text-zinc-400">
                    You • {m.time}
                  </span>
                </div>
              ),
            )}

            {busy && (
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Loader2 className="size-3.5 animate-spin" /> {t.typing}
              </div>
            )}

            {uploading && (
              <div className="flex items-center gap-3 rounded-2xl border border-clinical-blue/10 bg-clinical-blue/5 p-4 text-sm text-clinical-blue">
                <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />
                <span>{t.extractingDocument}</span>
              </div>
            )}

            {state.extracted && (
              <div className="flex flex-col gap-4 rounded-2xl border border-clinical-blue/10 bg-clinical-blue/5 p-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-clinical-blue/10 p-2">
                    <FileText className="size-4 text-clinical-blue" strokeWidth={1.5} />
                  </span>
                  <span className="text-sm font-semibold text-clinical-blue">
                    {state.extracted.fileName} · {t.extractionComplete}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {state.extracted.fields.map((f) => (
                    <div key={f.label} className="space-y-1">
                      <p className="text-[10px] font-medium uppercase text-zinc-400">{f.label}</p>
                      <p className="text-xs text-zinc-700">{f.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <p className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">{error}</p>
            )}
          </div>

          <footer className="border-t border-zinc-950/5 bg-white p-4">
            <div className="flex items-center gap-2 rounded-xl bg-zinc-50 p-2 ring-1 ring-zinc-950/10">
              <button
                onClick={upload}
                aria-label={t.uploadLabel}
                className="flex min-h-11 min-w-11 items-center gap-2 p-2 text-zinc-500 transition-colors hover:text-zinc-700"
              >
                {uploading ? (
                  <Loader2 className="size-5 animate-spin" strokeWidth={1.5} />
                ) : (
                  <Plus className="size-5 shrink-0" strokeWidth={1.5} />
                )}
                <span className="hidden text-xs font-medium sm:inline">
                  {uploading ? t.extractingDocument : t.uploadDocument}
                </span>
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void submit();
                }}
                type="text"
                placeholder={t.inputPlaceholder}
                className="min-h-11 flex-1 border-none bg-transparent px-1 py-2 text-base outline-none placeholder:text-zinc-400"
              />
              <button
                onClick={() => void submit()}
                disabled={busy || !draft.trim()}
                aria-label={t.sendLabel}
                className="min-h-11 min-w-11 rounded-lg bg-clinical-teal p-2 text-primary-foreground disabled:opacity-40"
              >
                <Send className="mx-auto size-4" strokeWidth={1.5} />
              </button>
            </div>
          </footer>
        </div>

        {state.priorityAlert && (
          <div
            role="alert"
            className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-semibold text-red-800 shadow-sm"
          >
            <AlertTriangle className="size-5 shrink-0 text-red-600" strokeWidth={2} />
            <span>{t.priorityAlert}</span>
          </div>
        )}

        <div className="flex items-center justify-between px-2">
          <p className="text-xs text-zinc-500">{t.markers(capturedCount)}</p>
          <button
            onClick={() => navigate({ to: "/summary" })}
            className="flex min-h-12 items-center gap-2 rounded-lg bg-white px-4 text-base font-medium text-zinc-900 shadow-sm ring-1 ring-zinc-950/5"
          >
            {t.viewSummary} <ArrowRight className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </main>
  );
}
