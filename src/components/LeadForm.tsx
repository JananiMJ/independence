import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle } from "lucide-react";

import { submitLead } from "@/lib/leads.functions";
import { trackLeadEvent } from "@/lib/analytics.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  phone: z.string().max(50, "Phone number is too long").optional(),
  role: z.string().max(50).optional(),
  ageGroup: z.string().max(50).optional(),
  message: z.string().trim().max(2000, "Message is too long").optional(),
});

type FormValues = z.infer<typeof formSchema>;

const roles = [
  { value: "participant", label: "Participant" },
  { value: "family-member", label: "Family member" },
  { value: "carer", label: "Carer" },
  { value: "support-coordinator", label: "Support coordinator" },
  { value: "plan-manager", label: "Plan manager" },
  { value: "other", label: "Other" },
];

const ageGroups = [
  { value: "7-16", label: "7 – 16" },
  { value: "17-65", label: "17 – 65" },
  { value: "65+", label: "65+" },
  { value: "unsure", label: "Not sure" },
];

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const submit = useServerFn(submitLead);
  const track = useServerFn(trackLeadEvent);
  const formRef = useRef<HTMLFormElement>(null);
  const viewTracked = useRef(false);
  const startTracked = useRef(false);

  const sendEvent = (eventType: "form_view" | "form_start" | "form_submit") => {
    void track({
      data: {
        eventType,
        path: typeof window !== "undefined" ? window.location.pathname : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
      },
    }).catch(() => {
      /* analytics must never break the form */
    });
  };

  // Track when the form actually becomes visible to the visitor (a "form open").
  useEffect(() => {
    const node = formRef.current;
    if (!node || viewTracked.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !viewTracked.current) {
            viewTracked.current = true;
            sendEvent("form_view");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleFirstInteraction = () => {
    if (startTracked.current) return;
    startTracked.current = true;
    sendEvent("form_start");
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      ageGroup: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await submit({ data: values });
      sendEvent("form_submit");
      setSubmitted(true);
      reset();
      toast.success("Enquiry sent", {
        description: "We'll be in touch within 1 business day.",
      });
    } catch (err) {
      toast.error("Something went wrong", {
        description:
          err instanceof Error ? err.message : "Please try again or call 0413 811 836.",
      });
    }
  };


  if (submitted) {
    return (
      <div className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-soft text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-brand-teal/15 flex items-center justify-center text-brand-teal">
          <CheckCircle className="h-7 w-7" strokeWidth={2.25} />
        </div>
        <h3 className="mt-5 font-display font-extrabold text-2xl text-primary">
          Thanks for reaching out
        </h3>
        <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
          Your enquiry has been sent to our team. We'll contact you within one business day to
          learn more about how we can help.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 rounded-full"
          onClick={() => setSubmitted(false)}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      onFocusCapture={handleFirstInteraction}
      onChangeCapture={handleFirstInteraction}
      className="rounded-3xl bg-card border border-border p-6 md:p-8 shadow-soft space-y-5"
      aria-label="Enquiry form"
    >

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={errors.name ? "true" : "false"}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-destructive" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="0413 811 836"
            autoComplete="tel"
            {...register("phone")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">I am a</Label>
          <Select
            value={watch("role") || ""}
            onValueChange={(value) => setValue("role", value)}
          >
            <SelectTrigger id="role" aria-label="Select your role">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ageGroup">Age group</Label>
        <Select
          value={watch("ageGroup") || ""}
          onValueChange={(value) => setValue("ageGroup", value)}
        >
          <SelectTrigger id="ageGroup" aria-label="Select age group">
            <SelectValue placeholder="Select an age group" />
          </SelectTrigger>
          <SelectContent>
            {ageGroups.map((group) => (
              <SelectItem key={group.value} value={group.value}>
                {group.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          placeholder="Tell us a little about your goals, needs or questions..."
          rows={4}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-destructive" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Send enquiry <Send className="h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By submitting, you agree to be contacted about your enquiry.
      </p>
    </form>
  );
}
