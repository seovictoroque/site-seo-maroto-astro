// @ts-check
import { appendFileSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * CHAVE GERAL DE INDEXACAO, lado do build.
 *
 * O mesmo valor que src/data/site.ts le por import.meta.env, aqui lido por
 * loadEnv porque o astro.config roda em Node puro, fora do pipeline do Vite.
 * Os dois precisam concordar: se divergirem, o site sai com meta noindex e
 * sitemap ao mesmo tempo, que e sinal contraditorio.
 *
 * Para desligar a indexacao, crie um `.env` na raiz com SITE_INDEXAVEL=false.
 */
const { SITE_INDEXAVEL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const indexavel = SITE_INDEXAVEL !== 'false';

/**
 * Caminhos dos posts E dos cases com status 'stub', lidos do frontmatter.
 *
 * Eles nascem noindex, entao nao podem entrar no sitemap: anunciar para o
 * robo uma pagina que manda ele nao indexar e um sinal contraditorio, e vira
 * ruido no relatorio de cobertura.
 *
 * A leitura e por regex de proposito. O astro.config roda antes do pipeline
 * de conteudo, entao aqui nao existe getCollection.
 */
function slugsStub(dir, base) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .filter((f) => /^status:\s*["']?stub["']?\s*$/m.test(readFileSync(`${dir}/${f}`, 'utf-8')))
    .map((f) => `${base}/${f.replace(/\.mdx?$/, '')}`);
}

// caminhos completos, para o filtro do sitemap comparar sem montar prefixo
const stubs = [
  ...slugsStub('./src/content/blog', '/blog'),
  ...slugsStub('./src/content/cases', '/cases'),
];

/**
 * Com a indexacao desligada, acrescenta um X-Robots-Tag ao .htaccess e avisa
 * em letra garrafal no fim do build.
 *
 * Por que o header alem da meta tag: `<meta name="robots">` so existe em
 * HTML. O feed em /blog/rss.xml, o indice de busca em JSON e qualquer PDF que
 * entre depois ficariam de fora. O header cobre tudo que o servidor entrega.
 */
function chaveDeIndexacao() {
  return {
    name: 'seo-maroto:chave-de-indexacao',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        if (indexavel) return;

        const htaccess = fileURLToPath(new URL('.htaccess', dir));
        appendFileSync(
          htaccess,
          [
            '',
            '# ==========================================================================',
            '# SITE FECHADO PARA INDEXACAO',
            '# Gerado automaticamente porque SITE_INDEXAVEL=false no momento do build.',
            '# Cobre tambem o que nao e HTML, como o RSS e o indice de busca, onde uma',
            '# meta tag nao alcanca.',
            '# Some sozinho no proximo build feito com a chave ligada.',
            '# ==========================================================================',
            '<IfModule mod_headers.c>',
            '  Header set X-Robots-Tag "noindex, nofollow"',
            '</IfModule>',
            '',
          ].join('\n'),
          'utf-8'
        );

        logger.warn('');
        logger.warn('  ###################################################');
        logger.warn('  #  ESTE BUILD SAIU FECHADO PARA INDEXACAO         #');
        logger.warn('  #                                                 #');
        logger.warn('  #  meta robots ... noindex, nofollow              #');
        logger.warn('  #  robots.txt .... Disallow: /                    #');
        logger.warn('  #  sitemap ....... nao gerado                     #');
        logger.warn('  #  X-Robots-Tag .. noindex, nofollow              #');
        logger.warn('  #                                                 #');
        logger.warn('  #  Tire SITE_INDEXAVEL=false do .env para abrir.  #');
        logger.warn('  ###################################################');
        logger.warn('');
      },
    },
  };
}

/**
 * Build estatico para a Hostinger.
 *
 * output fica no padrao 'static': nao existe Node rodando no destino, entao
 * tudo precisa sair como HTML no diretorio dist.
 *
 * build.format 'directory' gera /blog/index.html. Somado ao .htaccess que
 * vive em public/, o Apache da Hostinger serve /blog sem barra no fim, que e
 * exatamente o formato dos canonicals que ja vinham do HTML original. Por
 * isso trailingSlash e 'never': se um dia isso mudar, mude nos tres lugares,
 * config, .htaccess e canonical.
 *
 * O sitemap so e gerado com a indexacao ligada, e exclui tudo que nasce
 * noindex: categoria, busca, paginas 2 em diante, design system, 404 e os
 * posts com status 'stub'. Rota nova que nascer noindex entra nesse filtro
 * tambem, senao o sitemap passa a anunciar pagina que o robo nao deve
 * indexar.
 */
export default defineConfig({
  site: 'https://seomaroto.com.br',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  /**
   * WATCHER POR POLLING, so afeta o `npm run dev`.
   *
   * Os arquivos deste projeto sao editados de fora do Windows, pelo mount do
   * Cowork. Escrita por esse caminho nem sempre dispara os eventos de sistema
   * de arquivos em que o watcher do Vite se apoia, e o sintoma nao e o dev
   * server ficar parado no tempo, que seria facil de perceber: ele passa a
   * servir DUAS versoes do mesmo bloco de estilo ao mesmo tempo, a antiga e a
   * nova, e a antiga continua ganhando em algumas regras.
   *
   * Foi assim que a /cases apareceu com o grid de duas colunas antigo e o
   * card de capa novo na mesma tela, um layout que nao existia nem no codigo
   * nem no build.
   *
   * Polling verifica os arquivos em intervalo fixo em vez de esperar aviso do
   * sistema. Custa um pouco de CPU e torna a deteccao confiavel. O `dist` nao
   * muda por causa disso: build nao usa watcher.
   */
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 400,
      },
    },
  },
  integrations: [
    mdx(),
    ...(indexavel
      ? [
          sitemap({
            filter: (page) =>
              !page.includes('/blog/categoria/') &&
              !page.includes('/blog/busca') &&
              !page.includes('/design-system') &&
              !page.includes('/404') &&
              !page.includes('/pagina/') &&
              !stubs.some((caminho) => page.replace(/\/$/, '').endsWith(caminho)),
          }),
        ]
      : []),
    chaveDeIndexacao(),
  ],
});
