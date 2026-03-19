"use client";

import { useState, useEffect } from "react";
import { getVoterId, getVotedProjects, markProjectVoted } from "../lib/voter-id";

export function VoteButton({
  projectId,
  initialCount,
}: {
  projectId: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setVoted(getVotedProjects().has(projectId));
  }, [projectId]);

  async function handleVote() {
    if (voted || loading) return;
    setLoading(true);
    setCount((c) => c + 1);
    setVoted(true);

    try {
      const voterId = getVoterId();
      const res = await fetch("/api/projects/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, voterId }),
      });

      if (res.ok) {
        markProjectVoted(projectId);
      } else {
        // Revert on failure
        setCount((c) => c - 1);
        setVoted(false);
      }
    } catch {
      setCount((c) => c - 1);
      setVoted(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleVote}
      disabled={voted || loading}
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
