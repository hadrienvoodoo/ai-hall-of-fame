import { AiLevelTag } from "./AiLevelTag";
import { VoteButton } from "./VoteButton";
import { formatDate } from "../lib/utils";
import type { Project } from "../types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 card-glow transition-all duration-200 hover:border-[var(--primary)]/30">
      <div className="flex items-start gap-4">
        <VoteButton projectId={project.id} initialCount={project.voteCount} />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-[var(--foreground)]">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {project.contributorName} · {formatDate(project.createdAt)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[var(--muted)] line-clamp-2 leading-relaxed">
        {project.problemSolved}
      </p>

      {project.impact && (
        <p className="mt-3 text-sm text-[var(--success)] font-semibold">
          {project.impact}
        </p>
      )}

      {project.beforeAfterUrl && (
        <div className="mt-4 rounded-xl overflow-hidden border border-[var(--border)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.beforeAfterUrl}
            alt="Before/After"
            className="max-h-48 object-cover w-full"
          />
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <AiLevelTag level={project.aiLevel} />
        <span className="text-xs text-[var(--muted)] bg-[var(--background)] px-2.5 py-1 rounded-lg border border-[var(--border)]">
          {project.toolUsed}
        </span>
      </div>
    </div>
  );
}
