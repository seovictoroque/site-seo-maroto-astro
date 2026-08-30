/**
 * Paginacao com URL /pagina/N.
 *
 * O paginate() nativo do Astro gera /base/2, e o site usa /base/pagina/2, que
 * e o padrao ja adotado no prototipo em HTML e no rel=next do template. Como
 * a forma da URL nao e configuravel no helper nativo, a divisao em paginas
 * fica aqui, com o mesmo formato de saida que o paginate() entrega.
 *
 * A REGRA que isto sustenta: existe pagina de verdade em /pagina/N, com HTML
 * proprio e rel prev/next. O scroll infinito e so uma camada por cima. Sem
 * isso, todo o arquivo antigo de uma categoria ou de um autor fica orfao.
 *
 * Pagina 2 em diante leva canonical proprio, NUNCA canonical para a pagina 1.
 */
export interface Pagina<T> {
  items: T[];
  page: number;
  lastPage: number;
  size: number;
  total: number;
  /** caminho desta pagina */
  url: string;
  prev?: string;
  next?: string;
}

export function paginar<T>(items: T[], base: string, size: number): Pagina<T>[] {
  const lastPage = Math.max(1, Math.ceil(items.length / size));
  const paginas: Pagina<T>[] = [];

  for (let page = 1; page <= lastPage; page++) {
    paginas.push({
      items: items.slice((page - 1) * size, page * size),
      page,
      lastPage,
      size,
      total: items.length,
      url: page === 1 ? base : `${base}/pagina/${page}`,
      prev: page === 2 ? base : page > 2 ? `${base}/pagina/${page - 1}` : undefined,
      next: page < lastPage ? `${base}/pagina/${page + 1}` : undefined,
    });
  }

  return paginas;
}

/** quantos cards por pagina nas listagens */
export const POR_PAGINA = 9;
