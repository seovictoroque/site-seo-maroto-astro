<div align="center">

<img src="public/img/icon-seomaroto.png" width="150" alt="SEO Maroto">

# SEO Maroto

**SEO sem enrolação, sem guru e sem firula.**

O site [seomaroto.com.br](https://seomaroto.com.br) em Astro, gerado como build estático.

<br>

![Astro](https://img.shields.io/badge/Astro-D9A441?style=for-the-badge&logo=astro&logoColor=0D0904)
![TypeScript](https://img.shields.io/badge/TypeScript-9C7226?style=for-the-badge&logo=typescript&logoColor=F0E4CF)
![MDX](https://img.shields.io/badge/MDX-C1573A?style=for-the-badge&logo=mdx&logoColor=F0E4CF)
![Zero JS por padrão](https://img.shields.io/badge/JS_no_cliente-só_onde_precisa-1C130B?style=for-the-badge)

</div>

<br>

## 🔍 O que é

Blog técnico de SEO, laboratório de experimentos, trilhas de estudo e, no futuro, ferramentas gratuitas.

O site nasceu em HTML puro, no repositório [site-seo-maroto-html](https://github.com/seovictoroque/site-seo-maroto), que agora é arquivo de referência. Aqui os mesmos layouts viraram componentes de verdade, sem uma linha de header ou de footer duplicada.

**Por que Astro e não Next.js:** o site é conteúdo, não aplicação. O Astro entrega HTML estático e só manda JavaScript para o cliente onde alguém pediu, o que é a diferença que aparece no Core Web Vitals. As ferramentas que vêm depois entram como ilhas isoladas, sem arrastar um framework inteiro para dentro de cada página de artigo.

**Sem CMS por enquanto.** O conteúdo mora em Markdown e MDX no próprio repositório, lido por uma Content Collection. Isso não é um beco sem saída: o `loader` da collection é a única peça que sabe de onde o conteúdo vem, então trocar por um CMS headless amanhã é trocar esse loader, sem tocar em nenhum componente.

<br>

## 📂 Estrutura

```
site-seo-maroto-astro/
│
├── 📁 public/                        servido como está, sem processamento
│   ├── 📁 img/                       favicons, logo, ícone e foto do autor
│   ├── ⚙️ .htaccess                  regras de URL e cache para o Apache da Hostinger
│   └── 🤖 robots.txt
│
├── 📁 src/
│   ├── 📁 layouts/
│   │   ├── BaseLayout.astro          head, meta, OG, canonical, schema, header e footer
│   │   └── BlogLayout.astro          BaseLayout + sub-menu + <main class="blog-main">
│   │
│   ├── 📁 components/
│   │   ├── 📁 layout/                Header, Footer, BlogSubnav, Breadcrumb, Icon
│   │   ├── 📁 blog/                  PostCard, PostRow, CardGrid, LoadMore, banners
│   │   └── 📁 post/                  KeyPoints, AiSummary, ExpertQuote, Faq, Toc, AiTools
│   │
│   ├── 📁 pages/                     cada arquivo aqui vira uma rota
│   ├── 📁 content/blog/              os posts, em .md e .mdx
│   ├── 📄 content.config.ts          schema da collection
│   │
│   ├── 📁 data/                      dados que não são conteúdo editorial
│   │   ├── site.ts                   domínio, nome, tagline, OG padrão
│   │   ├── navigation.ts             menu, redes sociais e colunas do rodapé
│   │   ├── categories.ts             as 8 categorias do blog
│   │   ├── authors.ts                autores, com bio, credenciais e sameAs
│   │   ├── icons.ts                  o miolo de cada SVG usado no site
│   │   ├── cover-art.ts              ids da arte de capa provisória
│   │   └── ai-tools.ts               as 8 ferramentas do bloco "analisar com IA"
│   │
│   ├── 📁 lib/                       lógica sem interface
│   │   ├── posts.ts                  consultas da collection
│   │   ├── paginate.ts               paginação com URL /pagina/N
│   │   └── schema.ts                 construtores de JSON-LD
│   │
│   ├── 📁 scripts/                   JavaScript de cliente, um arquivo por comportamento
│   └── 📁 styles/
│       ├── global.css                tokens, reset e a calha de conteúdo
│       └── blog-primitives.css       primitivos exclusivos das páginas de blog
│
├── ⚙️ astro.config.mjs
└── 📖 README.md
```

<br>

## 🖥️ Rodando localmente

Precisa de Node 20 ou mais novo.

```bash
npm install
npm run dev        # http://localhost:4321
```

| Comando | O que faz |
|:--|:--|
| `npm run dev` | servidor de desenvolvimento com hot reload |
| `npm run build` | gera o site estático em `dist/` |
| `npm run preview` | serve o `dist/` para conferir antes de subir |
| `npm run check` | checagem de tipos e de props dos componentes |

<br>

## 🚀 Deploy na Hostinger

O site sai como HTML estático, sem Node rodando no servidor.

```bash
npm run build
```

Suba **o conteúdo de `dist/`** para `public_html`. O `.htaccess` vai junto, porque ele mora em `public/` e é copiado no build. Ele resolve três coisas:

1. `DirectorySlash Off` e a reescrita interna, para `/blog` servir `/blog/index.html` sem redirecionar
2. 301 de qualquer URL com barra no fim para a versão sem barra, que é o formato dos canonicals
3. cache longo para asset com hash e cache zero para HTML

> ⚠️ Se um dia você mudar `trailingSlash` no `astro.config.mjs`, mude também o `.htaccess` e os canonicals. Os três precisam contar a mesma história, senão o Google vê duas URLs para a mesma página.

<br>

## 🧩 Convenção de componentes

**Um Header só, com prop `variant`.** No repositório em HTML existiam `menu-header.html` e `menu-header-blog.html`. O CSS dos dois era byte a byte idêntico e o HTML diferia em três pontos: o link ativo, um bloco de categorias no painel mobile e a faixa de sub-menu depois do header.

```astro
<Header />                  <!-- resto do site -->
<Header variant="blog" />   <!-- páginas de blog, acrescenta as categorias no menu mobile -->
```

O **estado ativo sai de `Astro.url.pathname`**. Nenhuma página precisa dizer onde está.

A faixa de categorias é o `BlogSubnav`, componente separado: tem paleta própria nas variáveis `--sn-*`, sticky próprio em `top:69px` e JavaScript próprio. Quem monta os dois juntos é o `BlogLayout`.

**Props sempre tipadas** com `interface Props`, mesmo em componente simples. Variante visual entra como prop (`variant: 'default' | 'rust'`), nunca como classe CSS solta passada de fora.

### Os dois layouts

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout
  title="Título da aba"
  description="Meta description, até 160 caracteres"
  path="/a-rota-desta-pagina"
  ogImage="/img/og/exemplo.jpg"
  noindex={false}
  schema={[/* nós de JSON-LD desta página */]}
>
  <main id="conteudo">...</main>
</BaseLayout>
```

O `BaseLayout` resolve title, description, canonical, robots, Open Graph, Twitter Card, favicons, manifest, fontes, `rel` prev e next, e o grafo base de JSON-LD. O `BlogLayout` é ele mais o sub-menu, o `<main class="blog-main">` do tema claro e o sprite de arte de capa.

> 🎨 **A armadilha do `nav{}` morreu.** O CSS do header estilizava a tag `nav` no seletor de elemento, então qualquer `<nav>` novo da página nascia com barra preta sticky no topo, e cada um precisava de resets na marra. Agora o seletor é `.site-nav`. Breadcrumb, sub-menu e índice não carregam mais reset defensivo nenhum.

<br>

## 🎨 Estilos

| Onde | O que entra |
|:--|:--|
| `src/styles/global.css` | tokens de cor e tipografia, reset, `.wrap`, `.sr-only`, `.skip-link` |
| `src/styles/blog-primitives.css` | `.section`, `.eyebrow`, `.btn`, `.cat-tag`, `.link-more`, carregado só pelo `BlogLayout` |
| `<style>` do próprio `.astro` | tudo que é exclusivo de um componente ou de uma página |

**Por que dois arquivos de primitivos:** no HTML de origem a home e o blog definiam `.section`, `.eyebrow` e `.btn` com valores diferentes. Juntar em um arquivo só quebraria um dos dois. A home e a escolinha carregam os seus no `<style>` da própria página; as quatro páginas de blog compartilham o `blog-primitives.css`.

**Nenhum `style=""` inline** sobrou no projeto. A única exceção é a cor de marca dos monogramas em `AiTools.astro`, que é dado vindo de `src/data/ai-tools.ts`, não estilo.

### O tema claro do blog

Os tokens claros vivem no seletor `.blog-main` e **redefinem os mesmos nomes de variável** do tema escuro. Header e footer ficam fora do `main` e continuam escuros, funcionando como âncora de contraste. Por isso nenhum componente precisa saber em que tema está rodando.

> ⚠️ O âmbar `#D9A441` sobre o papel claro dá 1.79:1. **Nunca use `--accent` como cor de texto no tema claro**, só como preenchimento. Para texto e link existe `--accent-ink`, e para IA/GEO/AEO existe `--rust-ink`.

<br>

## 📜 Scripts de cliente

Um arquivo por comportamento em `src/scripts/`, importado só onde é usado. O menu mobile não carrega em página que não tem menu mobile.

| Arquivo | Onde entra |
|:--|:--|
| `mobile-menu.ts` | `Header.astro` |
| `subnav-search.ts` | `BlogSubnav.astro` |
| `toc-scrollspy.ts` | página de post |
| `ai-tools.ts` | `AiTools.astro` |
| `infinite-scroll.ts` | `LoadMore.astro` |
| `busca-blog.ts` | `/blog/busca` |
| `faq-accordion.ts` | home e escolinha |
| `leque-pontilhado.ts` | escolinha |
| `design-system.ts` | `/design-system` |

Todos são melhoria progressiva. Sem JavaScript a página continua inteira: o índice vira lista de âncoras, o FAQ fica aberto, a busca explica o que fazer e o "carregar mais" volta a ser o link de paginação que sempre foi.

<br>

## 📝 A Content Collection de blog

O schema fica em `src/content.config.ts` (e não no antigo `src/content/config.ts`, que o Astro aposentou na versão 5). `category` e `author` são validados contra listas fechadas, então post com categoria inexistente **quebra o build** em vez de gerar uma página órfã que ninguém percebe.

### Adicionar um post

Crie `src/content/blog/<slug>.md`. O nome do arquivo é a URL: `/blog/<slug>`.

```yaml
---
title: "Título que vira o H1 e o card"
description: "Meta description, no máximo 160 caracteres"
excerpt: "Resumo do card, mais curto e mais direto"
standfirst: "A linha fina logo abaixo do H1"
category: "seo-tecnico"
author: "victor-roque"
publishDate: 2026-09-04
updatedDate: 2026-09-20
readingTime: 14
coverArt: "art-tech"
pillar: false
status: "published"
---

O texto do artigo, em Markdown.
```

Use `.mdx` quando o post precisar de blocos ricos no meio do texto:

```mdx
import CtaBand from '../../components/post/CtaBand.astro';
import ExpertQuote from '../../components/post/ExpertQuote.astro';

<CtaBand kicker="escolinha" title="..." text="..." href="/escolinha" label="Começar" />
<ExpertQuote {...frontmatter.expert} />
```

### Campos que valem a pena preencher

| Campo | Por quê |
|:--|:--|
| `keyPoints` | bloco padrão de todo post. Três a cinco frases fechadas, cada uma entregando um fato |
| `aiSummary` | resposta direta e autocontida, com as sub-perguntas que o *query fan out* abre a partir da principal |
| `faq` | o **FAQPage do JSON-LD sai daqui**, então o visível e o marcado não têm como divergir |
| `expert` | citação de especialista, com nome e cargo obrigatórios |
| `source` | créditos. Só em conteúdo traduzido ou adaptado. Em post original, não preencha |
| `pillar` | marca a pilar page da categoria. Uma por categoria |
| `status` | `stub` nasce `noindex` e fica fora do sitemap, mas aparece nas listagens |

> ⚠️ **Citação de terceiro só entra com `sourceUrl`.** Nunca publique fala de outra pessoa sem fonte verificável. A página de autor é onde a confiança do site é verificada: `sameAs` só aceita perfil que existe de verdade, e credencial não se inventa.

### Estado atual do conteúdo

Existe **um post escrito de verdade**, `o-que-e-seo`, convertido do template `post.html`. Os outros **29 arquivos** são `status: "stub"`: título, resumo, categoria, data, tempo de leitura e arte vieram dos cards que já existiam no protótipo em HTML, e o corpo é um aviso pedindo o texto. Eles existem para as listagens, as categorias, a página de autor e a paginação funcionarem com dado real em vez de conteúdo inventado. Nasceram `noindex` e fora do sitemap.

<br>

## 🗺️ Rotas

| Rota | O que é | Indexação |
|:--|:--|:--|
| `/` | home | index |
| `/blog` | home do blog | index |
| `/blog/<slug>` | post e pilar page | index, ou noindex e fora do sitemap enquanto for `stub` |
| `/blog/categoria/<slug>` | listagem por categoria | **noindex, follow** |
| `/blog/categoria/<slug>/pagina/N` | páginas 2 em diante | noindex, follow |
| `/blog/busca` | busca no cliente | noindex, follow |
| `/blog/rss.xml` | feed, só posts publicados | não se aplica |
| `/autor/<slug>` | página de autor | index |
| `/autor/<slug>/pagina/N` | páginas 2 em diante | noindex |
| `/escolinha` | SEO Roadmap v3 | index |
| `/design-system` | referência interna | noindex, nofollow |
| `/404` | página de erro | noindex |

**A categoria é `noindex` de propósito.** Ela não tem conteúdo próprio para ranquear. Quem disputa SERP é a pilar page; a categoria existe para navegação e distribuição de link interno. Como a regra é por padrão de caminho, categoria nova não precisa de flag.

**O scroll infinito roda por cima de uma paginação de verdade.** O botão "carregar mais" é um `<a>` com `rel="next"` apontando para `/pagina/N`, que existe como HTML. O JavaScript só intercepta o clique e o `IntersectionObserver` só automatiza esse clique. Trocar o link por um `button` puro tira a paginação do rastreio e deixa todo o arquivo antigo órfão.

<br>

## ⚠️ Pendências antes do primeiro deploy

Nada disso quebra o build, mas tudo isso precisa de decisão sua.

**Páginas que o menu já promete e ainda não existem.** Dão 404 hoje:

`/ferramentas` e as 10 ferramentas · `/solucoes`, `/solucoes/agendar`, `/solucoes/treinamento` · `/escolinha/iniciante`, `/escolinha/tecnica`, `/escolinha/geo-aeo` · `/estudos-de-caso` · `/sobre` · `/contato` · `/agenda` · `/newsletter` · `/comunidade` · `/politica-de-privacidade` · `/termos-de-servico` · `/politica-de-cookies`

**Links que não consegui resolver:**

- as redes **Substack, Reddit e YouTube** continuam com `href="#"` em `src/data/navigation.ts`. GitHub e X foram preenchidos com as URLs reais, que estavam no `sameAs` do JSON-LD da home
- os créditos do rodapé, **"Victor Roque"** e **"E42 Consultoria"**, continuam com `href="#"`
- o banner de afiliado aponta para `https://exemplo-parceiro.com/?ref=seomaroto`, que é placeholder
- `/divulgacao-de-afiliados`, citada na regra do banner, ainda não existe

**Conteúdo marcado como placeholder no HTML de origem**, replicado fielmente mas não conferido: números da home, estudos de caso, números do hero do blog, credenciais e estatísticas da página de autor.

**Imagens:** não existe imagem de capa de post. As capas são símbolos SVG inline (`art-tech`, `art-content`, `art-links`, `art-ai`, `art-data`). O `og:image` cai no logo da marca até existir arte própria por post.

<br>

## 🗺️ Roadmap

**Ferramentas como Astro islands.** O simulador de SERP e o extrator de sitemap entram como componente React ou Svelte com `client:load`, isolado na página da própria ferramenta. O JavaScript da ferramenta não vaza para o resto do site: um artigo continua sendo HTML puro. Se alguma delas precisar de lógica de servidor, o caminho é API route do próprio Astro em modo híbrido, ou um serviço externo chamado por fetch. **Nada disso pede troca de framework.**

**CMS headless, se um dia fizer sentido.** O ponto de troca é o `loader` da collection em `src/content.config.ts`. Os componentes consomem o formato do schema, não a origem dos dados.

Outros itens da fila:

- [ ] template de estudo de caso, com os campos fixos do formato (problema, diagnóstico, hipótese, implementação, resultado, aprendizados)
- [ ] imagem de capa real por post, aí sim em `src/assets/` com `astro:assets`
- [ ] Pagefind, se o índice JSON da busca ficar grande demais
- [ ] as páginas institucionais listadas nas pendências

<br>

## 📌 Convenção de commits

[Conventional Commits](https://www.conventionalcommits.org/pt-br/), em português e sem acento na mensagem. Um commit por mudança coesa, não um por arquivo e nem um gigante com tudo dentro.

| Prefixo | Quando usar |
|:--|:--|
| `feat` | componente, página ou capacidade nova |
| `fix` | correção de bug visual ou de comportamento |
| `style` | ajuste só de CSS, espaçamento ou cor |
| `refactor` | reorganização sem mudar o resultado |
| `docs` | README e comentários |
| `chore` | configuração, assets, manutenção |

<br>

---

<div align="center">

### 👤 Victor Hugo Roque

Itapetininga, SP

[![Site](https://img.shields.io/badge/seomaroto.com.br-D9A441?style=for-the-badge&logo=googlechrome&logoColor=0D0904)](https://seomaroto.com.br)
[![GitHub](https://img.shields.io/badge/GitHub-1C130B?style=for-the-badge&logo=github&logoColor=F0E4CF)](https://github.com/seovictoroque)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-9C7226?style=for-the-badge&logo=linkedin&logoColor=F0E4CF)](https://linkedin.com/in/seovictoroque)
[![X](https://img.shields.io/badge/@seovictoroque-0D0904?style=for-the-badge&logo=x&logoColor=F0E4CF)](https://x.com/seovictoroque)

<br>

*Eu crio, e tomo café.*

</div>
