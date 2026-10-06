import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PastorReferenceForm } from "@/components/PastorReferenceForm";
import { db, ensureSchema } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pastoral Reference",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ token: string }> };

type Row = {
  first_name: string;
  last_name: string;
  program: string;
  reference_status: string;
  pastor_name: string;
  church_name: string;
};

export default async function PastorReferencePage({ params }: Props) {
  const { token } = await params;
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) notFound();

  await ensureSchema();
  const rows = (await db()`
    select first_name, last_name, program, reference_status,
      answers->>'pastorName' as pastor_name, answers->>'churchName' as church_name
    from ncbbc_applications where reference_token = ${token}`) as Row[];
  const application = rows[0];
  if (!application) notFound();

  const applicant = `${application.first_name} ${application.last_name}`;

  return (
    <main>
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
          <p className="font-black uppercase tracking-[0.2em] text-white/72">Admissions Office</p>
          <h1 className="school-heading mt-4 text-5xl leading-none sm:text-6xl">Pastoral Reference</h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white/80">
            For {applicant}, applying to the {application.program} program.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
        {application.reference_status === "Received" ? (
          <section className="rounded-md border border-line bg-white p-8 text-center shadow-sm sm:p-12">
            <CheckCircle2 className="mx-auto text-green-700" size={56} />
            <h2 className="school-heading mt-5 text-4xl text-forest">Reference received</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-stone">
              Thank you. Your pastoral reference for {applicant} has already been received by the Admissions Office.
            </p>
          </section>
        ) : (
          <PastorReferenceForm token={token} applicant={applicant} pastorName={application.pastor_name || ""} churchName={application.church_name || ""} />
        )}
      </div>
    </main>
  );
}
