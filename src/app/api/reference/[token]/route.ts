import { RECOMMENDATION_OPTIONS } from "@/lib/applicationConfig";
import { db, ensureSchema, UUID_PATTERN } from "@/lib/db";
import { admissionsInbox, emailButton, emailLayout, escapeHtml, sendEmail } from "@/lib/email";

export const runtime = "nodejs";

function clean(value: unknown, max = 300) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) {
    return Response.json({ error: "This reference link is not valid." }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The reference could not be read. Please try again." }, { status: 400 });
  }

  const reference = {
    pastorName: clean(body.pastorName),
    churchName: clean(body.churchName),
    pastorPhone: clean(body.pastorPhone),
    knownFor: clean(body.knownFor),
    goodStanding: clean(body.goodStanding),
    service: clean(body.service, 4000),
    recommendation: clean(body.recommendation),
    letter: clean(body.letter, 20000),
  };
  const fileId = clean(body.fileId, 64);

  const missing: string[] = [];
  if (!reference.pastorName) missing.push("your name");
  if (!reference.churchName) missing.push("church");
  if (!reference.knownFor) missing.push("how long you have known the applicant");
  if (!["Yes", "No"].includes(reference.goodStanding)) missing.push("membership in good standing");
  if (!RECOMMENDATION_OPTIONS.includes(reference.recommendation)) missing.push("your recommendation");
  if (!reference.letter && !UUID_PATTERN.test(fileId)) missing.push("a written or uploaded letter");
  if (missing.length) {
    return Response.json({ error: `Please complete: ${missing.join(", ")}.` }, { status: 400 });
  }

  try {
    await ensureSchema();
    const sql = db();
    const rows = (await sql`
      select id, first_name, last_name, program, reference_status
      from ncbbc_applications where reference_token = ${token}`) as {
      id: string;
      first_name: string;
      last_name: string;
      program: string;
      reference_status: string;
    }[];
    const application = rows[0];
    if (!application) return Response.json({ error: "This reference link is not valid." }, { status: 404 });
    if (application.reference_status === "Received") {
      return Response.json({ error: "This reference has already been received. Thank you!" }, { status: 409 });
    }

    // Keep only the letter file the pastor ended with, if he uploaded and then replaced one.
    if (UUID_PATTERN.test(fileId)) {
      await sql`delete from ncbbc_application_files where application_id = ${application.id} and kind = 'pastor_letter' and id <> ${fileId}`;
    } else {
      await sql`delete from ncbbc_application_files where application_id = ${application.id} and kind = 'pastor_letter'`;
    }

    await sql`
      update ncbbc_applications
      set reference_status = 'Received', reference_answers = ${JSON.stringify(reference)}::jsonb, reference_submitted_at = now()
      where id = ${application.id}`;

    const applicant = `${application.first_name} ${application.last_name}`;
    const reviewLink = `${new URL(request.url).origin}/admissions-review/${application.id}`;

    await sendEmail({
      to: admissionsInbox(),
      subject: `Pastoral reference received for ${applicant}`,
      html: emailLayout(
        "Pastoral Reference Received",
        `<p>${escapeHtml(reference.pastorName)} of ${escapeHtml(reference.churchName)} has sent his reference for <strong>${escapeHtml(applicant)}</strong> (${escapeHtml(application.program)}).</p>
         <p><strong>Recommendation:</strong> ${escapeHtml(reference.recommendation)}<br>
         <strong>Member in good standing:</strong> ${escapeHtml(reference.goodStanding)}<br>
         <strong>Known applicant for:</strong> ${escapeHtml(reference.knownFor)}</p>
         ${emailButton(reviewLink, "Read the full reference")}`,
      ),
      text: `${reference.pastorName} sent his reference for ${applicant}.\nRecommendation: ${reference.recommendation}\nRead it here: ${reviewLink}`,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Reference submit failed:", error);
    return Response.json({ error: "Something went wrong sending your reference. Please try again." }, { status: 500 });
  }
}
