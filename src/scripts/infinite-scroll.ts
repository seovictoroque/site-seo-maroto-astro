/**
 * Scroll infinito montado POR CIMA de uma paginacao rastreavel.
 *
 * O #btn-carregar e um link real para /pagina/N, gerado pelo paginate() do
 * Astro. Este script so intercepta o clique e busca a pagina N por fetch,
 * recortando os cards dela. O IntersectionObserver apenas automatiza o
 * clique. Nunca troque o link por um button puro: a paginacao sairia do
 * rastreio e o arquivo antigo ficaria orfao.
 *
 * Se o fetch falhar, o script devolve o link ao comportamento normal e avisa
 * a pessoa, entao a navegacao continua possivel.
 */
export function initInfiniteScroll(): void {
  const caixa = document.getElementById('carregar-mais');
  const grade = document.getElementById('grade-artigos');
  const botao = document.getElementById('btn-carregar') as HTMLAnchorElement | null;
  if (!caixa || !grade || !botao) return;

  const status = caixa.querySelector<HTMLElement>('.load-status');
  const base = caixa.dataset.base || '';
  const ultima = parseInt(caixa.dataset.ultima ?? '1', 10) || 1;
  let pagina = parseInt(caixa.dataset.pagina ?? '1', 10) || 1;
  let carregando = false;
  let obs: IntersectionObserver | null = null;

  // vira botao so quando o JS assume. Sem JS ele segue sendo o link de
  // paginacao, que e o que o rastreador acompanha.
  botao.setAttribute('role', 'button');

  function avisar(txt: string): void {
    if (status) status.textContent = txt;
  }

  function desistir(): void {
    // devolve o link ao comportamento normal, para a pessoa nao ficar presa
    botao?.removeAttribute('role');
    caixa?.classList.remove('carregando');
    obs?.disconnect();
    avisar('Não consegui carregar aqui. Clique para abrir a próxima página.');
    carregando = false;
  }

  async function carregar(): Promise<void> {
    if (carregando || pagina >= ultima) return;
    carregando = true;
    caixa!.classList.add('carregando');
    avisar('Carregando mais artigos...');

    const proxima = `${base}/pagina/${pagina + 1}`;
    try {
      const resposta = await fetch(proxima, { headers: { Accept: 'text/html' } });
      if (!resposta.ok) throw new Error(String(resposta.status));

      const doc = new DOMParser().parseFromString(await resposta.text(), 'text/html');
      const novos = doc.querySelectorAll('#grade-artigos > .post-card');
      if (!novos.length) throw new Error('pagina sem cards');

      novos.forEach((card) => grade!.appendChild(document.importNode(card, true)));
      pagina++;
      carregando = false;
      caixa!.classList.remove('carregando');

      if (pagina >= ultima) {
        caixa!.classList.add('fim');
        avisar(`Fim da lista. São ${grade!.querySelectorAll('.post-card').length} artigos.`);
        obs?.disconnect();
      } else {
        botao!.href = `${base}/pagina/${pagina + 1}`;
        avisar(`${novos.length} artigos carregados.`);
      }
    } catch {
      desistir();
    }
  }

  botao.addEventListener('click', (e) => {
    if (botao.getAttribute('role') !== 'button') return; // desistiu, deixa navegar
    e.preventDefault();
    void carregar();
  });

  // o observer so automatiza o clique. Sem ele, o botao continua funcionando.
  if ('IntersectionObserver' in window) {
    obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) void carregar();
        });
      },
      { rootMargin: '400px 0px' }
    );
    obs.observe(caixa);
  }
}
