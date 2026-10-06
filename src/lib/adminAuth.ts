import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// The admissions review pages are protected by one shared password,
// saved on the hosting as ADMISSIONS_REVIEW_PASSWORD (never in the code).

export const REVIEW_COOKIE = "ncbbc_review";

export function reviewPassword() {
  return process.env.ADMISSIONS_REVIEW_PASSWORD || "";
}

function sessionValue(password: string) {
  return createHmac("sha256", password).update("ncbbc-admissions-review-v1").digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function passwordMatches(attempt: string) {
  const password = reviewPassword();
  if (!password || !attempt) return false;
  return safeEqual(sessionValue(attempt), sessionValue(password));
}

export function newSessionValue() {
  return sessionValue(reviewPassword());
}

export async function isReviewer() {
  const password = reviewPassword();
  if (!password) return false;
  const store = await cookies();
  const value = store.get(REVIEW_COOKIE)?.value || "";
  return safeEqual(value, sessionValue(password));
}
