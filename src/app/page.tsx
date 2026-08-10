import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, MapPin, PlayCircle, UsersRound } from "lucide-react";
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
        <section className="relative min-h-[calc(100svh-136px)] overflow-hidden bg-forest text-white">
          <Image src="/hero-campus.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,47,73,0.12),rgba(8,47,73,0.82)),linear-gradient(90deg,rgba(7,27,45,0.82),rgba(7,27,45,0.36)_52%,rgba(143,24,38,0.42))]" />
          <div className="relative mx-auto grid min-h-[calc(100svh-136px)] max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="min-w-0 lg:pr-12">
              <p className="font-black uppercase tracking-[0.22em] text-white/82">Online Bible College | Brighton, Colorado</p>
              <h1 className="school-heading mt-5 max-w-5xl text-5xl leading-[0.95] text-white drop-shadow-lg sm:text-7xl lg:text-8xl">
                Bible Training With Local Church Impact
              </h1>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/application" className="inline-flex items-center justify-center gap-2 rounded-md bg-brass px-7 py-4 font-black uppercase tracking-[0.08em] text-white shadow-lg transition hover:bg-wine">
                  Apply Now
                  <ArrowRight size={19} />
                </Link>
                <Link href="/bachelor-of-ministry" className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-7 py-4 font-black uppercase tracking-[0.08em] text-[#8f1826] transition hover:bg-cream">
                  Bachelor Program
                  <BookOpen size={19} />
                </Link>
              </div>
            </div>
            <div className="border-white/70 lg:border-l lg:pl-12">
              <h2 className="school-heading text-5xl leading-none text-white drop-shadow-md">Why NCBBC?</h2>
              <p className="mt-5 max-w-md text-lg leading-8 text-white/78">
                {site.tagline} Train at your pace while staying rooted in faithful local church ministry.
              </p>
              <div className="mt-7 grid gap-4">
                <Link href="/purpose---objectives" className="inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-4 font-black uppercase tracking-[0.08em] text-[#8f1826] transition hover:bg-cream sm:w-auto">
                  Our Mission
                </Link>
                <Link href="/course-descriptions" className="inline-flex w-full items-center justify-center rounded-md bg-brass px-6 py-4 font-black uppercase tracking-[0.08em] text-white transition hover:bg-wine sm:w-auto">
                  View Courses
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 text-center sm:px-6 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="school-heading text-5xl leading-tight text-brass sm:text-6xl">
              Theological Training For Faithful Service
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-stone">
              The need for faithful spiritual leaders is real. NCBBC equips serious Christian men and women through accessible, self-paced online Bible training built for service in and through the local New Testament church.
            </p>
          </div>
        </section>

        <section className="bg-cream px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="font-black uppercase tracking-[0.2em] text-wine">Academic Programs</p>
              <h2 className="school-heading mt-3 text-5xl leading-none text-forest sm:text-6xl">Choose Your Ministry Path</h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {programs.map((program) => (
                <article key={program.slug} className="bg-white shadow-sm">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={program.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,47,73,0.02),rgba(8,47,73,0.48))]" />
                    <p className="absolute bottom-4 left-5 rounded-md bg-brass px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-white">
                      {program.status}
                    </p>
                  </div>
                  <div className="p-7">
                    <p className="font-black uppercase tracking-[0.16em] text-wine">{program.degree}</p>
                    <h3 className="school-heading mt-3 text-4xl leading-none text-forest">{program.title}</h3>
                    <p className="mt-4 min-h-28 leading-7 text-stone">{program.text}</p>
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {program.stats.map(([value, label]) => (
                        <div key={label} className="bg-cream p-3">
                          <p className="school-heading text-2xl text-ink">{value}</p>
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-stone">{label}</p>
                        </div>
                      ))}
                    </div>
                    <Link href={`/${program.slug}`} className="mt-7 inline-flex items-center gap-2 font-black uppercase tracking-[0.08em] text-wine">
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
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/study-desk.jpeg" alt="Open Bible and study materials on a desk" fill className="object-cover" sizes="(min-width: 1024px) 46vw, 100vw" />
              <div className="absolute bottom-0 left-0 right-0 bg-wine p-5 text-white">
                <p className="font-black uppercase tracking-[0.14em]">Serve where you are. Learn where you live.</p>
              </div>
            </div>
            <div>
              <p className="font-black uppercase tracking-[0.2em] text-brass">Online Learning</p>
              <h2 className="school-heading mt-3 text-5xl leading-none text-forest sm:text-6xl">Study At Your Pace</h2>
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
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="font-black uppercase tracking-[0.2em] text-brass">A ministry of Elmwood Baptist Church</p>
              <h2 className="school-heading mt-3 text-5xl leading-none sm:text-6xl">Anchored In The Local Church</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/74">
                NCBBC maintains a strong commitment to the King James Bible, sound doctrine, Baptist distinctives, personal evangelism, conservative music, and faithful service through the local church.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {homeFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="border border-white/14 bg-white/10 p-5">
                    <Icon className="text-brass" size={30} />
                    <h3 className="school-heading mt-4 text-2xl leading-tight">{feature.title}</h3>
                    <p className="mt-3 leading-7 text-white/72">{feature.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="font-black uppercase tracking-[0.2em] text-wine">Taking The Great Commission Seriously</p>
              <h2 className="school-heading mt-3 text-5xl leading-none text-forest sm:text-6xl">Training Students For The Work Ahead</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-stone">
                NCBBC exists to train and equip serious Christian men and women to know, obey, and teach the whole counsel of God through faithful service in the local New Testament church.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["120", "Bachelor credit hours", GraduationCap],
                ["30", "Bachelor video courses", PlayCircle],
                ["$0", "Current course tuition", UsersRound],
              ].map(([value, label, Icon]) => (
                <div key={label as string} className="flex items-center gap-5 bg-cream p-6">
                  <Icon className="shrink-0 text-brass" size={34} />
                  <div>
                    <p className="school-heading text-5xl leading-none text-wine">{value as string}</p>
                    <p className="mt-1 font-black uppercase tracking-[0.12em] text-stone">{label as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1fr]">
            <div>
              <p className="font-black uppercase tracking-[0.2em] text-brass">Get in touch</p>
              <h2 className="school-heading mt-3 text-5xl leading-none text-forest">Contact The College</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <a href={`tel:${site.phone.replace(/\D/g, "")}`} className="bg-white p-6 shadow-sm">
                <GraduationCap className="text-brass" size={30} />
                <p className="mt-5 font-black uppercase tracking-[0.12em] text-stone">Phone</p>
                <p className="mt-2 text-lg font-black text-ink">{site.phone}</p>
              </a>
              <a href={`mailto:${site.email}`} className="bg-white p-6 shadow-sm">
                <BookOpen className="text-brass" size={30} />
                <p className="mt-5 font-black uppercase tracking-[0.12em] text-stone">Email</p>
                <p className="mt-2 text-lg font-black text-ink">{site.email}</p>
              </a>
              <a href={site.map} className="bg-white p-6 shadow-sm">
                <MapPin className="text-brass" size={30} />
                <p className="mt-5 font-black uppercase tracking-[0.12em] text-stone">Brighton, CO</p>
                <p className="mt-2 font-black leading-6 text-ink">{site.address}</p>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
