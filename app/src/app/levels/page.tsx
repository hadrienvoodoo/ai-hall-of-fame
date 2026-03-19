import Link from "next/link";

const LEVELS = [
  {
    level: 1,
    name: "Chatbot",
    icon: "💬",
    color: "from-slate-600 to-slate-800",
    border: "border-slate-600/50",
    tagBg: "bg-slate-800/50 text-slate-300",
    description: "You use AI as a chat assistant — asking questions, rephrasing emails, getting summaries.",
    examples: ["Ask ChatGPT to rephrase an email", "Use AI to summarize a meeting", "Get explanations of code snippets"],
    unlocks: "You're in the game. AI is your search engine on steroids.",
    nextStep: "Try giving AI more context and structured prompts to get better results.",
  },
  {
    level: 2,
    name: "Prompt Engineer",
    icon: "🎯",
    color: "from-blue-600 to-blue-800",
    border: "border-blue-600/50",
    tagBg: "bg-blue-950/50 text-blue-300",
    description: "You craft precise prompts with context, examples, and constraints. You know that how you ask changes everything.",
    examples: ["System prompts with role + context + format", "Few-shot examples to guide output", "Chain of thought for complex reasoning"],
    unlocks: "10x better output from the same models. You ask better, you get better.",
    nextStep: "Start chaining multiple AI steps together into workflows.",
  },
  {
    level: 3,
    name: "Workflow Builder",
    icon: "⚡",
    color: "from-purple-600 to-purple-800",
    border: "border-purple-600/50",
    tagBg: "bg-purple-950/50 text-purple-300",
    description: "You connect AI into multi-step processes. Input → AI → Transform → AI → Output. You automate repetitive chains.",
    examples: ["Repomix to pack a repo → Claude to analyze it", "Zapier + AI for auto-triaging bugs", "Scripts that batch-process data through AI"],
    unlocks: "You don't just use AI — you build pipelines with it. Hours become minutes.",
    nextStep: "Let AI make decisions and take actions autonomously.",
  },
  {
    level: 4,
    name: "Agent Operator",
    icon: "🤖",
    color: "from-amber-500 to-amber-700",
    border: "border-amber-500/50",
    tagBg: "bg-amber-950/50 text-amber-300",
    description: "You deploy autonomous AI agents that read, think, decide, and act. You supervise, they execute.",
    examples: ["Claude Code agents that implement full features", "AI code review agents on every PR", "Cowork scheduled tasks that run autonomously"],
    unlocks: "You're managing AI like a team. Ship 10x faster with agents doing the heavy lifting.",
    nextStep: "Build your own tools and integrations that extend what agents can do.",
  },
  {
    level: 5,
    name: "AI Architect",
    icon: "👑",
    color: "from-red-500 to-red-700",
    border: "border-red-500/50",
    tagBg: "bg-red-950/50 text-red-300",
    description: "You build custom tools, MCP servers, and plugins that give AI new capabilities. You extend the platform itself.",
    examples: ["Custom MCP server connecting AI to internal data", "BMAD agent pipelines with multiple specialized agents", "New skills and tools that the whole team can use"],
    unlocks: "You're not just using AI — you're building the infrastructure that makes everyone else faster.",
    nextStep: "You're at the top. Now help others get here. 🚀",
    isFinal: true,
  },
];

export default function LevelsPage() {
  return (
    <div className="min-h-screen hero-gradient">
      <div className="gradient-line" />
      <header className="border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="text-sm text-[var(--primary-light)] hover:text-[var(--accent)] transition-colors"
          >
            ← Back to projects
          </Link>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            <span className="text-[var(--accent)]">AI Levels</span>{" "}
            <span className="text-[var(--foreground)]">— Your Journey</span>
          </h1>
          <p className="mt-2 text-[var(--muted)] text-lg">
            From chatbot to architect. Where are you on the path?
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Progress bar */}
        <div className="flex items-center gap-1 mb-12">
          {LEVELS.map((l, i) => (
            <div key={l.level} className="flex-1 flex items-center">
              <div className={`h-2 w-full rounded-full bg-gradient-to-r ${l.color}`} />
              {i < LEVELS.length - 1 && <div className="w-2" />}
            </div>
          ))}
        </div>

        {/* Level cards */}
        <div className="flex flex-col gap-8">
          {LEVELS.map((l) => (
            <div
              key={l.level}
              className={`rounded-2xl border ${l.border} bg-[var(--card)] p-8 relative overflow-hidden ${l.isFinal ? "ring-2 ring-red-500/30" : ""}`}
            >
              {/* Glow for final level */}
              {l.isFinal && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-amber-500/5 pointer-events-none" />
              )}

              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{l.icon}</span>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold border ${l.tagBg} ${l.border}`}>
                        Level {l.level}
                      </span>
                      {l.isFinal && (
                        <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                          Max Level
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--foreground)] mt-1">
                      {l.name}
                    </h2>
                  </div>
                </div>

                <p className="text-[var(--muted)] text-lg leading-relaxed mb-6">
                  {l.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
                      Examples
                    </h3>
                    <ul className="space-y-2">
                      {l.examples.map((ex, i) => (
                        <li key={i} className="flex items-start gap-2 text-[var(--muted)]">
                          <span className="text-[var(--primary-light)] mt-1">•</span>
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[var(--success)] uppercase tracking-wide mb-3">
                      What it unlocks
                    </h3>
                    <p className="text-[var(--success)]/80">{l.unlocks}</p>

                    <h3 className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wide mt-4 mb-2">
                      Next step
                    </h3>
                    <p className="text-[var(--accent)]/80">{l.nextStep}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
