import { type NextRequest, NextResponse } from "next/server";
import { validateLead, type Lead } from "@/lib/leads";

/*
 * Lead intake for the dealer, notify and find-a-dealer forms.
 *
 * Destinations come from env vars and are still to be decided (see TODO.md):
 *   LEADS_EMAIL_TO            email inbox for new leads (no sender wired yet)
 *   GOOGLE_SHEETS_WEBHOOK_URL Apps Script web-app URL that appends a row
 * With neither set, leads are logged to the server console.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort, per-instance limiter. Serverless instances do not share it, so
// it slows abuse rather than stopping it. Swap for a shared store if needed.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

async function deliver(lead: Lead & { receivedAt: string }) {
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const emailTo = process.env.LEADS_EMAIL_TO;

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`Sheets webhook responded ${res.status}`);
  }
  if (emailTo) {
    // TODO(leads): pick an email provider and send here. See TODO.md.
    console.warn(`[leads] LEADS_EMAIL_TO is set but no email sender is configured yet`);
  }
  if (!webhook) {
    console.info("[leads] No destination configured, logging lead:", JSON.stringify(lead));
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, errors: { form: "Too many submissions. Please try again in a few minutes." } }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Invalid request." } }, { status: 400 });
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ ok: false, errors: { form: "Invalid request." } }, { status: 400 });
  }

  const body = raw as Record<string, unknown>;
  // Honeypot: real people never fill the hidden "website" field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const { lead, errors } = validateLead(body);
  if (!lead) return NextResponse.json({ ok: false, errors }, { status: 422 });

  try {
    await deliver({ ...lead, receivedAt: new Date().toISOString() });
  } catch (err) {
    console.error("[leads] delivery failed", err);
    return NextResponse.json(
      { ok: false, errors: { form: "We couldn't send that just now. Please call or WhatsApp us instead." } },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
