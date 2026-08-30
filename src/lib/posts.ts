/**
 * Consultas da collection de blog.
 *
 * Tudo que le posts passa por aqui, entao a regra de ordenacao, o que conta
 * como publicado e a escolha de relacionados existem em um lugar so. Trocar a
 * fonte de dados amanha e mexer nestas funcoes, nao nas paginas.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, getCategory } from '../data/categories';

export type Post = CollectionEntry<'blog'>;

/** Do mais novo para o mais antigo. Ordem cronologica pura, sem curadoria. */
export function byDateDesc(a: Post, b: Post): number {
  return b.data.publishDate.valueOf() - a.data.publishDate.valueOf();
}

/** Todos os posts, inclusive os stubs, ja ordenados. */
export async function allPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts.sort(byDateDesc);
}

/** So os que tem texto de verdade. */
export async function publishedPosts(): Promise<Post[]> {
  return (await allPosts()).filter((p) => p.data.status === 'published');
}

export function inCategory(posts: Post[], slug: string): Post[] {
  return posts.filter((p) => p.data.category === slug);
}

export function byAuthor(posts: Post[], slug: string): Post[] {
  return posts.filter((p) => p.data.author === slug);
}

/** A pilar page da categoria, quando existe uma marcada. */
export function pillarOf(posts: Post[], categorySlug: string): Post | undefined {
  return inCategory(posts, categorySlug).find((p) => p.data.pillar);
}

/** Quantos posts cada categoria tem. Numero real, nao chute de template. */
export function countByCategory(posts: Post[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const c of categories) out[c.slug] = 0;
  for (const p of posts) out[p.data.category] = (out[p.data.category] ?? 0) + 1;
  return out;
}

/**
 * Relacionados: primeiro os escolhidos a mao no frontmatter, depois os da
 * mesma categoria, e o resto completa com os mais recentes. Nunca repete o
 * proprio post.
 */
export function relatedTo(posts: Post[], post: Post, limit = 6): Post[] {
  const escolhidos = post.data.related
    .map((id) => posts.find((p) => p.id === id))
    .filter((p): p is Post => Boolean(p));

  const mesmaCategoria = inCategory(posts, post.data.category);
  const resto = posts;

  const vistos = new Set<string>([post.id]);
  const out: Post[] = [];
  for (const lista of [escolhidos, mesmaCategoria, resto]) {
    for (const p of lista) {
      if (out.length >= limit) return out;
      if (vistos.has(p.id)) continue;
      vistos.add(p.id);
      out.push(p);
    }
  }
  return out;
}

/** 28/08/2026 */
export function formatDate(d: Date): string {
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
}

/** 2026-08-28, para o atributo datetime */
export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** true quando a categoria do post e a de IA, GEO e AEO, que puxa o rust */
export function isRust(post: Post): boolean {
  return getCategory(post.data.category)?.variant === 'rust';
}
