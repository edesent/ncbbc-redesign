// Sends email through Resend (https://resend.com), the same service the Elmwood Baptist site uses.
// Settings saved on the hosting (never in the code):
//   RESEND_API_KEY   the Resend key
//   ADMISSIONS_EMAIL where new applications and pastor references are sent
//   EMAIL_FROM       optional sender, must be at a domain verified in Resend

export function admissionsInbox() {
  return process.env.ADMISSIONS_EMAIL || "admissions@ncbbc.org";
}

function sender() {
  return process.env.EMAIL_FROM || "NCBBC Admissions <website@elmwoodbaptist.org>";
}

export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type EmailResult = { ok: true } | { ok: false; error: string };

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set, so no email was sent:", opts.subject);
    return { ok: false, error: "Email is not set up yet." };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender(),
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
        reply_to: opts.replyTo,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("Resend error:", response.status, body);
      return { ok: false, error: `Email service returned ${response.status}.` };
    }
    return { ok: true };
  } catch (error) {
    console.error("Email send failed:", error);
    return { ok: false, error: "Email could not be sent." };
  }
}

/** Wraps email content in a simple, readable layout with the college name at the top. */
export function emailLayout(title: string, bodyHtml: string) {
  return `<!doctype html><html><body style="margin:0;background:#f3f5f7;font-family:Arial,Helvetica,sans-serif;color:#111827">
<div style="max-width:640px;margin:0 auto;padding:24px">
<div style="background:#082f49;color:#ffffff;padding:20px 24px;border-top:6px solid #c51f2f">
<div style="font-size:13px;letter-spacing:2px;text-transform:uppercase;opacity:.8">Northern Colorado Baptist Bible College</div>
<div style="font-size:22px;font-weight:bold;margin-top:6px">${escapeHtml(title)}</div>
</div>
<div style="background:#ffffff;padding:24px;font-size:16px;line-height:1.6">${bodyHtml}</div>
<div style="padding:16px 4px;font-size:13px;color:#4f5661">13100 E 144th Ave, Brighton, CO 80601 &middot; 303.659.3818</div>
</div></body></html>`;
}

export function emailButton(href: string, label: string) {
  return `<p style="margin:24px 0"><a href="${escapeHtml(href)}" style="display:inline-block;background:#c51f2f;color:#ffffff;text-decoration:none;font-weight:bold;padding:14px 22px;border-radius:6px">${escapeHtml(label)}</a></p>`;
}
