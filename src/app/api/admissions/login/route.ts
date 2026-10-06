import { REVIEW_COOKIE, newSessionValue, passwordMatches } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const attempt = String(form.get("password") || "");
  const origin = new URL(request.url).origin;

  if (!passwordMatches(attempt)) {
    // A short pause makes password guessing slow.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return Response.redirect(`${origin}/admissions-review?error=1`, 303);
  }

  const headers = new Headers({ Location: `${origin}/admissions-review` });
  headers.append(
    "Set-Cookie",
    `${REVIEW_COOKIE}=${newSessionValue()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 12}`,
  );
  return new Response(null, { status: 303, headers });
}
