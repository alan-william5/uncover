import { verifyEmailAddress, addEmailAddressToDatabase } from "@/lib/api";
// import type { NextRequest } from "next/server";

export const runtime = "experimental-edge";
export const preferredRegion = "edge";

export async function POST(request: Request) {
  const body = await request.json();
  const verified = await verifyEmailAddress(body.emailAddress);
  if (verified.status === 200) {
    await addEmailAddressToDatabase(body.emailAddress);
  }
  return new Response(verified?.message, { status: verified?.status });
}
