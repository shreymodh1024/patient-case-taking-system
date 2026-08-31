import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { QrCode, Loader as Loader2, Check } from "lucide-react";
import { setKioskState, useKiosk, resetKiosk } from "@/lib/kiosk-store";
import { useT } from "@/lib/i18n";
import { LanguageSelector } from "@/components/language-selector";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediKiosk — Patient Check-In & Consent" },
      {
        name: "description",
        content:
          "Start your clinic visit at the MediKiosk station: choose your language, give consent, and scan your ABHA health ID.",
      },
      { property: "og:title", content: "MediKiosk — Patient Check-In & Consent" },
      {
        property: "og:description",
        content: "Multilingual kiosk check-in with ABHA ID scan for faster clinic intake.",
      },
    ],
  }),
  component: WelcomeScreen,
});

function WelcomeScreen() {
  const { language, consented, ayushMode } = useKiosk();
  const t = useT();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState<string | null>(null);
  const navigate = useNavigate();

  const startScan = () => {
    if (!consented || scanning) return;
    setScanning(true);
    window.setTimeout(() => {
      const id = "ABHA-8829-1022";
      setScanned(id);
      setScanning(false);
      setKioskState({ abhaId: id });
      window.setTimeout(() => navigate({ to: "/chat" }), 900);
    }, 1600);
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        <header className="mb-12 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-zinc-950/5">
            <span className="size-2 animate-pulse rounded-full bg-medical-green" />
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              {t.stationActive}
            </span>
          </div>
          <h1 className="mb-4 text-balance text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">
            {t.welcomeTitle}
          </h1>
          <p className="mx-auto max-w-[56ch] text-pretty text-lg text-zinc-600">
            {t.welcomeSubtitle}
          </p>
        </header>

        <div className="rounded-[24px] bg-white p-8 shadow-sm ring-1 ring-zinc-950/5">
          <div className="flex flex-col gap-6">
            <LanguageSelector
              label={t.preferredLanguage}
              value={language}
              onChange={(lang) => setKioskState({ language: lang })}
            />

            <label className="flex items-start gap-3 rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-950/5">
              <input
                type="checkbox"
                checked={consented}
                onChange={(e) => setKioskState({ consented: e.target.checked })}
                className="mt-0.5 size-5 shrink-0 accent-clinical-teal"
              />
              <span className="text-base leading-relaxed text-zinc-600">{t.consent}</span>
            </label>

            <label className="flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-xl bg-clinical-teal/5 p-4 ring-1 ring-clinical-teal/10">
              <span className="text-base font-medium leading-relaxed text-zinc-800">
                {t.ayushMode}
                <span className="mt-1 block text-sm font-normal text-zinc-600">
                  {t.ayushDescription}
                </span>
              </span>
              <input
                type="checkbox"
                role="switch"
                checked={ayushMode}
                onChange={(e) => setKioskState({ ayushMode: e.target.checked })}
                className="size-6 shrink-0 accent-clinical-teal"
              />
            </label>

            <button
              onClick={startScan}
              disabled={!consented}
              className="group relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 rounded-xl bg-zinc-50 ring-1 ring-zinc-950/5 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="flex size-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-950/5">
                {scanned ? (
                  <Check className="size-8 text-medical-green" strokeWidth={1.5} />
                ) : scanning ? (
                  <Loader2 className="size-8 animate-spin text-clinical-teal" strokeWidth={1.5} />
                ) : (
                  <QrCode className="size-8 text-clinical-teal" strokeWidth={1.5} />
                )}
              </span>
              <span className="text-lg font-medium text-zinc-900">
                {scanned ? `${t.verified} · ${scanned}` : scanning ? t.scanning : t.scanTitle}
              </span>
              <span className="text-base text-zinc-500">
                {consented ? t.scanHelpConsented : t.scanHelpNoConsent}
              </span>
            </button>

            <div className="flex items-center gap-4">
              <span className="h-px flex-1 bg-zinc-950/5" />
              <span className="text-xs font-medium uppercase text-zinc-400">{t.or}</span>
              <span className="h-px flex-1 bg-zinc-950/5" />
            </div>

            {!manualOpen ? (
              <button
                onClick={() => {
                  if (!consented) return;
                  setManualOpen(true);
                }}
                disabled={!consented}
                className="min-h-14 w-full rounded-xl py-4 text-base font-medium text-clinical-teal transition-colors hover:bg-clinical-teal/5 disabled:opacity-50"
              >
                {t.manualEntry}
              </button>
            ) : (
              <div className="rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-950/5">
                <label
                  htmlFor="abha-id"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Enter your ABHA ID number
                </label>
                <input
                  id="abha-id"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={idInput}
                  onChange={(e) => setIdInput(e.target.value.replace(/\D/g, "").slice(0, 12))}
                  placeholder="e.g. 88291022"
                  className="min-h-12 w-full rounded-lg bg-white px-3 text-base text-zinc-900 outline-none ring-1 ring-zinc-950/10 focus:ring-clinical-teal"
                />
                {patientId === null && (
                  <p className="mt-2 text-sm text-zinc-500">
                    Numbers only. Your past summaries are stored against this ID.
                  </p>
                )}

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => {
                      if (patientId === null) return;
                      resetKiosk();
                      setKioskState({
                        language,
                        consented: true,
                        ayushMode,
                        patientId,
                        abhaId: `ABHA-${patientId}`,
                      });
                      navigate({ to: "/chat" });
                    }}
                    disabled={patientId === null}
                    className="min-h-14 rounded-xl bg-clinical-teal px-4 text-base font-medium text-primary-foreground shadow-sm transition-opacity disabled:opacity-40"
                  >
                    New Case Entry
                  </button>
                  <button
                    onClick={() => {
                      if (patientId === null) return;
                      setKioskState({ patientId, abhaId: `ABHA-${patientId}` });
                      navigate({ to: "/history", search: { id: patientId } });
                    }}
                    disabled={patientId === null}
                    className="min-h-14 rounded-xl bg-white px-4 text-base font-medium text-zinc-900 ring-1 ring-zinc-950/10 transition-opacity disabled:opacity-40"
                  >
                    See Old Medical History
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
