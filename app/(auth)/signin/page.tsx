import { getLoggedInUser, signInAccount } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { signUpWithGoogle } from "@/lib/server/oauth";
import Signin from "../../components/auth/Signin";

export default async function SignUpPage() {
  const user = await getLoggedInUser();
  if (user) redirect("/dashboard");

  return (
    <>
      <Signin
        signUpWithGoogle={signUpWithGoogle}
        user={user}
        signInAccount={signInAccount}
      />
    </>
  );
}
