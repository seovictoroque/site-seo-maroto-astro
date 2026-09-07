/**
 * AS PAGINAS DE FERRAMENTA.
 *
 * Conteudo das nove ferramentas que ainda nao existem como codigo rodando. A
 * pagina /ferramentas/[ferramenta].astro so desenha; acrescentar ferramenta
 * nova e acrescentar um objeto aqui.
 *
 * A /ferramentas/seo-audit continua como pagina propria, escrita a mao antes
 * desta estrutura existir. Ela e o modelo visual que este arquivo reproduz.
 *
 * ATENCAO: O QUE ESTA AQUI E DEMONSTRACAO
 * Nenhuma destas ferramentas roda de verdade. Os blocos de resultado sao
 * exemplos ESTATICOS, escritos para mostrar o formato da saida, e o
 * formulario nao envia nada. Cada pagina diz isso em letra visivel, no campo
 * `avisoDemo`, logo abaixo do formulario: prometer analise que nao acontece e
 * o tipo de coisa que derruba a confianca no site inteiro, ainda mais num
 * site que se vende como "sem enrolacao".
 *
 * Os metadados de card (icone, nome, texto, tags) foram extraidos da
 * /ferramentas para nao existirem escritos duas vezes com valores
 * divergentes, que era o problema do prototipo em HTML.
 */

export interface TagFerramenta {
  label: string;
  on: boolean;
}

export interface AchadoFerramenta {
  /** severidade define a cor do selo */
  sev: 'crit' | 'warn' | 'info';
  rotulo: string;
  titulo: string;
  texto: string;
}

export interface TabelaFerramenta {
  head: string[];
  /** as celulas aceitam HTML simples; a primeira coluna sai em destaque */
  rows: string[][];
}

export interface Ferramenta {
  slug: string;
  /**
   * A /ferramentas/seo-audit tem pagina propria, escrita a mao antes desta
   * estrutura existir. Ela entra nesta lista SO para poder ser citada nos
   * cards de "ferramentas que combinam", e a rota dinamica a exclui do
   * getStaticPaths para nao gerar duas paginas na mesma URL.
   *
   * Sem isso ela sumia silenciosamente dos cards: `relacionadas` resolvia
   * para undefined e o filtro descartava, deixando a fileira com dois cards
   * e um buraco no lugar do terceiro.
   */
  paginaPropria?: boolean;
  /** nome curto, do breadcrumb e do card */
  nome: string;
  /** miolo do SVG do card, sem a tag <svg> */
  icone: string;
  cardTexto: string;
  tags: TagFerramenta[];

  eyebrow: string;
  /** o H1 quebra em tres: o do meio sai em italico e na cor de acento */
  h1: [string, string, string];
  sub: string;
  metaTitle: string;
  metaDescription: string;
  heroMeta: { valor: string; rotulo: string }[];

  form: {
    label: string;
    placeholder: string;
    botao: string;
    /** textarea, para entrada de varias linhas */
    multilinha?: boolean;
  };
  /** aviso de que a saida abaixo e exemplo, nao execucao. Aceita HTML. */
  avisoDemo: string;

  resultado: {
    titulo: string;
    sub: string;
    score?: { num: string; label: string; alvo: string; meta: string };
    achados?: AchadoFerramenta[];
    tabela?: TabelaFerramenta;
    /** bloco monoespacado, para saida de JSON-LD e afins */
    codigo?: string;
    /** preview de resultado de busca */
    serp?: { url: string; title: string; desc: string; nota: string };
  };

  oQueFaz: { titulo: string; sub: string; tabela: TabelaFerramenta };
  passos: { titulo: string; texto: string }[];
  /** slugs de outras ferramentas, para os cards do fim */
  relacionadas: string[];
  cta: { titulo: string; texto: string };
  faq: { question: string; answer: string }[];
}

export const ferramentas: Ferramenta[] = [
  {
    slug: 'seo-audit',
    paginaPropria: true,
    nome: 'SEO Audit',
    icone: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    cardTexto: 'Roda uma auditoria técnica na URL e devolve o que está quebrado, em ordem de impacto, sem relatório de 80 páginas.',
    tags: [{ label: 'técnico', on: true }, { label: 'no ar', on: true }],
    // os campos abaixo nao sao usados: a pagina dela e escrita a mao
    eyebrow: '',
    h1: ['', '', ''],
    sub: '',
    metaTitle: '',
    metaDescription: '',
    heroMeta: [],
    form: { label: '', placeholder: '', botao: '' },
    avisoDemo: '',
    resultado: { titulo: '', sub: '' },
    oQueFaz: { titulo: '', sub: '', tabela: { head: [], rows: [] } },
    passos: [],
    relacionadas: [],
    cta: { titulo: '', texto: '' },
    faq: [],
  },

  {
    slug: 'seo-roadmap',
    nome: 'SEO Roadmap',
    icone: '<path d="M9 3.5 3 6v15l6-2.5 6 2.5 6-2.5V3.5L15 6z"/><path d="M9 3.5v15M15 6v15"/>',
    cardTexto: 'O roteiro do zero ao avançado em 12 etapas, com itens de ação para marcar conforme você avança.',
    tags: [
      {
        label: 'estudo',
        on: false
      },
      {
        label: 'no ar',
        on: true
      }
    ],
    eyebrow: 'Roteiro interativo, sem cadastro',
    h1: [
      'O roteiro de SEO que você ',
      'marca conforme',
      ' avança'
    ],
    sub: 'As 12 etapas do zero ao avançado, com itens de ação para riscar. O progresso fica salvo no seu navegador, não numa conta que eu tenha que guardar.',
    metaTitle: 'SEO Roadmap: as 12 etapas do zero ao avançado | SEO Maroto',
    metaDescription: 'Roteiro interativo de SEO em 12 etapas, com mais de 60 itens de ação para marcar. Progresso salvo no navegador, sem cadastro e sem plano pago.',
    heroMeta: [
      {
        valor: '12',
        rotulo: 'etapas'
      },
      {
        valor: '60+',
        rotulo: 'itens de ação'
      },
      {
        valor: '0',
        rotulo: 'cadastros'
      }
    ],
    form: {
      label: 'Etapa por onde começar',
      placeholder: 'Digite a etapa ou o assunto: indexação, schema, GEO…',
      botao: 'Ir para a etapa'
    },
    avisoDemo: 'O painel abaixo é um exemplo de como o progresso aparece. A versão com marcação salva ainda está em construção; hoje o roteiro completo vive na <a href="/escolinha-seo">Escolinha SEO</a>.',
    resultado: {
      titulo: 'Exemplo de progresso',
      sub: 'É assim que o roteiro aparece depois de algumas etapas marcadas.',
      score: {
        num: '3/12',
        label: 'etapas concluídas',
        alvo: 'Base concluída, Técnica em andamento',
        meta: 'Próxima ação sugerida: rodar a primeira auditoria técnica num site seu'
      },
      tabela: {
        head: [
          'Etapa',
          'Itens',
          'Situação'
        ],
        rows: [
          [
            '01. Fundamentos de SEO',
            '5 de 5',
            '<span class="tag on">concluída</span>'
          ],
          [
            '02. Execute um processo de SEO',
            '6 de 6',
            '<span class="tag on">concluída</span>'
          ],
          [
            '03. SEO no seu CMS',
            '6 de 6',
            '<span class="tag on">concluída</span>'
          ],
          [
            '04. Aprofunde seus conhecimentos',
            '4 de 12',
            '<span class="tag">em andamento</span>'
          ],
          [
            '05. Especialista em SEO',
            '0 de 6',
            '<span class="tag">não iniciada</span>'
          ],
          [
            '09. Otimização para IA (GEO/AEO)',
            '0 de 4',
            '<span class="tag">não iniciada</span>'
          ]
        ]
      }
    },
    oQueFaz: {
      titulo: 'O que o roteiro cobre',
      sub: 'Doze etapas em três blocos, do fundamento ao que ainda está se formando.',
      tabela: {
        head: [
          'Bloco',
          'Etapas',
          'O que você sai sabendo'
        ],
        rows: [
          [
            'Base',
            '01 a 04',
            'Como a busca funciona, como montar um processo de SEO e como não quebrar o site no CMS'
          ],
          [
            'Técnica',
            '05 a 08',
            'Auditoria, indexação, Core Web Vitals, SEO local e em outros mecanismos de busca'
          ],
          [
            'IA e prática',
            '09 a 12',
            'GEO e AEO, ferramentas, testes e o que fazer quando o tráfego cai'
          ]
        ]
      }
    },
    passos: [
      {
        titulo: 'Não pule a base',
        texto: 'A tentação é ir direto para a etapa técnica. Quem faz isso decora checklist sem entender por que cada item existe, e trava no primeiro caso que foge do padrão.'
      },
      {
        titulo: 'Marque só o que você fez',
        texto: 'Item marcado por leitura não conta. O roteiro serve para você ver onde está de verdade, e enganar a si mesmo aqui só atrasa você.'
      },
      {
        titulo: 'Volte depois de cada projeto',
        texto: 'Etapa que parecia abstrata na primeira leitura costuma fazer sentido depois que você viu o problema acontecer num site real.'
      }
    ],
    relacionadas: [
      'seo-audit',
      'aeo-geo-checker',
      'monitoramento-de-indexacao'
    ],
    cta: {
      titulo: 'Prefere o roteiro inteiro numa página?',
      texto: 'A Escolinha SEO tem as 12 etapas desenhadas, com as trilhas separadas por frente. Mesmo conteúdo, outra forma de navegar.'
    },
    faq: [
      {
        question: 'O progresso fica salvo?',
        answer: 'Fica no seu navegador, no armazenamento local. Não existe conta e não existe servidor guardando isso, então trocar de computador ou limpar os dados do site zera a marcação. É a troca honesta por não pedir cadastro.'
      },
      {
        question: 'Preciso seguir na ordem?',
        answer: 'Não é obrigatório, mas é recomendado até a etapa 4. Dali para frente dá para escolher a frente que interessa mais, e as trilhas da <a href="/escolinha-seo">Escolinha SEO</a> existem justamente para isso.'
      },
      {
        question: 'Quanto tempo leva o roteiro inteiro?',
        answer: 'Depende de quanto você pratica. Lendo tudo, algumas semanas. Executando cada item num site real, conte meses, porque boa parte das etapas depende de esperar o buscador reagir à mudança.'
      }
    ]
  },

  {
    slug: 'aeo-geo-checker',
    nome: 'AEO/GEO Checker',
    icone: '<rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 3v4"/><path d="M9 13h.01M15 13h.01"/><path d="M9.5 17h5"/>',
    cardTexto: 'Mostra se a sua página está preparada para ser citada por ChatGPT, Perplexity e AI Overviews.',
    tags: [
      {
        label: 'geo/aeo',
        on: false
      },
      {
        label: 'no ar',
        on: true
      }
    ],
    eyebrow: 'Ferramenta gratuita, sem cadastro',
    h1: [
      'A sua página está pronta para ',
      'virar citação',
      ' de IA?'
    ],
    sub: 'Checa os sinais que fazem um assistente escolher a sua página como fonte: resposta direta, entidade declarada, trecho que sobrevive fora do layout e crawler liberado.',
    metaTitle: 'AEO/GEO Checker: sua página está pronta para ser citada por IA? | SEO Maroto',
    metaDescription: 'Analisa se uma URL tem os sinais que AI Overviews, ChatGPT e Perplexity usam para escolher uma fonte: resposta direta, entidades, dados estruturados e acesso de crawler.',
    heroMeta: [
      {
        valor: '12',
        rotulo: 'sinais checados'
      },
      {
        valor: '4',
        rotulo: 'crawlers de IA'
      },
      {
        valor: '~10s',
        rotulo: 'por análise'
      }
    ],
    form: {
      label: 'URL para analisar',
      placeholder: 'https://seusite.com.br/artigo',
      botao: 'Analisar'
    },
    avisoDemo: 'O resultado abaixo é um exemplo estático, escrito para mostrar o formato da saída. A análise ao vivo ainda está em construção.',
    resultado: {
      titulo: 'Exemplo de resultado',
      sub: 'A nota lê os sinais conhecidos. Ela não promete citação, e ferramenta que promete está mentindo.',
      score: {
        num: '58',
        label: 'prontidão para IA',
        alvo: 'seusite.com.br/blog/o-que-e-canonical',
        meta: '12 sinais checados, 4 em falta, 2 bloqueando'
      },
      achados: [
        {
          sev: 'crit',
          rotulo: 'bloqueando',
          titulo: 'GPTBot e ClaudeBot bloqueados no robots.txt',
          texto: 'A página está fora do alcance de dois dos crawlers que alimentam assistentes. É uma decisão legítima, mas então não espere aparecer em resposta de IA. Decida de propósito, não por herança de um robots.txt antigo.'
        },
        {
          sev: 'crit',
          rotulo: 'bloqueando',
          titulo: 'A resposta só aparece depois de 900 palavras',
          texto: 'O começo do texto é contexto de mercado. Modelo que precisa citar procura uma resposta direta perto do topo, com sujeito e predicado, que não dependa do resto da página.'
        },
        {
          sev: 'warn',
          rotulo: 'em falta',
          titulo: 'Sem definição autocontida do termo principal',
          texto: 'O texto usa "canonical" catorze vezes e nunca diz o que é numa frase que funcione sozinha. Trecho citado é extraído fora do contexto: se não faz sentido isolado, não vira citação.'
        },
        {
          sev: 'warn',
          rotulo: 'em falta',
          titulo: 'Nenhuma entidade declarada em JSON-LD',
          texto: 'Não há Article, Person nem Organization. Sem isso o modelo precisa adivinhar quem escreveu e com que autoridade.'
        },
        {
          sev: 'info',
          rotulo: 'ok',
          titulo: 'Hierarquia de heading consistente',
          texto: 'Um H1, H2 em sequência lógica, nenhum salto de nível. É a parte fácil, e essa você já fez.'
        }
      ]
    },
    oQueFaz: {
      titulo: 'O que é checado',
      sub: 'Quatro grupos, do que impede a citação ao que aumenta a chance dela.',
      tabela: {
        head: [
          'Grupo',
          'O que é verificado',
          'Peso'
        ],
        rows: [
          [
            'Acesso',
            'robots.txt para GPTBot, ClaudeBot, PerplexityBot e Google-Extended; status HTTP; renderização sem JavaScript',
            '<span class="tag">bloqueante</span>'
          ],
          [
            'Formato da resposta',
            'resposta direta nos primeiros parágrafos, definições autocontidas, listas e tabelas legíveis fora do layout',
            '<span class="tag">alto</span>'
          ],
          [
            'Entidades',
            'JSON-LD presente, tipo aplicável, autor identificado, sameAs que resolve',
            '<span class="tag">alto</span>'
          ],
          [
            'Sinais de confiança',
            'data de atualização, fonte citada, dado próprio, coerência entre título e conteúdo',
            '<span class="tag">médio</span>'
          ]
        ]
      }
    },
    passos: [
      {
        titulo: 'Comece pelo bloqueante',
        texto: 'Se o crawler não entra, o resto não importa. Resolva acesso antes de reescrever qualquer parágrafo.'
      },
      {
        titulo: 'Escreva a resposta antes do contexto',
        texto: 'Inverta a ordem: primeiro a frase que responde a pergunta, depois o desenvolvimento. Serve para o leitor apressado e para o modelo, pelo mesmo motivo.'
      },
      {
        titulo: 'Teste com a pergunta real',
        texto: 'Depois de corrigir, pergunte ao assistente exatamente o que o seu leitor perguntaria. É medição por amostragem e é imprecisa, mas hoje é a melhor que existe.'
      }
    ],
    relacionadas: [
      'rastreador-de-entidades',
      'gerador-de-schema',
      'seo-audit'
    ],
    cta: {
      titulo: 'Bloquear ou liberar os crawlers de IA?',
      texto: 'Essa decisão é uma conta entre visibilidade e conteúdo raspado, e ela muda conforme o seu modelo de negócio. Dá para montar essa conta junto em meia hora.'
    },
    faq: [
      {
        question: 'A nota garante que eu vou ser citado?',
        answer: 'Não, e desconfie de qualquer ferramenta que prometa isso. A nota mede se os sinais conhecidos estão presentes. Quem decide o que citar é o modelo, com critérios que não são públicos e que mudam.'
      },
      {
        question: 'Isso substitui o SEO tradicional?',
        answer: 'Não. Metade do que é checado aqui é SEO técnico de sempre: acesso do robô, renderização, dados estruturados. GEO é uma camada em cima, não uma troca.'
      },
      {
        question: 'Por que checar o Google-Extended separado?',
        answer: 'Porque ele controla o uso do seu conteúdo em produtos de IA do Google sem afetar o rastreamento para a busca comum. São decisões diferentes, e muita gente bloqueia uma achando que está bloqueando a outra.'
      }
    ]
  },

  {
    slug: 'gerador-de-schema',
    nome: 'Gerador de schema',
    icone: '<path d="M8 6l-5 6 5 6M16 6l5 6-5 6"/>',
    cardTexto: 'Monta o JSON-LD dos tipos que realmente valem a pena, já validado, pronto para colar no template.',
    tags: [
      {
        label: 'dados estruturados',
        on: false
      },
      {
        label: 'no ar',
        on: true
      }
    ],
    eyebrow: 'Ferramenta gratuita, sem cadastro',
    h1: [
      'JSON-LD ',
      'que o Google usa',
      ', pronto para colar'
    ],
    sub: 'Preenche o formulário, sai o dado estruturado validado. Só os tipos que rendem alguma coisa de verdade, sem os quinze campos opcionais que ninguém lê.',
    metaTitle: 'Gerador de schema: JSON-LD validado e pronto para colar | SEO Maroto',
    metaDescription: 'Gera JSON-LD para Article, FAQPage, Product, LocalBusiness, BreadcrumbList e mais. Validado, com os campos que importam, pronto para colar no template.',
    heroMeta: [
      {
        valor: '9',
        rotulo: 'tipos suportados'
      },
      {
        valor: '0',
        rotulo: 'campo inútil'
      },
      {
        valor: '1',
        rotulo: 'clique para copiar'
      }
    ],
    form: {
      label: 'Tipo de schema e dados da página',
      placeholder: 'Article · título, autor, data de publicação, URL da imagem…',
      botao: 'Gerar JSON-LD',
      multilinha: true
    },
    avisoDemo: 'A saída abaixo é um exemplo estático do formato. O gerador com formulário completo ainda está em construção.',
    resultado: {
      titulo: 'Exemplo de saída',
      sub: 'Article com autor identificado e ligação para a organização, por @id.',
      codigo: '{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "@id": "https://seusite.com.br/blog/canonical#article",\n  "headline": "Canonical: o que é, quando usar e os erros que custam tráfego",\n  "description": "O que a tag canonical resolve, o que ela não resolve e os quatro erros que aparecem em quase toda auditoria.",\n  "inLanguage": "pt-BR",\n  "datePublished": "2026-08-14T09:00:00-03:00",\n  "dateModified": "2026-09-02T11:20:00-03:00",\n  "author":    { "@id": "https://seusite.com.br/autor/fulano#person" },\n  "publisher": { "@id": "https://seusite.com.br/#org" },\n  "mainEntityOfPage": {\n    "@type": "WebPage",\n    "@id": "https://seusite.com.br/blog/canonical"\n  }\n}'
    },
    oQueFaz: {
      titulo: 'Tipos suportados',
      sub: 'Nove tipos, escolhidos por renderem resultado e não por existirem no vocabulário.',
      tabela: {
        head: [
          'Tipo',
          'Quando usar',
          'O que costuma render'
        ],
        rows: [
          [
            'Article',
            'post, guia, notícia',
            'autoria e data no grafo, base para E-E-A-T'
          ],
          [
            'FAQPage',
            'página com perguntas de verdade, visíveis',
            'resposta expandida na SERP e trecho citável'
          ],
          [
            'Product',
            'página de produto com preço e estoque',
            'preço, avaliação e disponibilidade no resultado'
          ],
          [
            'LocalBusiness',
            'negócio com endereço físico',
            'horário, telefone e mapa na busca local'
          ],
          [
            'BreadcrumbList',
            'qualquer página com hierarquia',
            'trilha no lugar da URL crua no resultado'
          ],
          [
            'HowTo',
            'passo a passo com etapas reais',
            'os passos estruturados no resultado'
          ],
          [
            'Organization',
            'uma vez por site, na home',
            'identidade da marca no Knowledge Graph'
          ],
          [
            'Person',
            'página de autor',
            'ligação entre autor e o conteúdo publicado'
          ],
          [
            'ItemList',
            'listagem, categoria, coleção',
            'a coleção declarada junto com os itens dela'
          ]
        ]
      }
    },
    passos: [
      {
        titulo: 'Marcado tem que ser visível',
        texto: 'A regra é uma só: não declare no JSON-LD o que não está na página. Preço que só existe no schema é violação de diretriz, não atalho.'
      },
      {
        titulo: 'Use @id estável',
        texto: 'Sem @id, cada bloco vira uma entidade solta. Com @id, o autor do artigo é o mesmo autor da página de autor, e o grafo se liga em vez de virar um punhado de ilhas.'
      },
      {
        titulo: 'Valide depois de publicar',
        texto: 'Gerar válido não garante publicado válido. Template costuma escapar aspas e quebrar o JSON no caminho, e o teste de resultados ricos pega isso em segundos.'
      }
    ],
    relacionadas: [
      'seo-audit',
      'aeo-geo-checker',
      'simulador-serp'
    ],
    cta: {
      titulo: 'Schema espalhado por dezenas de templates?',
      texto: 'Em site grande o problema deixa de ser gerar o JSON-LD e vira decidir onde ele nasce, para não existir escrito em três lugares com valores diferentes.'
    },
    faq: [
      {
        question: 'Dados estruturados melhoram o ranqueamento?',
        answer: 'Não diretamente, e quem diz que sim está simplificando. O que eles mudam é como o resultado aparece e o quanto a máquina entende a página, e isso mexe em CTR e em chance de citação, que aí sim mexem no resultado.'
      },
      {
        question: 'Preciso preencher todos os campos?',
        answer: 'Não. Existe campo obrigatório e campo que muda alguma coisa; o resto é ruído. O gerador só pede o que faz diferença, de propósito.'
      },
      {
        question: 'JSON-LD ou microdata?',
        answer: 'JSON-LD. É o formato recomendado pelo Google, fica separado do HTML e sobrevive a redesign sem precisar ser reescrito no meio da marcação.'
      }
    ]
  },

  {
    slug: 'simulador-serp',
    nome: 'Simulador SERP',
    icone: '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/>',
    cardTexto: 'Preview de título e descrição em pixel, no desktop e no mobile, para você parar de escrever no escuro.',
    tags: [
      {
        label: 'conteúdo',
        on: false
      },
      {
        label: 'no ar',
        on: true
      }
    ],
    eyebrow: 'Ferramenta gratuita, sem cadastro',
    h1: [
      'Pare de escrever title ',
      'no escuro',
      ''
    ],
    sub: 'Preview em pixel, não em caractere. Mostra onde o Google corta no desktop e no mobile, e o que sobra do seu título depois do corte.',
    metaTitle: 'Simulador de SERP: preview de title e description em pixel | SEO Maroto',
    metaDescription: 'Veja como seu título e sua descrição aparecem no resultado do Google, medidos em pixel e não em caractere, no desktop e no mobile.',
    heroMeta: [
      {
        valor: '580px',
        rotulo: 'limite do title'
      },
      {
        valor: '2',
        rotulo: 'larguras testadas'
      },
      {
        valor: '0',
        rotulo: 'contagem de caractere'
      }
    ],
    form: {
      label: 'Título, descrição e URL',
      placeholder: 'Title · Description · https://seusite.com.br/pagina',
      botao: 'Ver preview',
      multilinha: true
    },
    avisoDemo: 'O preview abaixo é um exemplo estático. A versão que mede o seu texto em tempo real ainda está em construção.',
    resultado: {
      titulo: 'Exemplo de preview',
      sub: 'Desktop. O corte acontece em pixel, então título com muitas letras largas corta antes.',
      serp: {
        url: 'seusite.com.br › blog › canonical',
        title: 'Canonical: o que é, quando usar e os erros que custam…',
        desc: 'O que a tag canonical resolve, o que ela não resolve e os quatro erros que aparecem em quase toda auditoria técnica. Com exemplo de cada um.',
        nota: 'O título tem 612px e é cortado aos 580px. Cortar as três últimas palavras resolve.'
      },
      tabela: {
        head: [
          'Elemento',
          'Medida',
          'Situação'
        ],
        rows: [
          [
            'Title (desktop)',
            '612 px de 580',
            '<span class="tag">corta</span>'
          ],
          [
            'Title (mobile)',
            '612 px de 600',
            '<span class="tag">corta</span>'
          ],
          [
            'Description',
            '154 px de 160 caracteres',
            '<span class="tag on">cabe</span>'
          ],
          [
            'URL exibida',
            'trilha de 3 níveis',
            '<span class="tag on">ok</span>'
          ]
        ]
      }
    },
    oQueFaz: {
      titulo: 'O que o simulador mostra',
      sub: 'Quatro coisas que a contagem de caractere não pega.',
      tabela: {
        head: [
          'O que',
          'Por que importa',
          'Regra prática'
        ],
        rows: [
          [
            'Largura em pixel',
            'O Google corta por pixel, não por caractere. "MMMMM" ocupa o dobro de "iiiii".',
            '580px no desktop, 600px no mobile'
          ],
          [
            'Corte no mobile',
            'A largura muda e a linha quebra em outro ponto.',
            'Teste os dois, o mobile é a maioria do tráfego'
          ],
          [
            'Trilha de URL',
            'O resultado mostra a hierarquia, não a URL crua.',
            'BreadcrumbList declarado deixa isso legível'
          ],
          [
            'Reescrita pelo Google',
            'Title ruim é trocado pelo buscador em boa parte dos casos.',
            'Se o seu title está sendo reescrito, o problema não é tamanho'
          ]
        ]
      }
    },
    passos: [
      {
        titulo: 'Escreva para o clique, não para o robô',
        texto: 'Repetir a palavra-chave três vezes não ajuda mais. O que ajuda é o title dizer o que a pessoa ganha ao clicar.'
      },
      {
        titulo: 'Coloque o que importa no começo',
        texto: 'Se cortar, corta o fim. Nome da marca no final do title existe para ser sacrificado sem prejuízo.'
      },
      {
        titulo: 'Confira depois de publicar',
        texto: 'O Google reescreve title em uma parte considerável dos casos. Ver o que ele escolheu mostrar é mais informativo do que qualquer preview.'
      }
    ],
    relacionadas: [
      'gerador-de-schema',
      'seo-audit',
      'aeo-geo-checker'
    ],
    cta: {
      titulo: 'Title bom e mesmo assim sem clique?',
      texto: 'Quando o título já está certo e o CTR continua baixo, o problema costuma ser a intenção da busca, não a escrita. Isso dá para diagnosticar rápido.'
    },
    faq: [
      {
        question: 'Por que pixel e não caractere?',
        answer: 'Porque o Google corta por espaço ocupado. Sessenta caracteres em letras estreitas cabem; os mesmos sessenta em maiúsculas e letras largas não. Contar caractere é uma aproximação que erra justamente nos casos limite.'
      },
      {
        question: 'O Google usa a minha description?',
        answer: 'Às vezes. Ele troca por um trecho da página quando acha que responde melhor à busca daquela pessoa. Escreva a description mesmo assim: quando ela é usada, é ela que decide o clique.'
      },
      {
        question: 'Qual o tamanho ideal do title?',
        answer: 'O que couber sem cortar e disser a coisa. Perseguir um número mágico produz títulos truncados ou inflados com palavra vazia só para chegar ao limite.'
      }
    ]
  },

  {
    slug: 'teste-status-http',
    nome: 'Teste de status HTTP',
    icone: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>',
    cardTexto: 'Segue a cadeia de redirects até o fim e mostra cada salto, com o código e o tempo de resposta.',
    tags: [
      {
        label: 'técnico',
        on: false
      },
      {
        label: 'no ar',
        on: true
      }
    ],
    eyebrow: 'Ferramenta gratuita, sem cadastro',
    h1: [
      'A cadeia de redirect ',
      'inteira',
      ', não só o destino'
    ],
    sub: 'Cola a URL e veja cada salto: código, destino, tempo e o que se perde no caminho. É onde mora boa parte do link interno que evapora numa migração.',
    metaTitle: 'Teste de status HTTP: cadeia de redirect completa | SEO Maroto',
    metaDescription: 'Veja todos os saltos de uma URL: código de status, destino, tempo de resposta e cadeias longas que desperdiçam rastreio e diluem link.',
    heroMeta: [
      {
        valor: '10',
        rotulo: 'saltos rastreados'
      },
      {
        valor: '2',
        rotulo: 'user-agents'
      },
      {
        valor: '~2s',
        rotulo: 'por teste'
      }
    ],
    form: {
      label: 'URL para testar',
      placeholder: 'https://seusite.com.br/pagina-antiga',
      botao: 'Testar'
    },
    avisoDemo: 'A cadeia abaixo é um exemplo estático. O teste ao vivo ainda está em construção.',
    resultado: {
      titulo: 'Exemplo de resultado',
      sub: 'Quatro saltos até o destino. Três a mais do que deveria.',
      tabela: {
        head: [
          '#',
          'URL',
          'Status',
          'Tempo'
        ],
        rows: [
          [
            '1',
            'http://seusite.com.br/tenis-corrida',
            '<span class="tag">301</span>',
            '92 ms'
          ],
          [
            '2',
            'https://seusite.com.br/tenis-corrida',
            '<span class="tag">301</span>',
            '78 ms'
          ],
          [
            '3',
            'https://www.seusite.com.br/tenis-corrida',
            '<span class="tag">302</span>',
            '81 ms'
          ],
          [
            '4',
            'https://www.seusite.com.br/categoria/tenis-de-corrida',
            '<span class="tag on">200</span>',
            '143 ms'
          ]
        ]
      },
      achados: [
        {
          sev: 'crit',
          rotulo: 'crítico',
          titulo: 'O terceiro salto é 302, não 301',
          texto: 'Redirect temporário no meio de uma mudança definitiva. O buscador entende que a URL antiga volta, e segura o sinal em vez de transferir.'
        },
        {
          sev: 'warn',
          rotulo: 'alto',
          titulo: 'Quatro saltos onde caberia um',
          texto: 'http sem www e sem barra final deveria ir direto ao destino final. Cadeia longa gasta orçamento de rastreio e perde um pouco de sinal a cada salto.'
        },
        {
          sev: 'info',
          rotulo: 'médio',
          titulo: 'Tempo total de 394 ms só em redirect',
          texto: 'Isso entra inteiro no tempo até o primeiro byte da página que o usuário pediu. Num template de categoria, multiplica por todo mundo que chega por link antigo.'
        }
      ]
    },
    oQueFaz: {
      titulo: 'O que o teste mostra',
      sub: 'O que costuma quebrar sem ninguém notar.',
      tabela: {
        head: [
          'Situação',
          'Como aparece aqui',
          'O que fazer'
        ],
        rows: [
          [
            'Cadeia longa',
            'três ou mais saltos até o 200',
            'apontar a origem direto para o destino final'
          ],
          [
            'Redirect temporário',
            '302 ou 307 numa mudança permanente',
            'trocar por 301 quando a mudança é definitiva'
          ],
          [
            'Laço de redirect',
            'a mesma URL aparece duas vezes',
            'achar a regra do servidor que se contradiz'
          ],
          [
            'Soft 404',
            '200 numa página que diz "não encontrado"',
            'devolver 404 de verdade, senão o índice enche de página vazia'
          ],
          [
            'Diferença por user-agent',
            'robô recebe destino diferente do navegador',
            'conferir se não é cloaking acidental'
          ]
        ]
      }
    },
    passos: [
      {
        titulo: 'Teste a URL que está no link antigo',
        texto: 'Não teste a URL nova. O que interessa é o caminho que quem vem de fora percorre, e ele começa no endereço que está publicado por aí.'
      },
      {
        titulo: 'Corte pela origem',
        texto: 'Resolver a cadeia é apontar o primeiro salto direto para o 200. Consertar do meio para frente deixa o desperdício onde ele estava.'
      },
      {
        titulo: 'Refaça depois do deploy',
        texto: 'Regra de redirect é o tipo de coisa que volta atrás sozinha num deploy de infraestrutura. Vale testar de novo depois de qualquer mudança de servidor.'
      }
    ],
    relacionadas: [
      'extrator-de-sitemap',
      'seo-audit',
      'monitoramento-de-indexacao'
    ],
    cta: {
      titulo: 'Migração à vista?',
      texto: 'Cadeia de redirect é o item que mais derruba tráfego em migração, e é o mais fácil de planejar antes. Meia hora de conversa evita meses de recuperação.'
    },
    faq: [
      {
        question: 'Quantos saltos são aceitáveis?',
        answer: 'Um. Dois se houver um bom motivo, como http para https e depois a normalização de domínio. A partir de três você está pagando um pedágio sem receber nada em troca.'
      },
      {
        question: '301 e 308 são a mesma coisa?',
        answer: 'Para SEO, na prática, sim: os dois sinalizam mudança permanente. A diferença é que o 308 preserva o método HTTP, o que importa em formulário e em API, não em página de conteúdo.'
      },
      {
        question: 'Redirect perde autoridade?',
        answer: 'Muito menos do que se dizia dez anos atrás, e o Google já afirmou que 301 não tem perda relevante. O que continua custando caro é a cadeia longa, o laço e o redirect para página irrelevante.'
      }
    ]
  },

  {
    slug: 'extrator-de-sitemap',
    nome: 'Extrator de sitemap',
    icone: '<rect x="9" y="3" width="6" height="5" rx="1.5"/><rect x="2" y="16" width="6" height="5" rx="1.5"/><rect x="16" y="16" width="6" height="5" rx="1.5"/><path d="M12 8v4M5 16v-4h14v4"/>',
    cardTexto: 'Puxa todas as URLs de um sitemap, inclusive os aninhados, e devolve em lista pronta para planilha.',
    tags: [
      {
        label: 'técnico',
        on: false
      },
      {
        label: 'no ar',
        on: true
      }
    ],
    eyebrow: 'Ferramenta gratuita, sem cadastro',
    h1: [
      'Todas as URLs do sitemap, ',
      'em uma tabela',
      ' que você copia'
    ],
    sub: 'Lê o sitemap, segue os índices aninhados e devolve a lista limpa, com data de modificação. Para você cruzar com o que está indexado e ver o buraco.',
    metaTitle: 'Extrator de sitemap: todas as URLs em uma tabela | SEO Maroto',
    metaDescription: 'Extrai as URLs de qualquer sitemap.xml, inclusive índices aninhados e arquivos comprimidos, e devolve tudo numa tabela pronta para copiar.',
    heroMeta: [
      {
        valor: '50 mil',
        rotulo: 'URLs por arquivo'
      },
      {
        valor: '.gz',
        rotulo: 'suportado'
      },
      {
        valor: '1',
        rotulo: 'clique para copiar'
      }
    ],
    form: {
      label: 'URL do sitemap',
      placeholder: 'https://seusite.com.br/sitemap.xml',
      botao: 'Extrair'
    },
    avisoDemo: 'A tabela abaixo é um exemplo estático. A extração ao vivo ainda está em construção.',
    resultado: {
      titulo: 'Exemplo de resultado',
      sub: 'Índice com quatro sitemaps, 12.480 URLs no total.',
      score: {
        num: '12.480',
        label: 'URLs extraídas',
        alvo: 'seusite.com.br/sitemap.xml',
        meta: '4 sitemaps no índice, 3 avisos, 0 erro de sintaxe'
      },
      tabela: {
        head: [
          'Sitemap',
          'URLs',
          'Última modificação'
        ],
        rows: [
          [
            'sitemap-produtos.xml',
            '9.812',
            '02/09/2026'
          ],
          [
            'sitemap-categorias.xml',
            '1.940',
            '02/09/2026'
          ],
          [
            'sitemap-blog.xml',
            '694',
            '06/09/2026'
          ],
          [
            'sitemap-institucional.xml',
            '34',
            '14/03/2026'
          ]
        ]
      },
      achados: [
        {
          sev: 'warn',
          rotulo: 'alto',
          titulo: '2.104 URLs do sitemap respondem 301',
          texto: 'Sitemap é uma declaração do que você quer indexado, e URL que redireciona não é isso. Liste só o destino final.'
        },
        {
          sev: 'warn',
          rotulo: 'alto',
          titulo: '31 URLs com noindex estão listadas',
          texto: 'Anunciar para o robô uma página que manda ele não indexar é sinal contraditório, e vira ruído no relatório de cobertura.'
        },
        {
          sev: 'info',
          rotulo: 'médio',
          titulo: 'lastmod idêntico em 9.812 URLs',
          texto: 'Data igual para o catálogo inteiro costuma ser carimbo automático do build, não modificação real. O buscador aprende a ignorar o campo.'
        }
      ]
    },
    oQueFaz: {
      titulo: 'O que a extração resolve',
      sub: 'O uso não é curiosidade, é cruzamento.',
      tabela: {
        head: [
          'Uso',
          'O que cruzar',
          'O que você descobre'
        ],
        rows: [
          [
            'Cobertura',
            'sitemap contra Search Console',
            'quanto do que você declara está de fato indexado'
          ],
          [
            'Páginas órfãs',
            'sitemap contra crawl do site',
            'o que existe no XML e não recebe link interno nenhum'
          ],
          [
            'Inventário fantasma',
            'sitemap contra status HTTP',
            'quanta URL listada já não responde 200'
          ],
          [
            'Ritmo de publicação',
            'lastmod ao longo do tempo',
            'se o conteúdo é atualizado ou só acumulado'
          ]
        ]
      }
    },
    passos: [
      {
        titulo: 'Comece pelo índice',
        texto: 'Site grande tem um sitemap índice apontando para vários arquivos. Extrair um só dá uma foto parcial e leva a conclusão errada.'
      },
      {
        titulo: 'Cruze com o Search Console',
        texto: 'A lista sozinha não diz nada. O valor aparece na diferença entre o que você declara e o que o buscador aceitou.'
      },
      {
        titulo: 'Desconfie de sitemap grande demais',
        texto: 'Catálogo com centenas de milhares de URLs quase sempre tem inventário que não deveria estar lá. Cortar costuma render mais que empurrar.'
      }
    ],
    relacionadas: [
      'monitoramento-de-indexacao',
      'teste-status-http',
      'seo-audit'
    ],
    cta: {
      titulo: 'O sitemap lista tudo e o índice não acompanha?',
      texto: 'É o sintoma mais comum em catálogo grande, e quase nunca se resolve aumentando o inventário. Dá para olhar o seu caso em meia hora.'
    },
    faq: [
      {
        question: 'Funciona com sitemap comprimido?',
        answer: 'Funciona. Arquivo .gz é descompactado antes da leitura, que é o formato padrão de quase todo ecommerce grande.'
      },
      {
        question: 'Segue índice aninhado?',
        answer: 'Segue, e é o comportamento padrão. Se você quiser só um arquivo específico, é só apontar direto para ele em vez do índice.'
      },
      {
        question: 'Existe limite de URLs?',
        answer: 'O limite é o do próprio protocolo: 50 mil URLs por arquivo. Acima disso o site precisa de índice, e a extração percorre os arquivos de dentro dele.'
      }
    ]
  },

  {
    slug: 'trafego-vs-receita',
    nome: 'Tráfego vs receita',
    icone: '<path d="M3 18V6l6 5 3-4 3 4 6-5v12z"/>',
    cardTexto: 'Traduz sessão orgânica em dinheiro, para a conversa com a diretoria parar de ser sobre posição média.',
    tags: [
      {
        label: 'negócio',
        on: false
      },
      {
        label: 'em breve',
        on: true
      }
    ],
    eyebrow: 'Em construção',
    h1: [
      'Quanto o orgânico ',
      'realmente gera',
      ' no seu negócio'
    ],
    sub: 'Cruza sessão, conversão e ticket para transformar tráfego em número que a diretoria entende. Serve tanto para defender orçamento quanto para descobrir que o tráfego que você mais persegue não paga nada.',
    metaTitle: 'Tráfego vs receita: quanto o SEO gera de verdade | SEO Maroto',
    metaDescription: 'Calculadora que cruza sessões orgânicas, taxa de conversão e ticket médio para estimar a receita vinda do SEO e o valor de cada posição ganha.',
    heroMeta: [
      {
        valor: '3',
        rotulo: 'entradas'
      },
      {
        valor: '12',
        rotulo: 'meses de projeção'
      },
      {
        valor: '0',
        rotulo: 'planilha para montar'
      }
    ],
    form: {
      label: 'Sessões, conversão e ticket',
      placeholder: '18.000 sessões/mês · 1,4% de conversão · R$ 320 de ticket',
      botao: 'Calcular',
      multilinha: true
    },
    avisoDemo: 'Esta ferramenta ainda está em construção. Os números abaixo são um exemplo do formato da saída, com dados fictícios.',
    resultado: {
      titulo: 'Exemplo de resultado',
      sub: 'O valor de cada faixa de posição, com os números do exemplo.',
      score: {
        num: 'R$ 80.640',
        label: 'receita orgânica/mês',
        alvo: '18.000 sessões · 1,4% · R$ 320',
        meta: 'R$ 4,48 por sessão orgânica, R$ 320 por conversão'
      },
      tabela: {
        head: [
          'Cenário',
          'Sessões/mês',
          'Receita estimada'
        ],
        rows: [
          [
            'Hoje',
            '18.000',
            'R$ 80.640'
          ],
          [
            '+15% de sessões',
            '20.700',
            'R$ 92.736'
          ],
          [
            'Mesma sessão, conversão de 1,4% para 1,8%',
            '18.000',
            'R$ 103.680'
          ],
          [
            'Sair da posição 6 para a 3 nos 20 termos principais',
            '24.300',
            'R$ 108.864'
          ]
        ]
      },
      achados: [
        {
          sev: 'info',
          rotulo: 'leitura',
          titulo: 'Subir a conversão rende mais que subir o tráfego',
          texto: 'Neste exemplo, ganhar 0,4 ponto de conversão vale mais que crescer 15% em sessão, e costuma ser mais barato. É o tipo de conta que muda a prioridade da equipe.'
        },
        {
          sev: 'warn',
          rotulo: 'cuidado',
          titulo: 'Ticket médio esconde mistura',
          texto: 'Se o site vende de R$ 40 a R$ 4.000, a média não descreve nada. Rode a conta por linha de produto ou o número vira ficção com casa decimal.'
        }
      ]
    },
    oQueFaz: {
      titulo: 'O que a conta considera',
      sub: 'Três entradas, e a honestidade sobre o que elas não capturam.',
      tabela: {
        head: [
          'Entrada',
          'De onde tirar',
          'Cuidado'
        ],
        rows: [
          [
            'Sessões orgânicas',
            'GA4, canal orgânico, últimos 90 dias',
            'separe marca de não-marca, senão infla tudo'
          ],
          [
            'Taxa de conversão',
            'GA4 ou o próprio checkout',
            'use a do orgânico, não a do site inteiro'
          ],
          [
            'Ticket médio',
            'receita dividida por pedidos',
            'por linha de produto quando a variação é grande'
          ],
          [
            'Atribuição',
            'o modelo que você declara usar',
            'último clique subestima SEO em compra pensada'
          ]
        ]
      }
    },
    passos: [
      {
        titulo: 'Tire a marca da conta',
        texto: 'Busca pelo nome da empresa converte muito e não é mérito do SEO. Misturar as duas produz um número bonito que não sobrevive à primeira pergunta difícil.'
      },
      {
        titulo: 'Diga qual modelo de atribuição usou',
        texto: 'Receita orgânica sem modelo declarado é número que ninguém consegue verificar, e a primeira coisa que financeiro vai contestar.'
      },
      {
        titulo: 'Apresente a faixa, não o ponto',
        texto: 'Estimativa com uma casa decimal passa uma precisão que não existe. Um intervalo com premissa explícita é mais defensável e mais honesto.'
      }
    ],
    relacionadas: [
      'monitoramento-de-indexacao',
      'seo-audit',
      'seo-roadmap'
    ],
    cta: {
      titulo: 'Precisa defender orçamento de SEO?',
      texto: 'A conta é a parte fácil. O difícil é escolher a premissa que sobrevive à pergunta do financeiro, e isso é conversa de meia hora.'
    },
    faq: [
      {
        question: 'Isso substitui atribuição de verdade?',
        answer: 'Não. É uma estimativa de ordem de grandeza, útil para priorizar e para conversar com quem decide orçamento. Atribuição séria exige dado do seu próprio funil, não uma calculadora pública.'
      },
      {
        question: 'Serve para site que não vende nada?',
        answer: 'Serve, trocando ticket por valor de lead. Se o seu lead vale R$ 80 e converte a 12% em cliente, o cálculo é o mesmo com outros nomes.'
      },
      {
        question: 'Por que separar marca de não-marca?',
        answer: 'Porque busca por marca é demanda que já existia. Contar ela como resultado de SEO faz o número parecer ótimo e esconde se o trabalho está trazendo gente nova.'
      }
    ]
  },

  {
    slug: 'rastreador-de-entidades',
    nome: 'Rastreador de entidades',
    icone: '<circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M6.6 7.4 10 10.3M17.4 7.4 14 10.3M6.6 16.6 10 13.7M17.4 16.6 14 13.7"/>',
    cardTexto: 'Identifica as entidades que o Google associa ao seu conteúdo e aponta as que estão faltando.',
    tags: [
      {
        label: 'geo/aeo',
        on: false
      },
      {
        label: 'em breve',
        on: true
      }
    ],
    eyebrow: 'Em construção',
    h1: [
      'O que o Google ',
      'entende',
      ' que a sua página é'
    ],
    sub: 'Extrai as entidades que a página declara e as que ela só menciona, e mostra onde as duas listas não batem. É o mapa de como a máquina lê o seu conteúdo.',
    metaTitle: 'Rastreador de entidades: o que a máquina entende da sua página | SEO Maroto',
    metaDescription: 'Extrai entidades declaradas em JSON-LD e entidades mencionadas no texto, compara as duas e aponta onde a página está ambígua para o buscador e para a IA.',
    heroMeta: [
      {
        valor: '2',
        rotulo: 'fontes comparadas'
      },
      {
        valor: '~8s',
        rotulo: 'por página'
      },
      {
        valor: '0',
        rotulo: 'cadastro'
      }
    ],
    form: {
      label: 'URL para mapear',
      placeholder: 'https://seusite.com.br/sobre',
      botao: 'Mapear entidades'
    },
    avisoDemo: 'Esta ferramenta ainda está em construção. O mapa abaixo é um exemplo do formato da saída, com dados fictícios.',
    resultado: {
      titulo: 'Exemplo de resultado',
      sub: 'Entidades declaradas contra entidades mencionadas.',
      tabela: {
        head: [
          'Entidade',
          'Declarada em JSON-LD',
          'Mencionada no texto'
        ],
        rows: [
          [
            'Organization: Loja Exemplo',
            '<span class="tag on">sim</span>',
            '14 vezes'
          ],
          [
            'Person: Fulano de Tal',
            '<span class="tag">não</span>',
            '6 vezes, com cargo'
          ],
          [
            'Place: Itapetininga, SP',
            '<span class="tag">não</span>',
            '3 vezes'
          ],
          [
            'Product: Tênis de corrida',
            '<span class="tag on">sim</span>',
            '22 vezes'
          ],
          [
            'Organization: concorrente citado',
            '<span class="tag">não</span>',
            '9 vezes'
          ]
        ]
      },
      achados: [
        {
          sev: 'crit',
          rotulo: 'ambíguo',
          titulo: 'O autor aparece seis vezes e não existe no grafo',
          texto: 'O texto atribui opinião e experiência a uma pessoa que nenhum dado estruturado identifica. Para E-E-A-T e para citação em IA, essa pessoa não existe.'
        },
        {
          sev: 'warn',
          rotulo: 'risco',
          titulo: 'O concorrente é citado mais que um produto seu',
          texto: 'Nove menções a outra marca sem contraponto declarado. A página pode acabar sendo entendida como sendo sobre eles, não sobre você.'
        },
        {
          sev: 'info',
          rotulo: 'oportunidade',
          titulo: 'A cidade é mencionada e não é declarada',
          texto: 'Três menções a Itapetininga sem nenhum sinal de local no schema. Para busca local, é sinal de graça sendo deixado na mesa.'
        }
      ]
    },
    oQueFaz: {
      titulo: 'O que é comparado',
      sub: 'Duas leituras da mesma página, e a diferença entre elas.',
      tabela: {
        head: [
          'Fonte',
          'O que é lido',
          'Por que importa'
        ],
        rows: [
          [
            'JSON-LD',
            'tipos, @id, sameAs, campos preenchidos',
            'é o que você afirma explicitamente'
          ],
          [
            'Texto visível',
            'nomes próprios, marcas, lugares, pessoas',
            'é o que a máquina infere lendo'
          ],
          [
            'Divergência',
            'o que está num e não no outro',
            'é onde a página fica ambígua'
          ],
          [
            'sameAs',
            'se os perfis declarados resolvem',
            'link quebrado no sameAs enfraquece a entidade'
          ]
        ]
      }
    },
    passos: [
      {
        titulo: 'Declare quem assina',
        texto: 'Se a página tem opinião, alguém a assina. Person no schema com sameAs que resolve é o sinal mais barato de autoridade que existe.'
      },
      {
        titulo: 'Não declare o que não está escrito',
        texto: 'O caminho é o inverso: se a entidade importa, ela aparece no texto e no schema. Declarar sem mostrar é o erro que vira penalidade.'
      },
      {
        titulo: 'Cuide do sameAs',
        texto: 'Perfil que dá 404 no sameAs é pior que sameAs ausente, porque enfraquece a confiança em tudo que a entidade afirma.'
      }
    ],
    relacionadas: [
      'aeo-geo-checker',
      'gerador-de-schema',
      'seo-audit'
    ],
    cta: {
      titulo: 'Marca com identidade espalhada?',
      texto: 'Quando a mesma empresa aparece com nomes diferentes em cada template, o grafo não fecha. Consolidar isso é trabalho de arquitetura, e começa por um diagnóstico.'
    },
    faq: [
      {
        question: 'Isso é o Knowledge Graph do Google?',
        answer: 'Não. É uma leitura do que a sua página declara e menciona. O Knowledge Graph é do Google, não é público e ninguém consulta de fora. O que dá para fazer é cuidar do sinal que você emite.'
      },
      {
        question: 'Preciso declarar toda entidade citada?',
        answer: 'Não, e declarar demais atrapalha. Declare quem assina, o que a página vende ou explica, e o lugar quando ele importa. Concorrente citado não entra no seu schema.'
      },
      {
        question: 'Isso ajuda em busca por IA?',
        answer: 'Ajuda, e é o principal motivo de a ferramenta existir. Modelo precisa saber quem está falando para decidir se cita. Entidade ambígua é fonte que ele prefere não usar.'
      }
    ]
  },

  {
    slug: 'monitoramento-de-indexacao',
    nome: 'Monitoramento de indexação',
    icone: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12 18.4 5.6"/>',
    cardTexto: 'Acompanha o que entra e o que cai do índice, com alerta quando a queda deixa de ser ruído.',
    tags: [
      {
        label: 'técnico',
        on: false
      },
      {
        label: 'em breve',
        on: true
      }
    ],
    eyebrow: 'Em construção',
    h1: [
      'O que ',
      'entrou e o que caiu',
      ' do índice, por semana'
    ],
    sub: 'Acompanha um conjunto de URLs ao longo do tempo e avisa quando alguma sai do índice. Porque queda de tráfego quase sempre começa como queda de cobertura, semanas antes.',
    metaTitle: 'Monitoramento de indexação: o que entrou e o que caiu do índice | SEO Maroto',
    metaDescription: 'Acompanha a cobertura de um conjunto de URLs ao longo das semanas e avisa quando páginas saem do índice, antes de a queda aparecer no tráfego.',
    heroMeta: [
      {
        valor: '500',
        rotulo: 'URLs por lista'
      },
      {
        valor: '7 dias',
        rotulo: 'entre checagens'
      },
      {
        valor: '1',
        rotulo: 'e-mail por semana'
      }
    ],
    form: {
      label: 'Lista de URLs ou sitemap',
      placeholder: 'https://seusite.com.br/sitemap.xml ou uma URL por linha',
      botao: 'Monitorar',
      multilinha: true
    },
    avisoDemo: 'Esta ferramenta ainda está em construção. O painel abaixo é um exemplo do formato da saída, com dados fictícios.',
    resultado: {
      titulo: 'Exemplo de painel',
      sub: 'Quatro semanas de acompanhamento de um catálogo.',
      score: {
        num: '-118',
        label: 'URLs no índice',
        alvo: 'seusite.com.br · 4.212 URLs monitoradas',
        meta: 'de 3.940 para 3.822 em quatro semanas, queda concentrada em um template'
      },
      tabela: {
        head: [
          'Semana',
          'No índice',
          'Variação'
        ],
        rows: [
          [
            '12 de agosto',
            '3.940',
            '—'
          ],
          [
            '19 de agosto',
            '3.931',
            '-9'
          ],
          [
            '26 de agosto',
            '3.833',
            '<span class="tag">-98</span>'
          ],
          [
            '02 de setembro',
            '3.822',
            '-11'
          ]
        ]
      },
      achados: [
        {
          sev: 'crit',
          rotulo: 'crítico',
          titulo: '98 URLs saíram na mesma semana, todas de /categoria/',
          texto: 'Queda concentrada num template e numa data é assinatura de mudança no site, não de flutuação do buscador. Vale olhar o que foi para produção em 26 de agosto.'
        },
        {
          sev: 'warn',
          rotulo: 'alto',
          titulo: 'As 98 respondem 200 e têm noindex',
          texto: 'A página existe, carrega e manda o robô não indexar. Quase sempre é regra de template aplicada a mais, não decisão consciente.'
        },
        {
          sev: 'info',
          rotulo: 'contexto',
          titulo: 'O tráfego ainda não caiu',
          texto: 'O tráfego dessas URLs cai com atraso em relação à saída do índice. Detectar aqui é a diferença entre corrigir agora e explicar depois.'
        }
      ]
    },
    oQueFaz: {
      titulo: 'O que é monitorado',
      sub: 'Cobertura ao longo do tempo, e o contexto para entender a variação.',
      tabela: {
        head: [
          'O que',
          'Como é medido',
          'Para que serve'
        ],
        rows: [
          [
            'Presença no índice',
            'checagem semanal por URL',
            'ver a queda antes de ela virar queda de tráfego'
          ],
          [
            'Status HTTP',
            'resposta de cada URL da lista',
            'separar página removida de página quebrada'
          ],
          [
            'Meta robots',
            'noindex aplicado por template',
            'pegar regra que vazou para onde não devia'
          ],
          [
            'Agrupamento',
            'por diretório e por template',
            'descobrir que a queda tem uma causa só'
          ]
        ]
      }
    },
    passos: [
      {
        titulo: 'Monitore o que gera receita',
        texto: 'Não monitore o site inteiro. Escolha o template que paga a conta e as URLs que trazem conversão, senão o painel vira ruído que ninguém abre.'
      },
      {
        titulo: 'Olhe o agrupamento antes do total',
        texto: 'O número total quase nunca explica. A informação está em qual diretório concentrou a queda, porque isso aponta direto para a causa.'
      },
      {
        titulo: 'Cruze com a data de deploy',
        texto: 'Queda concentrada numa semana é quase sempre alguma coisa que foi para produção. Ter o calendário de deploy ao lado do painel resolve metade dos casos em minutos.'
      }
    ],
    relacionadas: [
      'extrator-de-sitemap',
      'seo-audit',
      'teste-status-http'
    ],
    cta: {
      titulo: 'Já perdeu tráfego sem saber por quê?',
      texto: 'Na maioria dos casos o rastro existia semanas antes, na cobertura. Se você está no meio de uma queda agora, dá para investigar junto.'
    },
    faq: [
      {
        question: 'Isso substitui o Search Console?',
        answer: 'Não, e nem tenta. O Search Console é a fonte oficial e mais completa. O que falta lá é acompanhamento de uma lista escolhida por você, com alerta quando ela muda, e é só isso que esta ferramenta faz.'
      },
      {
        question: 'Com que frequência a checagem roda?',
        answer: 'Semanal. Diário daria a ilusão de precisão: indexação oscila naturalmente de um dia para o outro, e ver esse ruído todo dia leva a reagir a nada.'
      },
      {
        question: 'Por que a queda de tráfego demora a aparecer?',
        answer: 'Porque a URL sai do índice e para de receber impressão aos poucos, conforme as buscas acontecem. Em página de cauda longa, o efeito pode levar semanas para ficar visível no relatório.'
      }
    ]
  },

]

export const ferramentaSlugs = ferramentas.map((f) => f.slug)

export function getFerramenta(slug: string): Ferramenta | undefined {
  return ferramentas.find((f) => f.slug === slug)
}
