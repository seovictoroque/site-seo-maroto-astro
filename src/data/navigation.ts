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
  | 'solucoes'
  | 'escolinha'
  | 'comunidade'
  | 'sobre'
  | 'agenda'
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
    href: '/solucoes',
    label: 'Soluções',
    icon: 'solucoes',
    children: [
      { href: '/solucoes/agendar', label: 'Agende um bate-papo', hint: '30 min, sem enrolação' },
      { href: '/solucoes/treinamento', label: 'Treinamento SEO', hint: 'para times in-house' },
    ],
  },
  {
    href: '/escolinha',
    label: 'Escolinha',
    icon: 'escolinha',
    children: [
      { href: '/escolinha/iniciante', label: 'Trilha iniciante', hint: 'fundamentos de SEO' },
      { href: '/escolinha/tecnica', label: 'Trilha técnica', hint: 'crawl, indexação, CWV' },
      { href: '/escolinha/geo-aeo', label: 'Trilha GEO/AEO', hint: 'otimização para IA' },
      { href: '/estudos-de-caso', label: 'Estudos de caso', hint: 'o que deu certo e o que não' },
    ],
  },
  { href: '/comunidade', label: 'Comunidade', icon: 'comunidade' },
  { href: '/sobre', label: 'Sobre', icon: 'sobre' },
  { href: '/agenda', label: 'Agenda', icon: 'agenda' },
  { href: '/newsletter', label: 'Newsletter', icon: 'newsletter' },
  { href: '/contato', label: 'Contato', icon: 'contato' },
  { href: '/blog', label: 'Blog', icon: 'blog' },
];

/**
 * Redes sociais do header, do painel mobile e do rodape.
 *
 * GitHub e X vieram do `sameAs` do JSON-LD da home e do README de origem, que
 * traziam a URL real. Os tres com href '#' continuam como estavam no HTML:
 * trocar pela URL real antes de publicar, ou tirar o item da lista. Perfil
 * inventado em rede social e o tipo de erro que derruba a confianca do grafo.
 */
export interface SocialLink {
  href: string;
  label: string;
  icon: 'github' | 'x' | 'substack' | 'reddit' | 'youtube';
}

export const socialLinks: SocialLink[] = [
  { href: 'https://github.com/seovictoroque', label: 'GitHub', icon: 'github' },
  { href: 'https://x.com/seovictoroque', label: 'X (Twitter)', icon: 'x' },
  // TODO: URLs reais pendentes, vieram como href="#" do HTML de origem
  { href: '#', label: 'Substack', icon: 'substack' },
  { href: '#', label: 'Reddit', icon: 'reddit' },
  { href: '#', label: 'YouTube', icon: 'youtube' },
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
      { href: '/solucoes/agendar', label: 'Agende um bate-papo' },
      { href: '/solucoes/treinamento', label: 'Treinamentos' },
      { href: '/escolinha', label: 'Escolinha' },
    ],
  },
  {
    title: 'Conteúdo',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/newsletter', label: 'Newsletter' },
      { href: '/estudos-de-caso', label: 'Estudos de caso' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { href: '/comunidade', label: 'Comunidade' },
      { href: '/sobre', label: 'Sobre' },
      { href: '/agenda', label: 'Agenda' },
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
