import { isReviewer } from "@/lib/adminAuth";
import { db, ensureSchema, UUID_PATTERN } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isReviewer())) return new Response("Please sign in to the admissions review page first.", { status: 401 });

  const { id } = await params;
  if (!UUID_PATTERN.test(id)) return new Response("Not found", { status: 404 });

  await ensureSchema();
  const rows = (await db()`
    select filename, content_type, data_base64 from ncbbc_application_files
    where id = ${id} and application_id is not null`) as { filename: string; content_type: string; data_base64: string }[];
  const file = rows[0];
  if (!file) return new Response("Not found", { status: 404 });

  const inline = new URL(request.url).searchParams.get("view") === "1";
  const safeName = file.filename.replace(/"/g, "");
  return new Response(Buffer.from(file.data_base64, "base64"), {
    headers: {
      "Content-Type": file.content_type,
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${safeName}"; filename*=UTF-8''${encodeURIComponent(file.filename)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
