/**
 * LEQUE PONTILHADO da Escolinha.
 *
 * Desenha, em SVG, as curvas que ligam cada etapa do roteiro aos seus
 * subtopicos. As curvas sao calculadas a partir da posicao real dos elementos
 * na tela, entao precisam ser refeitas em resize e depois que as fontes
 * carregam, que e quando as caixas mudam de tamanho.
 *
 * Abaixo de 880px o leque nao existe: o layout vira uma coluna so e as linhas
 * nao ligariam nada. Por isso o retorno logo no inicio.
 */
const NS = 'http://www.w3.org/2000/svg';
const BREAKPOINT = 880;

function draw(): void {
  if (window.innerWidth <= BREAKPOINT) return;

  document.querySelectorAll<HTMLElement>('.flow .row').forEach((row) => {
    const label = row.querySelector<HTMLElement>('.label');
    if (!label) return;

    let svg = row.querySelector<SVGSVGElement>('svg.fan');
    if (!svg) {
      svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('class', 'fan');
      svg.setAttribute('aria-hidden', 'true');
      row.insertBefore(svg, row.firstChild);
    }
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rb = row.getBoundingClientRect();
    const lb = label.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${rb.width} ${rb.height}`);
    svg.setAttribute('width', String(rb.width));
    svg.setAttribute('height', String(rb.height));

    ([['.col-right', 1], ['.col-left', -1]] as const).forEach(([seletor, dir]) => {
      const col = row.querySelector<HTMLElement>(seletor);
      if (!col) return;

      const kids = Array.from(col.children).filter(
        (n) => (n as HTMLElement).offsetParent !== null
      ) as HTMLElement[];
      if (!kids.length) return;

      const hubX = (dir > 0 ? lb.right : lb.left) - rb.left;
      const hubY = lb.top + lb.height / 2 - rb.top;

      kids.forEach((t) => {
        const tb = t.getBoundingClientRect();
        const tx = (dir > 0 ? tb.left : tb.right) - rb.left;
        const ty = tb.top + tb.height / 2 - rb.top;
        const bend = Math.max(16, Math.abs(tx - hubX) * 0.55);
        const d = `M${hubX},${hubY} C${hubX + dir * bend},${hubY} ${tx - dir * bend},${ty} ${tx},${ty}`;
        const path = document.createElementNS(NS, 'path');
        path.setAttribute('d', d);
        svg!.appendChild(path);
      });
    });
  });
}

export function initLequePontilhado(): void {
  let timer: number | undefined;
  const redraw = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(draw, 60);
  };

  if (document.readyState !== 'loading') draw();
  else document.addEventListener('DOMContentLoaded', draw);

  window.addEventListener('load', draw);
  window.addEventListener('resize', redraw);
  // as caixas mudam de tamanho quando a fonte real substitui a de fallback
  if (document.fonts?.ready) void document.fonts.ready.then(draw);
}
