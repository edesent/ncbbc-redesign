import { db, ensureSchema } from "@/lib/db";
import { storeUpload } from "@/lib/uploads";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) {
    return Response.json({ error: "This reference link is not valid." }, { status: 404 });
  }

  try {
    await ensureSchema();
    const rows = (await db()`select id, reference_status from ncbbc_applications where reference_token = ${token}`) as { id: string; reference_status: string }[];
    const application = rows[0];
    if (!application) return Response.json({ error: "This reference link is not valid." }, { status: 404 });
    if (application.reference_status === "Received") {
      return Response.json({ error: "This reference has already been received." }, { status: 409 });
    }

    const result = await storeUpload(request, "pastor_letter", { applicationId: application.id });
    if ("error" in result) return Response.json({ error: result.error }, { status: result.status });
    return Response.json(result);
  } catch (error) {
    console.error("Reference upload failed:", error);
    return Response.json({ error: "The letter could not be saved. Please try again." }, { status: 500 });
  }
}
