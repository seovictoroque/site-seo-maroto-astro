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

/**
 * A resposta pode conter HTML inline, porque a MESMA lista alimenta o
 * acordeao visivel em FaqSection.astro. O schema quer texto puro, entao as
 * tags saem aqui, no unico lugar onde isso importa.
 */
function semTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function faqNode(id: string, items: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    '@id': `${abs(id)}#faq`,
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: semTags(f.answer) },
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

/**
 * WebPage simples, para as paginas que nao sao artigo, perfil nem colecao.
 * As tres paginas legais usam so isso mais o BreadcrumbList.
 */
export function webPageNode(opts: {
  path: string;
  name: string;
  dateModified: string;
}): Record<string, unknown> {
  return {
    '@type': 'WebPage',
    '@id': `${abs(opts.path)}#page`,
    url: abs(opts.path),
    name: opts.name,
    inLanguage: site.lang,
    dateModified: opts.dateModified,
    isPartOf: { '@id': websiteId },
  };
}

/**
 * ESTUDO DE CASO.
 *
 * Sai como Article, nao BlogPosting: um case nao e uma entrada de blog, e um
 * relato de trabalho executado. O `about` carrega o resultado em texto para
 * o buscador e a IA lerem o numero sem depender de entender o layout.
 */
export function caseStudyNode(opts: {
  path: string;
  headline: string;
  description: string;
  datePublished: Date;
  dateModified: Date;
  authorSlug: string;
  segment: string;
  metric: { label: string; before: string; after: string };
  image?: string;
}): Record<string, unknown> {
  return {
    '@type': 'Article',
    '@id': `${abs(opts.path)}#article`,
    headline: opts.headline,
    description: opts.description,
    inLanguage: site.lang,
    datePublished: opts.datePublished.toISOString(),
    dateModified: opts.dateModified.toISOString(),
    articleSection: 'Estudos de caso',
    about: `${opts.metric.label}: de ${opts.metric.before} para ${opts.metric.after}. Contexto: ${opts.segment}.`,
    image: abs(opts.image ?? site.defaultOgImage),
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(opts.path) },
    author: { '@id': personId(opts.authorSlug) },
    publisher: { '@id': orgId },
  };
}

/**
 * Colecao com os itens listados.
 *
 * O ItemList vai DENTRO do CollectionPage, com a ordem que a pagina mostra.
 * Foi a lacuna que a varredura de conteudo apontou em /ferramentas e /blog:
 * declarar CollectionPage sem os itens nao diz nada a mais que um WebPage.
 */
export function collectionPageNode(opts: {
  path: string;
  name: string;
  description: string;
  items: { path: string; name: string }[];
}): Record<string, unknown> {
  return {
    '@type': 'CollectionPage',
    '@id': `${abs(opts.path)}#page`,
    url: abs(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: site.lang,
    isPartOf: { '@id': websiteId },
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: abs(item.path),
        name: item.name,
      })),
    },
  };
}
