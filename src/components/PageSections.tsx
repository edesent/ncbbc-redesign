import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import type { ContentBlock, PageContent } from "@/content/site";
import { site } from "@/content/site";

export function PageHero({ page }: { page: PageContent }) {
  return (
    <section className="relative overflow-hidden bg-forest text-white">
      {page.image ? (
        <Image src={page.image} alt="" fill priority className="object-cover opacity-42" sizes="100vw" />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,47,73,0.96),rgba(17,24,39,0.76)_58%,rgba(143,24,38,0.58))]" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-28">
        <p className="font-black uppercase tracking-[0.2em] text-white/72">{page.eyebrow}</p>
        <h1 className="school-heading mt-4 max-w-5xl text-5xl leading-none sm:text-7xl">{page.title}</h1>
        <p className="mt-5 max-w-3xl text-xl leading-8 text-white/78">{page.summary}</p>
      </div>
    </section>
  );
}

export function RenderBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="grid gap-10">
        {blocks.map((block, index) => (
          <Block key={`${block.type}-${index}`} block={block} />
        ))}
      </div>
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  if (block.type === "intro") {
    return (
      <section className="max-w-5xl">
        <div className="space-y-5 text-lg leading-8 text-stone">
          {block.text.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === "stats") {
    return (
      <section className="grid gap-4 sm:grid-cols-3">
        {block.items.map((item) => (
          <div key={item.label} className="rounded-md border border-line bg-white p-6 shadow-sm">
            <p className="school-heading text-5xl leading-none text-wine">{item.value}</p>
            <p className="mt-2 font-black uppercase tracking-[0.16em] text-stone">{item.label}</p>
          </div>
        ))}
      </section>
    );
  }

  if (block.type === "cards") {
    return (
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {block.items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-md border border-line bg-white p-6 shadow-sm">
              {Icon ? <Icon className="text-brass" size={30} /> : null}
              <h2 className="school-heading mt-4 text-3xl leading-tight text-forest">{item.title}</h2>
              <p className="mt-3 leading-7 text-stone">{item.text}</p>
            </article>
          );
        })}
      </section>
    );
  }

  if (block.type === "list") {
    return (
      <section className="max-w-5xl rounded-md border border-line bg-cream p-6">
        {block.title ? <h2 className="school-heading text-3xl leading-tight text-forest">{block.title}</h2> : null}
        <ul className="mt-4 grid gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-stone">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brass" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (block.type === "people") {
    return (
      <section>
        <h2 className="school-heading text-4xl leading-tight text-forest">{block.title}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {block.groups.map((group) => (
            <article key={group.heading} className="rounded-md border border-line bg-white p-6 shadow-sm">
              <h3 className="school-heading text-2xl leading-tight text-wine">{group.heading}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.names.map((name) => (
                  <span key={name} className="rounded-md border border-line bg-paper px-3 py-2 text-sm font-bold text-stone">
                    {name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === "courses") {
    return (
      <section className="grid gap-8">
        {block.groups.map((group) => (
          <div key={group.title}>
            <h2 className="school-heading text-4xl leading-tight text-forest">{group.title}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {group.courses.map((course) => (
                <article key={`${course.code}-${course.title}`} className="rounded-md border border-line bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-brass">{course.code}</p>
                  <h3 className="school-heading mt-2 text-2xl leading-tight text-ink">{course.title}</h3>
                  <p className="mt-2 leading-7 text-stone">{course.text}</p>
                  {course.note ? <p className="mt-3 text-sm font-bold text-wine">{course.note}</p> : null}
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  }

  return <ApplicationForm />;
}

function ApplicationForm() {
  const inputClass =
    "min-h-12 rounded-md border border-line bg-white px-4 py-3 text-base font-semibold text-ink outline-none transition placeholder:text-stone/45 focus:border-brass focus:ring-4 focus:ring-brass/12";
  const labelClass = "grid gap-2 text-xs font-black uppercase tracking-[0.14em] text-stone";

  return (
    <section className="grid overflow-hidden rounded-md border border-line bg-white shadow-lg lg:grid-cols-[0.82fr_1.18fr]">
      <div className="relative overflow-hidden bg-forest p-7 text-white sm:p-8">
        <div className="absolute inset-x-0 top-0 h-2 bg-brass" />
        <p className="font-black uppercase tracking-[0.2em] text-brass">Admissions Office</p>
        <h2 className="school-heading mt-3 text-4xl leading-tight">Start your application conversation.</h2>
        <p className="mt-5 leading-7 text-white/72">
          Send your basic details to the admissions office and we will help you with the next step.
        </p>
        <div className="mt-8 grid gap-4 text-white/78">
          <a href={`mailto:${site.admissionsEmail}`} className="flex gap-3 rounded-md border border-white/12 bg-white/8 p-4 transition hover:bg-white/12 hover:text-white">
            <Mail className="mt-1 shrink-0 text-brass" size={20} />
            <span className="min-w-0 break-words">{site.admissionsEmail}</span>
          </a>
          <a href={site.map} className="flex gap-3 rounded-md border border-white/12 bg-white/8 p-4 transition hover:bg-white/12 hover:text-white">
            <MapPin className="mt-1 shrink-0 text-brass" size={20} />
            <span>{site.address}</span>
          </a>
        </div>
      </div>
      <form action={`mailto:${site.admissionsEmail}`} method="post" encType="text/plain" className="grid gap-5 bg-paper p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Name
            <input name="name" placeholder="Your full name" className={inputClass} />
          </label>
          <label className={labelClass}>
            Email
            <input name="email" type="email" placeholder="you@example.com" className={inputClass} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Phone
            <input name="phone" placeholder="Best phone number" className={inputClass} />
          </label>
          <label className={labelClass}>
            Program Interest
            <select name="program" className={inputClass}>
              <option>Bachelor of Ministry</option>
              <option>Master of Ministry</option>
              <option>Doctor of Ministry</option>
              <option>General question</option>
            </select>
          </label>
        </div>
        <label className={labelClass}>
          Message
          <textarea name="message" rows={5} placeholder="Tell us where you serve and what you would like to study." className={inputClass} />
        </label>
        <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brass px-6 py-4 font-black uppercase tracking-[0.08em] text-white shadow-sm transition hover:bg-wine">
          Send by Email
          <ArrowRight size={18} />
        </button>
      </form>
    </section>
  );
}

export function RelatedLinks() {
  return (
    <section className="bg-cream px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        <Link href="/application" className="rounded-md border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="font-black uppercase tracking-[0.16em] text-brass">Admissions</p>
          <h2 className="school-heading mt-3 text-3xl leading-tight text-forest">Begin your application</h2>
        </Link>
        <Link href="/course-descriptions" className="rounded-md border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="font-black uppercase tracking-[0.16em] text-brass">Curriculum</p>
          <h2 className="school-heading mt-3 text-3xl leading-tight text-forest">Explore course descriptions</h2>
        </Link>
        <Link href="/tuition---fees" className="rounded-md border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="font-black uppercase tracking-[0.16em] text-brass">Tuition</p>
          <h2 className="school-heading mt-3 text-3xl leading-tight text-forest">Review financial information</h2>
        </Link>
      </div>
    </section>
  );
}
