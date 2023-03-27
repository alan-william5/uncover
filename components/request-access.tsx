"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "./button";
import { useCallback, useState } from "react";
import {
  addEmailAddressToDatabase,
  addToRedis,
  hasEmailAddressBeenChecked,
  verifyEmailAddress,
} from "@/lib/api";

function whichDomain() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview")
    return "https://preview.uncover.ws/";
  else if (process.env.NEXT_PUBLIC_VERCEL_ENV === "development")
    return "http://localhost:3000/";

  return "https://uncover.ws/";
}

export default function RequestAccess({
  emailAddress,
}: {
  emailAddress: string | undefined;
}) {
  const { toast } = useToast();
  const [disabled, setDisable] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!emailAddress) return;
    setDisable(true);
    const res = await fetch(
      `${whichDomain()}api/register-request-access?emailAddress=${emailAddress}`,
      {
        method: "GET",
      }
    );
    toast({
      title: `${await res.text()}`,
    });
    setDisable(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailAddress]);

  return (
    <Button
      className="h-[32px] xl:w-1/3 w-full text-white bg-[#232323] rounded-md font-medium text-[14px]"
      onClick={handleSubmit}
      disabled={disabled}
    >
      Request acccess
    </Button>
  );
}
