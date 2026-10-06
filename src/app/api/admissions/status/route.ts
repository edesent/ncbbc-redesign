import { APPLICATION_STATUSES } from "@/lib/applicationConfig";
import { isReviewer } from "@/lib/adminAuth";
import { db, ensureSchema, UUID_PATTERN } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (!(await isReviewer())) return Response.redirect(`${origin}/admissions-review`, 303);

  const form = await request.formData();
  const id = String(form.get("id") || "");
  const status = String(form.get("status") || "");
  const notes = String(form.get("notes") || "").slice(0, 8000);

  if (!UUID_PATTERN.test(id) || !APPLICATION_STATUSES.includes(status)) {
    return Response.redirect(`${origin}/admissions-review`, 303);
  }

  await ensureSchema();
  await db()`update ncbbc_applications set status = ${status}, admin_notes = ${notes} where id = ${id}`;
  return Response.redirect(`${origin}/admissions-review/${id}?saved=1`, 303);
}
