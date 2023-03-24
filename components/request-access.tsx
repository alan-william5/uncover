"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "./button";
import { useCallback, useState } from "react";

export default function RequestAccess({
  emailAddress,
}: {
  emailAddress: string | undefined;
}) {
  const { toast } = useToast();
  const [disabled, setDisable] = useState(false);

  const handleSubmit = useCallback(async () => {
    setDisable(true);
    const res = await fetch(
      "https://uncover-batman-xyz.vercel.app/api/register-request-access",
      {
        method: "POST",
        body: JSON.stringify({ emailAddress }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
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
