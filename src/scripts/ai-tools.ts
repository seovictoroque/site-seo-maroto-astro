/**
 * Botoes de "Analisar com IA".
 *
 * Monta o prompt com titulo e URL canonica. Quem tem parametro de busca
 * publico abre ja preenchido. Gemini e DeepSeek nao tem, entao nesses o
 * prompt vai para a area de transferencia antes de abrir a ferramenta, o que
 * e marcado com data-copy="1" e nao e esquecimento.
 */
export function initAiTools(): void {
  const bloco = document.querySelector<HTMLElement>('.ai-tools');
  if (!bloco) return;

  const status = bloco.querySelector<HTMLElement>('.at-status');
  const titulo = bloco.dataset.pageTitle || document.title;
  const url = bloco.dataset.pageUrl || location.href;
  const prompt =
    `Leia ${url} ("${titulo}") e me diga: 1) o resumo em 5 pontos, ` +
    '2) o que o texto deixou de fora, 3) o que eu deveria checar no meu próprio site a partir dele.';

  function avisar(txt: string): void {
    if (!status) return;
    status.textContent = txt;
    setTimeout(() => {
      status.textContent = '';
    }, 4000);
  }

  bloco.querySelectorAll<HTMLButtonElement>('.at-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tpl = btn.dataset.tpl;
      if (!tpl) return;
      // so o texto depois do monograma, senao o aviso vira "DSDeepSeek"
      const ultimo = btn.lastChild;
      const nome = (
        ultimo && ultimo.nodeType === Node.TEXT_NODE ? (ultimo.textContent ?? '') : btn.textContent ?? ''
      ).trim();

      if (btn.dataset.copy === '1') {
        const abrir = () => window.open(tpl, '_blank', 'noopener');
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(prompt).then(
            () => {
              avisar(`Prompt copiado. Cole na conversa do ${nome}.`);
              abrir();
            },
            () => {
              avisar(`Não consegui copiar. Abrindo o ${nome} mesmo assim.`);
              abrir();
            }
          );
        } else {
          avisar(`Abrindo o ${nome}. Cole o prompt na conversa.`);
          abrir();
        }
        return;
      }

      window.open(tpl.replace('{q}', encodeURIComponent(prompt)), '_blank', 'noopener');
    });
  });
}
