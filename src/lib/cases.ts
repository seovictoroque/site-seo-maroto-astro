/**
 * Consultas da collection de cases.
 *
 * Mesmo contrato de lib/posts.ts: toda pagina que le case passa por aqui,
 * entao ordenacao, o que conta como publicado e a escolha de relacionados
 * existem em um lugar so.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Case = CollectionEntry<'cases'>;

/** Do mais novo para o mais antigo. */
export function byDateDesc(a: Case, b: Case): number {
  return b.data.publishDate.valueOf() - a.data.publishDate.valueOf();
}

/** Todos os cases, inclusive os stubs, ja ordenados. */
export async function allCases(): Promise<Case[]> {
  const items = await getCollection('cases');
  return items.sort(byDateDesc);
}

/** So os que tem texto de verdade e numero conferido. */
export async function publishedCases(): Promise<Case[]> {
  return (await allCases()).filter((c) => c.data.status === 'published');
}

/**
 * Relacionados: os escolhidos a mao primeiro, o resto completa com os mais
 * recentes. Nunca repete o proprio case.
 */
export function relatedCases(todos: Case[], atual: Case, limit = 2): Case[] {
  const escolhidos = atual.data.related
    .map((id) => todos.find((c) => c.id === id))
    .filter((c): c is Case => Boolean(c));

  const vistos = new Set<string>([atual.id]);
  const out: Case[] = [];
  for (const lista of [escolhidos, todos]) {
    for (const c of lista) {
      if (out.length >= limit) return out;
      if (vistos.has(c.id)) continue;
      vistos.add(c.id);
      out.push(c);
    }
  }
  return out;
}

/**
 * As seis secoes fixas do formato de case do SEO Maroto.
 *
 * ATENCAO: esta lista NAO gera os links do indice. Ela e o contrato do
 * formato, usada so para conferir se um case seguiu a estrutura.
 *
 * Por que nao gera: o id de cada H2 e criado pelo rehype-slug a partir do
 * texto do titulo, e ele PRESERVA acento. "Diagnostico" vira `#diagnóstico`,
 * com acento, nao `#diagnostico`. Uma lista escrita a mao aqui saiu com tres
 * de seis ancoras quebradas na primeira tentativa, e o sintoma e silencioso:
 * o link existe, e clicavel e simplesmente nao rola.
 *
 * O indice do template sai dos `headings` que o render() devolve, que e a
 * unica fonte que nunca diverge do HTML. A funcao abaixo compara as duas e
 * avisa no build quando um case foge do formato.
 */
export const SECOES_DO_CASE = [
  'Problema',
  'Diagnóstico',
  'Hipótese',
  'Implementação',
  'Resultado',
  'Aprendizados',
] as const;

/**
 * Avisa no console do build quando um case nao segue as seis secoes.
 *
 * Nao quebra o build de proposito: um case em rascunho pode estar no meio da
 * escrita. Mas o aviso aparece, entao ninguem publica fora do formato sem ver.
 */
export function conferirFormato(id: string, titulos: string[]): void {
  const faltando = SECOES_DO_CASE.filter((s) => !titulos.includes(s));
  const sobrando = titulos.filter((t) => !SECOES_DO_CASE.includes(t as never));
  if (faltando.length === 0 && sobrando.length === 0) return;

  const partes = [
    faltando.length ? `faltam: ${faltando.join(', ')}` : '',
    sobrando.length ? `fora do formato: ${sobrando.join(', ')}` : '',
  ].filter(Boolean);
  console.warn(`[cases] ${id} nao segue as seis secoes do formato. ${partes.join(' | ')}`);
}
