# Enable Independence — website

React 19 + TanStack Start (server-side rendering) + Tailwind CSS + MySQL.
Originally designed in Lovable, cleaned up for self-hosting on Hostinger.

## Requirements

- **Node.js 22 LTS**
- A MySQL database (Hostinger) for enquiries and form analytics
- An SMTP mailbox (info@enbl.com.au) to email each enquiry

## Run locally

```sh
npm install
cp .env.example .env   # then fill in your database + email values
npm run dev
```

Hostinger databases usually only accept connections from the server itself, so the
enquiry form may not save locally unless **Remote MySQL** is enabled in hPanel.

## Project structure

```
public/                    static files served as-is (favicon.png)
database/schema.sql        MySQL tables — run once in phpMyAdmin
src/
  assets/                  images imported by components
  components/LeadForm.tsx  enquiry form
  components/ui/           shadcn/ui components
  lib/*.functions.ts       server functions (save + email lead, track/read analytics)
  lib/db.server.ts         MySQL connection
  lib/mailer.server.ts     enquiry email (SMTP)
  routes/index.tsx         homepage  (/)
  routes/metrics.tsx       form metrics (/metrics, noindex)
  routes/__root.tsx        HTML shell, fonts, 404/error pages
```

## Database setup

In hPanel create a MySQL database, open phpMyAdmin, select the database, and run
`database/schema.sql` in the SQL tab. This creates the `leads` and `lead_events` tables.

Each enquiry is saved to `leads` **and** emailed to `MAIL_TO`. The visitor sees success
if at least one of the two works.

## Deploy (Hostinger Web App)

- Source: this GitHub repo, branch `main`
- Node.js 22, build command `npm run build`, output directory `.output`
- Entry file: `server/index.mjs`
- Environment variables: everything in `.env.example`
