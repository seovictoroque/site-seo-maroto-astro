/**
 * As 8 categorias do blog.
 *
 * Lista fechada de proposito: o schema da collection valida `category` contra
 * estes slugs, entao post com categoria errada quebra o build em vez de gerar
 * uma pagina de categoria fantasma.
 *
 * A pilar page da categoria NAO e declarada aqui: ela sai do proprio post,
 * pelo campo `pillar: true` do frontmatter. Assim nao existe slug de pilar
 * escrito a mao apontando para post que nao existe. E ela que disputa SERP,
 * a pagina de categoria existe para navegacao e distribuicao de link interno,
 * e por isso nasce noindex, follow.
 *
 * `variant: 'rust'` marca IA, GEO e AEO, a unica categoria que puxa a cor
 * rust em vez do ambar. Nunca passe classe CSS solta de fora para conseguir
 * isso, use a variante.
 *
 * Os icones sao o miolo do SVG (24x24, traco 1.9) usados na grade de
 * categorias e renderizados com set:html.
 */

export type CategoryVariant = 'default' | 'rust';

export interface Category {
  slug: string;
  /** nome completo, usado em H1, breadcrumb e etiqueta de card */
  name: string;
  /** nome curto, usado nos chips do sub-menu, onde o espaco e apertado */
  shortName: string;
  /** uma linha, usada na grade de categorias da home do blog */
  description: string;
  /** paragrafo do bloco por categoria na home do blog */
  intro: string;
  /**
   * Paragrafos do hero da pagina de categoria. Vazio, o hero usa `intro`.
   * So SEO Tecnico tem texto proprio: e a unica categoria que o prototipo em
   * HTML chegou a montar. Escreva os das outras antes de publicar.
   */
  heroParagraphs?: string[];
  /** ilustracao do hero. Ausente, o hero fica em uma coluna so. */
  heroArt?: 'funil';
  variant: CategoryVariant;
  icon: string;
}

export const categories: Category[] = [
  {
    slug: 'fundamentos-de-seo',
    name: 'Fundamentos de SEO',
    shortName: 'Fundamentos',
    description: 'O básico bem feito, que é onde a maioria dos sites ainda perde.',
    intro:
      'O básico bem feito, que é onde a maioria dos sites ainda perde. Como a busca funciona, o que muda de verdade e o que é só barulho de timeline.',
    variant: 'default',
    icon: '<path d="M22 10v6"/><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 2.5 9 2.5 12 0v-5"/>',
  },
  {
    slug: 'seo-tecnico',
    name: 'SEO Técnico',
    shortName: 'SEO Técnico',
    description: 'Crawl, indexação, renderização, CWV e migração sem drama.',
    intro:
      'Onde mora a maior parte do dinheiro perdido: página que não é rastreada, template que renderiza torto e migração feita na sexta à noite.',
    heroParagraphs: [
      'Rastreamento, indexação, renderização, arquitetura de URL e Core Web Vitals. É a frente que ninguém quer apresentar em reunião e onde mora a maior parte do tráfego que os sites perdem sem perceber.',
      'Aqui entra o que dá para diagnosticar com Search Console, log de servidor e um script curto. Sem ferramenta cara como pré-requisito e sem checklist genérico de 200 itens que ninguém executa.',
    ],
    heroArt: 'funil',
    variant: 'default',
    icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  },
  {
    slug: 'pesquisa-de-palavras-chave',
    name: 'Pesquisa de palavras-chave',
    shortName: 'Palavras-chave',
    description: 'Intenção, demanda real e o mapa que o time consegue executar.',
    intro:
      'Intenção, demanda real e o mapa que o time consegue executar. Volume bonito em planilha não paga conta.',
    variant: 'default',
    icon: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  },
  {
    slug: 'conteudo',
    name: 'Conteúdo',
    shortName: 'Conteúdo',
    description: 'Redação para busca, briefing, atualização e poda de conteúdo.',
    intro:
      'Redação para busca, briefing, atualização e poda. A parte que envelhece mais rápido e a que menos gente revisa.',
    variant: 'default',
    icon: '<path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z"/><path d="M14 2.5V8h5.5"/><path d="M15.5 13.5h-7M15.5 17.5h-7"/>',
  },
  {
    slug: 'link-building',
    name: 'Link Building',
    shortName: 'Link Building',
    description: 'Autoridade que se constrói, e a que só some dinheiro do caixa.',
    intro:
      'A parte do SEO que mais gera promessa vazia. Aqui só entra o que dá pra auditar depois, com link real e origem verificável.',
    variant: 'default',
    icon: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  },
  {
    slug: 'ia-geo-aeo',
    name: 'IA, GEO e AEO',
    shortName: 'IA, GEO e AEO',
    description: 'Visibilidade em ChatGPT, Gemini, Perplexity e AI Overviews.',
    intro:
      'Visibilidade em ChatGPT, Gemini, Perplexity e AI Overviews. Teste com amostra declarada, não achismo de LinkedIn.',
    variant: 'rust',
    icon: '<path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"/><path d="M18 16l.9 2.1 2.1.9-2.1.9L18 22l-.9-2.1-2.1-.9 2.1-.9z"/>',
  },
  {
    slug: 'ecommerce-e-local',
    name: 'E-commerce e SEO Local',
    shortName: 'E-commerce e Local',
    description: 'Facetas, catálogo, ficha de produto e quem vive de vender perto.',
    intro:
      'Facetas, catálogo, ficha de produto e quem vive de vender perto. Onde o SEO técnico e o comercial brigam pelo mesmo template.',
    variant: 'default',
    icon: '<path d="M3 6h18l-1.6 9.2a2 2 0 0 1-2 1.8H7.6a2 2 0 0 1-2-1.8z"/><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/>',
  },
  {
    slug: 'dados-e-estudos',
    name: 'Dados e Estudos',
    shortName: 'Dados e Estudos',
    description: 'Experimento próprio, amostra declarada e método que dá pra repetir.',
    intro:
      'Experimento próprio, amostra declarada e método que dá pra repetir. Se o número não tem origem, ele não entra aqui.',
    variant: 'default',
    icon: '<path d="M4 20V10M10 20V4M16 20v-7M22 20h-20"/>',
  },
];

export const categorySlugs = categories.map((c) => c.slug);

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
