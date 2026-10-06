"use client";

import { useState } from "react";
import { CheckCircle2, FileText, Loader2, Send, Trash2, Upload } from "lucide-react";
import { MAX_FILE_BYTES, RECOMMENDATION_OPTIONS, acceptAttribute } from "@/lib/applicationConfig";

type Uploaded = { id: string; filename: string; size: number };

const inputClass =
  "min-h-12 w-full rounded-md border border-line bg-white px-4 py-3 text-base font-semibold text-ink outline-none transition placeholder:text-stone/45 focus:border-brass focus:ring-4 focus:ring-brass/12";
const labelClass = "grid gap-2 text-sm font-black uppercase tracking-[0.1em] text-stone";

function Choice({ label, name, options, value, onChange }: { label: string; name: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-black uppercase tracking-[0.1em] text-stone">
        {label}
        <span className="text-brass"> *</span>
      </legend>
      <div className="grid gap-3">
        {options.map((option) => (
          <label key={option} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-md border px-5 py-3 text-base font-bold transition ${value === option ? "border-brass bg-brass/8 text-ink" : "border-line bg-white text-stone"}`}>
            <input type="radio" name={name} value={option} required checked={value === option} onChange={() => onChange(option)} className="h-5 w-5 shrink-0 accent-[#c51f2f]" />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function PastorReferenceForm({ token, applicant, pastorName, churchName }: { token: string; applicant: string; pastorName: string; churchName: string }) {
  const [member, setMember] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [file, setFile] = useState<Uploaded | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function pick(selected: File) {
    setError("");
    if (selected.size > MAX_FILE_BYTES) {
      setError("That file is larger than 4 MB. Please choose a smaller file.");
      return;
    }
    setUploading(true);
    try {
      const response = await fetch(`/api/reference/${token}/upload`, {
        method: "POST",
        headers: { "content-type": selected.type || "application/octet-stream", "x-filename": encodeURIComponent(selected.name) },
        body: selected,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "The letter could not be uploaded.");
      setFile(result as Uploaded);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The letter could not be uploaded.");
    } finally {
      setUploading(false);
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = { fileId: file?.id || "" };
    form.forEach((value, key) => {
      if (typeof value === "string") payload[key] = value;
    });

    if (!String(payload.letter || "").trim() && !file) {
      setError("Please write your letter in the box, or upload a letter file.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`/api/reference/${token}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Your reference could not be sent.");
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your reference could not be sent.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section className="rounded-md border border-line bg-white p-8 text-center shadow-sm sm:p-12">
        <CheckCircle2 className="mx-auto text-green-700" size={56} />
        <h2 className="school-heading mt-5 text-4xl text-forest">Thank you, Pastor</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-stone">
          Your reference for {applicant} has been sent to the Admissions Office. We appreciate your faithful ministry.
        </p>
      </section>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-6">
      <p className="text-lg leading-8 text-stone">
        {applicant} has applied to Northern Colorado Baptist Bible College and listed you as pastor. Your reference goes directly to the Admissions Office and is not shared with the applicant.
      </p>

      <section className="grid gap-5 rounded-md border border-line bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8">
        <label className={labelClass}>
          <span>Your name<span className="text-brass"> *</span></span>
          <input name="pastorName" required defaultValue={pastorName} className={inputClass} />
        </label>
        <label className={labelClass}>
          <span>Church<span className="text-brass"> *</span></span>
          <input name="churchName" required defaultValue={churchName} className={inputClass} />
        </label>
        <label className={labelClass}>
          <span>Your phone</span>
          <input name="pastorPhone" type="tel" className={inputClass} />
        </label>
        <label className={labelClass}>
          <span>How long have you known the applicant?<span className="text-brass"> *</span></span>
          <input name="knownFor" required placeholder="For example, 6 years" className={inputClass} />
        </label>
        <div className="sm:col-span-2">
          <Choice label="Is the applicant a saved, baptized member in good standing of your church?" name="goodStanding" options={["Yes", "No"]} value={member} onChange={setMember} />
        </div>
        <label className={`${labelClass} sm:col-span-2`}>
          <span>How is the applicant serving in your church?</span>
          <textarea name="service" rows={3} className={inputClass} />
        </label>
        <div className="sm:col-span-2">
          <Choice label="Your recommendation" name="recommendation" options={RECOMMENDATION_OPTIONS} value={recommendation} onChange={setRecommendation} />
        </div>
      </section>

      <section className="grid gap-5 rounded-md border border-line bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h2 className="school-heading text-3xl text-forest">Reference Letter</h2>
          <p className="mt-1 leading-7 text-stone">Write your letter below, or upload a signed letter. Either one is fine.</p>
        </div>
        <label className={labelClass}>
          <span>Letter</span>
          <textarea name="letter" rows={10} className={inputClass} />
        </label>

        <div className="rounded-md border border-dashed border-stone/40 bg-paper p-5">
          <div className="flex items-start gap-3">
            <FileText className="mt-1 shrink-0 text-brass" size={24} />
            <div className="min-w-0 flex-1">
              <p className="text-lg font-black text-ink">Or upload a signed letter</p>
              <p className="mt-1 text-stone">PDF, Word, or a photo of the letter, under 4 MB.</p>
              {file ? (
                <div className="mt-4 flex items-center gap-3 rounded-md border border-line bg-white px-4 py-3">
                  <CheckCircle2 className="shrink-0 text-green-700" size={20} />
                  <span className="min-w-0 flex-1 break-words font-semibold">{file.filename}</span>
                  <button type="button" onClick={() => setFile(null)} className="rounded-md p-2 text-stone hover:text-brass" aria-label="Remove letter">
                    <Trash2 size={18} />
                  </button>
                </div>
              ) : (
                <label className="mt-4 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-md bg-forest px-5 py-3 font-black uppercase tracking-[0.06em] text-white transition hover:bg-wine">
                  {uploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                  {uploading ? "Uploading..." : "Choose file"}
                  <input type="file" className="sr-only" accept={acceptAttribute("pastor_letter")} disabled={uploading} onChange={(event) => {
                    const selected = event.target.files?.[0];
                    event.target.value = "";
                    if (selected) pick(selected);
                  }} />
                </label>
              )}
            </div>
          </div>
        </div>
      </section>

      {error ? <p className="rounded-md border border-brass/40 bg-brass/8 p-5 text-lg font-bold text-wine" role="alert">{error}</p> : null}

      <button type="submit" disabled={submitting || uploading} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-md bg-brass px-8 py-4 text-lg font-black uppercase tracking-[0.08em] text-white shadow-lg transition hover:bg-wine disabled:opacity-60">
        {submitting ? <Loader2 className="animate-spin" size={22} /> : <Send size={22} />}
        {submitting ? "Sending..." : "Send Reference"}
      </button>
    </form>
  );
}
