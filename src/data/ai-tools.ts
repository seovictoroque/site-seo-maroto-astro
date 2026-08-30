/**
 * Ferramentas de IA do bloco "Analisar este conteudo com IA".
 *
 * ChatGPT, Claude, Google AI Mode, Grok, Perplexity e Copilot aceitam `?q=`,
 * entao abrem com o prompt ja montado.
 *
 * Gemini e DeepSeek NAO expoem esse parametro. Por isso levam `copy: true`:
 * o prompt vai para a area de transferencia e a ferramenta abre em seguida.
 * Isso e proposital, nao e bug.
 *
 * Os monogramas sao placeholders dos logos oficiais. Para usar os logos de
 * verdade, troque `mark` pelo SVG de cada marca, respeitando as regras de uso
 * de cada uma.
 */
export interface AiTool {
  name: string;
  mark: string;
  color: string;
  url: string;
  /** true quando a ferramenta nao aceita prompt na URL */
  copy?: boolean;
}

export const aiTools: AiTool[] = [
  { name: 'ChatGPT', mark: 'GP', color: '#10A37F', url: 'https://chatgpt.com/?q={q}' },
  { name: 'Claude', mark: 'CL', color: '#C1573A', url: 'https://claude.ai/new?q={q}' },
  { name: 'Gemini', mark: 'GE', color: '#4285F4', url: 'https://gemini.google.com/app', copy: true },
  { name: 'Google AI Mode', mark: 'AI', color: '#1A73E8', url: 'https://www.google.com/search?udm=50&q={q}' },
  { name: 'Grok', mark: 'GR', color: '#2B2B2B', url: 'https://grok.com/?q={q}' },
  { name: 'Perplexity', mark: 'PX', color: '#20808D', url: 'https://www.perplexity.ai/search?q={q}' },
  { name: 'Copilot', mark: 'CP', color: '#0A78D4', url: 'https://copilot.microsoft.com/?q={q}' },
  { name: 'DeepSeek', mark: 'DS', color: '#4D6BFE', url: 'https://chat.deepseek.com/', copy: true },
];
