// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

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
 * O sitemap exclui o que nasce noindex: categoria, busca, paginas 2 em diante
 * e o design system. Rota nova que nascer noindex entra nesse filtro tambem,
 * senao o sitemap passa a anunciar pagina que o robo nao deve indexar.
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
        !page.includes('/pagina/'),
    }),
  ],
});
