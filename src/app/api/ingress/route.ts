import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface IngressManifestPayload {
  engineeringVector: "fullstack" | "frontend" | "ai" | "devops";
  githubUrl: string;
  emailEndpoint: string;
}

export async function POST(request: Request) {
  try {
    const body: IngressManifestPayload = await request.json();
    const { engineeringVector, githubUrl, emailEndpoint } = body;

    // Validate payload fields
    if (!engineeringVector || !githubUrl || !emailEndpoint) {
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

    // Execute server-to-server fetch request targeting native GitHub REST API
    const token = process.env.GITHUB_ACCESS_TOKEN;
    const headersInit: Record<string, string> = {
      "User-Agent": "Central-Grid-Ingress-Gatekeeper",
      "Accept": "application/vnd.github.v3+json"
    };
    if (token && !token.includes("your_personal_github_token_here")) {
      headersInit["Authorization"] = `Bearer ${token}`;
    }

    const githubRes = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: headersInit,
      }
    );

    if (githubRes.status === 403) {
      return NextResponse.json(
        { error: "[LINT_FAIL]: GITHUB_API_ERROR_CODE_403" },
        { status: 403 }
      );
    }

    if (githubRes.status === 404) {
      return NextResponse.json(
        { error: "[LINT_FAIL]: INVALID_GITHUB_PROFILE" },
        { status: 422 }
      );
    }

    if (!githubRes.ok) {
      return NextResponse.json(
        { error: `[LINT_FAIL]: GITHUB_API_ERROR_CODE_${githubRes.status}` },
        { status: 502 }
      );
    }

    const githubData = await githubRes.json();
    const publicRepos = githubData.public_repos ?? 0;

    // Enforce Linter Gate Thresholds: Must contain at least 5 public repositories
    if (publicRepos < 5) {
      return NextResponse.json(
        { error: "INSUFFICIENT_COMMIT_VELOCITY_FOR_INGRESS" },
        { status: 403 }
      );
    }

    // Initialize the backend Supabase client using administrative SUPABASE_SERVICE_ROLE_KEY
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fmpvqyogbxnpezjozdja.supabase.co";
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    
    if (!supabaseServiceKey) {
      console.error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable.");
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Database Mutation: Upsert directly into profiles
    const { data: profile, error: dbError } = await supabaseAdmin
      .from("profiles")
      .upsert(
        {
          github_username: username,
          secure_email: emailEndpoint,
          engineering_vector: engineeringVector,
          commit_frequency: "LIVE_TIMELINE_ACTIVE",
          ingress_status: "VERIFIED",
          audit_status: "CLEAR",
          created_at: new Date().toISOString()
        },
        { onConflict: "github_username" }
      )
      .select()
      .single();

    if (dbError) {
      console.error("Supabase upsert error:", dbError);
      return NextResponse.json(
        { error: "[LINT_FAIL]: DATABASE_MUTATION_FAILED" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (err) {
    console.error("Ingress system processing exception:", err);
    return NextResponse.json(
      { error: "[LINT_FAIL]: SYSTEM_PARSING_COMPILER_EXCEPTION" },
      { status: 500 }
    );
  }
}
