/**
 * FAQ em acordeao, com melhoria progressiva.
 *
 * Sem JavaScript todas as respostas ficam abertas e a pagina continua
 * legivel. A classe `js` no container e o que liga o comportamento de
 * acordeao no CSS, entao ela so entra quando o script roda.
 *
 * Usado na home (#faqList) e na escolinha (.faq), que sao containers
 * diferentes, por isso o seletor e parametro. O FAQ do post nao usa este
 * script: la sao details e summary nativos, que ja abrem e fecham sozinhos.
 */
export function initFaqAccordion(seletor = '#faqList, .faq'): void {
  const list = document.querySelector<HTMLElement>(seletor);
  if (!list) return;

  list.classList.add('js');

  list.querySelectorAll<HTMLElement>('.faq-item').forEach((item) => {
    const btn = item.querySelector<HTMLButtonElement>('.faq-q');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const aberto = item.getAttribute('data-open') === 'true';

      list.querySelectorAll<HTMLElement>('.faq-item').forEach((outro) => {
        outro.setAttribute('data-open', 'false');
        outro.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
      });

      if (!aberto) {
        item.setAttribute('data-open', 'true');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
