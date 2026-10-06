import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReviewHero, ReviewLogin } from "@/components/ReviewShell";
import { isReviewer } from "@/lib/adminAuth";
import { db, ensureSchema } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admissions Review",
  robots: { index: false, follow: false },
};

type Row = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  program: string;
  status: string;
  reference_status: string;
  file_count: number;
};

const statusColors: Record<string, string> = {
  New: "bg-brass text-white",
  "Under review": "bg-rust text-ink",
  "Waiting on documents": "bg-rust text-ink",
  Accepted: "bg-green-700 text-white",
  Declined: "bg-stone text-white",
};

export default async function AdmissionsReviewPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const signedIn = await isReviewer();

  if (!signedIn) {
    return (
      <main>
        <ReviewHero title="Applications" signedIn={false} />
        <ReviewLogin error={error === "1"} />
      </main>
    );
  }

  await ensureSchema();
  const rows = (await db()`
    select a.id, a.created_at, a.first_name, a.last_name, a.program, a.status, a.reference_status,
      (select count(*)::int from ncbbc_application_files f where f.application_id = a.id) as file_count
    from ncbbc_applications a
    order by a.created_at desc
    limit 500`) as Row[];

  return (
    <main>
      <ReviewHero title="Applications" signedIn />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {rows.length === 0 ? (
          <p className="rounded-md border border-line bg-white p-8 text-center text-lg text-stone">No applications have been received yet.</p>
        ) : (
          <div className="grid gap-3">
            <p className="text-lg text-stone">{rows.length} application{rows.length === 1 ? "" : "s"}, newest first.</p>
            {rows.map((row) => (
              <Link key={row.id} href={`/admissions-review/${row.id}`} className="grid gap-3 rounded-md border border-line bg-white p-5 shadow-sm transition hover:border-brass hover:shadow-md md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center">
                <div>
                  <p className="text-xl font-black text-ink">{row.last_name}, {row.first_name}</p>
                  <p className="text-stone">{row.program}</p>
                </div>
                <div className="text-stone">
                  <p className="text-sm font-black uppercase tracking-[0.1em]">Received</p>
                  <p>{new Date(row.created_at).toLocaleDateString("en-US", { timeZone: "America/Denver", month: "long", day: "numeric", year: "numeric" })}</p>
                </div>
                <div className="text-stone">
                  <p className="text-sm font-black uppercase tracking-[0.1em]">Pastor reference</p>
                  <p className={row.reference_status === "Received" ? "font-bold text-green-700" : ""}>{row.reference_status}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-md px-3 py-2 text-sm font-black ${statusColors[row.status] || "bg-cream text-ink"}`}>{row.status}</span>
                  <ArrowRight className="text-stone" size={20} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
