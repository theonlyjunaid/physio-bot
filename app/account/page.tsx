// src/app/account/page.jsx

import { createSessionClient, getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NavBar } from "../components/home/Navbar";
import { SiteFooter } from "../components/home/Footer";

async function signOut() {
  "use server";

  const { account } = await createSessionClient();

  cookies().delete("my-custom-session");
  await account.deleteSession("current");

  redirect("/signup");
}

export default async function HomePage() {
  const user = await getLoggedInUser();
  if (!user) redirect("/signup");

  return (
    <>
      <NavBar />
      <ul>
        <li>
          <strong>Email:</strong> {user?.email}
        </li>
        <li>
          <strong>Name:</strong> {user?.name}
        </li>
        <li>
          <strong>ID: </strong> {user?.$id}
        </li>
      </ul>

      <form action={signOut}>
        <button type="submit">Sign out</button>
      </form>
      <SiteFooter />
    </>
  );
}
