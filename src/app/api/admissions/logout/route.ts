import { REVIEW_COOKIE } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const headers = new Headers({ Location: `${new URL(request.url).origin}/admissions-review` });
  headers.append("Set-Cookie", `${REVIEW_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
  return new Response(null, { status: 303, headers });
}
