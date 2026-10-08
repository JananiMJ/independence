import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, Eye, PenLine, Send, TrendingUp } from "lucide-react";

import { getLeadMetrics } from "@/lib/analytics.functions";

export const Route = createFileRoute("/metrics")({
  loader: () => getLeadMetrics(),
  head: () => ({
    meta: [
      { title: "Enquiry Metrics | Enable Independence" },
      {
        name: "description",
        content:
          "Conversion snapshot for the Enable Independence enquiry form: form views, form starts and submitted enquiries over the last 30 days.",
      },
      { property: "og:title", content: "Enquiry Metrics | Enable Independence" },
      {
        property: "og:description",
        content: "Form views, starts and submitted enquiries over the last 30 days.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MetricsPage,
  errorComponent: () => (
    <MetricsShell>
      <p className="text-muted-foreground">Metrics are unavailable right now. Please try again.</p>
    </MetricsShell>
  ),
  notFoundComponent: () => (
    <MetricsShell>
      <p className="text-muted-foreground">Nothing here yet.</p>
    </MetricsShell>
  ),
});

function MetricsShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-secondary/30 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center gap-3 text-brand-teal">
          <BarChart3 className="h-6 w-6" strokeWidth={2.25} />
          <span className="text-xs font-bold uppercase tracking-[0.18em]">Conversion snapshot</span>
        </div>
        <h1 className="mt-3 font-display text-3xl md:text-4xl font-extrabold text-primary">
          Enquiry form metrics
        </h1>
        <div className="mt-8">{children}</div>
        <Link to="/" className="mt-10 inline-block text-sm font-semibold text-primary underline">
          Back to homepage
        </Link>
      </div>
    </main>
  );
}

function MetricsPage() {
  const metrics = Route.useLoaderData();

  const cards = [
    { label: "Form views", value: metrics.formViews.toLocaleString(), icon: Eye },
    { label: "Forms started", value: metrics.formStarts.toLocaleString(), icon: PenLine },
    { label: "Enquiries submitted", value: metrics.formSubmits.toLocaleString(), icon: Send },
    { label: "Conversion rate", value: `${metrics.conversionRate}%`, icon: TrendingUp },
  ];

  return (
    <MetricsShell>
      <p className="text-muted-foreground max-w-xl">
        Anonymous activity on the enquiry form over the last {metrics.days} days. No personal
        details are included in these numbers.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl bg-card border border-border p-6 shadow-soft"
          >
            <card.icon className="h-5 w-5 text-brand-teal" strokeWidth={2.25} />
            <p className="mt-4 font-display text-3xl font-extrabold text-primary">{card.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Start rate (visitors who began filling the form): <strong>{metrics.startRate}%</strong>
      </p>
    </MetricsShell>
  );
}
