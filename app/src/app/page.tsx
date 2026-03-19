import { ProjectList } from "../components/ProjectList";
import { prisma } from "../lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen hero-gradient">
      <div className="gradient-line" />
      <header className="border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-[var(--primary-light)]">AI</span>{" "}
              <span className="text-[var(--accent)]">Hall of Fame</span>
            </h1>
            <p className="mt-2 text-[var(--muted)] text-lg">
              Showcase your team&apos;s AI achievements
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/levels"
              className="px-5 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--accent)] font-medium hover:bg-[var(--card-hover)] transition-colors"
            >
              AI Levels
            </Link>
            <Link
              href="/contributors"
              className="px-5 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--primary-light)] font-medium hover:bg-[var(--card-hover)] transition-colors"
            >
              Leaderboard
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <ProjectList initialProjects={JSON.parse(JSON.stringify(projects))} />
      </main>
    </div>
  );
}
