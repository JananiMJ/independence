// Server-only email sender (SMTP, e.g. Hostinger email).
// Load inside server handlers: const { sendLeadEmail } = await import("@/lib/mailer.server");
import nodemailer, { type Transporter } from "nodemailer";

export type LeadEmail = {
  name: string;
  email: string;
  phone?: string;
  role?: string;
  ageGroup?: string;
  message?: string;
};

let transporter: Transporter | undefined;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  const missing = Object.entries({ SMTP_HOST, SMTP_USER, SMTP_PASSWORD })
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing email environment variable(s): ${missing.join(", ")}`);
  }

  const port = Number(SMTP_PORT) || 465;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

  return transporter;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendLeadEmail(lead: LeadEmail): Promise<void> {
  const to = process.env.MAIL_TO || "info@enbl.com.au";
  const from = process.env.SMTP_USER as string;

  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["I am a", lead.role],
    ["Age group", lead.ageGroup],
    ["Message", lead.message],
  ];
  const filled = rows.filter(([, value]) => value && value.trim() !== "") as [string, string][];

  const text = filled.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `
    <h2 style="font-family:sans-serif">New website enquiry</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${filled
        .map(
          ([label, value]) => `
        <tr>
          <td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top">${label}</td>
          <td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`,
        )
        .join("")}
    </table>`;

  await getTransporter().sendMail({
    from: `"Enable Independence Website" <${from}>`,
    to,
    replyTo: lead.email,
    subject: `New enquiry from ${lead.name}`,
    text,
    html,
  });
}
