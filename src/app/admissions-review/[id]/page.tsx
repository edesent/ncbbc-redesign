import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { ReviewHero, ReviewLogin } from "@/components/ReviewShell";
import { isReviewer } from "@/lib/adminAuth";
import { APPLICATION_FIELDS, APPLICATION_STATUSES, UPLOAD_KIND_LABELS, type UploadKind } from "@/lib/applicationConfig";
import { db, ensureSchema, UUID_PATTERN } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Application",
  robots: { index: false, follow: false },
};

type Application = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  status: string;
  answers: Record<string, string>;
  reference_token: string;
  reference_status: string;
  reference_answers: Record<string, string> | null;
  reference_submitted_at: string | null;
  admin_notes: string | null;
};

type FileRow = { id: string; kind: UploadKind; filename: string; content_type: string; size: number };

const REFERENCE_LABELS: [string, string][] = [
  ["pastorName", "Pastor"],
  ["churchName", "Church"],
  ["pastorPhone", "Phone"],
  ["knownFor", "Has known the applicant"],
  ["goodStanding", "Saved, baptized member in good standing"],
  ["service", "How the applicant serves"],
  ["recommendation", "Recommendation"],
];

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US", { timeZone: "America/Denver", dateStyle: "long", timeStyle: "short" });
}

function formatSize(bytes: number) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default async function ApplicationDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;

  if (!(await isReviewer())) {
    return (
      <main>
        <ReviewHero title="Application" signedIn={false} />
        <ReviewLogin error={false} />
      </main>
    );
  }
  if (!UUID_PATTERN.test(id)) notFound();

  await ensureSchema();
  const sql = db();
  const rows = (await sql`select * from ncbbc_applications where id = ${id}`) as Application[];
  const application = rows[0];
  if (!application) notFound();

  const files = (await sql`
    select id, kind, filename, content_type, size from ncbbc_application_files
    where application_id = ${id} order by created_at`) as FileRow[];

  const answers = application.answers || {};
  const sections = [...new Set(APPLICATION_FIELDS.map((field) => field.section))];
  const photo = files.find((file) => file.kind === "photo");
  const letterFile = files.find((file) => file.kind === "pastor_letter");
  const studentFiles = files.filter((file) => file.kind !== "pastor_letter");
  const reference = application.reference_answers;
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "";
  const referenceLink = `https://${host}/pastor-reference/${application.reference_token}`;

  return (
    <main>
      <ReviewHero title={`${application.first_name} ${application.last_name}`} signedIn />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Link href="/admissions-review" className="inline-flex items-center gap-2 font-black text-wine">
          <ArrowLeft size={18} />
          All applications
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div className="grid gap-6">
            {sections.map((section) => (
              <section key={section} className="rounded-md border border-line bg-white p-6 shadow-sm">
                <h2 className="school-heading text-2xl text-forest">{section}</h2>
                <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                  {APPLICATION_FIELDS.filter((field) => field.section === section && answers[field.key]).map((field) => (
                    <div key={field.key} className={field.long ? "sm:col-span-2" : ""}>
                      <dt className="text-sm font-black uppercase tracking-[0.1em] text-stone">{field.label}</dt>
                      <dd className="mt-1 whitespace-pre-wrap text-lg leading-7 text-ink">{answers[field.key]}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}

            <section className="rounded-md border border-line bg-white p-6 shadow-sm">
              <h2 className="school-heading text-2xl text-forest">Pastoral Reference</h2>
              {reference ? (
                <>
                  <p className="mt-2 text-stone">Received {application.reference_submitted_at ? formatDate(application.reference_submitted_at) : ""}</p>
                  <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                    {REFERENCE_LABELS.filter(([key]) => reference[key]).map(([key, label]) => (
                      <div key={key} className={key === "service" || key === "recommendation" ? "sm:col-span-2" : ""}>
                        <dt className="text-sm font-black uppercase tracking-[0.1em] text-stone">{label}</dt>
                        <dd className="mt-1 whitespace-pre-wrap text-lg leading-7 text-ink">{reference[key]}</dd>
                      </div>
                    ))}
                  </dl>
                  {reference.letter ? (
                    <div className="mt-5 rounded-md bg-cream p-5">
                      <p className="text-sm font-black uppercase tracking-[0.1em] text-stone">Letter</p>
                      <p className="mt-2 whitespace-pre-wrap text-lg leading-8 text-ink">{reference.letter}</p>
                    </div>
                  ) : null}
                  {letterFile ? (
                    <a href={`/api/admissions/file/${letterFile.id}?view=1`} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-md bg-forest px-4 py-3 font-black text-white hover:bg-wine">
                      <Eye size={18} />
                      Open uploaded letter ({letterFile.filename})
                    </a>
                  ) : null}
                </>
              ) : (
                <div className="mt-3 grid gap-3 text-lg leading-8 text-stone">
                  <p>
                    Waiting on {answers.pastorName || "the pastor"} ({answers.pastorEmail}). If he did not receive the email, you can send him this private link:
                  </p>
                  <p className="break-all rounded-md bg-cream p-4 font-mono text-base text-ink">{referenceLink}</p>
                </div>
              )}
            </section>
          </div>

          <aside className="grid gap-6">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/api/admissions/file/${photo.id}?view=1`} alt={`Photo of ${application.first_name} ${application.last_name}`} className="w-full rounded-md border border-line bg-white object-cover shadow-sm" />
            ) : null}

            <form action="/api/admissions/status" method="post" className="grid gap-4 rounded-md border border-line bg-white p-6 shadow-sm">
              <input type="hidden" name="id" value={application.id} />
              <p className="text-stone">Received {formatDate(application.created_at)}</p>
              <label className="grid gap-2 text-sm font-black uppercase tracking-[0.1em] text-stone">
                Status
                <select name="status" defaultValue={application.status} className="min-h-12 rounded-md border border-line px-4 text-base font-bold text-ink">
                  {APPLICATION_STATUSES.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-black uppercase tracking-[0.1em] text-stone">
                Office notes
                <textarea name="notes" rows={5} defaultValue={application.admin_notes || ""} className="rounded-md border border-line px-4 py-3 text-base font-normal normal-case tracking-normal text-ink" />
              </label>
              <button className="min-h-12 rounded-md bg-brass px-5 py-3 font-black uppercase tracking-[0.08em] text-white hover:bg-wine">Save</button>
              {saved ? <p className="font-bold text-green-700">Saved.</p> : null}
            </form>

            <section className="rounded-md border border-line bg-white p-6 shadow-sm">
              <h2 className="school-heading text-2xl text-forest">Documents</h2>
              {studentFiles.length ? (
                <ul className="mt-4 grid gap-3">
                  {studentFiles.map((file) => (
                    <li key={file.id} className="rounded-md border border-line p-4">
                      <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.1em] text-brass">
                        <FileText size={16} />
                        {UPLOAD_KIND_LABELS[file.kind] || file.kind}
                      </p>
                      <p className="mt-1 break-words font-semibold text-ink">{file.filename}</p>
                      <p className="text-sm text-stone">{formatSize(file.size)}</p>
                      <div className="mt-3 flex gap-2">
                        <a href={`/api/admissions/file/${file.id}?view=1`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md bg-cream px-3 py-2 text-sm font-black text-ink hover:text-brass">
                          <Eye size={16} />
                          View
                        </a>
                        <a href={`/api/admissions/file/${file.id}`} className="inline-flex items-center gap-1 rounded-md bg-cream px-3 py-2 text-sm font-black text-ink hover:text-brass">
                          <Download size={16} />
                          Download
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-stone">No documents.</p>
              )}
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
