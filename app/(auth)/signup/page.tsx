import { createUserAccount, getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { signUpWithGoogle } from "@/lib/server/oauth";
import Signup from "../../components/auth/Signup";
export default async function SignUpPage() {
  const user = await getLoggedInUser();
  if (user) redirect("/dashboard");

  return (
    <>
      <Signup
        signUpWithGoogle={signUpWithGoogle}
        user={user}
        createUserAccount={createUserAccount}
      />
    </>
  );
}
