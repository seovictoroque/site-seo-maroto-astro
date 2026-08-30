// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Slugs dos posts com status 'stub', lidos direto do frontmatter.
 *
 * Eles nascem noindex, entao nao podem entrar no sitemap: anunciar para o
 * robo uma pagina que manda ele nao indexar e um sinal contraditorio, e vira
 * ruido no relatorio de cobertura.
 *
 * A leitura e por regex de proposito. O astro.config roda antes do pipeline
 * de conteudo, entao aqui nao existe getCollection.
 */
const POSTS = './src/content/blog';
const stubs = readdirSync(POSTS)
  .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
  .filter((f) => /^status:\s*["']?stub["']?\s*$/m.test(readFileSync(`${POSTS}/${f}`, 'utf-8')))
  .map((f) => f.replace(/\.mdx?$/, ''));

/**
 * Build estatico para a Hostinger.
 *
 * output fica no padrao 'static': nao existe Node rodando no destino, entao
 * tudo precisa sair como HTML no diretorio dist.
 *
 * build.format 'directory' gera /blog/index.html. Somado ao .htaccess que
 * vive em public/, o Apache da Hostinger serve /blog sem barra no fim, que e
 * exatamente o formato dos canonicals que ja vinham do HTML original. Por
 * isso trailingSlash e 'never': se um dia isso mudar, mude nos dois lugares.
 *
 * O sitemap exclui tudo que nasce noindex: categoria, busca, paginas 2 em
 * diante, design system, 404 e os posts com status 'stub'. Rota nova que
 * nascer noindex entra nesse filtro tambem, senao o sitemap passa a anunciar
 * pagina que o robo nao deve indexar.
 */
export default defineConfig({
  site: 'https://seomaroto.com.br',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/blog/categoria/') &&
        !page.includes('/blog/busca') &&
        !page.includes('/design-system') &&
        !page.includes('/404') &&
        !page.includes('/pagina/') &&
        !stubs.some((slug) => page.replace(/\/$/, '').endsWith(`/blog/${slug}`)),
    }),
  ],
});
