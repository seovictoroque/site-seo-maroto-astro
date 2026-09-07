/**
 * Estrutura de navegacao do site.
 *
 * Fonte unica para o nav desktop, o painel mobile e o rodape. No HTML
 * original os mesmos nove itens, com os mesmos SVGs, estavam escritos duas
 * vezes por arquivo e repetidos em sete arquivos. Aqui existem uma vez so.
 *
 * O estado ativo NAO mora aqui: ele e calculado a partir de Astro.url.pathname
 * dentro do Header, entao pagina nenhuma precisa passar prop de "estou aqui".
 */

export type NavIconName =
  | 'ferramentas'
  | 'escolinha'
  | 'cases'
  | 'comunidade'
  | 'sobre'
  | 'newsletter'
  | 'contato'
  | 'blog';

export interface NavChild {
  href: string;
  label: string;
  /** linha de apoio em mono, so aparece no dropdown do desktop */
  hint?: string;
}

export interface NavItem {
  href: string;
  label: string;
  icon: NavIconName;
  children?: NavChild[];
  /** dropdown em duas colunas */
  mega?: boolean;
}

export const navItems: NavItem[] = [
  {
    href: '/ferramentas',
    label: 'Ferramentas',
    icon: 'ferramentas',
    mega: true,
    children: [
      { href: '/ferramentas/seo-audit', label: 'SEO Audit', hint: 'auditoria técnica completa' },
      { href: '/ferramentas/seo-roadmap', label: 'SEO Roadmap', hint: 'roteiro do zero ao avançado' },
      { href: '/ferramentas/aeo-geo-checker', label: 'AEO/GEO Checker', hint: 'visibilidade em buscas com IA' },
      { href: '/ferramentas/gerador-de-schema', label: 'Gerador de schema', hint: 'dados estruturados prontos' },
      { href: '/ferramentas/simulador-serp', label: 'Simulador SERP', hint: 'preview de título e descrição' },
      { href: '/ferramentas/teste-status-http', label: 'Teste de status HTTP', hint: 'códigos e cadeias de redirect' },
      { href: '/ferramentas/extrator-de-sitemap', label: 'Extrator de sitemap', hint: 'URLs de qualquer sitemap' },
      { href: '/ferramentas/trafego-vs-receita', label: 'Tráfego vs receita', hint: 'quanto o orgânico gera' },
      { href: '/ferramentas/rastreador-de-entidades', label: 'Rastreador de entidades', hint: 'entidades do Knowledge Graph' },
      { href: '/ferramentas/monitoramento-de-indexacao', label: 'Monitoramento de indexação', hint: 'o que entra e o que cai' },
    ],
  },
  {
    href: '/escolinha-seo',
    label: 'Escolinha SEO',
    icon: 'escolinha',
    children: [
      { href: '/escolinha-seo/iniciante', label: 'Escolinha SEO para iniciantes', hint: 'fundamentos de SEO' },
      { href: '/escolinha-seo/tecnica', label: 'Escolinha SEO Técnico', hint: 'crawl, indexação, CWV' },
      { href: '/escolinha-seo/geo-aeo', label: 'Escolinha SEO para LLMs', hint: 'otimização para IAs, GEO e AEO' },
    ],
  },
  {
    href: '/cases',
    label: 'Cases',
    icon: 'cases',
    children: [
      { href: '/cases/marketplace-indexacao', label: 'Marketplace, 400 mil URLs', hint: '12% para 71% de indexação' },
      { href: '/cases/saas-b2b-receita-organica', label: 'SaaS B2B, ticket alto', hint: 'menos tráfego, 2,3x mais receita' },
      { href: '/cases/editorial-core-web-vitals', label: 'Portal editorial', hint: 'LCP de 4,8s para 1,9s' },
      { href: '/cases', label: 'Ver todos os cases', hint: 'problema, número e método aberto' },
    ],
  },
  { href: '/comunidade', label: 'Comunidade', icon: 'comunidade' },
  { href: '/sobre', label: 'Sobre', icon: 'sobre' },
  { href: '/newsletter', label: 'Newsletter', icon: 'newsletter' },
  { href: '/contato', label: 'Contato', icon: 'contato' },
  { href: '/blog', label: 'Blog', icon: 'blog' },
];

/**
 * Redes sociais do header, do painel mobile e do rodape.
 *
 * Todas as URLs sao perfis reais do @seomaroto, confirmadas pelo Victor. O
 * GitHub continua no handle antigo (seovictoroque) porque e a conta de codigo,
 * nao o perfil da marca. Perfil inventado em rede social e o tipo de erro que
 * derruba a confianca do grafo: so entra aqui URL que abre.
 */
export interface SocialLink {
  href: string;
  label: string;
  icon: 'github' | 'x' | 'substack' | 'reddit' | 'youtube';
}

export const socialLinks: SocialLink[] = [
  { href: 'https://github.com/seovictoroque', label: 'GitHub', icon: 'github' },
  { href: 'https://x.com/seomaroto', label: 'X (Twitter)', icon: 'x' },
  { href: 'https://substack.com/@seomaroto', label: 'Substack', icon: 'substack' },
  { href: 'https://www.reddit.com/user/seomaroto/', label: 'Reddit', icon: 'reddit' },
  { href: 'https://www.youtube.com/@seomaroto', label: 'YouTube', icon: 'youtube' },
];

/** Colunas de links do rodape. */
export const footerColumns = [
  {
    title: 'Ferramentas',
    links: [
      { href: '/ferramentas/seo-audit', label: 'SEO Audit' },
      { href: '/ferramentas/seo-roadmap', label: 'SEO Roadmap' },
      { href: '/ferramentas/aeo-geo-checker', label: 'AEO/GEO Checker' },
      { href: '/ferramentas/gerador-de-schema', label: 'Gerador de schema' },
      { href: '/ferramentas/simulador-serp', label: 'Simulador SERP' },
      { href: '/ferramentas/teste-status-http', label: 'Teste de status HTTP' },
      { href: '/ferramentas/extrator-de-sitemap', label: 'Extrator de sitemap' },
      { href: '/ferramentas/trafego-vs-receita', label: 'Tráfego vs receita' },
      { href: '/ferramentas/rastreador-de-entidades', label: 'Rastreador de entidades' },
      { href: '/ferramentas/monitoramento-de-indexacao', label: 'Monitoramento de indexação' },
    ],
  },
  {
    title: 'Soluções',
    links: [
      { href: '/escolinha-seo', label: 'Escolinha SEO' },
      { href: '/escolinha-seo/iniciante', label: 'Escolinha SEO iniciantes' },
      { href: '/escolinha-seo/tecnica', label: 'Escolinha SEO Técnico' },
      { href: '/escolinha-seo/geo-aeo', label: 'Escolinha GEO/AEO' },
      { href: '/contato', label: 'Agende um bate-papo' },
    ],
  },
  {
    title: 'Conteúdo',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/newsletter', label: 'Newsletter' },
      { href: '/cases', label: 'Cases' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { href: '/comunidade', label: 'Comunidade' },
      { href: '/sobre', label: 'Sobre' },
      { href: '/contato', label: 'Contato' },
      { href: '/contato', label: 'FAQ' },
    ],
  },
];

export const legalLinks = [
  { href: '/politica-de-privacidade', label: 'Política de privacidade' },
  { href: '/termos-de-servico', label: 'Termos de serviço' },
  { href: '/politica-de-cookies', label: 'Política de cookies' },
];
