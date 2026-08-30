/**
 * Menu mobile em tela cheia.
 *
 * Fecha no clique em qualquer link, no Esc e ao voltar para desktop.
 * O icone do botao alterna entre hamburguer e X.
 *
 * Os dois SVGs vem de src/data/icons.ts, os mesmos que o Header renderiza,
 * entao nao existe path de icone escrito duas vezes.
 */
import { uiIcons } from '../data/icons';

const BREAKPOINT = 1300;

function wrap(inner: string): string {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">${inner}</svg>`;
}

export function initMobileMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  const burger = wrap(uiIcons.burger);
  const close = wrap(uiIcons.close);

  function setOpen(open: boolean): void {
    if (!toggle || !menu) return;
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    toggle.innerHTML = open ? close : burger;
    document.body.style.overflow = open ? 'hidden' : '';
  }

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > BREAKPOINT && menu.classList.contains('open')) setOpen(false);
  });
}
