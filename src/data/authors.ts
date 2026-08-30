/**
 * Autores do site.
 *
 * Hoje existe um so. A lista e fechada e o schema da collection valida o
 * campo `author` contra estes slugs, entao post assinado por alguem que nao
 * existe quebra o build em vez de gerar uma pagina de autor vazia.
 *
 * ATENCAO, E-E-A-T
 * A pagina de autor e onde a confianca do site e verificada. Duas regras que
 * nao se negociam:
 *   1. `sameAs` so aceita perfil que existe de verdade e e publico. Perfil
 *      inventado derruba a confianca do grafo inteiro.
 *   2. `credentials` nao recebe certificacao inventada.
 * As credenciais abaixo vieram do HTML de origem, onde estavam marcadas como
 * placeholder. Confirmar antes de publicar.
 *
 * O @id do Person e o mesmo referenciado como `author` no BlogPosting de cada
 * post, entao as duas entidades se ligam no grafo.
 */

export interface Author {
  slug: string;
  name: string;
  role: string;
  /** frase curta de perfil, usada em meta description e no schema */
  summary: string;
  /** bio de duas frases do bloco de autor no fim do post */
  shortBio: string;
  /** paragrafos da bio no hero da pagina de autor */
  bio: string[];
  photo: {
    src: string;
    srcset: string;
    width: number;
    height: number;
  };
  /** TODO: confirmar antes de publicar, veio como placeholder do HTML */
  credentials: string[];
  /** so perfil real e publico */
  sameAs: string[];
  linkedin?: string;
  /** cada item aponta para o slug da categoria correspondente */
  expertise: { label: string; category: string }[];
  expertiseFootnote: string;
  /** TODO: numeros do HTML de origem, marcados como placeholder */
  stats: { value: string; label: string }[];
}

export const authors: Author[] = [
  {
    slug: 'victor-roque',
    name: 'Victor Roque',
    role: 'consultor de SEO, autor do SEO Maroto',
    summary:
      'Trabalha com busca orgânica desde 2015, entre projetos in-house e consultoria, com foco em SEO técnico e em e-commerce de catálogo grande.',
    shortBio:
      'Trabalha com busca orgânica desde 2015, entre projetos in-house e consultoria, com foco em SEO técnico e em e-commerce de catálogo grande. Escreve aqui o que testa no dia a dia, incluindo o que não deu certo, porque essa parte também economiza o tempo de quem lê.',
    bio: [
      'Trabalha com busca orgânica desde 2015, entre projetos in-house e consultoria, com foco em SEO técnico e em e-commerce de catálogo grande. Já cuidou de migração de site com mais de 300 mil URLs, do tipo que estraga fim de semana quando dá errado, e de projeto pequeno que cresceu sem verba de mídia.',
      'Escreve aqui o que testa no dia a dia, incluindo o que não deu certo, porque essa parte também economiza o tempo de quem lê. Não vende curso, não vende pacote de link e não publica post patrocinado disfarçado de conteúdo. Quando tem parceria, ela vem etiquetada.',
    ],
    photo: {
      src: '/img/autor/perfil-victor-roque-400.webp',
      srcset:
        '/img/autor/perfil-victor-roque-400.webp 400w, /img/autor/perfil-victor-roque-800.webp 800w',
      width: 400,
      height: 400,
    },
    credentials: [
      'Google Analytics 4 certificado',
      'Search Console avançado',
      '10 anos em busca orgânica',
      'palestrante em eventos de SEO',
    ],
    sameAs: ['https://www.linkedin.com/in/victorroque/'],
    linkedin: 'https://www.linkedin.com/in/victorroque/',
    expertise: [
      { label: 'SEO técnico', category: 'seo-tecnico' },
      { label: 'Estratégia de SEO', category: 'fundamentos-de-seo' },
      { label: 'Busca com IA, GEO e AEO', category: 'ia-geo-aeo' },
      { label: 'Pesquisa de palavras-chave', category: 'pesquisa-de-palavras-chave' },
      { label: 'Conteúdo para busca', category: 'conteudo' },
      { label: 'Link building', category: 'link-building' },
      { label: 'SEO para e-commerce', category: 'ecommerce-e-local' },
      { label: 'Análise de dados de busca', category: 'dados-e-estudos' },
    ],
    expertiseFootnote:
      'Auditoria, migração e diagnóstico técnico. O resto eu indico quem faz melhor.',
    stats: [
      { value: '142', label: 'artigos publicados' },
      { value: '9', label: 'estudos com dado próprio' },
      { value: '2015', label: 'desde quando faz isso' },
    ],
  },
];

export const authorSlugs = authors.map((a) => a.slug);

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
