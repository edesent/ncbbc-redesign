import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Mail, MapPin, Menu, Phone } from "lucide-react";
import { navItems, site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-wine text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/86">
            <a href={`tel:${site.phone.replace(/\D/g, "")}`} className="hover:text-white">{site.phone}</a>
            <span className="hidden text-white/35 sm:inline">|</span>
            <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-white/86">
            <Link href="/student-info" className="hover:text-white">Current Students</Link>
            <span className="text-white/35">|</span>
            <Link href="/academic-catalog" className="hover:text-white">Catalog</Link>
            <span className="text-white/35">|</span>
            <Link href="/tuition---fees" className="hover:text-white">Tuition</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-4">
          <Image src="/ncbbc-logo.png" alt="" width={72} height={72} className="h-16 w-16 shrink-0" priority />
          <div className="min-w-0">
            <p className="text-2xl font-black leading-none text-ink sm:text-3xl">{site.name}</p>
            <p className="truncate text-xs font-black uppercase tracking-[0.12em] text-brass sm:max-w-none">{site.fullName}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <div key={item.label} className="group relative">
              <Link href={item.href} className="block px-3 py-2 text-base font-black text-ink transition hover:text-brass">
                {item.label}
              </Link>
              {item.children ? (
                <div className="invisible absolute right-0 top-full w-64 translate-y-2 rounded-md border border-line bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} className="block rounded-md px-3 py-2 text-sm font-semibold text-stone transition hover:bg-cream hover:text-brass">
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/application" className="hidden bg-brass px-6 py-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-sm transition hover:bg-wine sm:inline-flex">
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
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.7fr_0.7fr_0.7fr]">
        <div>
          <Image src="/ncbbc-logo.png" alt="" width={72} height={72} className="h-16 w-16 bg-white p-1" />
          <h2 className="school-heading mt-5 max-w-xl text-3xl leading-tight">{site.fullName}</h2>
          <p className="mt-3 max-w-2xl text-white/72">
            A ministry of Elmwood Baptist Church in Brighton, Colorado, training students for faithful service in the local New Testament church.
          </p>
          <Link href="/application" className="mt-6 inline-flex items-center gap-2 rounded-md bg-brass px-5 py-3 font-black text-white transition hover:bg-wine">
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
        <div>
          <h3 className="font-black uppercase tracking-[0.18em] text-brass">Resources</h3>
          <div className="mt-4 grid gap-3 text-white/76">
            <Link href="/academic-catalog" className="hover:text-white">Academic Catalog</Link>
            <Link href="/academic-policies" className="hover:text-white">Academic Policies</Link>
            <Link href="/student-info" className="hover:text-white">Student Info</Link>
            <Link href="/doctrinal-statement" className="hover:text-white">Doctrinal Statement</Link>
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
          <p className="font-black uppercase tracking-[0.18em] text-white/70">Ready to begin?</p>
          <h2 className="school-heading mt-2 text-4xl leading-tight">Prepare for ministry from wherever you serve.</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/application" className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 font-black text-[#8f1826] transition hover:bg-cream">
            Apply Now
            <ArrowRight size={18} />
          </Link>
          <Link href="/contact-us" className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 font-black text-white transition hover:bg-white/10">
            <FileText size={18} />
            Ask a Question
          </Link>
        </div>
      </div>
    </section>
  );
}
