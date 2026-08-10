import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, MapPin } from "lucide-react";
import { homeFeatures, programs, site } from "@/content/site";

const collegeSchema = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  name: site.fullName,
  url: site.url,
  telephone: "+1-303-659-3818",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "13100 E 144th Ave",
    addressLocality: "Brighton",
    addressRegion: "CO",
    postalCode: "80601",
    addressCountry: "US",
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }} />
      <main>
        <section className="relative min-h-[calc(100svh-78px)] overflow-hidden bg-forest text-white">
          <Image src="/hero-campus.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(17,24,39,0.96)_0%,rgba(23,60,53,0.86)_46%,rgba(111,38,50,0.48)_100%)]" />
          <div className="relative mx-auto grid min-h-[calc(100svh-78px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="min-w-0">
              <p className="font-black uppercase tracking-[0.2em] text-brass">Online Bible College | Brighton, Colorado</p>
              <h1 className="mt-5 max-w-5xl font-serif text-5xl font-black leading-none sm:text-7xl lg:text-8xl">
                Northern Colorado Baptist Bible College
              </h1>
              <p className="mt-6 max-w-2xl text-2xl font-semibold leading-8 text-white/86">{site.tagline}</p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
                Serious Bible training for students called to serve Christ through the local church, with self-paced online coursework and tuition-free college courses.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/application" className="inline-flex items-center justify-center gap-2 rounded-md bg-brass px-6 py-4 font-black text-ink shadow-lg transition hover:bg-white">
                  Apply Now
                  <ArrowRight size={19} />
                </Link>
                <Link href="/bachelor-of-ministry" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/28 bg-white/10 px-6 py-4 font-black text-white transition hover:bg-white/15">
                  Explore Programs
                  <BookOpen size={19} />
                </Link>
              </div>
            </div>
            <div className="grid gap-4 rounded-md border border-white/16 bg-white/10 p-4 shadow-2xl backdrop-blur">
              <Image src="/main-building.jpg" alt="Northern Colorado Baptist Bible College campus building" width={968} height={648} className="aspect-[4/3] w-full rounded-md object-cover" priority />
              <div className="grid gap-3 sm:grid-cols-3">
                {["120-credit B.Min.", "30 video courses", "Tuition-free courses"].map((item) => (
                  <div key={item} className="rounded-md bg-white/12 p-3 text-sm font-black text-white">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-paper px-4 py-14 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
            {homeFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="rounded-md border border-line bg-white p-6 shadow-sm">
                  <Icon className="text-brass" size={30} />
                  <h2 className="mt-4 font-serif text-2xl font-black text-forest">{feature.title}</h2>
                  <p className="mt-3 leading-7 text-stone">{feature.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-cream px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="font-black uppercase tracking-[0.2em] text-wine">Degree Programs</p>
                <h2 className="mt-3 font-serif text-5xl font-black leading-none text-forest sm:text-6xl">Built for faithful ministry.</h2>
              </div>
              <p className="text-lg leading-8 text-stone">
                The Bachelor of Ministry is the core open program. Graduate and doctoral options are presented as planned future programs, giving prospective students a clear view of the academic direction.
              </p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {programs.map((program) => (
                <article key={program.slug} className="overflow-hidden rounded-md border border-line bg-white shadow-sm">
                  <Image src={program.image} alt="" width={520} height={360} className="h-56 w-full object-cover" />
                  <div className="p-6">
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-brass">{program.status}</p>
                    <h3 className="mt-3 font-serif text-3xl font-black text-forest">{program.title}</h3>
                    <p className="mt-1 font-bold text-wine">{program.degree}</p>
                    <p className="mt-4 leading-7 text-stone">{program.text}</p>
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {program.stats.map(([value, label]) => (
                        <div key={label} className="rounded-md bg-cream p-3">
                          <p className="font-serif text-2xl font-black text-ink">{value}</p>
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-stone">{label}</p>
                        </div>
                      ))}
                    </div>
                    <Link href={`/${program.slug}`} className="mt-6 inline-flex items-center gap-2 font-black text-wine">
                      Program Details
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image src="/study-desk.jpeg" alt="Open Bible and study materials on a desk" fill className="object-cover" sizes="(min-width: 1024px) 46vw, 100vw" />
            </div>
            <div>
              <p className="font-black uppercase tracking-[0.2em] text-brass">Admissions</p>
              <h2 className="mt-3 font-serif text-5xl font-black leading-none text-forest sm:text-6xl">Study at your pace. Serve where God has placed you.</h2>
              <p className="mt-6 text-lg leading-8 text-stone">
                Applicants should be born-again believers, members in good standing of an independent Baptist church, and positively recommended by their pastor. Coursework is online, but the training remains tied to real local church ministry.
              </p>
              <div className="mt-8 grid gap-3">
                {["Pastoral reference required", "Transcript review when applicable", "Documented Christian service", "All college courses are currently free"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-md border border-line bg-paper p-4 font-bold text-ink">
                    <CheckCircle2 className="shrink-0 text-brass" size={22} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-forest px-4 py-16 text-white sm:px-6 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <p className="font-black uppercase tracking-[0.2em] text-brass">A ministry of Elmwood Baptist Church</p>
              <h2 className="mt-3 font-serif text-5xl font-black leading-none sm:text-6xl">Anchored in the local church.</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/74">
                NCBBC maintains a strong commitment to the King James Bible, sound doctrine, Baptist distinctives, personal evangelism, conservative music, and faithful service through the local church.
              </p>
            </div>
            <div className="rounded-md border border-white/14 bg-white/10 p-6">
              <GraduationCap className="text-brass" size={34} />
              <h3 className="mt-4 font-serif text-3xl font-black">Contact the college</h3>
              <div className="mt-5 grid gap-4 text-white/76">
                <a href={`tel:${site.phone.replace(/\D/g, "")}`} className="font-bold hover:text-white">{site.phone}</a>
                <a href={`mailto:${site.email}`} className="font-bold hover:text-white">{site.email}</a>
                <a href={site.map} className="flex gap-3 hover:text-white">
                  <MapPin className="mt-1 shrink-0" size={19} />
                  {site.address}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
