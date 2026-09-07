/**
 * FORMULARIO SEM ENDPOINT.
 *
 * A newsletter e o formulario alternativo da /contato ainda nao tem
 * para onde enviar, entao o submit e barrado aqui em vez de num
 * `onsubmit="return false"` inline no HTML. Quando o endpoint existir, e
 * aqui que o envio entra, e este comentario sai junto.
 *
 * Sem JavaScript o formulario faz o submit padrao e nada acontece, que e
 * exatamente o mesmo resultado de hoje.
 */
export function initFormSemEndpoint(seletor: string): void {
  const form = document.querySelector<HTMLFormElement>(seletor);
  if (!form) return;

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
  });
}
