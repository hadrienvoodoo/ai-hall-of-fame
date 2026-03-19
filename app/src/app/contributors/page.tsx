import { prisma } from "../../lib/db";
import { AiLevelTag } from "../../components/AiLevelTag";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ContributorsPage() {
  const contributors = await prisma.contributor.findMany({
    orderBy: { currentAiLevel: "desc" },
  });

  return (
    <div className="min-h-screen hero-gradient">
      <div className="gradient-line" />
      <header className="border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="text-sm text-[var(--primary-light)] hover:text-[var(--accent)] transition-colors"
          >
            ← Back to projects
          </Link>
          <div className="flex items-center gap-4 mt-3">
            <img src="/logo.png" alt="AI Hall of Fame" className="w-12 h-12 drop-shadow-[0_0_12px_rgba(139,92,246,0.4)]" />
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                <span className="text-[var(--accent)]">Leaderboard</span>
              </h1>
              <p className="mt-1 text-[var(--muted)] text-lg">
                Team AI adoption rankings
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-10">
        {contributors.length === 0 ? (
          <p className="text-center text-[var(--muted)] py-12">
            No contributors yet. Post in #panam-ai to get started!
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contributors.map((contributor, index) => (
              <div
                key={contributor.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 card-glow hover:border-[var(--primary)]/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary-light)] font-bold">
                    {index === 0 ? "👑" : contributor.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">
                      {contributor.name}
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      {contributor.projectCount} project
                      {contributor.projectCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <AiLevelTag level={contributor.currentAiLevel} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
