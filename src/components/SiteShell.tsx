import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Mail, MapPin, Menu, Phone } from "lucide-react";
import { navItems, site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image src="/ncbbc-logo.png" alt="" width={54} height={54} className="h-12 w-12 shrink-0" priority />
          <div className="min-w-0">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-forest">{site.name}</p>
            <p className="truncate text-sm font-semibold text-stone sm:max-w-none">{site.fullName}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <div key={item.label} className="group relative">
              <Link href={item.href} className="block rounded-md px-3 py-2 text-sm font-bold text-ink transition hover:bg-forest-soft hover:text-forest">
                {item.label}
              </Link>
              {item.children ? (
                <div className="invisible absolute right-0 top-full w-64 translate-y-2 rounded-md border border-line bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} className="block rounded-md px-3 py-2 text-sm font-semibold text-stone transition hover:bg-cream hover:text-forest">
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/application" className="hidden rounded-md bg-wine px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-forest sm:inline-flex">
            Apply
          </Link>
          <details className="relative lg:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md border border-line bg-white text-ink">
              <Menu size={21} />
            </summary>
            <div className="absolute right-0 top-14 w-[min(22rem,calc(100vw-2rem))] rounded-md border border-line bg-white p-2 shadow-2xl">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-md px-3 py-3 font-bold text-ink hover:bg-cream">
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.7fr_0.7fr]">
        <div>
          <Image src="/ncbbc-logo.png" alt="" width={72} height={72} className="h-16 w-16 rounded-md bg-white p-1" />
          <h2 className="mt-5 max-w-xl font-serif text-3xl font-black leading-tight">{site.fullName}</h2>
          <p className="mt-3 max-w-2xl text-white/72">
            A ministry of Elmwood Baptist Church in Brighton, Colorado, training students for faithful service in the local New Testament church.
          </p>
          <Link href="/application" className="mt-6 inline-flex items-center gap-2 rounded-md bg-brass px-5 py-3 font-black text-ink transition hover:bg-white">
            Start Application
            <ArrowRight size={18} />
          </Link>
        </div>
        <div>
          <h3 className="font-black uppercase tracking-[0.18em] text-brass">Contact</h3>
          <div className="mt-4 space-y-3 text-white/76">
            <a className="flex gap-3 hover:text-white" href={`tel:${site.phone.replace(/\D/g, "")}`}>
              <Phone className="mt-1 shrink-0" size={18} />
              {site.phone}
            </a>
            <a className="flex gap-3 hover:text-white" href={`mailto:${site.email}`}>
              <Mail className="mt-1 shrink-0" size={18} />
              {site.email}
            </a>
            <a className="flex gap-3 hover:text-white" href={site.map}>
              <MapPin className="mt-1 shrink-0" size={18} />
              {site.address}
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-black uppercase tracking-[0.18em] text-brass">Academics</h3>
          <div className="mt-4 grid gap-3 text-white/76">
            <Link href="/bachelor-of-ministry" className="hover:text-white">Bachelor of Ministry</Link>
            <Link href="/master-of-ministry" className="hover:text-white">Master of Ministry</Link>
            <Link href="/doctor-of-ministry" className="hover:text-white">Doctor of Ministry</Link>
            <Link href="/course-descriptions" className="hover:text-white">Course Descriptions</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/12 px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 {site.fullName}. All rights reserved.</p>
          <a href={site.elmwood} className="inline-flex items-center gap-2 hover:text-white">
            <BookOpen size={16} />
            A ministry of Elmwood Baptist Church
          </a>
        </div>
      </div>
    </footer>
  );
}

export function CtaBand() {
  return (
    <section className="bg-wine px-4 py-12 text-white sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-black uppercase tracking-[0.18em] text-brass">Ready to begin?</p>
          <h2 className="mt-2 font-serif text-4xl font-black leading-tight">Prepare for ministry from wherever you serve.</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/application" className="inline-flex items-center justify-center gap-2 rounded-md bg-brass px-5 py-3 font-black text-ink transition hover:bg-white">
            Apply Now
            <ArrowRight size={18} />
          </Link>
          <Link href="/contact-us" className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 font-black text-white transition hover:bg-white/10">
            Ask a Question
          </Link>
        </div>
      </div>
    </section>
  );
}
