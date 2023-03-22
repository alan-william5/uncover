"use client";

import { useToast } from "@/hooks/use-toast";

export default function RequestAccess() {
  const { toast } = useToast();

  return (
    <button
      className="h-[32px] w-[156px] text-white bg-[#232323] rounded-md font-medium text-[14px]"
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      }}
    >
      Request acccess
    </button>
  );
}
