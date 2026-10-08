REVOKE ALL ON FUNCTION public.lead_event_summary(INTEGER) FROM anon, authenticated, PUBLIC;
GRANT EXECUTE ON FUNCTION public.lead_event_summary(INTEGER) TO service_role;