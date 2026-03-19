export const AI_LEVELS = {
  1: "Chatbot",
  2: "Prompt Engineering",
  3: "Workflows",
  4: "Agents",
  5: "Custom Tools",
} as const;

export type AiLevel = keyof typeof AI_LEVELS;

export function getAiLevelLabel(level: number): string {
  return AI_LEVELS[level as AiLevel] ?? "Unknown";
}
