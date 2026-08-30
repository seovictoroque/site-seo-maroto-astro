/**
 * Interacoes da pagina de design system.
 *
 * Tres coisas: copiar o hex de um swatch, copiar um bloco de codigo e marcar
 * a secao atual no menu lateral. Tudo opcional: sem JavaScript a pagina
 * continua sendo a documentacao inteira, so sem os atalhos de copia.
 *
 * O caminho `legado` com execCommand existe porque a Clipboard API precisa de
 * contexto seguro. Abrindo o arquivo direto do disco, em file://, ela nao
 * responde, e a documentacao precisa funcionar assim tambem.
 */
export function initDesignSystem(): void {
  const toast = document.getElementById('toast');
  let tid: number | undefined;

  function avisar(msg: string): void {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('on');
    window.clearTimeout(tid);
    tid = window.setTimeout(() => toast.classList.remove('on'), 1600);
  }

  function legado(texto: string, msg: string): void {
    const ta = document.createElement('textarea');
    ta.value = texto;
    ta.className = 'fora-da-tela';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    document.body.removeChild(ta);
    avisar(ok ? msg : 'não deu para copiar, selecione na mão');
  }

  function copiar(texto: string, msg: string): void {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(texto).then(
        () => avisar(msg),
        () => legado(texto, msg)
      );
    } else {
      legado(texto, msg);
    }
  }

  document.querySelectorAll<HTMLElement>('.sw').forEach((b) => {
    b.addEventListener('click', () => {
      const hex = b.dataset.hex;
      if (hex) copiar(hex, `${hex} copiado`);
    });
  });

  document.querySelectorAll<HTMLElement>('.copy').forEach((b) => {
    b.addEventListener('click', () => {
      const alvo = b.dataset.copy;
      const el = alvo ? document.querySelector<HTMLElement>(alvo) : null;
      if (el) copiar(el.innerText.replace(/ /g, ' '), 'bloco copiado');
    });
  });

  // menu lateral: marca a secao em que a leitura esta
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.sidenav a'));
  const secs = links.map((a) => document.querySelector<HTMLElement>(a.getAttribute('href') ?? ''));
  let raf: number | null = null;

  function spy(): void {
    raf = null;
    let atual = 0;
    for (let i = 0; i < secs.length; i++) {
      const s = secs[i];
      if (s && s.getBoundingClientRect().top <= 140) atual = i;
    }
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
      atual = secs.length - 1;
    }
    links.forEach((a, j) => a.classList.toggle('on', j === atual));
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!raf) raf = requestAnimationFrame(spy);
    },
    { passive: true }
  );
  window.addEventListener('resize', spy);
  spy();
}
