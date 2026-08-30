/**
 * Constantes do site. Um lugar so para o que aparece em meta tag, schema e
 * rodape, para nao existir dominio escrito a mao espalhado por pagina.
 */
export const site = {
  url: 'https://seomaroto.com.br',
  name: 'SEO Maroto',
  locale: 'pt_BR',
  lang: 'pt-BR',
  tagline: 'SEO sem enrolação, sem guru e sem firula',
  description:
    'Laboratório independente de SEO: blog técnico, estudos de caso com número na mesa, trilhas de estudo e dez ferramentas gratuitas. Sem cadastro e sem promessa milagrosa.',
  twitter: '@seovictoroque',
  logo: '/img/logo-seomaroto.png',
  icon: '/img/icon-seomaroto.png',
  themeColor: '#0D0904',
  /** OG padrao de quem nao define o proprio */
  defaultOgImage: '/img/logo-seomaroto.png',
} as const;

/**
 * CHAVE GERAL DE INDEXACAO.
 *
 * Ligada, o site se comporta normal. Desligada, TODA pagina sai com
 * `noindex, nofollow`, o robots.txt vira `Disallow: /`, o sitemap nao e
 * gerado e o .htaccess ganha um `X-Robots-Tag` que cobre tambem o que nao e
 * HTML, como o RSS e o indice de busca.
 *
 * Para desligar, crie um arquivo `.env` na raiz com:
 *
 *     SITE_INDEXAVEL=false
 *
 * O padrao e indexavel de proposito. Um site que nasce bloqueado por padrao e
 * um site que alguem esquece bloqueado, e o build avisa em letra garrafal toda
 * vez que a chave esta desligada, justamente para isso nao passar batido.
 *
 * ATENCAO ao voltar para indexavel: o `.env` fica na sua maquina e o build e
 * feito nela, entao apagar a linha do `.env` e o que libera. Rode
 * `npm run build` de novo e confira o `<meta name="robots">` do dist antes de
 * subir.
 */
export const indexavel = import.meta.env.SITE_INDEXAVEL !== 'false';

/** Junta o caminho com o dominio, para canonical e og:url. */
export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return new URL(path, site.url).href.replace(/\/$/, path === '/' ? '/' : '');
}
