import { useState } from "react";
import { Input } from "./input";
import RequestAccess from "./request-access";

export function HandleRequestAccess() {
  const [emailAddress, setEmailAddress] = useState<string | undefined>(
    undefined
  );

  return (
    <div className="py-10 flex flex-col md:flex-row w-full space-y-2 md:space-x-2 max-w-xl items-center">
      <Input
        onChange={(e) => setEmailAddress(e.target.value)}
        type="email"
        className="bg-[#F8F8F8] h-[32px] px-4 rounded-md xl:w-2/3 w-full"
        placeholder="email address"
      />
      <RequestAccess emailAddress={emailAddress} />
    </div>
  );
}
