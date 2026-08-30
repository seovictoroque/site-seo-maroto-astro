<div align="center">

<img src="public/img/icon-seomaroto.png" width="150" alt="SEO Maroto">

# SEO Maroto

**SEO sem enrolação, sem guru e sem firula.**

Código do site [seomaroto.com.br](http://seomaroto.com.br), blog técnico de SEO com estudos de caso, laboratório de experimentos e ferramentas gratuitas.

<br>

![Astro](https://img.shields.io/badge/Astro-D9A441?style=for-the-badge&logo=astro&logoColor=0D0904)
![Payload CMS](https://img.shields.io/badge/Payload_CMS-C1573A?style=for-the-badge&logo=payloadcms&logoColor=F0E4CF)
![TypeScript](https://img.shields.io/badge/TypeScript-9C7226?style=for-the-badge&logo=typescript&logoColor=F0E4CF)
![Status](https://img.shields.io/badge/status-em_migração-1C130B?style=for-the-badge)

</div>

<br>

## 🚧 Status

Repositório recém-aberto, ainda sem scaffold do Astro. A migração começou em **30 de agosto de 2026**.

Os templates que servem de base estão em **[site-seo-maroto-html](https://github.com/seovictoroque/site-seo-maroto-html)**, congelado como referência. A regra é sempre a mesma: layout que já funciona em HTML puro vira componente aqui. Descobrir layout dentro do framework é o caminho mais caro que existe.

<br>

## 🧱 A stack

| Camada | Escolha | Por quê |
|:--|:--|:--|
| Frontend | **Astro** | HTML estático por padrão, zero JS quando a página não precisa. Para um site de conteúdo isso é praticamente o requisito. |
| Conteúdo | **Payload CMS** headless | Schema tipado, controle total do modelo de dados e admin em TypeScript. Nada de plugin de SEO decidindo minha meta description. |
| Estilo | CSS nativo com custom properties | Tokens em `:root`, `<style>` escopado do Astro. Sem CSS-in-JS, sem framework de utilitário. |
| Deploy | a definir | Build estático com revalidação sob demanda quando o Payload publicar. |

<br>

## 📂 Estrutura prevista

```
site-seo-maroto-astro/
│
├── 📁 public/
│   └── 📁 img/                     # favicons, ícone e logo da marca
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 layout/              # Nav, Footer, Hero, Breadcrumb
│   │   └── 📁 lab/                 # NodeCard, Cluster, SpineConnector, MetricStat
│   ├── 📁 layouts/                 # shells de página
│   ├── 📁 pages/                    # rotas
│   ├── 📁 content/                 # Content Collections e config.ts com schema Zod
│   └── 📁 styles/
│       └── 🎨 global.css           # tokens da marca, declarados uma vez só
│
├── ⚙️ .gitattributes
├── ⚙️ .gitignore
└── 📖 README.md
```

<br>

## 🧩 Convenções de componente

- Um componente por arquivo `.astro`, nome em **PascalCase**.
- Props sempre tipadas com `interface Props` no frontmatter, mesmo no componente mais bobo.
- Variante visual entra como prop (`variant: 'default' | 'accent' | 'rust'`), nunca como classe CSS solta jogada de fora.
- Tokens de cor vivem em `global.css` e não se repetem componente a componente.

<br>

## 🗂️ Collections do Payload

| Collection | Observação |
|:--|:--|
| `Articles` | title, slug, excerpt, category, tags, publishedDate, readingTime, author, coverImage, content, group `seo` |
| `CaseStudies` | campos separados por etapa (problema, diagnóstico, hipótese, implementação, resultado, aprendizados), não um rich text genérico |
| `Categories` | name, slug, description e `colorVariant` para marcar as trilhas de IA e GEO |
| `Authors` | name, bio, avatar |

Regras que valem para todas:

- `seo.metaDescription` com `maxLength` de 160, senão o Google trunca e a culpa é minha.
- `seo.noIndex` presente em toda collection publicável, default `false`.
- Slug gerado do title por hook `beforeChange`, mas editável na mão.
- `readingTime` calculado por hook a partir da contagem de palavras. Ninguém deveria digitar isso.

<br>

## 🎨 Design tokens

Modo escuro em base quase preta com acento âmbar, derivado da logo.

| | Token | Valor | Uso |
|:--|:--|:--|:--|
| ![](https://img.shields.io/badge/-0D0904?style=flat-square) | `--bg` | `#0D0904` | fundo da página |
| ![](https://img.shields.io/badge/-1C130B?style=flat-square) | `--bg-elev` | `#1C130B` | cards e superfícies elevadas |
| ![](https://img.shields.io/badge/-251A0F?style=flat-square) | `--bg-elev-2` | `#251A0F` | segundo nível de elevação |
| ![](https://img.shields.io/badge/-F0E4CF?style=flat-square) | `--text-primary` | `#F0E4CF` | texto principal |
| ![](https://img.shields.io/badge/-B39A78?style=flat-square) | `--text-secondary` | `#B39A78` | texto de apoio |
| ![](https://img.shields.io/badge/-6E5A42?style=flat-square) | `--text-muted` | `#6E5A42` | metadados e legendas |
| ![](https://img.shields.io/badge/-D9A441?style=flat-square) | `--accent` | `#D9A441` | acento da marca |
| ![](https://img.shields.io/badge/-9C7226?style=flat-square) | `--accent-dim` | `#9C7226` | acento em estado apagado |
| ![](https://img.shields.io/badge/-C1573A?style=flat-square) | `--rust` | `#C1573A` | conteúdo de IA, GEO e AEO |

Bordas usam `rgba(216,182,138,0.10)` no discreto e `rgba(216,182,138,0.22)` no destaque.

**Tipografia**

| Token | Fonte | Onde |
|:--|:--|:--|
| `--serif` | Instrument Serif *itálica* | títulos |
| `--sans` | Space Grotesk | corpo e interface |
| `--mono` | JetBrains Mono | metadados e código |

<br>

## 🚀 Rodando localmente

Assim que o scaffold entrar:

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview  # serve o build para conferir antes do deploy
```

<br>

## 📝 Convenção de commits

O histórico usa [Conventional Commits](https://www.conventionalcommits.org/pt-br/), **um commit por peça**. Nada de commit gigante com o site inteiro dentro.

| Prefixo | Quando usar |
|:--|:--|
| `feat` | componente, página ou collection nova |
| `fix` | correção de bug visual ou de comportamento |
| `style` | ajuste só de CSS, espaçamento ou cor |
| `refactor` | reorganização sem mudar o resultado |
| `docs` | README e comentários |
| `chore` | configuração, assets, manutenção |

```bash
git add src/components/layout/Nav.astro
git commit -m "feat(nav): porta o header do HTML para componente Astro"
```

<br>

## ✅ Roadmap

- [ ] Scaffold do Astro com TypeScript e a estrutura de pastas acima
- [ ] Extrair os tokens do HTML para `src/styles/global.css`
- [ ] Portar header e footer para `components/layout/`
- [ ] Portar os templates de blog, post, categoria e autor
- [ ] Subir o Payload e modelar `Articles`, `CaseStudies`, `Categories` e `Authors`
- [ ] Ligar o Astro no Payload e migrar o conteúdo
- [ ] Sitemap, robots e schema markup nascendo junto de cada template
- [ ] Publicar as ferramentas gratuitas listadas na navegação
- [ ] Checklist de SEO técnico e acessibilidade rodando antes de cada deploy

<br>

## 📦 Repositórios do projeto

| Repositório | O que é |
|:--|:--|
| **site-seo-maroto-astro** | este aqui, o site de verdade |
| [site-seo-maroto-html](https://github.com/seovictoroque/site-seo-maroto-html) | os templates em HTML puro, congelados como referência |

<br>

---

<div align="center">

### 👤 Victor Hugo Roque

Itapetininga, SP

[![Site](https://img.shields.io/badge/seomaroto.com.br-D9A441?style=for-the-badge&logo=googlechrome&logoColor=0D0904)](http://seomaroto.com.br)
[![GitHub](https://img.shields.io/badge/GitHub-1C130B?style=for-the-badge&logo=github&logoColor=F0E4CF)](https://github.com/seovictoroque)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-9C7226?style=for-the-badge&logo=linkedin&logoColor=F0E4CF)](https://linkedin.com/in/seovictoroque)
[![X](https://img.shields.io/badge/@seovictoroque-0D0904?style=for-the-badge&logo=x&logoColor=F0E4CF)](https://x.com/seovictoroque)

<br>

*Eu crio, e tomo café.*

</div>
