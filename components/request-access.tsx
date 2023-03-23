"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "./button";

export default function RequestAccess() {
  const { toast } = useToast();

  return (
    <Button
      className="h-[32px] xl:w-1/3 w-full text-white bg-[#232323] rounded-md font-medium text-[14px]"
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      }}
    >
      Request acccess
    </Button>
  );
}
