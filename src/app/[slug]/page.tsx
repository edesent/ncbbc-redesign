import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, RelatedLinks, RenderBlocks } from "@/components/PageSections";
import { pages, pagesBySlug, site } from "@/content/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pagesBySlug[slug];

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.summary,
    alternates: {
      canonical: `${site.url}/${page.slug}`,
    },
    openGraph: {
      title: `${page.title} | ${site.fullName}`,
      description: page.summary,
      url: `${site.url}/${page.slug}`,
      images: [{ url: page.image ?? "/hero-campus.jpg" }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = pagesBySlug[slug];

  if (!page) {
    notFound();
  }

  return (
    <main>
      <PageHero page={page} />
      <RenderBlocks blocks={page.blocks} />
      <RelatedLinks />
    </main>
  );
}
