/**
 * robots.txt gerado no build.
 *
 * Deixou de ser arquivo estatico em public/ para poder responder a chave
 * `indexavel` de src/data/site.ts. Com ela desligada, o arquivo vira
 * `Disallow: /`.
 *
 * SOBRE A COMBINACAO Disallow + noindex
 * Os dois juntos tem um ponto cego conhecido: `Disallow` impede o rastreio,
 * e sem rastrear o robo nunca le o `noindex` da pagina. Se alguem linkar uma
 * URL do site de fora, ela pode aparecer na SERP como URL nua, sem titulo nem
 * descricao.
 *
 * Para um site que ainda nao foi lancado e nao esta linkado em lugar nenhum,
 * esse risco e pequeno e reversivel. Se o dominio ja estiver no ar, ou ja
 * tiver sido rastreado alguma vez, o certo e o contrario: LIBERAR o rastreio
 * e deixar so o `noindex` trabalhar, para o robo conseguir ler a instrucao.
 * Melhor ainda e proteger o ambiente com senha no servidor, ai nada entra.
 */
import type { APIRoute } from 'astro';
import { site, indexavel } from '../data/site';

const LIBERADO = `User-agent: *
Allow: /

# A busca interna e as listagens de categoria nascem noindex, follow.
# O Disallow aqui evita gasto de rastreamento nelas, o noindex resolve o resto.
Disallow: /blog/busca
Disallow: /*?q=

Sitemap: ${site.url}/sitemap-index.xml
`;

const BLOQUEADO = `# Site fechado para indexacao.
# A chave esta em src/data/site.ts, controlada pela variavel SITE_INDEXAVEL.
User-agent: *
Disallow: /
`;

export const GET: APIRoute = () =>
  new Response(indexavel ? LIBERADO : BLOQUEADO, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
