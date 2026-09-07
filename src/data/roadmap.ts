/**
 * ROADMAP DA ESCOLINHA, as 12 etapas.
 *
 * Fonte unica de duas pecas da home: o cartao de progresso do hero
 * (ProgressCard) e a grade de tres colunas (RoadmapStages). No prototipo em
 * HTML as etapas estavam escritas a mao nos dois lugares, com nomes
 * diferentes entre um e outro.
 *
 * A pagina /escolinha-seo ainda desenha o roteiro dela com markup proprio, em
 * espinha com clusters. Quando ela for componentizada, deve passar a ler
 * daqui tambem, e nao o contrario.
 */

export type GrupoRoadmap = 'base' | 'tecnica' | 'ia';

export interface EtapaRoadmap {
  numero: number;
  /** titulo completo, usado na grade de etapas */
  titulo: string;
  /** versao curta, para o cartao estreito do hero. Cai no titulo quando ausente. */
  curto?: string;
  grupo: GrupoRoadmap;
  /** destino do link. Enquanto nao existe ancora por etapa, aponta para a trilha. */
  href: string;
}

export const etapasRoadmap: EtapaRoadmap[] = [
  { numero: 1,  titulo: 'Fundamentos de SEO',                     grupo: 'base',    href: '/escolinha-seo/iniciante' },
  { numero: 2,  titulo: 'Execute um processo de SEO',             grupo: 'base',    href: '/escolinha-seo/iniciante' },
  { numero: 3,  titulo: 'SEO no seu CMS',                         grupo: 'base',    href: '/escolinha-seo/tecnica' },
  { numero: 4,  titulo: 'Aprofunde seus conhecimentos de SEO',    curto: 'Aprofunde seus conhecimentos', grupo: 'base', href: '/escolinha-seo/tecnica' },
  { numero: 5,  titulo: 'Especialista em SEO',                    grupo: 'tecnica', href: '/escolinha-seo/tecnica' },
  { numero: 6,  titulo: 'Auditoria técnica de SEO',               grupo: 'tecnica', href: '/escolinha-seo/tecnica' },
  { numero: 7,  titulo: 'SEO em outros mecanismos de busca',      curto: 'SEO em outros mecanismos', grupo: 'tecnica', href: '/escolinha-seo/tecnica' },
  { numero: 8,  titulo: 'SEO local',                              grupo: 'tecnica', href: '/escolinha-seo/tecnica' },
  { numero: 9,  titulo: 'Otimização para IA (GEO/AEO)',           grupo: 'ia',      href: '/escolinha-seo/geo-aeo' },
  { numero: 10, titulo: 'Complemente seu SEO',                    grupo: 'ia',      href: '/escolinha-seo/geo-aeo' },
  { numero: 11, titulo: 'Ferramentas de SEO gratuitas',           grupo: 'ia',      href: '/ferramentas' },
  { numero: 12, titulo: 'Trends, testes e soluções de problemas', curto: 'Trends, testes e problemas', grupo: 'ia', href: '/escolinha-seo' },
];

export interface GrupoInfo {
  chave: GrupoRoadmap;
  /** rotulo em mono acima do titulo */
  kicker: string;
  titulo: string;
  /** o grupo de IA usa o rust, como no resto do site */
  variante?: 'rust';
}

export const gruposRoadmap: GrupoInfo[] = [
  { chave: 'base',    kicker: 'etapas 01 a 04', titulo: 'Base' },
  { chave: 'tecnica', kicker: 'etapas 05 a 08', titulo: 'Técnica' },
  { chave: 'ia',      kicker: 'etapas 09 a 12', titulo: 'IA e prática', variante: 'rust' },
];

export function etapasDoGrupo(grupo: GrupoRoadmap): EtapaRoadmap[] {
  return etapasRoadmap.filter((etapa) => etapa.grupo === grupo);
}

/** titulo que cabe no cartao estreito do hero */
export function tituloCurto(etapa: EtapaRoadmap): string {
  return etapa.curto ?? etapa.titulo;
}

/**
 * TROCAR, progresso de exemplo.
 *
 * Numero de etapas concluidas que o cartao mostra na primeira renderizacao.
 * Existe porque a pagina e estatica e precisa ter um estado antes do
 * JavaScript rodar. Quando a /escolinha-seo comecar a gravar o progresso real,
 * o roadmap-progress.ts sobrescreve isto no cliente e este valor volta a ser
 * so o ponto de partida do HTML.
 */
export const etapasConcluidasPadrao = 2;

/** chave do localStorage combinada com a /escolinha-seo */
export const chaveProgresso = 'seomaroto:roadmap';
