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

/** Junta o caminho com o dominio, para canonical e og:url. */
export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return new URL(path, site.url).href.replace(/\/$/, path === '/' ? '/' : '');
}
