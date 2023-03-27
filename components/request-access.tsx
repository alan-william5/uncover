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
    if (await hasEmailAddressBeenChecked(emailAddress)) {
      toast({
        title: "Email already exists",
      });
      return;
    }

    const verified = await verifyEmailAddress(emailAddress);
    await addToRedis(emailAddress);
    if (verified.status === 200) {
      await addEmailAddressToDatabase(emailAddress);
      toast({
        title: "Email registered for access",
      });
      return;
    }
    // const res = await fetch(
    //   `${whichDomain()}api/register-request-access?emailAddress=${emailAddress}`,
    //   {
    //     method: "GET",
    //     // body: JSON.stringify({ emailAddress }),
    //     // headers: {
    //     //   "Content-Type": "application/json",
    //     // },
    //   }
    // );
    toast({
      title: "Error",
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
