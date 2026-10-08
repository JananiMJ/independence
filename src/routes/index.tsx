import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Heart,
  Users,
  HandHelping,
  Car,
  Home,
  Sparkles,
  Briefcase,
  Activity,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  UserCheck,
  Zap,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { LeadForm } from "@/components/LeadForm";
import heroPeople from "@/assets/hero-people.jpg";
import approachPeople from "@/assets/approach-people.jpg";
import logoIcon from "@/assets/logo-icon-transparent.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Enable Independence | NDIS Provider in Perth, WA (Registration in Progress)" },
      {
        name: "description",
        content:
          "Enable Independence is a Perth-based NDIS provider with registration in progress, delivering person-centred supports across daily living, community participation, employment and travel across WA.",
      },
      { property: "og:title", content: "Enable Independence | NDIS Provider in Perth, WA (Registration in Progress)" },
      {
        property: "og:description",
        content:
          "Person-centred NDIS supports across daily living, community, employment and travel — proudly serving participants across Western Australia. NDIS registration in progress.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { icon: HandHelping, title: "Assist – Personal Activities", desc: "Support with everyday personal tasks that promote dignity, safety and independence." },
  { icon: Home, title: "Household Tasks", desc: "Practical help around the home so you can live comfortably and independently." },
  { icon: Users, title: "Community Participation", desc: "Get out, connect and take part in activities that matter to you." },
  { icon: Activity, title: "Innovative Community Participation", desc: "Creative, skill-building experiences tailored to your goals and interests." },
  { icon: Sparkles, title: "Development of Life Skills", desc: "Build the confidence and know-how to do more on your own terms." },
  { icon: Briefcase, title: "Assist Access / Maintain Employment", desc: "Support to find, prepare for and hold meaningful work." },
  { icon: Car, title: "Assist – Travel & Transport", desc: "Safe, reliable transport to appointments, activities and community." },
  { icon: ShieldCheck, title: "Personal Mobility Equipment", desc: "Assistance with mobility aids so getting around is easier." },
  { icon: Heart, title: "Group & Centre Activities", desc: "Shared programs that build friendships, skills and belonging." },
];

const pillars = [
  {
    icon: UserCheck,
    accent: "brand-blue",
    title: "Individual agency",
    desc: "Person-centred supports that promote informed choice, cultural respect, privacy and your right to self-determination in every decision.",
  },
  {
    icon: ShieldCheck,
    accent: "brand-magenta",
    title: "Safeguarding trust",
    desc: "Rigorous quality governance, zero-tolerance safeguarding and open feedback channels — so you always feel safe and heard.",
  },
  {
    icon: Zap,
    accent: "brand-gold",
    title: "Reliable continuity",
    desc: "Documented emergency and disaster planning means your support never falters — through staff changes, weather events or the unexpected.",
  },
];

const supportGroups = [
  "Acquired brain injury",
  "Autism",
  "Intellectual disability",
  "Mental health",
  "Physical & sensory disability",
  "Spinal injury",
  "Ventilator dependent",
  "Aged care",
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <img src={logoIcon} alt="Enable Independence" className="h-9 w-9 object-contain" />
            <span className="font-display font-extrabold tracking-tight text-primary text-lg">
              Enable <span className="text-brand-blue">Independence</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-primary transition">About</a>
            <a href="#commitments" className="hover:text-primary transition">Our approach</a>
            <a href="#services" className="hover:text-primary transition">Services</a>
            <a href="#who" className="hover:text-primary transition">Who we support</a>
            <a href="#contact" className="hover:text-primary transition">Contact</a>
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="bg-hero">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-primary shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              NDIS Registration in Progress · Perth, WA
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-[1.05] text-primary">
              Support that helps you{" "}
              <span className="text-gradient-brand">live your way.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Enable Independence is a person-centred NDIS provider based in Nedlands, WA.
              We walk alongside participants, families and carers to build genuine
              independence — one goal at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold shadow-soft hover:opacity-90 transition"
              >
                Start your journey <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-semibold text-primary hover:bg-accent transition"
              >
                Explore services
              </a>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "NDIS", v: "In progress" },
                { k: "11+", v: "Support types" },
                { k: "All ages", v: "7 – 65+" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="text-2xl font-display font-extrabold text-primary">{s.k}</dt>
                  <dd className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-brand opacity-20 blur-3xl rounded-full" />
            <div className="relative rounded-3xl bg-card border border-border shadow-soft overflow-hidden aspect-square">
              <img
                src={heroPeople}
                alt="Two people connecting outdoors — a person in a wheelchair and a support worker smiling together"
                className="h-full w-full object-cover"
                width={1024}
                height={1024}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-magenta">About us</p>
            <h2 className="mt-3 text-4xl font-extrabold text-primary">
              Independence looks different for everyone.
            </h2>
          </div>
          <div className="md:col-span-3 text-lg text-muted-foreground space-y-5">
            <p>
              Enable Independence is a Perth-based NDIS provider with registration in progress,
              committed to delivering high-quality, respectful and flexible supports across Western
              Australia.
            </p>
            <p>
              We take the time to understand what independence means to you — then we build a
              team, a plan and a rhythm that works. From personal care to community access, from
              life skills to employment, our supports are shaped around your goals, culture and
              choices.
            </p>
            <div className="pt-4 grid sm:grid-cols-2 gap-4">
              {[
                { t: "Person-centred", d: "Your goals lead every decision we make." },
                { t: "Quality first", d: "Aligned with the NDIS Practice Standards." },
                { t: "Flexible & mobile", d: "We come to you across metro Perth." },
                { t: "Respect & dignity", d: "Cultural safety and choice, always." },
              ].map((v) => (
                <div key={v.t} className="rounded-2xl border border-border bg-card p-5">
                  <p className="font-display font-bold text-primary">{v.t}</p>
                  <p className="text-sm text-muted-foreground mt-1">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section id="commitments" className="py-24 bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Editorial image column */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-brand opacity-20 blur-3xl rounded-[3rem]" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-soft aspect-[4/5]">
                  <img
                    src={approachPeople}
                    alt="A support worker and participant laughing together at home"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width={1280}
                    height={960}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/0 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-teal px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-soft">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse" />
                      Our care philosophy
                    </span>
                  </div>
                </div>
                {/* Floating stat card */}
                <div className="hidden md:flex absolute -bottom-6 -right-4 items-center gap-3 rounded-2xl bg-card border border-border shadow-soft px-5 py-4 max-w-[240px]">
                  <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center text-primary-foreground">
                    <Heart className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  <div>
                    <p className="font-display font-extrabold text-primary text-sm leading-tight">Person-first, always</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Aligned to NDIS Practice Standards</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story + pillars column */}
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal">Our approach</p>
              <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-primary leading-[1.05]">
                Built around <span className="text-gradient-brand">you</span>,
                <br className="hidden sm:block" /> not just a process.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-xl">
                We've replaced clipboards and checklists with real relationships.
                Dignity, culture and your choices lead every step of the journey —
                and our team is trained to make sure it stays that way.
              </p>

              {/* Curated pillars */}
              <div className="mt-10 space-y-4">
                {pillars.map((p) => (
                  <div
                    key={p.title}
                    className="group flex gap-4 md:gap-5 p-5 md:p-6 rounded-2xl bg-card border border-border hover:shadow-soft hover:-translate-y-0.5 transition-all"
                  >
                    <div
                      className="flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center text-primary-foreground shadow-soft"
                      style={{ backgroundColor: `var(--${p.accent})` }}
                    >
                      <p.icon className="h-6 w-6" strokeWidth={2.25} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-primary">{p.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Conversion CTA */}
              <div className="mt-10 relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-10 shadow-soft">
                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brand-teal/25 blur-3xl" />
                <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-brand-magenta/20 blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="font-display font-extrabold text-2xl md:text-3xl leading-tight max-w-md">
                      Ready for a more personal approach?
                    </h3>
                    <p className="mt-2 text-primary-foreground/80 text-sm max-w-md">
                      Book a no-pressure chat with our team — we'll listen first.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold text-primary px-6 py-3 font-bold shadow-soft hover:opacity-90 transition"
                    >
                      Book a chat <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="tel:0413811836"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 hover:bg-primary-foreground/15 px-6 py-3 font-semibold transition"
                    >
                      <Phone className="h-4 w-4" /> 0413 811 836
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal">Our services</p>
              <h2 className="mt-3 text-4xl font-extrabold text-primary max-w-2xl">
                Supports across the everyday, the extraordinary and everything in between.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm">
              We deliver the following NDIS registration groups under the Core Module of the
              NDIS Practice Standards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl bg-card border border-border p-6 hover:shadow-soft hover:-translate-y-0.5 transition-all"
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-brand flex items-center justify-center text-primary-foreground shadow-soft">
                  <s.icon className="h-5 w-5" strokeWidth={2.25} />
                </div>
                <h3 className="mt-5 font-display font-bold text-lg text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SUPPORT */}
      <section id="who" className="py-24">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">Who we support</p>
            <h2 className="mt-3 text-4xl font-extrabold text-primary">
              Supports tailored to the people we walk beside.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              We support participants aged 7 through to over 65, from a wide range of lived
              experiences. Wherever you are on your journey, we'd love to hear from you.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Age groups supported: <span className="font-semibold text-primary">7 – 16 · 17 – 65 · 65+</span>
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {supportGroups.map((g) => (
              <li
                key={g}
                className="rounded-xl border border-border bg-card px-4 py-4 text-sm font-medium text-primary flex items-center gap-3"
              >
                <span className="h-2 w-2 rounded-full bg-gradient-brand" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT / LEAD CAPTURE */}
      <section id="contact" className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Form */}
            <LeadForm />

            {/* Contact details */}
            <div className="lg:pt-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal">
                Get in touch
              </p>
              <h2 className="mt-3 text-4xl font-extrabold text-primary">
                Let's talk about your goals.
              </h2>
              <p className="mt-4 text-muted-foreground max-w-md">
                Fill in the form and our team will get back to you within one business day. You can
                also call or email us directly.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="mailto:info@enbl.com.au"
                  className="group flex items-start gap-4 rounded-2xl bg-card border border-border hover:border-brand-teal/40 transition p-5"
                >
                  <div className="h-10 w-10 rounded-xl bg-brand-gold/15 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                    <p className="font-semibold text-primary group-hover:text-brand-blue transition">
                      info@enbl.com.au
                    </p>
                  </div>
                </a>
                <a
                  href="tel:0413811836"
                  className="group flex items-start gap-4 rounded-2xl bg-card border border-border hover:border-brand-teal/40 transition p-5"
                >
                  <div className="h-10 w-10 rounded-xl bg-brand-teal/15 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-brand-teal" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Phone</p>
                    <p className="font-semibold text-primary group-hover:text-brand-blue transition">
                      0413 811 836
                    </p>
                  </div>
                </a>
                <div className="flex items-start gap-4 rounded-2xl bg-card border border-border p-5">
                  <div className="h-10 w-10 rounded-xl bg-brand-magenta/15 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-brand-magenta" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Office</p>
                    <p className="font-semibold text-primary">Office 1, Hampden House</p>
                    <p className="text-muted-foreground text-sm">174 Hampden Road, Nedlands WA 6009</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="" className="h-7 w-7 object-contain" />
            <span>
              © {new Date().getFullYear()} Enable Independence.
            </span>
          </div>
          <p className="flex items-center gap-3">
            <span>ABN 72 695 730 182 · NDIS Registration in Progress</span>
            <Link to="/metrics" className="underline hover:text-primary transition">
              Metrics
            </Link>
          </p>

        </div>
      </footer>
    </div>
  );
}
