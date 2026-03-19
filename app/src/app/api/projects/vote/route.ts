import { prisma } from "../../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { projectId, voterId } = await request.json();

    if (!projectId || !voterId) {
      return NextResponse.json({ error: "Missing projectId or voterId" }, { status: 400 });
    }

    // Check if already voted
    const existing = await prisma.vote.findUnique({
      where: { projectId_voterSlackId: { projectId, voterSlackId: voterId } },
    });

    if (existing) {
      return NextResponse.json({ error: "Already voted" }, { status: 409 });
    }

    // Create vote and increment count
    await prisma.vote.create({
      data: { projectId, voterSlackId: voterId },
    });

    await prisma.project.update({
      where: { id: projectId },
      data: { voteCount: { increment: 1 } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
