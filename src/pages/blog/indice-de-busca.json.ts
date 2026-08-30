/**
 * Indice de busca, gerado no build.
 *
 * Um JSON estatico com o minimo para achar um post: titulo, resumo,
 * categoria, data e slug. A busca acontece no navegador, em /blog/busca,
 * porque o site sobe como build estatico na Hostinger e nao existe servidor
 * para responder uma query.
 *
 * Se um dia o indice ficar grande demais para carregar de uma vez, o proximo
 * passo e o Pagefind, que indexa o HTML gerado e busca por fragmentos.
 */
import type { APIRoute } from 'astro';
import { allPosts } from '../../lib/posts';
import { getCategory } from '../../data/categories';

export const GET: APIRoute = async () => {
  const posts = await allPosts();

  const indice = posts.map((p) => ({
    slug: p.id,
    title: p.data.title,
    excerpt: p.data.excerpt ?? '',
    category: p.data.category,
    categoryName: getCategory(p.data.category)?.name ?? p.data.category,
    date: p.data.publishDate.toISOString().slice(0, 10),
    readingTime: p.data.readingTime,
    coverArt: p.data.coverArt,
  }));

  return new Response(JSON.stringify(indice), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
