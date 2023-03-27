import {
  verifyEmailAddress,
  addEmailAddressToDatabase,
  hasEmailAddressBeenChecked,
  addToRedis,
} from "@/lib/api";
import { NextRequest } from "next/server";

export const runtime = "experimental-edge";
export const preferredRegion = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const emailAddress = searchParams.get("emailAddress");

  if (!emailAddress) return new Response("Error", { status: 500 });

  if (await hasEmailAddressBeenChecked(emailAddress)) {
    return new Response("Email address already checked", {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=2678400",
      },
    });
  }

  const verified = await verifyEmailAddress(emailAddress);

  await addToRedis(emailAddress);

  if (verified.status === 200) {
    await addEmailAddressToDatabase(emailAddress);
  }

  return new Response(verified?.message, {
    status: verified?.status,
    headers: {
      "Cache-Control": "s-maxage=2678400",
    },
  });
}
