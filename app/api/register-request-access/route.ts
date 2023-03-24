import { verifyEmailAddress } from "@/lib/api";

export async function POST(request: Request) {
  const body = await request.json();
  const verified = await verifyEmailAddress(body.emailAddress);
  return new Response(verified?.message, { status: verified?.status });
}
