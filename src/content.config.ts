/**
 * CONTENT COLLECTIONS.
 *
 * Fica em src/content.config.ts, e nao no antigo src/content/config.ts, que
 * o Astro aposentou na versao 5 junto com a chegada da Content Layer API.
 *
 * O `loader` e a costura que interessa aqui: hoje ele le Markdown e MDX do
 * proprio repositorio, e trocar para um CMS headless amanha e trocar este
 * loader por um que faca fetch da API. Nenhum componente precisa mudar,
 * porque todos consomem o mesmo formato de entrada.
 *
 * O schema e proposital em ser rigoroso: categoria e autor sao validados
 * contra listas fechadas, entao post com categoria inexistente quebra o build
 * em vez de gerar uma pagina orfa que ninguem percebe.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { categorySlugs } from './data/categories';
import { authorSlugs } from './data/authors';
import { artIds } from './data/cover-art';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      /** H1 do post e titulo do card */
      title: z.string(),

      /**
       * Titulo da tag <title>, quando precisa ser diferente do H1.
       * Ausente, o layout monta "H1 | SEO Maroto".
       */
      seoTitle: z.string().optional(),

      /**
       * Meta description. O limite de 160 e de proposito: acima disso o
       * Google trunca e o trabalho de escrever a frase vai embora.
       *
       * Opcional so por causa dos posts com status 'stub', que nasceram do
       * card do prototipo em HTML e ainda nao tem texto proprio. Nesses o
       * layout cai para o excerpt e depois para o titulo. Post publicado
       * SEMPRE escreve a sua.
       */
      description: z.string().max(160).optional(),

      /**
       * Resumo do card nas listagens, mais curto e mais direto que a
       * description. Opcional porque quatro cards do prototipo em HTML
       * apareciam so no formato .post-row, que nao mostra resumo, e inventar
       * texto para eles seria pior que deixar vazio.
       */
      excerpt: z.string().optional(),

      /** linha fina do hero, logo abaixo do H1 */
      standfirst: z.string().optional(),

      category: z.enum(categorySlugs as [string, ...string[]]),
      author: z.enum(authorSlugs as [string, ...string[]]).default('victor-roque'),

      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),

      /** minutos, numero puro. A formatacao fica no componente. */
      readingTime: z.number().int().positive(),

      /**
       * Capa. Enquanto nao existir imagem real, `coverArt` aponta para um dos
       * simbolos SVG do sprite. Quando a foto entrar, preencha `image`, que
       * passa pelo astro:assets e ganha otimizacao, e o card prefere ela.
       */
      coverArt: z.enum(artIds as unknown as [string, ...string[]]).default('art-tech'),
      image: image().optional(),
      imageAlt: z.string().optional(),
      ogImage: z.string().optional(),

      /** pilar page da categoria. So um post por categoria deve marcar true. */
      pillar: z.boolean().default(false),

      /**
       * 'stub' e um card sem texto ainda: nasce noindex e fora do sitemap,
       * mas aparece nas listagens para a grade, a categoria, a pagina de
       * autor e a paginacao serem testaveis com dado real.
       */
      status: z.enum(['published', 'stub']).default('published'),

      /** Pontos principais. Bloco padrao de todo post publicado. */
      keyPoints: z.array(z.string()).optional(),

      /**
       * Resposta direta para IA e para trecho em destaque.
       * Regra: cada resposta precisa fazer sentido sozinha, fora do contexto
       * da pagina. E o que o query fan out consome.
       */
      aiSummary: z
        .object({
          question: z.string(),
          answer: z.string(),
          definitions: z.array(z.object({ term: z.string(), answer: z.string() })).default([]),
        })
        .optional(),

      /**
       * FAQ. O FAQPage do JSON-LD e montado a partir DESTE campo, entao o
       * visivel e o marcado nao tem como divergir. No HTML original eram dois
       * blocos escritos a mao com um aviso pedindo para lembrar dos dois.
       */
      faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),

      /**
       * Citacao de especialista. Nome e cargo sao obrigatorios.
       * Citacao de terceiro so entra com `sourceUrl`. Nunca publique citacao
       * de terceiro sem fonte verificavel.
       */
      expert: z
        .object({
          name: z.string(),
          role: z.string(),
          quote: z.string(),
          photo: z.string().optional(),
          sourceUrl: z.string().optional(),
          sourceLabel: z.string().optional(),
          cite: z.string().optional(),
        })
        .optional(),

      /** Bloco de creditos. So em conteudo traduzido ou adaptado. */
      source: z
        .object({
          officialName: z.string(),
          officialUrl: z.string(),
          articleTitle: z.string().optional(),
          articleUrl: z.string().optional(),
          authorName: z.string().optional(),
          authorUrl: z.string().optional(),
          topics: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
          licenseLabel: z.string().optional(),
          licenseUrl: z.string().optional(),
        })
        .optional(),

      /** slugs de relacionados escolhidos a mao. Vazio, o layout escolhe por categoria. */
      related: z.array(z.string()).default([]),
    }),
});

/**
 * ESTUDOS DE CASO.
 *
 * Collection separada do blog de proposito. Um case nao e um post com outra
 * categoria: ele tem estrutura fixa (problema, diagnostico, hipotese,
 * implementacao, resultado, aprendizados) e carrega numero verificavel. O
 * schema abaixo obriga os dois.
 *
 * O CAMPO `metric` E O CORACAO DA PAGINA.
 * Ele alimenta o card da listagem, o bloco de destaque do topo do case e o
 * JSON-LD, os tres a partir da MESMA fonte. Numero na pagina que nao existe
 * no frontmatter e numero que vai dessincronizar na primeira revisao.
 *
 * SOBRE `status: stub`
 * Mesmo contrato do blog: nasce noindex e fora do sitemap, mas ja aparece na
 * listagem. Case e prova de trabalho, entao publicar um com numero inventado
 * seria mentir sobre a propria credencial. Enquanto o texto for rascunho, ele
 * fica stub. So vira 'published' com dado real do projeto real.
 */
const cases = defineCollection({
  loader: glob({ base: './src/content/cases', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      /** H1 do case e titulo do card. O resultado, nao o nome do cliente. */
      title: z.string(),
      seoTitle: z.string().optional(),
      description: z.string().max(160).optional(),

      /** Resumo do card. O que estava quebrado e o que resolveu. */
      excerpt: z.string().optional(),
      /** linha fina do hero */
      standfirst: z.string().optional(),

      /**
       * Etiqueta de contexto do card: "marketplace, 400 mil URLs".
       * Segmento e porte, nunca o nome do cliente sem autorizacao escrita.
       */
      segment: z.string(),

      /**
       * O antes e o depois. `label` diz do que e o numero, porque "12% para
       * 71%" sozinho nao significa nada fora da pagina, e e exatamente esse
       * recorte que a IA cita.
       */
      metric: z.object({
        label: z.string(),
        before: z.string(),
        after: z.string(),
        /** contexto curto abaixo do numero: "em cinco meses" */
        note: z.string().optional(),
      }),

      /** Metricas secundarias da ficha do projeto. Opcional. */
      secondaryMetrics: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .default([]),

      /** Quanto tempo levou, em texto: "cinco meses". */
      duration: z.string().optional(),
      /** O que foi feito, em tres a seis chips. */
      disciplines: z.array(z.string()).default([]),

      author: z.enum(authorSlugs as [string, ...string[]]).default('victor-roque'),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      readingTime: z.number().int().positive(),

      coverArt: z.enum(artIds as unknown as [string, ...string[]]).default('art-tech'),

      /**
       * Cena da capa, desenhada em SVG por CaseHeroArt.astro. Uma por tipo de
       * problema, porque capa de case tem que mostrar o que aconteceu.
       * Ausente, o hero renderiza em uma coluna so.
       */
      heroArt: z.enum(['indexacao', 'poda', 'performance']).optional(),

      image: image().optional(),
      imageAlt: z.string().optional(),
      ogImage: z.string().optional(),

      /**
       * 'stub' = a estrutura existe, o texto ainda e rascunho. Nasce noindex
       * e fora do sitemap. Ver o comentario grande acima.
       */
      status: z.enum(['published', 'stub']).default('stub'),

      /** O resumo executivo do topo, em tres a cinco linhas. */
      keyPoints: z.array(z.string()).optional(),

      /** Resposta direta para IA e trecho em destaque. */
      aiSummary: z
        .object({
          question: z.string(),
          answer: z.string(),
          definitions: z.array(z.object({ term: z.string(), answer: z.string() })).default([]),
        })
        .optional(),

      faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),

      /** slugs de outros cases relacionados. Vazio, o layout escolhe. */
      related: z.array(z.string()).default([]),
    }),
});

export const collections = { blog, cases };
