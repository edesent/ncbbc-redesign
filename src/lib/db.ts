import { neon } from "@neondatabase/serverless";

type Sql = ReturnType<typeof neon>;

let client: Sql | null = null;

/** The site's Postgres database (connection details are saved on the hosting as DATABASE_URL). */
export function db(): Sql {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set.");
    client = neon(url);
  }
  return client;
}

let schemaReady: Promise<void> | null = null;

/** Creates the application tables the first time they are needed. Safe to call on every request. */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = db();
      await sql`
        create table if not exists ncbbc_applications (
          id uuid primary key default gen_random_uuid(),
          created_at timestamptz not null default now(),
          status text not null default 'New',
          first_name text not null,
          last_name text not null,
          email text not null,
          phone text,
          program text,
          answers jsonb not null,
          reference_token text not null unique,
          reference_status text not null default 'Waiting on pastor',
          reference_answers jsonb,
          reference_submitted_at timestamptz,
          admin_notes text
        )`;
      await sql`
        create table if not exists ncbbc_application_files (
          id uuid primary key default gen_random_uuid(),
          created_at timestamptz not null default now(),
          draft_id text,
          application_id uuid references ncbbc_applications(id) on delete cascade,
          kind text not null,
          filename text not null,
          content_type text not null,
          size integer not null,
          data_base64 text not null
        )`;
      await sql`create index if not exists ncbbc_files_draft_idx on ncbbc_application_files (draft_id)`;
      await sql`create index if not exists ncbbc_files_application_idx on ncbbc_application_files (application_id)`;
    })().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }
  return schemaReady;
}

export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
