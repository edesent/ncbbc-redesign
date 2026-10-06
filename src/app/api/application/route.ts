import { randomBytes } from "node:crypto";
import { APPLICATION_FIELDS, PROGRAM_OPTIONS, UPLOAD_KIND_LABELS, type UploadKind } from "@/lib/applicationConfig";
import { db, ensureSchema, UUID_PATTERN } from "@/lib/db";
import { admissionsInbox, emailButton, emailLayout, escapeHtml, sendEmail } from "@/lib/email";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max = 6000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The application could not be read. Please try again." }, { status: 400 });
  }

  // Hidden field that only automated spam fills in.
  if (clean(body.website)) return Response.json({ ok: true });

  const draftId = clean(body.draftId, 64);
  if (!UUID_PATTERN.test(draftId)) {
    return Response.json({ error: "Please refresh the page and try again." }, { status: 400 });
  }

  const answers: Record<string, string> = {};
  const missing: string[] = [];
  for (const field of APPLICATION_FIELDS) {
    const value = clean(body[field.key], field.long ? 8000 : 300);
    answers[field.key] = value;
    if (field.required && !value) missing.push(field.label);
  }

  if (answers.hasDegree === "Yes" && !answers.college1) missing.push("College 1");
  if (answers.probation === "Yes" && !answers.probationExplain) missing.push("Explanation of dismissal or probation");
  if (body.certify !== true) missing.push("Certification checkbox");

  if (missing.length) {
    return Response.json({ error: `Please complete: ${missing.join(", ")}.` }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(answers.email)) {
    return Response.json({ error: "Please check your email address." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(answers.pastorEmail)) {
    return Response.json({ error: "Please check your pastor's email address." }, { status: 400 });
  }
  if (!PROGRAM_OPTIONS.includes(answers.program)) {
    return Response.json({ error: "Please choose a program." }, { status: 400 });
  }

  try {
    await ensureSchema();
    const sql = db();

    const files = (await sql`
      select id, kind, filename from ncbbc_application_files
      where draft_id = ${draftId} and application_id is null
      order by created_at`) as { id: string; kind: UploadKind; filename: string }[];

    if (!files.some((file) => file.kind === "photo")) {
      return Response.json({ error: "Please add a current photo of yourself." }, { status: 400 });
    }

    const token = randomBytes(24).toString("base64url");
    const rows = (await sql`
      insert into ncbbc_applications (first_name, last_name, email, phone, program, answers, reference_token)
      values (${answers.firstName}, ${answers.lastName}, ${answers.email}, ${answers.phone}, ${answers.program}, ${JSON.stringify({ ...answers, certifiedAt: new Date().toISOString() })}::jsonb, ${token})
      returning id`) as { id: string }[];
    const applicationId = rows[0].id;

    await sql`update ncbbc_application_files set application_id = ${applicationId} where draft_id = ${draftId} and application_id is null`;

    const origin = new URL(request.url).origin;
    const fullName = `${answers.firstName} ${answers.lastName}`;
    const reviewLink = `${origin}/admissions-review/${applicationId}`;
    const referenceLink = `${origin}/pastor-reference/${token}`;
    const fileList = files.map((file) => `${UPLOAD_KIND_LABELS[file.kind] || file.kind}: ${file.filename}`);

    const summaryRows = APPLICATION_FIELDS.filter((field) => answers[field.key] && !field.long)
      .map((field) => `<tr><td style="padding:4px 12px 4px 0;color:#4f5661;vertical-align:top">${escapeHtml(field.label)}</td><td style="padding:4px 0">${escapeHtml(answers[field.key])}</td></tr>`)
      .join("");

    await Promise.allSettled([
      sendEmail({
        to: admissionsInbox(),
        replyTo: answers.email,
        subject: `New application: ${fullName} (${answers.program})`,
        html: emailLayout(
          "New Student Application",
          `<p><strong>${escapeHtml(fullName)}</strong> has applied for the <strong>${escapeHtml(answers.program)}</strong> program.</p>
           <p>A reference request has been emailed to Pastor ${escapeHtml(answers.pastorName)} (${escapeHtml(answers.pastorEmail)}).</p>
           ${emailButton(reviewLink, "Review the full application")}
           <table style="font-size:15px;border-collapse:collapse">${summaryRows}</table>
           <p style="margin-top:16px"><strong>Documents received:</strong><br>${fileList.map(escapeHtml).join("<br>")}</p>
           <p style="color:#4f5661;font-size:14px">The testimony, church involvement, and documents are on the review page.</p>`,
        ),
        text: `New application from ${fullName} for the ${answers.program} program.\n\nReview it here: ${reviewLink}\n\nDocuments: ${fileList.join("; ")}`,
      }),
      sendEmail({
        to: answers.email,
        replyTo: admissionsInbox(),
        subject: "We received your application to NCBBC",
        html: emailLayout(
          "Application Received",
          `<p>Dear ${escapeHtml(answers.firstName)},</p>
           <p>Thank you for applying to Northern Colorado Baptist Bible College. We have received your application for the <strong>${escapeHtml(answers.program)}</strong> program.</p>
           <p>We have also emailed your pastor, ${escapeHtml(answers.pastorName)}, asking for his pastoral reference. You may wish to let him know it is coming.</p>
           <p>Processing usually takes 1 to 10 days. Once your application has been reviewed, we will contact you by email.</p>
           <p>If you have questions, simply reply to this email.</p>
           <p>In Christ,<br>NCBBC Admissions Office</p>`,
        ),
        text: `Dear ${answers.firstName},\n\nThank you for applying to Northern Colorado Baptist Bible College. We received your application for the ${answers.program} program and have emailed your pastor, ${answers.pastorName}, for his pastoral reference.\n\nProcessing usually takes 1 to 10 days.\n\nNCBBC Admissions Office`,
      }),
      sendEmail({
        to: answers.pastorEmail,
        replyTo: admissionsInbox(),
        subject: `Pastoral reference requested for ${fullName}`,
        html: emailLayout(
          "Pastoral Reference Request",
          `<p>Dear ${escapeHtml(answers.pastorName)},</p>
           <p>${escapeHtml(fullName)} has applied to Northern Colorado Baptist Bible College and listed you as pastor of ${escapeHtml(answers.churchName)}.</p>
           <p>A pastoral reference is required for admission. Please use the private link below to answer a few questions and write or upload your letter. It takes only a few minutes.</p>
           ${emailButton(referenceLink, "Give your pastoral reference")}
           <p style="color:#4f5661;font-size:14px">This link is for you alone. If you did not expect this request, simply reply and let us know.</p>
           <p>Thank you for your faithful ministry,<br>NCBBC Admissions Office</p>`,
        ),
        text: `Dear ${answers.pastorName},\n\n${fullName} has applied to Northern Colorado Baptist Bible College and listed you as pastor. Please give your pastoral reference here:\n${referenceLink}\n\nThank you,\nNCBBC Admissions Office`,
      }),
    ]);

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Application submit failed:", error);
    return Response.json({ error: "Something went wrong saving your application. Please try again in a few minutes." }, { status: 500 });
  }
}
