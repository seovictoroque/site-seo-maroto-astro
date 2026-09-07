/**
 * AS TRILHAS DA ESCOLINHA SEO.
 *
 * Cada trilha e um recorte do roteiro de 12 etapas, com menos etapas e mais
 * profundidade em uma frente so. Elas nao repetem o roteiro completo: quem
 * quer o mapa inteiro fica em /escolinha-seo, quem ja sabe onde quer entrar
 * cai direto na trilha.
 *
 * FONTE UNICA
 * O conteudo das trilhas vive AQUI, e a pagina /escolinha-seo/[trilha].astro
 * so desenha. A pagina do roteiro completo ainda tem markup proprio, escrito
 * a mao, herdado do prototipo em HTML: quando ela for componentizada, deve
 * passar a ler daqui tambem, e nao o contrario.
 *
 * COMO ISSO SE LIGA AO roadmap.ts
 * O roadmap.ts numera as 12 etapas do roteiro completo e as agrupa em base,
 * tecnica e ia. As trilhas abaixo cobrem as mesmas frentes, mas com etapas
 * proprias e numeracao propria: forcar a numeracao do roteiro grande dentro
 * de um recorte produziria uma trilha que comeca na etapa 5, o que nao faz
 * sentido para quem entra por ela.
 */

export interface NoTrilha {
  label: string;
  href?: string;
}

export interface EtapaTrilha {
  numero: number;
  titulo: string;
  /** coluna da esquerda da espinha. Vazia, a linha nasce so com a direita. */
  esquerda: NoTrilha[];
  direita: NoTrilha[];
}

export interface Trilha {
  slug: string;
  /** rotulo curto, usado no breadcrumb e no titulo da aba */
  nome: string;
  /** linha em mono acima do H1 */
  kicker: string;
  /** o H1 quebra em duas partes: a segunda sai em italico e na cor de acento */
  h1: string;
  h1Destaque: string;
  sub: string;
  metaTitle: string;
  metaDescription: string;
  /** paragrafos de abertura, antes do roteiro */
  intro: string[];
  /** os nodes desta trilha usam o rust, a cor reservada a IA, GEO e AEO */
  rust?: boolean;
  etapas: EtapaTrilha[];
  faq: { question: string; answer: string }[];
  /** para onde ir depois desta trilha */
  continuar: { label: string; href: string }[];
}

export const trilhas: Trilha[] = [
  {
    slug: 'iniciante',
    nome: 'Escolinha SEO para iniciantes',
    kicker: 'Trilha para quem está começando',
    h1: 'Do zero até a primeira',
    h1Destaque: 'página que ranqueia',
    sub: 'Seis etapas com os fundamentos e, no fim de cada uma, algo para fazer num site seu. Sem jargão gratuito e sem prometer resultado em trinta dias.',
    metaTitle: 'Trilha de SEO para iniciantes: fundamentos na ordem certa | SEO Maroto',
    metaDescription:
      'Roteiro de SEO para quem está começando, em seis etapas: como a busca funciona, palavra-chave e intenção, on-page, Search Console, e a rotina que sustenta o resto.',
    intro: [
      'Esta trilha não pressupõe nada. Se você nunca abriu um Search Console, é aqui que começa. A única exigência é ter um site para praticar, nem que seja um blog de teste criado hoje: SEO só entra na cabeça quando você tem dado próprio para olhar.',
      'A ordem foi escolhida para você conseguir fazer alguma coisa desde a primeira etapa, em vez de estudar três semanas antes de mexer em qualquer página. Se em algum momento parecer teórico demais, é sinal de que você pulou a parte prática da etapa anterior.',
    ],
    etapas: [
      {
        numero: 1,
        titulo: 'O que é SEO, de verdade',
        esquerda: [{ label: 'Orgânico, pago e direto' }],
        direita: [
          { label: 'O que SEO resolve e o que não resolve' },
          { label: 'Quanto tempo leva para dar sinal' },
          { label: 'Os mitos que você vai ouvir' },
        ],
      },
      {
        numero: 2,
        titulo: 'Como o Google acha e mostra uma página',
        esquerda: [{ label: 'Rastrear, indexar, ranquear' }, { label: 'O que é uma SERP' }],
        direita: [
          { label: 'Por que uma página não aparece' },
          { label: 'Como conferir se a sua está indexada' },
        ],
      },
      {
        numero: 3,
        titulo: 'Palavra-chave e intenção de busca',
        esquerda: [{ label: 'Buscar como o seu leitor busca' }, { label: 'Volume não é tudo' }],
        direita: [
          { label: 'Os quatro tipos de intenção' },
          { label: 'Ler a SERP antes de escrever' },
          { label: 'Escolher a primeira palavra para atacar' },
        ],
      },
      {
        numero: 4,
        titulo: 'Uma página bem feita',
        esquerda: [{ label: 'Title e meta description' }, { label: 'Hierarquia de heading' }],
        direita: [
          { label: 'Responder a pergunta logo no começo' },
          { label: 'URL, imagem e texto alternativo' },
          { label: 'Link interno, o mais subestimado' },
        ],
      },
      {
        numero: 5,
        titulo: 'Medir sem se enganar',
        esquerda: [{ label: 'Configurar o Search Console' }, { label: 'Configurar o GA4' }],
        direita: [
          { label: 'Impressão, clique, CTR e posição' },
          { label: 'O relatório que importa no começo' },
          { label: 'Por que a posição média engana' },
        ],
      },
      {
        numero: 6,
        titulo: 'A rotina que sustenta o resto',
        esquerda: [{ label: 'O que olhar toda semana' }, { label: 'O que só olhar todo mês' }],
        direita: [
          { label: 'Atualizar conteúdo antigo' },
          { label: 'Quando parar de mexer e esperar' },
          { label: 'Para onde ir depois daqui' },
        ],
      },
    ],
    faq: [
      {
        question: 'Preciso ter um site para seguir a trilha?',
        answer:
          'Precisa, e não tem jeito. Pode ser um blog gratuito criado hoje, com cinco páginas. O que não funciona é acompanhar tudo de fora: metade das etapas termina com uma tarefa que só faz sentido num site que é seu.',
      },
      {
        question: 'Preciso pagar alguma ferramenta?',
        answer:
          'Nenhuma. Search Console e GA4 são gratuitos e cobrem esta trilha inteira. Ferramenta paga faz sentido bem mais para frente, e mesmo assim menos do que a propaganda sugere.',
      },
      {
        question: 'Em quanto tempo eu vejo resultado?',
        answer:
          'Depende do site e da concorrência, e quem der um número fechado está chutando. O que dá para dizer é que as primeiras mudanças costumam aparecer no Search Console em semanas, não em dias, e que site novo demora mais porque o Google ainda não tem histórico dele.',
      },
      {
        question: 'Depois desta trilha eu já sou profissional de SEO?',
        answer:
          'Você vai saber otimizar uma página, medir o que aconteceu e não cair em promessa milagrosa, o que já é mais do que muita gente que se vende como especialista. Para virar profissão, o caminho é o roteiro completo, e a parte técnica é onde a diferença aparece.',
      },
    ],
    continuar: [
      { label: 'Roteiro completo', href: '/escolinha-seo' },
      { label: 'Trilha de SEO técnico', href: '/escolinha-seo/tecnica' },
      { label: 'Blog: fundamentos', href: '/blog/categoria/fundamentos-de-seo' },
    ],
  },

  {
    slug: 'tecnica',
    nome: 'Escolinha SEO Técnico',
    kicker: 'Trilha focada em SEO técnico',
    h1: 'A parte que ninguém quer',
    h1Destaque: 'apresentar em reunião',
    sub: 'Seis etapas sobre rastreamento, indexação, renderização e performance. É onde mora a maior parte do tráfego que os sites perdem sem perceber.',
    metaTitle: 'Trilha de SEO técnico: crawl, indexação e Core Web Vitals | SEO Maroto',
    metaDescription:
      'Roteiro de SEO técnico em seis etapas: como o Google rastreia e renderiza, auditoria, controle de indexação, Core Web Vitals, dados estruturados e SEO em escala.',
    intro: [
      'Esta trilha assume que você já sabe o que é SEO e já olhou um Search Console na vida. Se esse não é o caso, comece pelo roteiro completo e volte aqui depois: SEO técnico sem base vira checklist decorado.',
      'A ordem importa. Cada etapa depende da anterior, e pular direto para Core Web Vitals num site que o Google nem rastreia direito é otimizar a parte errada. Diagnóstico antes de conserto, sempre.',
    ],
    etapas: [
      {
        numero: 1,
        titulo: 'Como o Google rastreia e renderiza',
        esquerda: [{ label: 'robots.txt e diretivas' }, { label: 'Códigos de status e redirects' }],
        direita: [
          { label: 'Fila de rastreamento e de renderização' },
          { label: 'Orçamento de rastreio, quando importa' },
          { label: 'Renderização: SSR, SSG e client-side' },
        ],
      },
      {
        numero: 2,
        titulo: 'Auditoria técnica de verdade',
        esquerda: [{ label: 'Crawl com Screaming Frog' }, { label: 'Análise de log de servidor' }],
        direita: [
          { label: 'Crawl comparativo, antes e depois' },
          { label: 'Erros 4xx e 5xx que sangram link' },
          { label: 'Priorizar por impacto, não por volume' },
        ],
      },
      {
        numero: 3,
        titulo: 'Controle de indexação',
        esquerda: [{ label: 'Canonical, o que ele é e o que não é' }, { label: 'noindex, nofollow e o que cada um faz' }],
        direita: [
          { label: 'Duplicidade e quase-duplicidade' },
          { label: 'Paginação e facetas em ecommerce' },
          { label: 'Sitemap que reflete o que existe' },
        ],
      },
      {
        numero: 4,
        titulo: 'Core Web Vitals e dado de campo',
        esquerda: [{ label: 'LCP, INP e CLS na prática' }, { label: 'CrUX, o dado que o Google usa' }],
        direita: [
          { label: 'Campo contra laboratório' },
          { label: 'Scripts de terceiro, o suspeito de sempre' },
          { label: 'Orçamento de performance' },
        ],
      },
      {
        numero: 5,
        titulo: 'Dados estruturados',
        esquerda: [{ label: 'Schema que o Google usa mesmo' }],
        direita: [
          { label: 'Grafo de entidades e @id estável' },
          { label: 'Marcado x visível: a regra de ouro' },
          { label: 'Testar e monitorar rich results' },
        ],
      },
      {
        numero: 6,
        titulo: 'SEO técnico em escala',
        esquerda: [{ label: 'JavaScript SEO' }, { label: 'SEO internacional e hreflang' }],
        direita: [
          { label: 'Migração sem perder tráfego' },
          { label: 'Programmatic SEO sem gerar lixo' },
          { label: 'Monitoramento contínuo de indexação' },
        ],
      },
    ],
    faq: [
      {
        question: 'Preciso saber programar para seguir esta trilha?',
        answer:
          'Não, mas ajuda muito ler HTML e entender o que é uma requisição HTTP. O conteúdo explica o necessário no caminho. O que não dá é tratar o navegador como caixa preta: em SEO técnico, metade do trabalho é conversar com quem desenvolve sem depender de tradução.',
      },
      {
        question: 'Preciso de ferramenta paga?',
        answer:
          'Para seguir a trilha inteira, não. Search Console, a versão gratuita do Screaming Frog, o CrUX e um editor de texto cobrem tudo aqui. Ferramenta paga acelera, não substitui o diagnóstico.',
      },
      {
        question: 'Em quanto tempo eu termino?',
        answer:
          'Depende de você ter um site para praticar. Lendo, umas duas semanas. Aplicando em um projeto real, conte alguns meses, porque várias etapas dependem de esperar o Google reagir à mudança.',
      },
      {
        question: 'Isso serve para site pequeno?',
        answer:
          'Serve, com uma ressalva: orçamento de rastreio e análise de log só viram problema real acima de alguns milhares de URLs. Num site de vinte páginas, indexação e Core Web Vitals resolvem quase tudo.',
      },
    ],
    continuar: [
      { label: 'Roteiro completo', href: '/escolinha-seo' },
      { label: 'Trilha de GEO e AEO', href: '/escolinha-seo/geo-aeo' },
      { label: 'Estudos de caso', href: '/cases' },
    ],
  },

  {
    slug: 'geo-aeo',
    nome: 'Escolinha GEO/AEO',
    kicker: 'Trilha focada em busca com IA',
    h1: 'Aparecer na resposta,',
    h1Destaque: 'não só no décimo link',
    sub: 'Cinco etapas sobre GEO e AEO: o que muda quando quem lê a sua página é um modelo, o que continua igual e como medir se você está sendo citado.',
    metaTitle: 'Trilha de GEO e AEO: otimização para busca com IA | SEO Maroto',
    metaDescription:
      'Roteiro de GEO e AEO em cinco etapas: como AI Overviews e assistentes escolhem o que citar, a base técnica que eles exigem, llms.txt, e como medir citação em IA.',
    rust: true,
    intro: [
      'Antes de tudo, o aviso que quase ninguém dá: GEO e AEO não são um SEO paralelo. A base é a mesma. Página que o robô não rastreia, não renderiza ou não entende também não vira citação em resposta de IA.',
      'O que muda é o alvo. Você deixa de disputar uma posição numa lista e passa a disputar ser a fonte de um parágrafo que alguém lê sem clicar. Isso muda o formato do conteúdo, muda a medição e, principalmente, muda o que conta como resultado.',
    ],
    etapas: [
      {
        numero: 1,
        titulo: 'O que muda com a busca por IA',
        esquerda: [{ label: 'AI Overviews e assistentes' }, { label: 'GEO e AEO, a diferença real' }],
        direita: [
          { label: 'Query fan out: uma pergunta vira várias' },
          { label: 'Zero-click: o que se ganha e o que se perde' },
          { label: 'O que continua sendo SEO clássico' },
        ],
      },
      {
        numero: 2,
        titulo: 'A base técnica que a IA exige',
        esquerda: [{ label: 'Rastreável e renderizável sem JS' }, { label: 'Dados estruturados e entidades' }],
        direita: [
          { label: 'HTML semântico e hierarquia de heading' },
          { label: 'Autoria e sinais de E-E-A-T verificáveis' },
          { label: 'Conteúdo que sobrevive fora do layout' },
        ],
      },
      {
        numero: 3,
        titulo: 'Conteúdo que vira citação',
        esquerda: [{ label: 'Resposta direta no topo' }, { label: 'Definições autocontidas' }],
        direita: [
          { label: 'Um trecho que faz sentido sozinho' },
          { label: 'Dado próprio, o que ninguém pode copiar' },
          { label: 'Cobrir o fan out sem inchar a página' },
        ],
      },
      {
        numero: 4,
        titulo: 'Crawlers de IA e llms.txt',
        esquerda: [{ label: 'Quem são os crawlers de IA' }, { label: 'llms.txt, o que é e o que não é' }],
        direita: [
          { label: 'Permitir, bloquear ou negociar' },
          { label: 'A conta entre visibilidade e conteúdo raspado' },
        ],
      },
      {
        numero: 5,
        titulo: 'Medir presença em IA',
        esquerda: [{ label: 'Rastrear citações por prompt' }, { label: 'Tráfego de referência de assistentes' }],
        direita: [
          { label: 'O que o Search Console mostra e o que não' },
          { label: 'Montar um painel honesto de GEO' },
          { label: 'Quando o número não significa nada' },
        ],
      },
    ],
    faq: [
      {
        question: 'GEO substitui o SEO?',
        answer:
          'Não. A base técnica é a mesma, e um site que não é rastreável não aparece em lugar nenhum, com ou sem IA. O que GEO acrescenta é uma camada de formato e de medição em cima do SEO que você já faz.',
      },
      {
        question: 'Vale a pena bloquear os crawlers de IA?',
        answer:
          'Depende do seu modelo de negócio, e é uma decisão de conta, não de princípio. Bloquear protege o conteúdo de ser usado sem crédito e, ao mesmo tempo, tira você da chance de ser citado. A etapa 4 monta os dois lados dessa conta em vez de dar uma resposta pronta.',
      },
      {
        question: 'Como eu sei se estou sendo citado?',
        answer:
          'Hoje não existe um relatório oficial e completo. Dá para acompanhar por amostragem, testando um conjunto fixo de perguntas com frequência, e cruzar com o tráfego de referência que vem dos assistentes. É impreciso, e a trilha é explícita sobre onde a medição ainda é frágil.',
      },
      {
        question: 'llms.txt já é padrão?',
        answer:
          'Não é padrão adotado, é uma proposta. Vale conhecer e vale acompanhar, mas quem promete resultado garantido por causa de um llms.txt está vendendo alguma coisa. A etapa 4 trata do que existe de fato hoje.',
      },
    ],
    continuar: [
      { label: 'Roteiro completo', href: '/escolinha-seo' },
      { label: 'Trilha de SEO técnico', href: '/escolinha-seo/tecnica' },
      { label: 'Blog: IA, GEO e AEO', href: '/blog/categoria/ia-geo-aeo' },
    ],
  },
];

export const trilhaSlugs = trilhas.map((t) => t.slug);

export function getTrilha(slug: string): Trilha | undefined {
  return trilhas.find((t) => t.slug === slug);
}
