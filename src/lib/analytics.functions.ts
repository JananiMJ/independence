import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const eventSchema = z.object({
  eventType: z.enum(["form_view", "form_start", "form_submit"]),
  path: z.string().max(300).optional().or(z.literal("")),
  referrer: z.string().max(500).optional().or(z.literal("")),
});

export type LeadEventInput = z.infer<typeof eventSchema>;

export const trackLeadEvent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => eventSchema.parse(data))
  .handler(async ({ data }) => {
    const { getDb } = await import("@/lib/db.server");

    try {
      await getDb().execute(
        "INSERT INTO lead_events (event_type, path, referrer) VALUES (?, ?, ?)",
        [data.eventType, data.path || null, data.referrer || null],
      );
      return { success: true };
    } catch (error) {
      console.error("Failed to record lead event:", error);
      return { success: false };
    }
  });

export type LeadMetrics = {
  formViews: number;
  formStarts: number;
  formSubmits: number;
  startRate: number;
  conversionRate: number;
  days: number;
};

export const getLeadMetrics = createServerFn({ method: "GET" }).handler(
  async (): Promise<LeadMetrics> => {
    const days = 30;
    const empty: LeadMetrics = {
      formViews: 0,
      formStarts: 0,
      formSubmits: 0,
      startRate: 0,
      conversionRate: 0,
      days,
    };

    const { getDb } = await import("@/lib/db.server");

    let row: { form_views: number; form_starts: number; form_submits: number } | undefined;
    try {
      const [rows] = await getDb().query(
        `SELECT
           SUM(event_type = 'form_view')   AS form_views,
           SUM(event_type = 'form_start')  AS form_starts,
           SUM(event_type = 'form_submit') AS form_submits
         FROM lead_events
         WHERE created_at >= NOW() - INTERVAL ? DAY`,
        [days],
      );
      row = (rows as (typeof row)[])[0];
    } catch (error) {
      console.error("Failed to load lead metrics:", error);
      return empty;
    }

    if (!row) return empty;

    const formViews = Number(row.form_views) || 0;
    const formStarts = Number(row.form_starts) || 0;
    const formSubmits = Number(row.form_submits) || 0;

    return {
      formViews,
      formStarts,
      formSubmits,
      startRate: formViews > 0 ? Math.round((formStarts / formViews) * 100) : 0,
      conversionRate: formViews > 0 ? Math.round((formSubmits / formViews) * 100) : 0,
      days,
    };
  },
);
