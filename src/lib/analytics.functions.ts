import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const eventSchema = z.object({
  eventType: z.enum(["form_view", "form_start", "form_submit"]),
  path: z.string().max(300).optional().or(z.literal("")),
  referrer: z.string().max(500).optional().or(z.literal("")),
});

export type LeadEventInput = z.infer<typeof eventSchema>;

type LooseClient = {
  from: (table: string) => {
    insert: (values: Record<string, unknown>) => Promise<{ error: { message: string } | null }>;
  };
  rpc: (
    fn: string,
    args: Record<string, unknown>,
  ) => Promise<{ data: unknown; error: { message: string } | null }>;
};

export const trackLeadEvent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => eventSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const db = supabaseAdmin as unknown as LooseClient;

    const { error } = await db.from("lead_events").insert({
      event_type: data.eventType,
      path: data.path || null,
      referrer: data.referrer || null,
    });

    if (error) {
      console.error("Failed to record lead event:", error.message);
      return { success: false };
    }

    return { success: true };
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

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const db = supabaseAdmin as unknown as LooseClient;

    const { data, error } = await db.rpc("lead_event_summary", { _days: days });

    if (error) {
      console.error("Failed to load lead metrics:", error.message);
      return empty;
    }

    const row = (Array.isArray(data) ? data[0] : data) as
      | { form_views: number; form_starts: number; form_submits: number }
      | undefined;

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
