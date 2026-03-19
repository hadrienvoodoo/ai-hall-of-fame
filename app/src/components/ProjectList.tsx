"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "../types";

export function ProjectList({ initialProjects }: { initialProjects: Project[] }) {
  const [sort, setSort] = useState("recent");
  const [levelFilter, setLevelFilter] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = [...initialProjects];

    if (levelFilter) {
      result = result.filter((p) => p.aiLevel === parseInt(levelFilter));
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.toolUsed.toLowerCase().includes(q)
      );
    }

    if (sort === "votes") result.sort((a, b) => b.voteCount - a.voteCount);
    else if (sort === "level") result.sort((a, b) => b.aiLevel - a.aiLevel);
    else result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  }, [initialProjects, sort, levelFilter, search]);

  const selectClass =
    "px-4 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]/50 transition-colors";

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${selectClass} flex-1 min-w-[200px] placeholder-[var(--muted)]`}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={selectClass}
        >
          <option value="recent">Most Recent</option>
          <option value="votes">Most Voted</option>
          <option value="level">AI Level</option>
        </select>
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className={selectClass}
        >
          <option value="">All Levels</option>
          <option value="1">L1 Chatbot</option>
          <option value="2">L2 Prompt Engineering</option>
          <option value="3">L3 Workflows</option>
          <option value="4">L4 Agents</option>
          <option value="5">L5 Custom Tools</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🚀</div>
          <p className="text-xl text-[var(--muted)] font-medium">No projects yet</p>
          <p className="mt-2 text-[var(--muted)]/70">Post in #panam-ai to get started!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
