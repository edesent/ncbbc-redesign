import { UPLOAD_KIND_LABELS, type UploadKind } from "@/lib/applicationConfig";
import { db, ensureSchema, UUID_PATTERN } from "@/lib/db";
import { storeUpload } from "@/lib/uploads";

export const runtime = "nodejs";

const STUDENT_KINDS: UploadKind[] = ["photo", "transcript", "bible_program", "other"];

export async function POST(request: Request) {
  const url = new URL(request.url);
  const draftId = url.searchParams.get("draft") || "";
  const kind = (url.searchParams.get("kind") || "") as UploadKind;

  if (!UUID_PATTERN.test(draftId) || !STUDENT_KINDS.includes(kind) || !UPLOAD_KIND_LABELS[kind]) {
    return Response.json({ error: "That upload could not be accepted." }, { status: 400 });
  }

  try {
    await ensureSchema();
    const result = await storeUpload(request, kind, { draftId });
    if ("error" in result) return Response.json({ error: result.error }, { status: result.status });
    return Response.json(result);
  } catch (error) {
    console.error("Application upload failed:", error);
    return Response.json({ error: "The file could not be saved. Please try again." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const draftId = url.searchParams.get("draft") || "";
  const id = url.searchParams.get("id") || "";

  if (!UUID_PATTERN.test(draftId) || !UUID_PATTERN.test(id)) {
    return Response.json({ error: "That file could not be found." }, { status: 400 });
  }

  try {
    await ensureSchema();
    await db()`delete from ncbbc_application_files where id = ${id} and draft_id = ${draftId} and application_id is null`;
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Application upload delete failed:", error);
    return Response.json({ error: "The file could not be removed." }, { status: 500 });
  }
}
