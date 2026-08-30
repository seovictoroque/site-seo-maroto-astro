/**
 * Busca do blog, no navegador.
 *
 * Carrega o indice gerado no build e filtra por titulo, resumo e categoria.
 * Comparacao sem acento e sem caixa, senao "indexacao" nao acha "indexação",
 * que e exatamente como as pessoas digitam.
 */
interface Item {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryName: string;
  date: string;
  readingTime: number;
}

function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function initBuscaBlog(): void {
  const form = document.querySelector<HTMLFormElement>('.busca-form');
  const input = document.getElementById('q') as HTMLInputElement | null;
  const lista = document.getElementById('busca-lista');
  const status = document.querySelector<HTMLElement>('.busca-status');
  if (!form || !input || !lista) return;

  let indice: Item[] | null = null;

  async function carregar(): Promise<Item[]> {
    if (indice) return indice;
    const r = await fetch('/blog/indice-de-busca.json');
    indice = (await r.json()) as Item[];
    return indice;
  }

  function formatar(iso: string): string {
    const [a, m, d] = iso.split('-');
    return `${d}/${m}/${a}`;
  }

  function render(itens: Item[], termo: string): void {
    lista!.innerHTML = '';
    if (status) {
      status.textContent = itens.length
        ? `${itens.length} ${itens.length === 1 ? 'artigo encontrado' : 'artigos encontrados'} para "${termo}".`
        : `Nenhum artigo para "${termo}". Tente outro termo ou navegue pelas categorias abaixo.`;
    }

    for (const item of itens) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `/blog/${item.slug}`;

      const h3 = document.createElement('h3');
      h3.textContent = item.title;
      a.appendChild(h3);

      if (item.excerpt) {
        const p = document.createElement('p');
        p.textContent = item.excerpt;
        a.appendChild(p);
      }

      const meta = document.createElement('span');
      meta.className = 'bl-meta';
      meta.textContent = `${item.categoryName} · ${formatar(item.date)} · ${item.readingTime} min`;
      a.appendChild(meta);

      li.appendChild(a);
      lista!.appendChild(li);
    }
  }

  async function buscar(termo: string): Promise<void> {
    const limpo = termo.trim();
    if (!limpo) {
      lista!.innerHTML = '';
      if (status) status.textContent = '';
      return;
    }
    if (status) status.textContent = 'Buscando...';
    try {
      const dados = await carregar();
      const alvo = normalizar(limpo);
      render(
        dados.filter((i) =>
          normalizar(`${i.title} ${i.excerpt} ${i.categoryName}`).includes(alvo)
        ),
        limpo
      );
    } catch {
      if (status) status.textContent = 'Não consegui carregar o índice de busca. Recarregue a página.';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = new URL(location.href);
    url.searchParams.set('q', input.value.trim());
    history.replaceState(null, '', url);
    void buscar(input.value);
  });

  // termo vindo da URL, como nas buscas frequentes de /blog
  const inicial = new URLSearchParams(location.search).get('q');
  if (inicial) {
    input.value = inicial;
    void buscar(inicial);
  }
}
