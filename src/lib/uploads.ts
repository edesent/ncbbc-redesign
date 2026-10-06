import { ALLOWED_TYPES, MAX_FILE_BYTES, MAX_FILES_PER_APPLICATION, resolveContentType, type UploadKind } from "@/lib/applicationConfig";
import { db } from "@/lib/db";

export type StoredFile = { id: string; filename: string; size: number; kind: UploadKind };

type Owner = { draftId: string } | { applicationId: string };

function cleanFilename(raw: string) {
  const name = raw.replace(/[\\/:*?"<>|\u0000-\u001f]+/g, " ").replace(/\s+/g, " ").trim();
  return (name || "document").slice(0, 120);
}

/** Reads one uploaded file from the request body and saves it privately in the database. */
export async function storeUpload(request: Request, kind: UploadKind, owner: Owner): Promise<StoredFile | { error: string; status: number }> {
  const rawName = request.headers.get("x-filename") || "document";
  let filename = rawName;
  try {
    filename = decodeURIComponent(rawName);
  } catch {
    // keep the raw name
  }
  filename = cleanFilename(filename);

  const contentType = resolveContentType(filename, request.headers.get("content-type"));
  if (!ALLOWED_TYPES[kind].includes(contentType)) {
    return {
      error: kind === "photo" ? "Please choose a photo (JPG, PNG, or HEIC)." : "Please choose a PDF, Word document, or photo.",
      status: 415,
    };
  }

  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > MAX_FILE_BYTES + 1024) {
    return { error: "That file is larger than 4 MB. Please choose a smaller file.", status: 413 };
  }

  const bytes = Buffer.from(await request.arrayBuffer());
  if (bytes.length === 0) return { error: "That file appears to be empty.", status: 400 };
  if (bytes.length > MAX_FILE_BYTES) {
    return { error: "That file is larger than 4 MB. Please choose a smaller file.", status: 413 };
  }

  const sql = db();
  const draftId = "draftId" in owner ? owner.draftId : null;
  const applicationId = "applicationId" in owner ? owner.applicationId : null;

  const countRows = draftId
    ? await sql`select count(*)::int as n from ncbbc_application_files where draft_id = ${draftId} and application_id is null`
    : await sql`select count(*)::int as n from ncbbc_application_files where application_id = ${applicationId}`;
  const existing = Number((countRows as { n: number }[])[0]?.n || 0);
  if (existing >= MAX_FILES_PER_APPLICATION + (applicationId ? 4 : 0)) {
    return { error: "Too many files have been added. Please remove one first.", status: 400 };
  }

  const rows = (await sql`
    insert into ncbbc_application_files (draft_id, application_id, kind, filename, content_type, size, data_base64)
    values (${draftId}, ${applicationId}, ${kind}, ${filename}, ${contentType}, ${bytes.length}, ${bytes.toString("base64")})
    returning id`) as { id: string }[];

  // Tidy up files from applications that were started but never sent.
  await sql`delete from ncbbc_application_files where application_id is null and created_at < now() - interval '3 days'`;

  return { id: rows[0].id, filename, size: bytes.length, kind };
}
