// src/app/signup/page.tsx

import { getLoggedInUser, sendPasswordResetLink } from "@/lib/server/appwrite";
// import { ID } from "node-appwrite";
// import { createAdminClient } from "@/lib/server/appwrite";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signUpWithGoogle } from "@/lib/server/oauth";
// import { FormEvent } from "react";
import Forgot from "@/app/components/auth/Forgot";

export default async function SignUpPage() {
  const user = await getLoggedInUser();
  if (user) redirect("/dashboard");

  return (
    <>
      {/* <Auth signUpWithGoogle={signUpWithGoogle} /> */}
      <Forgot sendPasswordResetLink={sendPasswordResetLink} user={user} />
    </>
  );
}
