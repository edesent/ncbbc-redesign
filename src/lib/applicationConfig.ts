// Settings shared by the application form (in the browser) and the server.

export const MAX_FILE_BYTES = 4 * 1024 * 1024; // 4 MB per file (hosting limit is 4.5 MB per request)
export const MAX_FILES_PER_APPLICATION = 10;

export type UploadKind = "photo" | "transcript" | "bible_program" | "other" | "pastor_letter";

export const UPLOAD_KIND_LABELS: Record<UploadKind, string> = {
  photo: "Current photo",
  transcript: "College transcript",
  bible_program: "Two-year Bible program proof",
  other: "Other document",
  pastor_letter: "Pastoral reference letter",
};

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ...IMAGE_TYPES,
];

export const ALLOWED_TYPES: Record<UploadKind, string[]> = {
  photo: IMAGE_TYPES,
  transcript: DOCUMENT_TYPES,
  bible_program: DOCUMENT_TYPES,
  other: DOCUMENT_TYPES,
  pastor_letter: DOCUMENT_TYPES,
};

const EXTENSION_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  heic: "image/heic",
  heif: "image/heif",
};

/** Some phones send no file type (HEIC photos especially), so fall back to the file extension. */
export function resolveContentType(filename: string, reported: string | null | undefined) {
  const type = (reported || "").toLowerCase().split(";")[0].trim();
  if (type && type !== "application/octet-stream") return type;
  const ext = filename.toLowerCase().split(".").pop() || "";
  return EXTENSION_TYPES[ext] || type || "application/octet-stream";
}

export function acceptAttribute(kind: UploadKind) {
  return kind === "photo"
    ? "image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
    : ".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.heic,.heif";
}

export const PROGRAM_OPTIONS = [
  "Bachelor of Ministry",
  "Master of Ministry",
  "Doctor of Ministry",
  "Not sure yet",
];

export const APPLICATION_STATUSES = ["New", "Under review", "Waiting on documents", "Accepted", "Declined"];

export const RECOMMENDATION_OPTIONS = [
  "I recommend this applicant without reservation",
  "I recommend this applicant with some reservations",
  "I do not recommend this applicant at this time",
];

// Every question on the form, in the order admissions will read it.
export const APPLICATION_FIELDS: { key: string; label: string; section: string; required?: boolean; long?: boolean }[] = [
  { section: "Personal Information", key: "firstName", label: "First name", required: true },
  { section: "Personal Information", key: "lastName", label: "Last name", required: true },
  { section: "Personal Information", key: "email", label: "Email", required: true },
  { section: "Personal Information", key: "phone", label: "Phone", required: true },
  { section: "Personal Information", key: "dob", label: "Date of birth", required: true },
  { section: "Personal Information", key: "gender", label: "Gender", required: true },
  { section: "Personal Information", key: "street", label: "Street address", required: true },
  { section: "Personal Information", key: "city", label: "City", required: true },
  { section: "Personal Information", key: "state", label: "State", required: true },
  { section: "Personal Information", key: "zip", label: "ZIP code", required: true },
  { section: "Personal Information", key: "program", label: "Program of interest", required: true },
  { section: "Church & Ministry", key: "ifbMember", label: "Member of an Independent Fundamental Baptist church?", required: true },
  { section: "Church & Ministry", key: "churchName", label: "Church name", required: true },
  { section: "Church & Ministry", key: "churchLocation", label: "Church city and state", required: true },
  { section: "Church & Ministry", key: "pastorName", label: "Pastor's name", required: true },
  { section: "Church & Ministry", key: "pastorEmail", label: "Pastor's email", required: true },
  { section: "Church & Ministry", key: "pastorPhone", label: "Pastor's phone" },
  { section: "Church & Ministry", key: "involvement", label: "Church involvement", required: true, long: true },
  { section: "Education", key: "highSchoolName", label: "High school name", required: true },
  { section: "Education", key: "highSchoolLocation", label: "High school city and state", required: true },
  { section: "Education", key: "highSchoolGraduation", label: "High school graduation year", required: true },
  { section: "Education", key: "hasDegree", label: "Degree from another college?", required: true },
  { section: "Education", key: "college1", label: "College 1" },
  { section: "Education", key: "degree1", label: "Degree 1" },
  { section: "Education", key: "dates1", label: "Dates attended 1" },
  { section: "Education", key: "college2", label: "College 2" },
  { section: "Education", key: "degree2", label: "Degree 2" },
  { section: "Education", key: "dates2", label: "Dates attended 2" },
  { section: "Character & Testimony", key: "probation", label: "Ever dismissed or placed on academic or disciplinary probation?", required: true },
  { section: "Character & Testimony", key: "probationExplain", label: "Explanation", long: true },
  { section: "Character & Testimony", key: "testimony", label: "Personal testimony", required: true, long: true },
  { section: "Signature", key: "signature", label: "Typed signature", required: true },
];
