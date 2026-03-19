const COOKIE_NAME = "hof_voter_id";

function generateId(): string {
  return crypto.randomUUID();
}

export function getVoterId(): string {
  // Check existing cookie
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (match) return match[1];

  // Generate and store for 1 year
  const id = generateId();
  document.cookie = `${COOKIE_NAME}=${id}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
  return id;
}

export function getVotedProjects(): Set<string> {
  try {
    const stored = localStorage.getItem("hof_voted");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

export function markProjectVoted(projectId: string): void {
  const voted = getVotedProjects();
  voted.add(projectId);
  localStorage.setItem("hof_voted", JSON.stringify([...voted]));
}
