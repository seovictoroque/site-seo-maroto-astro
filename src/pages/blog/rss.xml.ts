/**
 * Feed RSS do blog.
 *
 * O <link rel="alternate"> do template de post ja apontava para /blog/rss.xml
 * no HTML de origem, mas o feed nao existia. Agora existe.
 *
 * So entra post com status 'published': stub e card sem texto, e feed nao e
 * lugar de rascunho.
 */
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { publishedPosts } from '../../lib/posts';
import { site } from '../../data/site';

export const GET: APIRoute = async (context) => {
  const posts = await publishedPosts();

  return rss({
    title: `${site.name}, últimos artigos`,
    description: site.description,
    site: context.site ?? site.url,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? post.data.excerpt ?? '',
      pubDate: post.data.publishDate,
      link: `/blog/${post.id}`,
      categories: [post.data.category],
    })),
    customData: `<language>pt-br</language>`,
  });
};
