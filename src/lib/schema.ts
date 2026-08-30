/**
 * Construtores de JSON-LD.
 *
 * Tudo aqui monta no com @id estavel, para as entidades se ligarem em vez de
 * virarem entidades soltas. O @id do Person e o mesmo no BlogPosting, na
 * pagina de autor e no publisher do WebSite.
 *
 * O FAQPage e o BreadcrumbList sao montados a partir dos MESMOS dados que a
 * pagina renderiza, entao o marcado e o visivel nao tem como divergir. Era o
 * risco numero um no HTML original, onde os dois blocos eram escritos a mao.
 */
import { site } from '../data/site';
import type { Author } from '../data/authors';

export function abs(path: string): string {
  const url = new URL(path, site.url);
  url.search = '';
  url.hash = '';
  const out = url.href;
  return out.length > site.url.length + 1 ? out.replace(/\/$/, '') : out;
}

export const personId = (slug: string) => `${site.url}/autor/${slug}#person`;
export const orgId = `${site.url}/#org`;
export const websiteId = `${site.url}/#website`;

export function personNode(author: Author): Record<string, unknown> {
  return {
    '@type': 'Person',
    '@id': personId(author.slug),
    name: author.name,
    url: abs(`/autor/${author.slug}`),
    image: abs(author.photo.srcset.split(' ').slice(-2)[0]),
    jobTitle: 'Consultor de SEO',
    description: author.summary,
    knowsAbout: author.expertise.map((e) => e.label),
    // so perfil que existe de verdade e e publico
    sameAs: author.sameAs,
    worksFor: { '@id': orgId },
  };
}

export function breadcrumbNode(items: { label: string; href?: string }[]): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: abs(item.href) } : {}),
    })),
  };
}

export function faqNode(id: string, items: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    '@id': `${abs(id)}#faq`,
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function blogPostingNode(opts: {
  path: string;
  headline: string;
  description: string;
  datePublished: Date;
  dateModified: Date;
  section: string;
  authorSlug: string;
  image?: string;
}): Record<string, unknown> {
  return {
    '@type': 'BlogPosting',
    '@id': `${abs(opts.path)}#article`,
    headline: opts.headline,
    description: opts.description,
    inLanguage: site.lang,
    datePublished: opts.datePublished.toISOString(),
    dateModified: opts.dateModified.toISOString(),
    articleSection: opts.section,
    image: abs(opts.image ?? site.defaultOgImage),
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(opts.path) },
    author: { '@id': personId(opts.authorSlug) },
    publisher: { '@id': orgId },
  };
}

export function profilePageNode(author: Author, path: string): Record<string, unknown> {
  return {
    '@type': 'ProfilePage',
    '@id': `${abs(path)}#page`,
    url: abs(path),
    name: `${author.name}, ${author.role.split(',')[0]}`,
    inLanguage: site.lang,
    mainEntity: { '@id': personId(author.slug) },
    isPartOf: { '@id': websiteId },
  };
}
