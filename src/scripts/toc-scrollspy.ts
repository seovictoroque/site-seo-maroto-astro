/**
 * Indice: marca a secao em que a leitura esta.
 *
 * Melhoria progressiva pura. Sem JavaScript o indice continua sendo uma lista
 * de ancoras normal, que funciona igual.
 */
export function initTocScrollspy(): void {
  const toc = document.getElementById('toc');
  if (!toc || !('IntersectionObserver' in window)) return;

  const links: Record<string, HTMLAnchorElement> = {};
  const alvos: HTMLElement[] = [];

  toc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    const el = document.getElementById(a.getAttribute('href')!.slice(1));
    if (el) {
      links[el.id] = a;
      alvos.push(el);
    }
  });
  if (!alvos.length) return;

  const visiveis = new Set<string>();

  function pintar(): void {
    const atual = alvos.filter((el) => visiveis.has(el.id))[0];
    if (!atual) return;
    for (const id in links) links[id].classList.toggle('current', id === atual.id);
  }

  const obs = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) visiveis.add(e.target.id);
        else visiveis.delete(e.target.id);
      });
      pintar();
    },
    { rootMargin: '-150px 0px -70% 0px', threshold: 0 }
  );

  alvos.forEach((el) => obs.observe(el));
}
