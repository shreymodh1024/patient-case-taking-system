import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Pencil, CalendarDays } from "lucide-react";
import { setKioskState, useKiosk } from "@/lib/kiosk-store";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/summary")({
  head: () => ({
    meta: [
      { title: "Clinical Summary — MediKiosk" },
      {
        name: "description",
        content:
          "Physician-facing intake summary with chief complaint, history of present illness, past medical history, and extracted document data.",
      },
      { property: "og:title", content: "Clinical Summary — MediKiosk" },
      {
        property: "og:description",
        content: "Review, edit, and confirm the kiosk-generated clinical intake record.",
      },
    ],
  }),
  component: SummaryScreen,
});

function SummaryScreen() {
  const state = useKiosk();
  const t = useT();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState(false);

  const summary = state.summary ?? {
    chiefComplaint: t.awaitingComplaint,
    hpi: t.awaitingHpi,
    pastMedicalHistory: [],
    socratesTags: [],
    ayushResponses: [],
  };
  const ayushResponses = summary.ayushResponses ?? [];

  const update = (patch: Partial<typeof summary>) =>
    setKioskState({ summary: { ...summary, ...patch } });

  const updateDocumentField = (index: number, value: string) => {
    if (!state.extracted) return;
    const fields = state.extracted.fields.map((field, fieldIndex) =>
      fieldIndex === index ? { ...field, value } : field,
    );
    setKioskState({ extracted: { ...state.extracted, fields } });
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 md:py-24">
      <div className="mx-auto max-w-xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-zinc-900">{t.summaryTitle}</h1>
            <p className="text-sm text-zinc-500">
              {t.patientId}: {state.abhaId ?? t.notVerified}
            </p>
          </div>
          <div className="rounded-md bg-zinc-100 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            {state.confirmed ? t.filed : t.draft}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-950/5">
          <div className="divide-y divide-zinc-950/5">
            <section className="p-6">
              <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
                {t.chiefComplaint}
              </h2>
              {editing ? (
                <textarea
                  value={summary.chiefComplaint}
                  onChange={(e) => update({ chiefComplaint: e.target.value })}
                  className="min-h-20 w-full rounded-lg bg-zinc-50 p-3 text-sm text-zinc-900 outline-none ring-1 ring-zinc-950/10 focus:ring-clinical-teal"
                />
              ) : (
                <p className="text-pretty text-sm leading-relaxed text-zinc-900">
                  {summary.chiefComplaint}
                </p>
              )}
            </section>

            {(state.ayushMode || ayushResponses.length > 0) && (
              <section className="bg-clinical-teal/5 p-6">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-clinical-teal">
                  {t.ayushSection}
                </h2>
                {ayushResponses.length ? (
                  <dl className="space-y-3 text-base">
                    {ayushResponses.map((response, index) => (
                      <div key={`${response}-${index}`} className="flex flex-col gap-1">
                        <dt className="text-sm font-semibold text-zinc-600">
                          {[t.prakriti, t.agni, t.aharaVihara][index] ?? t.ayushSection}
                        </dt>
                        <dd className="text-zinc-900">
                          {editing ? (
                            <textarea
                              value={response}
                              onChange={(e) => {
                                const updatedResponses = [...ayushResponses];
                                updatedResponses[index] = e.target.value;
                                update({ ayushResponses: updatedResponses });
                              }}
                              className="min-h-20 w-full rounded-lg bg-white p-3 text-base text-zinc-900 outline-none ring-1 ring-zinc-950/10 focus:ring-clinical-teal"
                            />
                          ) : (
                            response
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-base text-zinc-600">{t.ayushPending}</p>
                )}
              </section>
            )}

            <section className="p-6">
              <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
                {t.hpi}
              </h2>
              <div className="space-y-3">
                {editing ? (
                  <textarea
                    value={summary.hpi}
                    onChange={(e) => update({ hpi: e.target.value })}
                    className="min-h-32 w-full rounded-lg bg-zinc-50 p-3 text-sm text-zinc-900 outline-none ring-1 ring-zinc-950/10 focus:ring-clinical-teal"
                  />
                ) : (
                  <p className="text-pretty font-serif text-sm italic leading-relaxed text-zinc-900">
                    {summary.hpi}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {summary.socratesTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="p-6">
              <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
                {t.pmh}
              </h2>
              {editing ? (
                <textarea
                  value={summary.pastMedicalHistory.join("\n")}
                  onChange={(e) =>
                    update({ pastMedicalHistory: e.target.value.split("\n").filter(Boolean) })
                  }
                  className="min-h-24 w-full rounded-lg bg-zinc-50 p-3 text-sm text-zinc-900 outline-none ring-1 ring-zinc-950/10 focus:ring-clinical-teal"
                />
              ) : summary.pastMedicalHistory.length ? (
                <ul className="space-y-2">
                  {summary.pastMedicalHistory.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-zinc-900">
                      <span className="size-1 rounded-full bg-zinc-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-500">{t.notRecorded}</p>
              )}
            </section>

            <section className="bg-zinc-50/50 p-6">
              <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
                {t.extractedData}
              </h2>
              {state.extracted ? (
                <div className="space-y-2">
                  {state.extracted.fields.map((f, index) => (
                    <div key={f.label} className="flex items-center justify-between gap-4 text-sm">
                      <span className="font-medium text-zinc-500">{f.label}</span>
                      {editing ? (
                        <input
                          value={f.value}
                          onChange={(e) => updateDocumentField(index, e.target.value)}
                          className="min-h-11 w-2/3 rounded-lg bg-white px-3 text-right text-sm text-zinc-900 outline-none ring-1 ring-zinc-950/10 focus:ring-clinical-teal"
                        />
                      ) : (
                        <span className="text-right text-zinc-900">{f.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-500">{t.noDocuments}</p>
              )}
            </section>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-950/5 bg-zinc-50/30 p-6">
            <button
              onClick={() => setEditing((v) => !v)}
              className="flex min-h-12 items-center gap-2 text-base font-medium text-zinc-500 transition-colors hover:text-zinc-900"
            >
              <Pencil className="size-4" strokeWidth={1.5} />
              {editing ? t.doneEditing : t.edit}
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate({ to: "/chat" })}
                className="flex min-h-12 items-center gap-2 rounded-lg bg-white py-2 pl-2 pr-3 text-base font-medium text-zinc-900 ring-1 ring-zinc-950/5"
              >
                <CalendarDays className="size-4 shrink-0" strokeWidth={1.5} />
                {t.defer}
              </button>
              <button
                onClick={() => {
                  setKioskState({ confirmed: true });
                  setSuccess(true);
                  window.setTimeout(() => setSuccess(false), 3200);
                }}
                className="flex min-h-12 items-center gap-2 rounded-lg bg-clinical-teal py-2 pl-2 pr-3 text-base font-medium text-primary-foreground shadow-sm ring-1 ring-clinical-teal"
              >
                <Check className="size-4 shrink-0" strokeWidth={1.5} />
                {state.confirmed ? t.confirmed : t.confirmPush}
              </button>
            </div>
          </div>
          {success && (
            <div
              role="status"
              className="border-t border-clinical-teal/20 bg-clinical-teal/10 px-6 py-4 text-base font-medium text-clinical-teal"
            >
              {t.hisSuccess}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
