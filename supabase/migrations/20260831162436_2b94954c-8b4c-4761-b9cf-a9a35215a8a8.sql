CREATE TABLE public.patient_cases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id BIGINT NOT NULL,
  language TEXT,
  chief_complaint TEXT,
  hpi TEXT,
  past_medical_history TEXT[] NOT NULL DEFAULT '{}',
  socrates_tags TEXT[] NOT NULL DEFAULT '{}',
  ayush_responses TEXT[] NOT NULL DEFAULT '{}',
  extracted JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX patient_cases_patient_id_idx ON public.patient_cases (patient_id, created_at DESC);

GRANT SELECT, INSERT ON public.patient_cases TO anon;
GRANT SELECT, INSERT ON public.patient_cases TO authenticated;
GRANT ALL ON public.patient_cases TO service_role;

ALTER TABLE public.patient_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kiosk can read patient cases" ON public.patient_cases FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Kiosk can create patient cases" ON public.patient_cases FOR INSERT TO anon, authenticated WITH CHECK (true);