import {
  verifyEmailAddress,
  addEmailAddressToDatabase,
  hasEmailAddressBeenChecked,
  addToRedis,
} from "@/lib/api";

export const runtime = "experimental-edge";
export const preferredRegion = "edge";

export async function POST(request: Request) {
  const body = await request.json();
  if (await hasEmailAddressBeenChecked(body.emailAddress))
    return new Response("Email address already checked", { status: 403 });
  const verified = await verifyEmailAddress(body.emailAddress);
  await addToRedis(body.emailAddress);
  if (verified.status === 200) {
    await addEmailAddressToDatabase(body.emailAddress);
  }
  return new Response(verified?.message, { status: verified?.status });
}
