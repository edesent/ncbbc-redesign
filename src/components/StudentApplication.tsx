"use client";

import { useState } from "react";
import { CheckCircle2, FileText, ImageIcon, Loader2, Paperclip, Send, Trash2, Upload } from "lucide-react";
import {
  MAX_FILE_BYTES,
  PROGRAM_OPTIONS,
  acceptAttribute,
  type UploadKind,
} from "@/lib/applicationConfig";

type Uploaded = { id: string; filename: string; size: number; kind: UploadKind };

const inputClass =
  "min-h-12 w-full rounded-md border border-line bg-white px-4 py-3 text-base font-semibold text-ink outline-none transition placeholder:text-stone/45 focus:border-brass focus:ring-4 focus:ring-brass/12";
const labelClass = "grid gap-2 text-sm font-black uppercase tracking-[0.1em] text-stone";
const sectionClass = "rounded-md border border-line bg-white p-6 shadow-sm sm:p-8";

function newDraftId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (Number(c) ^ (Math.random() * 16) >> (Number(c) / 4)).toString(16),
  );
}

function formatSize(bytes: number) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function SectionHeading({ step, title, text }: { step: number; title: string; text?: string }) {
  return (
    <div className="mb-6 flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest font-black text-white">{step}</span>
      <div>
        <h2 className="school-heading text-3xl leading-tight text-forest">{title}</h2>
        {text ? <p className="mt-1 leading-7 text-stone">{text}</p> : null}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
  placeholder,
  autoComplete,
  className = "",
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`${labelClass} ${className}`}>
      <span>
        {label}
        {required ? <span className="text-brass"> *</span> : null}
      </span>
      <input name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} className={inputClass} />
    </label>
  );
}

function YesNo({ label, name, value, onChange }: { label: string; name: string; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="grid gap-3">
      <legend className="mb-3 text-sm font-black uppercase tracking-[0.1em] text-stone">
        {label}
        <span className="text-brass"> *</span>
      </legend>
      <div className="flex flex-wrap gap-3">
        {["Yes", "No"].map((option) => (
          <label
            key={option}
            className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-md border px-5 py-3 text-base font-bold transition ${
              value === option ? "border-brass bg-brass/8 text-ink" : "border-line bg-white text-stone hover:border-stone/50"
            }`}
          >
            <input type="radio" name={name} value={option} checked={value === option} onChange={() => onChange(option)} required className="h-5 w-5 accent-[#c51f2f]" />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function UploadBox({
  kind,
  title,
  help,
  required,
  files,
  busy,
  onPick,
  onRemove,
}: {
  kind: UploadKind;
  title: string;
  help: string;
  required?: boolean;
  files: Uploaded[];
  busy: boolean;
  onPick: (kind: UploadKind, file: File) => void;
  onRemove: (file: Uploaded) => void;
}) {
  const Icon = kind === "photo" ? ImageIcon : FileText;
  return (
    <div className="rounded-md border border-dashed border-stone/40 bg-paper p-5">
      <div className="flex items-start gap-3">
        <Icon className="mt-1 shrink-0 text-brass" size={24} />
        <div className="min-w-0 flex-1">
          <p className="text-lg font-black text-ink">
            {title}
            {required ? <span className="text-brass"> *</span> : null}
          </p>
          <p className="mt-1 leading-6 text-stone">{help}</p>

          {files.length ? (
            <ul className="mt-4 grid gap-2">
              {files.map((file) => (
                <li key={file.id} className="flex items-center gap-3 rounded-md border border-line bg-white px-4 py-3">
                  <CheckCircle2 className="shrink-0 text-green-700" size={20} />
                  <span className="min-w-0 flex-1 break-words font-semibold text-ink">{file.filename}</span>
                  <span className="shrink-0 text-sm text-stone">{formatSize(file.size)}</span>
                  <button type="button" onClick={() => onRemove(file)} className="shrink-0 rounded-md p-2 text-stone transition hover:bg-cream hover:text-brass" aria-label={`Remove ${file.filename}`}>
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <label className={`mt-4 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-md px-5 py-3 font-black uppercase tracking-[0.06em] transition ${busy ? "bg-stone/30 text-white" : "bg-forest text-white hover:bg-wine"}`}>
            {busy ? <Loader2 className="animate-spin" size={18} /> : files.length ? <Paperclip size={18} /> : <Upload size={18} />}
            {busy ? "Uploading..." : files.length ? "Add another" : "Choose file"}
            <input
              type="file"
              className="sr-only"
              accept={acceptAttribute(kind)}
              disabled={busy}
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (file) onPick(kind, file);
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export function StudentApplication() {
  const [draftId] = useState(newDraftId);
  const [files, setFiles] = useState<Uploaded[]>([]);
  const [uploading, setUploading] = useState<UploadKind | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [gender, setGender] = useState("");
  const [ifbMember, setIfbMember] = useState("");
  const [hasDegree, setHasDegree] = useState("");
  const [probation, setProbation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ name: string; pastor: string } | null>(null);

  const filesOf = (kind: UploadKind) => files.filter((file) => file.kind === kind);

  async function pickFile(kind: UploadKind, file: File) {
    setUploadError("");
    if (file.size > MAX_FILE_BYTES) {
      setUploadError(`"${file.name}" is larger than 4 MB. Please choose a smaller file, or take a new photo at a lower size.`);
      return;
    }
    setUploading(kind);
    try {
      const response = await fetch(`/api/application/upload?draft=${draftId}&kind=${kind}`, {
        method: "POST",
        headers: {
          "content-type": file.type || "application/octet-stream",
          "x-filename": encodeURIComponent(file.name),
        },
        body: file,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "The file could not be uploaded.");
      setFiles((current) => [...current, result as Uploaded]);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "The file could not be uploaded.");
    } finally {
      setUploading(null);
    }
  }

  async function removeFile(file: Uploaded) {
    setFiles((current) => current.filter((item) => item.id !== file.id));
    await fetch(`/api/application/upload?draft=${draftId}&id=${file.id}`, { method: "DELETE" }).catch(() => undefined);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!filesOf("photo").length) {
      setError("Please add a current photo of yourself in step 5.");
      return;
    }

    const form = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = { draftId };
    form.forEach((value, key) => {
      if (typeof value === "string") payload[key] = value;
    });
    payload.certify = form.get("certify") === "on";

    setSubmitting(true);
    try {
      const response = await fetch("/api/application", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Your application could not be sent.");
      setDone({ name: String(payload.firstName || ""), pastor: String(payload.pastorName || "your pastor") });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your application could not be sent.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section className="rounded-md border border-line bg-white p-8 text-center shadow-lg sm:p-12">
        <CheckCircle2 className="mx-auto text-green-700" size={56} />
        <h2 className="school-heading mt-5 text-4xl text-forest">Thank you, {done.name}!</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-stone">
          Your application has been received. A confirmation is on its way to your email, and we have sent {done.pastor} a private link to give his pastoral reference.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-stone">
          Processing usually takes 1 to 10 days. We will contact you by email once your application has been reviewed.
        </p>
      </section>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-6" noValidate={false}>
      <div className="rounded-md border border-brass/30 bg-brass/5 p-5 leading-7 text-ink">
        <p className="font-black">Before you begin</p>
        <p className="mt-1 text-stone">
          Please have your pastor&apos;s name and email address and a current photo of yourself ready. If you have college credits, have your transcript ready to upload as well. Fields marked <span className="font-black text-brass">*</span> are required.
        </p>
      </div>

      <section className={sectionClass}>
        <SectionHeading step={1} title="Personal Information" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First name" name="firstName" required autoComplete="given-name" />
          <Field label="Last name" name="lastName" required autoComplete="family-name" />
          <Field label="Email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
          <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
          <Field label="Date of birth" name="dob" type="date" required autoComplete="bday" />
          <fieldset className="grid gap-3">
            <legend className="mb-3 text-sm font-black uppercase tracking-[0.1em] text-stone">
              Gender<span className="text-brass"> *</span>
            </legend>
            <div className="flex flex-wrap gap-3">
              {["Male", "Female"].map((option) => (
                <label key={option} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-md border px-5 py-3 text-base font-bold transition ${gender === option ? "border-brass bg-brass/8 text-ink" : "border-line bg-white text-stone"}`}>
                  <input type="radio" name="gender" value={option} required checked={gender === option} onChange={() => setGender(option)} className="h-5 w-5 accent-[#c51f2f]" />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
          <Field label="Street address" name="street" required autoComplete="street-address" className="sm:col-span-2" />
          <Field label="City" name="city" required autoComplete="address-level2" />
          <div className="grid grid-cols-2 gap-5">
            <Field label="State" name="state" required autoComplete="address-level1" />
            <Field label="ZIP code" name="zip" required autoComplete="postal-code" />
          </div>
          <label className={`${labelClass} sm:col-span-2`}>
            <span>
              Program of interest<span className="text-brass"> *</span>
            </span>
            <select name="program" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Choose a program
              </option>
              {PROGRAM_OPTIONS.map((program) => (
                <option key={program}>{program}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeading step={2} title="Church & Ministry" text="Your pastor will receive an email with a private link to send his reference directly to the college." />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <YesNo label="Are you currently a member of an Independent Fundamental Baptist church?" name="ifbMember" value={ifbMember} onChange={setIfbMember} />
          </div>
          <Field label="Church name" name="churchName" required />
          <Field label="Church city and state" name="churchLocation" required placeholder="Brighton, CO" />
          <Field label="Pastor's name" name="pastorName" required />
          <Field label="Pastor's email" name="pastorEmail" type="email" required />
          <Field label="Pastor's phone" name="pastorPhone" type="tel" />
          <label className={`${labelClass} sm:col-span-2`}>
            <span>
              Are you actively involved at your church? In what ways?<span className="text-brass"> *</span>
            </span>
            <textarea name="involvement" required rows={4} className={inputClass} placeholder="Sunday school, bus ministry, music, soul winning, nursery..." />
          </label>
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeading step={3} title="Education" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="High school name" name="highSchoolName" required />
          <Field label="High school city and state" name="highSchoolLocation" required />
          <Field label="High school graduation year" name="highSchoolGraduation" required placeholder="Or GED and year" />
          <div className="sm:col-span-2">
            <YesNo label="Do you have a degree from another college?" name="hasDegree" value={hasDegree} onChange={setHasDegree} />
          </div>
          {hasDegree === "Yes" ? (
            <>
              <Field label="College" name="college1" required />
              <Field label="Degree" name="degree1" />
              <Field label="Dates attended" name="dates1" placeholder="2015 to 2019" className="sm:col-span-2" />
              <Field label="Second college (if any)" name="college2" />
              <Field label="Degree" name="degree2" />
              <Field label="Dates attended" name="dates2" className="sm:col-span-2" />
            </>
          ) : null}
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeading step={4} title="Character & Testimony" />
        <div className="grid gap-5">
          <YesNo label="Have you ever been dismissed or placed on academic or disciplinary probation?" name="probation" value={probation} onChange={setProbation} />
          {probation === "Yes" ? (
            <label className={labelClass}>
              <span>
                Please explain<span className="text-brass"> *</span>
              </span>
              <textarea name="probationExplain" required rows={3} className={inputClass} />
            </label>
          ) : null}
          <label className={labelClass}>
            <span>
              Please state your personal testimony<span className="text-brass"> *</span>
            </span>
            <span className="text-base font-normal normal-case tracking-normal text-stone">Tell us how and when you were saved, and how the Lord has been working in your life since.</span>
            <textarea name="testimony" required rows={8} className={inputClass} />
          </label>
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeading step={5} title="Documents" text="Each file must be under 4 MB. PDF, Word, and photo files are accepted." />
        <div className="grid gap-4">
          <UploadBox kind="photo" title="Current photo of yourself" help="A clear photo of your face, like a passport or church directory picture. A phone photo works fine." required files={filesOf("photo")} busy={uploading === "photo"} onPick={pickFile} onRemove={removeFile} />
          <UploadBox kind="transcript" title="College transcript (if applicable)" help="If you have attended another college, upload your transcript. You may also mail an official transcript to the Admissions Office." files={filesOf("transcript")} busy={uploading === "transcript"} onPick={pickFile} onRemove={removeFile} />
          <UploadBox kind="bible_program" title="Proof of a two-year Bible program" help="Required for the Bachelor of Ministry program if you do not have a college transcript. A certificate, diploma, or letter of completion is fine." files={filesOf("bible_program")} busy={uploading === "bible_program"} onPick={pickFile} onRemove={removeFile} />
          <UploadBox kind="other" title="Other documents (optional)" help="Anything else you would like admissions to see, such as character reference letters or ministry certificates." files={filesOf("other")} busy={uploading === "other"} onPick={pickFile} onRemove={removeFile} />
          {uploadError ? <p className="rounded-md border border-brass/40 bg-brass/8 p-4 font-bold text-wine" role="alert">{uploadError}</p> : null}
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeading step={6} title="Signature" />
        <div className="grid gap-5">
          <label className="flex cursor-pointer items-start gap-3 text-lg leading-7 text-ink">
            <input type="checkbox" name="certify" required className="mt-1 h-6 w-6 shrink-0 accent-[#c51f2f]" />
            <span>I certify that the information in this application is true and complete to the best of my knowledge.</span>
          </label>
          <Field label="Type your full name as your signature" name="signature" required autoComplete="name" />
        </div>
        {/* Hidden from people; automated spam tends to fill it in. */}
        <div className="hidden" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </section>

      {error ? (
        <p className="rounded-md border border-brass/40 bg-brass/8 p-5 text-lg font-bold text-wine" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting || uploading !== null}
        className="inline-flex min-h-14 items-center justify-center gap-3 rounded-md bg-brass px-8 py-4 text-lg font-black uppercase tracking-[0.08em] text-white shadow-lg transition hover:bg-wine disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? <Loader2 className="animate-spin" size={22} /> : <Send size={22} />}
        {submitting ? "Sending your application..." : "Submit Application"}
      </button>
    </form>
  );
}
