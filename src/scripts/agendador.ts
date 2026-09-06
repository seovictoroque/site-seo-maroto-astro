/**
 * AGENDADOR, so a selecao visual.
 *
 * ATENCAO: isto NAO marca reuniao. O bloco `.booker` e uma composicao propria
 * em HTML e CSS, com dias e horarios estaticos de setembro de 2026, e este
 * script apenas move a marcacao de selecionado e atualiza o rotulo do dia. O
 * agendamento de verdade entra depois, por widget externo.
 *
 * O embed nativo do Google Agenda foi descartado: ele renderiza a lista de
 * eventos em tema claro e quebra a identidade do site.
 */

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];
const SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

/** Mes que o calendario estatico mostra: setembro de 2026, indice 8. */
const ANO = 2026;
const MES = 8;

export function initAgendador(): void {
  const cal = document.querySelector<HTMLElement>('.booker');
  if (!cal) return;

  const rotulo = document.getElementById('bkDia');

  function marcar(lista: HTMLElement[], alvo: HTMLElement): void {
    lista.forEach((el) => {
      const ligado = el === alvo;
      el.classList.toggle('is-sel', ligado);
      el.setAttribute('aria-pressed', ligado ? 'true' : 'false');
    });
  }

  const dias = Array.from(cal.querySelectorAll<HTMLElement>('.bk-day.free'));
  dias.forEach((dia) => {
    dia.addEventListener('click', () => {
      marcar(dias, dia);
      const n = parseInt(dia.getAttribute('data-dia') ?? '', 10);
      if (Number.isNaN(n) || !rotulo) return;
      const data = new Date(ANO, MES, n);
      rotulo.textContent = `${SEMANA[data.getDay()]}, ${n} de ${MESES[data.getMonth()]}`;
    });
  });

  const horas = Array.from(cal.querySelectorAll<HTMLElement>('.bk-slot'));
  horas.forEach((hora) => {
    hora.addEventListener('click', () => marcar(horas, hora));
  });
}
