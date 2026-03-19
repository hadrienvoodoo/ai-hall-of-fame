"use client";

import { useState, useEffect } from "react";
import { getVotedProjects, markProjectVoted } from "../lib/voter-id";

export function VoteButton({
  projectId,
  initialCount,
}: {
  projectId: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const votedProjects = getVotedProjects();
    const alreadyVoted = votedProjects.has(projectId);
    setVoted(alreadyVoted);
    // Add the local vote to the count if already voted
    if (alreadyVoted) {
      setCount(initialCount + 1);
    }
  }, [projectId, initialCount]);

  function handleVote() {
    if (voted) return;
    setCount((c) => c + 1);
    setVoted(true);
    markProjectVoted(projectId);
  }

  return (
    <button
      onClick={handleVote}
      disabled={voted}
      className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
        voted
          ? "bg-[var(--primary)]/20 text-[var(--primary-light)] border border-[var(--primary)]/40"
          : "bg-[var(--card)] text-[var(--muted)] border border-[var(--border)] hover:border-[var(--primary)]/50 hover:text-[var(--primary-light)] cursor-pointer"
      }`}
    >
      <span className="text-lg">{voted ? "▲" : "△"}</span>
      <span>{count}</span>
    </button>
  );
}
