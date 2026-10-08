DROP POLICY IF EXISTS "Allow public lead submissions" ON public.leads;

CREATE POLICY "Allow public lead submissions"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (
    name IS NOT NULL
    AND length(trim(name)) > 0
    AND email IS NOT NULL
    AND length(trim(email)) > 0
);