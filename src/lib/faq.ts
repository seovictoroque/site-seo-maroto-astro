/**
 * Tipo de um item de FAQ.
 *
 * Mora num .ts, e nao no frontmatter do FaqSection.astro, porque tipo
 * exportado de arquivo .astro nao e importavel de forma confiavel. A pagina
 * tipa a lista com ele, o componente renderiza a lista e faqNode() monta o
 * FAQPage a partir da mesma lista.
 */
export interface FaqItem {
  question: string;
  /** aceita HTML inline: links e enfase. faqNode() tira as tags no schema. */
  answer: string;
}
