/**
 * Sub-menu do blog: rola a categoria ativa para dentro da vista e controla a
 * busca que expande no clique.
 *
 * Ordem de degradacao: sem JavaScript o campo nasce aberto e o form funciona
 * como form normal. O JS so fecha no carregamento e cuida da expansao.
 */
export function initSubnavSearch(): void {
  const bar = document.querySelector<HTMLElement>('.blog-subnav');
  if (!bar) return;

  // deixa a categoria ativa visivel quando a faixa esta rolada
  const box = bar.querySelector<HTMLElement>('.subnav-scroll');
  if (box) {
    const active = box.querySelector<HTMLElement>('a.active');
    if (active && box.scrollWidth > box.clientWidth) {
      const delta = active.getBoundingClientRect().left - box.getBoundingClientRect().left;
      box.scrollLeft = Math.max(0, box.scrollLeft + delta - 20);
    }
  }

  const form = bar.querySelector<HTMLFormElement>('.subnav-search');
  if (!form) return;
  const btn = form.querySelector<HTMLButtonElement>('.ss-toggle');
  const input = form.querySelector<HTMLInputElement>('input');
  if (!btn || !input) return;

  function setOpen(open: boolean, focus: boolean): void {
    if (!form || !bar || !btn || !input) return;
    form.classList.toggle('open', open);
    bar.classList.toggle('searching', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Fechar busca' : 'Abrir busca no blog');
    btn.type = open ? 'submit' : 'button';
    input.tabIndex = open ? 0 : -1;
    if (open && focus) input.focus();
  }

  setOpen(false, false);

  btn.addEventListener('click', (e) => {
    if (form.classList.contains('open')) {
      if (input.value.trim()) return; // deixa o submit acontecer
      e.preventDefault();
      setOpen(false, false);
    } else {
      e.preventDefault();
      setOpen(true, true);
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      setOpen(false, false);
      btn.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (
      form.classList.contains('open') &&
      !form.contains(e.target as Node) &&
      !input.value.trim()
    ) {
      setOpen(false, false);
    }
  });
}
