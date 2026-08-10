import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import type { ContentBlock, PageContent } from "@/content/site";
import { site } from "@/content/site";

export function PageHero({ page }: { page: PageContent }) {
  return (
    <section className="relative overflow-hidden bg-forest text-white">
      {page.image ? (
        <Image src={page.image} alt="" fill priority className="object-cover opacity-32" sizes="100vw" />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(23,60,53,0.96),rgba(17,24,39,0.82)_55%,rgba(111,38,50,0.55))]" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="font-black uppercase tracking-[0.2em] text-brass">{page.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl font-black leading-none sm:text-6xl">{page.title}</h1>
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
      <section className="mx-auto max-w-4xl">
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
            <p className="font-serif text-5xl font-black text-wine">{item.value}</p>
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
              <h2 className="mt-4 font-serif text-3xl font-black text-forest">{item.title}</h2>
              <p className="mt-3 leading-7 text-stone">{item.text}</p>
            </article>
          );
        })}
      </section>
    );
  }

  if (block.type === "list") {
    return (
      <section className="mx-auto max-w-4xl rounded-md border border-line bg-cream p-6">
        {block.title ? <h2 className="font-serif text-3xl font-black text-forest">{block.title}</h2> : null}
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
        <h2 className="font-serif text-4xl font-black text-forest">{block.title}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {block.groups.map((group) => (
            <article key={group.heading} className="rounded-md border border-line bg-white p-6 shadow-sm">
              <h3 className="font-serif text-2xl font-black text-wine">{group.heading}</h3>
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
            <h2 className="font-serif text-4xl font-black text-forest">{group.title}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {group.courses.map((course) => (
                <article key={`${course.code}-${course.title}`} className="rounded-md border border-line bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-brass">{course.code}</p>
                  <h3 className="mt-2 font-serif text-2xl font-black text-ink">{course.title}</h3>
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
  return (
    <section className="grid overflow-hidden rounded-md border border-line bg-white shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
      <div className="bg-forest p-7 text-white">
        <p className="font-black uppercase tracking-[0.18em] text-brass">Admissions Office</p>
        <h2 className="mt-3 font-serif text-4xl font-black leading-tight">Send your first application details.</h2>
        <div className="mt-8 space-y-4 text-white/76">
          <p className="flex gap-3">
            <Mail className="mt-1 shrink-0 text-brass" size={20} />
            {site.admissionsEmail}
          </p>
          <p className="flex gap-3">
            <MapPin className="mt-1 shrink-0 text-brass" size={20} />
            {site.address}
          </p>
        </div>
      </div>
      <form action={`mailto:${site.admissionsEmail}`} method="post" encType="text/plain" className="grid gap-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-stone">
            Name
            <input name="name" className="rounded-md border border-line bg-paper px-4 py-3 text-base text-ink outline-none focus:border-brass" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone">
            Email
            <input name="email" type="email" className="rounded-md border border-line bg-paper px-4 py-3 text-base text-ink outline-none focus:border-brass" />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-stone">
            Phone
            <input name="phone" className="rounded-md border border-line bg-paper px-4 py-3 text-base text-ink outline-none focus:border-brass" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone">
            Program Interest
            <select name="program" className="rounded-md border border-line bg-paper px-4 py-3 text-base text-ink outline-none focus:border-brass">
              <option>Bachelor of Ministry</option>
              <option>Master of Ministry</option>
              <option>Doctor of Ministry</option>
              <option>General question</option>
            </select>
          </label>
        </div>
        <label className="grid gap-2 text-sm font-bold text-stone">
          Message
          <textarea name="message" rows={5} className="rounded-md border border-line bg-paper px-4 py-3 text-base text-ink outline-none focus:border-brass" />
        </label>
        <button className="inline-flex items-center justify-center gap-2 rounded-md bg-wine px-5 py-3 font-black text-white transition hover:bg-forest">
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
          <h2 className="mt-3 font-serif text-3xl font-black text-forest">Begin your application</h2>
        </Link>
        <Link href="/course-descriptions" className="rounded-md border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="font-black uppercase tracking-[0.16em] text-brass">Curriculum</p>
          <h2 className="mt-3 font-serif text-3xl font-black text-forest">Explore course descriptions</h2>
        </Link>
        <Link href="/tuition---fees" className="rounded-md border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="font-black uppercase tracking-[0.16em] text-brass">Tuition</p>
          <h2 className="mt-3 font-serif text-3xl font-black text-forest">Review financial information</h2>
        </Link>
      </div>
    </section>
  );
}
