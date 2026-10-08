CREATE TABLE public.lead_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('form_view','form_start','form_submit')),
  path TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.lead_events TO service_role;

ALTER TABLE public.lead_events ENABLE ROW LEVEL SECURITY;

CREATE INDEX lead_events_type_created_idx ON public.lead_events (event_type, created_at DESC);

CREATE OR REPLACE FUNCTION public.lead_event_summary(_days INTEGER DEFAULT 30)
RETURNS TABLE (form_views BIGINT, form_starts BIGINT, form_submits BIGINT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    count(*) FILTER (WHERE event_type = 'form_view'),
    count(*) FILTER (WHERE event_type = 'form_start'),
    count(*) FILTER (WHERE event_type = 'form_submit')
  FROM public.lead_events
  WHERE created_at >= now() - make_interval(days => _days)
$$;

REVOKE ALL ON FUNCTION public.lead_event_summary(INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.lead_event_summary(INTEGER) TO service_role;