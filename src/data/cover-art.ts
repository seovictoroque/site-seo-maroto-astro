/**
 * Ids dos simbolos de arte de capa provisoria.
 *
 * Vive num .ts, e nao dentro do componente do sprite, porque o schema da
 * content collection precisa validar contra esta lista, e o content.config.ts
 * roda fora do pipeline de componentes.
 */
export const artIds = ['art-tech', 'art-content', 'art-links', 'art-ai', 'art-data'] as const;
export type ArtId = (typeof artIds)[number];
