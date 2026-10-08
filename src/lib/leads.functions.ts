import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  phone: z.string().trim().max(50, "Phone number is too long").optional().or(z.literal("")),
  role: z.string().max(50).optional().or(z.literal("")),
  ageGroup: z.string().max(50).optional().or(z.literal("")),
  message: z.string().trim().max(2000, "Message is too long").optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("leads").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      role: data.role || null,
      age_group: data.ageGroup || null,
      message: data.message || null,
      status: "new",
    });

    if (error) {
      console.error("Failed to save lead:", error);
      throw new Error("Unable to submit your enquiry. Please try again or call us.");
    }

    return { success: true };
  });
