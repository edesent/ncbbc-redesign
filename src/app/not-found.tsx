import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-paper px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-black uppercase tracking-[0.2em] text-brass">404</p>
        <h1 className="mt-4 font-serif text-5xl font-black text-forest">Page not found</h1>
        <p className="mt-4 text-lg leading-8 text-stone">The page you requested is not available in this redesign.</p>
        <Link href="/" className="mt-8 inline-flex rounded-md bg-wine px-5 py-3 font-black text-white">
          Return Home
        </Link>
      </div>
    </main>
  );
}
