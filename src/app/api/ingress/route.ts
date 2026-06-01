import { NextResponse } from "next/server";

interface IngressManifestPayload {
  engineeringVector: "fullstack" | "frontend" | "ai" | "devops";
  githubUrl: string;
  emailEndpoint: string;
  baseLocation: string;
}

export async function POST(request: Request) {
  try {
    const body: IngressManifestPayload = await request.json();
    const { engineeringVector, githubUrl, emailEndpoint, baseLocation } = body;

    // Validate payload fields
    if (!engineeringVector || !githubUrl || !emailEndpoint || !baseLocation) {
      return NextResponse.json(
        { error: "[LINT_FAIL]: INCOMPLETE_MANIFEST_PARAMETERS" },
        { status: 400 }
      );
    }

    // Parse GitHub username from URL
    let username = "";
    try {
      const urlParts = githubUrl.replace(/\/$/, "").split("/");
      username = urlParts[urlParts.length - 1];
    } catch {
      return NextResponse.json(
        { error: "[LINT_FAIL]: INVALID_GITHUB_PROFILE_URL" },
        { status: 422 }
      );
    }

    if (!username) {
      return NextResponse.json(
        { error: "[LINT_FAIL]: EMPTY_GITHUB_USERNAME" },
        { status: 422 }
      );
    }

    // Query GitHub events endpoint
    const githubRes = await fetch(
      `https://api.github.com/users/${username}/events`,
      {
        headers: {
          "User-Agent": "Central-Grid-Ingress-Gatekeeper",
        },
        next: { revalidate: 60 },
      }
    );

    let events: any[] = [];
    if (githubRes.status === 200) {
      events = await githubRes.json();
    } else if (githubRes.status === 403 || githubRes.status === 429) {
      // Graceful fallback for API Rate Limits during high-density validation testing
      const fallbackScore = username.length * 15;
      if (fallbackScore < 100) {
        return NextResponse.json(
          { error: "[LINT_FAIL]: INSUFFICIENT_COMMIT_VELOCITY_FOR_INGRESS" },
          { status: 422 }
        );
      }
      return NextResponse.json({
        success: true,
        complexityScore: fallbackScore,
        ingressToken: `IG-RL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        simulated: true,
      });
    } else if (githubRes.status === 404) {
      return NextResponse.json(
        { error: "[LINT_FAIL]: INVALID_GITHUB_PROFILE" },
        { status: 422 }
      );
    } else {
      return NextResponse.json(
        { error: "[LINT_FAIL]: UPSTREAM_GATEWAY_TIMEOUT" },
        { status: 502 }
      );
    }

    // Calculate commit densities & complexity ratios over last 30 days
    const pushEvents = events.filter((e) => e.type === "PushEvent");
    let totalCommits = 0;
    let complexCommits = 0;

    pushEvents.forEach((event) => {
      const commits = event.payload?.commits || [];
      totalCommits += commits.length;
      commits.forEach((c: any) => {
        const msg = (c.message || "").toLowerCase();
        // Skip superficial package locks, markdown edits, merge conflicts, and formatting typos
        const isSuperficial =
          msg.includes("readme") ||
          msg.includes("bump") ||
          msg.includes("merge") ||
          msg.includes("package-lock") ||
          msg.includes("typo") ||
          msg.includes("fix copy");
        if (!isSuperficial) {
          complexCommits++;
        }
      });
    });

    const complexityScore =
      totalCommits > 0 ? Math.round((complexCommits / totalCommits) * 100) : 0;

    // Fail ingress validation if events density is shallow or complexity score drops below system floor
    if (events.length < 4 || (totalCommits > 0 && complexityScore < 40)) {
      return NextResponse.json(
        { error: "[LINT_FAIL]: INSUFFICIENT_COMMIT_VELOCITY_FOR_INGRESS" },
        { status: 422 }
      );
    }

    // Successful zero-trust telemetry compilation clearance
    return NextResponse.json({
      success: true,
      complexityScore,
      ingressToken: `IG-CORE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "[LINT_FAIL]: SYSTEM_PARSING_COMPILER_EXCEPTION" },
      { status: 500 }
    );
  }
}
