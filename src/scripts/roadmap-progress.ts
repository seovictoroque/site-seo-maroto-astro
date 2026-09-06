/**
 * PROGRESSO DO ROTEIRO NO CARTAO DA HOME, melhoria progressiva.
 *
 * O HTML ja nasce com um progresso valido, vindo de `etapasConcluidasPadrao`.
 * Este script so entra por cima quando o navegador tem progresso gravado, e
 * sai de fininho quando nao tem, quando o dado esta corrompido ou quando o
 * localStorage esta bloqueado. Nada aqui pode derrubar a pagina.
 *
 * FORMATO ESPERADO NA CHAVE
 * Um array JSON com os numeros das etapas concluidas, ex: [1,2,5].
 * Aceita tambem um numero puro, ex: 3, que significa "as tres primeiras".
 *
 * A /escolinha ainda nao grava nada. Quando ela gravar, precisa usar esta
 * mesma chave e este mesmo formato, definidos em src/data/roadmap.ts.
 */
import { chaveProgresso } from '../data/roadmap';

function lerConcluidas(total: number): number[] | null {
  let cru: string | null = null;

  try {
    cru = window.localStorage.getItem(chaveProgresso);
  } catch {
    return null; // storage bloqueado, janela privada, terceiro sem permissao
  }

  if (!cru) return null;

  try {
    const dado: unknown = JSON.parse(cru);

    if (typeof dado === 'number' && Number.isFinite(dado)) {
      const quantas = Math.max(0, Math.min(total, Math.floor(dado)));
      return Array.from({ length: quantas }, (_, i) => i + 1);
    }

    if (Array.isArray(dado)) {
      return dado
        .filter((n): n is number => typeof n === 'number' && Number.isInteger(n))
        .filter((n) => n >= 1 && n <= total);
    }
  } catch {
    return null; // JSON invalido, versao antiga do dado
  }

  return null;
}

export function initRoadmapProgress(seletor = '[data-progresso]'): void {
  const card = document.querySelector<HTMLElement>(seletor);
  if (!card) return;

  const total = Number(card.dataset.total) || 0;
  if (total <= 0) return;

  const concluidas = lerConcluidas(total);
  if (!concluidas) return;

  const fracao = (concluidas.length / total) * 100;
  const rotulo = `${Math.round(fracao)}%`;

  const pct = card.querySelector<HTMLElement>('[data-progresso-pct]');
  if (pct) pct.textContent = rotulo;

  const bar = card.querySelector<HTMLElement>('[data-progresso-bar]');
  const preenchimento = bar?.querySelector<HTMLElement>('i');
  if (bar && preenchimento) {
    preenchimento.style.width = `${fracao.toFixed(2)}%`;
    bar.setAttribute(
      'aria-label',
      `${concluidas.length} de ${total} etapas concluídas, ${rotulo} do roteiro`,
    );
  }

  card.querySelectorAll<HTMLElement>('[data-etapa]').forEach((item) => {
    const numero = Number(item.dataset.etapa);
    const feita = concluidas.includes(numero);

    item.classList.toggle('done', feita);

    // o rotulo so para leitor de tela acompanha a classe
    const marca = item.querySelector('.sr-only');
    if (feita && !marca) {
      const span = document.createElement('span');
      span.className = 'sr-only';
      span.textContent = 'concluída';
      item.appendChild(span);
    }
    if (!feita && marca) marca.remove();
  });
}
