import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader as Loader2, FileText } from "lucide-react";
import { listPatientCases, type SavedCase } from "@/lib/cases.functions";

export const Route = createFileRoute("/history")({
  validateSearch: (search: Record<string, unknown>) => ({
    id: Number(search["id"]) || 0,
  }),
  head: () => ({
    meta: [
      { title: "Past Medical History — MediKiosk" },
      {
        name: "description",
        content:
          "Review previously filed clinical intake summaries stored against your ABHA ID number at the MediKiosk station.",
      },
      { property: "og:title", content: "Past Medical History — MediKiosk" },
      {
        property: "og:description",
        content: "Old kiosk visit summaries retrieved by patient ID.",
      },
    ],
  }),
  component: HistoryScreen,
});

function HistoryScreen() {
  const { id } = Route.useSearch();
  const navigate = useNavigate();
  const fetchCases = useServerFn(listPatientCases);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cases, setCases] = useState<SavedCase[]>([]);

  useEffect(() => {
    let active = true;
    if (!id) {
      setLoading(false);
      setError("No patient ID provided.");
      return;
    }
    setLoading(true);
    fetchCases({ data: { patientId: id } })
      .then((res) => {
        if (!active) return;
        setCases(res.cases);
        setError(res.error ?? null);
      })
      .catch(() => active && setError("Could not load records. Please try again."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id, fetchCases]);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate({ to: "/" })}
          className="mb-6 flex min-h-11 items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} /> Back
        </button>

        <h1 className="text-2xl font-medium text-zinc-900">Old medical history</h1>
        <p className="mb-8 text-sm text-zinc-500">Patient ID: {id || "—"}</p>

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Loader2 className="size-4 animate-spin" strokeWidth={1.5} /> Loading records…
          </div>
        ) : error ? (
          <p className="rounded-xl bg-white p-6 text-sm text-red-600 ring-1 ring-zinc-950/5">
            {error}
          </p>
        ) : cases.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-zinc-950/5">
            <FileText className="mx-auto mb-3 size-8 text-zinc-300" strokeWidth={1.5} />
            <p className="text-base text-zinc-600">No past summaries stored for this ID yet.</p>
          </div>
        ) : (
          <ol className="space-y-4">
            {cases.map((c) => (
              <li
                key={c.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-950/5"
              >
                <div className="flex items-center justify-between border-b border-zinc-950/5 px-6 py-3">
                  <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                  {c.language && <span className="text-xs text-zinc-500">{c.language}</span>}
                </div>
                <div className="space-y-4 p-6">
                  <div>
                    <h2 className="mb-1 text-xs font-medium uppercase tracking-widest text-zinc-400">
                      Chief complaint
                    </h2>
                    <p className="text-sm text-zinc-900">{c.chiefComplaint ?? "—"}</p>
                  </div>
                  <div>
                    <h2 className="mb-1 text-xs font-medium uppercase tracking-widest text-zinc-400">
                      History of present illness
                    </h2>
                    <p className="text-pretty text-sm leading-relaxed text-zinc-800">
                      {c.hpi ?? "—"}
                    </p>
                  </div>
                  {c.pastMedicalHistory.length > 0 && (
                    <div>
                      <h2 className="mb-1 text-xs font-medium uppercase tracking-widest text-zinc-400">
                        Past medical history
                      </h2>
                      <ul className="space-y-1 text-sm text-zinc-800">
                        {c.pastMedicalHistory.map((item, i) => (
                          <li key={`${item}-${i}`}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {c.ayushResponses.length > 0 && (
                    <div className="rounded-lg bg-clinical-teal/5 p-4">
                      <h2 className="mb-1 text-xs font-medium uppercase tracking-widest text-clinical-teal">
                        AYUSH
                      </h2>
                      <ul className="space-y-1 text-sm text-zinc-800">
                        {c.ayushResponses.map((item, i) => (
                          <li key={`${item}-${i}`}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {c.extracted?.fileName && (
                    <div className="rounded-lg bg-zinc-50 p-4">
                      <p className="text-xs font-medium text-clinical-blue">
                        {c.extracted.fileName}
                      </p>
                      {c.extracted.ocrSummary && (
                        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                          {c.extracted.ocrSummary}
                        </p>
                      )}
                      {(c.extracted.fields ?? []).map((f) => (
                        <div
                          key={f.label}
                          className="mt-2 flex justify-between gap-4 text-sm text-zinc-800"
                        >
                          <span className="text-zinc-500">{f.label}</span>
                          <span className="text-right">{f.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {c.socratesTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {c.socratesTags.map((tag, i) => (
                        <span
                          key={`${tag}-${i}`}
                          className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </main>
  );
}
