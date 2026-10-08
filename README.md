# Enable Independence — website

React 19 + TanStack Start (server-side rendering) + Tailwind CSS + Supabase.
Originally designed in Lovable, cleaned up for self-hosting.

## Requirements

- **Node.js 22 LTS** (Vite 8 needs Node 20.19+; 22 is recommended)
- A Supabase project (stores enquiry-form leads and form analytics)

## Run locally

```sh
npm install
cp .env.example .env   # then fill in your Supabase values
npm run dev            # http://localhost:8080 (or the port Vite prints)
```

## Project structure

```
public/                    static files served as-is (favicon.png)
src/
  assets/                  images imported by components
  components/LeadForm.tsx  enquiry form
  components/ui/           shadcn/ui components
  integrations/supabase/   Supabase clients (browser + server)
  lib/*.functions.ts       server functions (save lead, track/read analytics)
  routes/index.tsx         homepage  (/)
  routes/metrics.tsx       form metrics (/metrics, noindex)
  routes/__root.tsx        HTML shell, fonts, 404/error pages
supabase/migrations/       database schema — run these on your Supabase project
```

## Database setup

Run each file in `supabase/migrations/` **in filename order** in your Supabase
project's SQL Editor (or `npx supabase db push` with the Supabase CLI). This creates
the `leads` and `lead_events` tables and the `lead_event_summary` function.

## Deploy (Vercel)

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → import the repo**. Framework preset: *Other*.
   Build command `npm run build` (default) is fine.
3. Under **Settings → Environment Variables**, add every variable from
   `.env.example`, plus `NITRO_PRESET=vercel`.
4. Deploy, then add your custom domain under **Settings → Domains**.

Other hosts: set `NITRO_PRESET` to `netlify`, `cloudflare-module` (the default),
or `node-server` (output in `.output/`, start with `node .output/server/index.mjs`).

> This is a server-rendered app, not a static site — uploading files to plain
> shared hosting (cPanel / FTP) will **not** work, because the enquiry form runs
> server code.
