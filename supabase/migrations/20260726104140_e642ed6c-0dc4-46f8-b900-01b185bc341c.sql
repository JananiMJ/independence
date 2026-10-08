CREATE TABLE public.leads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    role text,
    age_group text,
    message text,
    status text NOT NULL DEFAULT 'new',
    created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads TO anon;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public lead submissions"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Service role can manage leads"
ON public.leads
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);