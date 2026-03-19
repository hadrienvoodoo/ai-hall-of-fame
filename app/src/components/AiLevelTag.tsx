import { getAiLevelLabel } from "../lib/ai-levels";

const LEVEL_STYLES: Record<number, string> = {
  1: "bg-slate-800/50 text-slate-300 border-slate-600/50",
  2: "bg-blue-950/50 text-blue-300 border-blue-700/50",
  3: "bg-purple-950/50 text-purple-300 border-purple-700/50",
  4: "bg-amber-950/50 text-amber-300 border-amber-600/50",
  5: "bg-red-950/50 text-red-300 border-red-600/50",
};

export function AiLevelTag({ level }: { level: number }) {
  const style = LEVEL_STYLES[level] || LEVEL_STYLES[1];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border ${style}`}>
      L{level} · {getAiLevelLabel(level)}
    </span>
  );
}
