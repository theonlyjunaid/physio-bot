import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createSessionClient, getUserData } from "@/lib/server/appwrite";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";

export async function NavBar() {
  const user = await getUserData();

  async function signOut() {
    "use server";

    const { account } = await createSessionClient();

    cookies().delete("my-custom-session");
    await account.deleteSession("current");

    redirect("/signup");
  }

  // if (!user?.is_onboarded) return redirect("/onboarding");
  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all border-b`}
    >
      <div className="container flex h-16 items-center justify-between py-4 mx-auto">
        <Link href="/">
          <Image
            src={"/logo.webp"}
            alt="logo"
            width={170}
            height={100}
            loading="eager"
          />
        </Link>

        {user ? (
          <div className="flex gap-5">
            <Link href="/dashboard">
              <Button variant="default">Dashboard</Button>
            </Link>

            <form action={signOut}>
              <Button variant="destructive">Sign Out</Button>
            </form>
          </div>
        ) : (
          <Link href="/signup">
            <Button variant="default">Start Now</Button>
          </Link>
        )}
      </div>
      <div
        className={cn(
          "absolute -bottom-5 z-50 h-10 w-full [mask:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)] before:absolute before:inset-0 before:top-5 before:h-[1px] before:bg-gradient-to-r before:from-[#AE48FF] before:via-[#6C47FF] before:via-[25%] before:to-[#18CCFC] before:opacity-20 before:blur-[2px] after:absolute after:inset-0 after:left-1/2 after:top-5 after:h-[1px] after:w-full after:-translate-x-1/2 after:bg-gradient-to-r after:from-[#AE48FF] after:via-[#6C47FF] after:via-[25%] after:to-[#18CCFC] after:[mask:linear-gradient(90deg,transparent,black,black,transparent)]"
        )}
      />
    </header>
  );
}
