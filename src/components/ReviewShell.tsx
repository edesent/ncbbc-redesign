import { LockKeyhole, LogOut } from "lucide-react";
import { reviewPassword } from "@/lib/adminAuth";

export function ReviewHero({ title, signedIn }: { title: string; signedIn: boolean }) {
  return (
    <section className="bg-forest text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-black uppercase tracking-[0.2em] text-white/72">Admissions Office</p>
          <h1 className="school-heading mt-3 text-5xl leading-none">{title}</h1>
        </div>
        {signedIn ? (
          <form action="/api/admissions/logout" method="post">
            <button className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-3 font-black text-white hover:bg-white/10">
              <LogOut size={18} />
              Sign out
            </button>
          </form>
        ) : null}
      </div>
    </section>
  );
}

export function ReviewLogin({ error }: { error: boolean }) {
  const ready = Boolean(reviewPassword());
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <form action="/api/admissions/login" method="post" className="grid gap-5 rounded-md border border-line bg-white p-8 shadow-sm">
        <LockKeyhole className="text-brass" size={36} />
        <h2 className="school-heading text-3xl text-forest">Sign in to review applications</h2>
        {ready ? (
          <>
            <label className="grid gap-2 text-sm font-black uppercase tracking-[0.1em] text-stone">
              Password
              <input name="password" type="password" required autoFocus autoComplete="current-password" className="min-h-12 rounded-md border border-line px-4 py-3 text-base text-ink outline-none focus:border-brass focus:ring-4 focus:ring-brass/12" />
            </label>
            {error ? <p className="font-bold text-wine">That password was not correct.</p> : null}
            <button className="min-h-12 rounded-md bg-brass px-6 py-3 font-black uppercase tracking-[0.08em] text-white hover:bg-wine">Sign in</button>
          </>
        ) : (
          <p className="text-lg leading-8 text-stone">The review password has not been set up yet.</p>
        )}
      </form>
    </div>
  );
}
