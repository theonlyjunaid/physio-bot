import Verify from "@/app/components/auth/Verify";
import { getLoggedInUser, verifyUserAccount } from "@/lib/server/appwrite";

import { redirect } from "next/navigation";

export default async function VerifyPage() {
  const user = await getLoggedInUser();
  if (!user) redirect("/signup");
  return (
    <div>
      <Verify
        getLoggedInUser={getLoggedInUser}
        verifyUserAccount={verifyUserAccount}
      />
    </div>
  );
}
