"use server";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createSessionClient, getUserData } from "@/lib/server/appwrite";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import { LogOut } from "lucide-react";
import Script from "next/script";

export async function NavBar({ className }: { className?: string }) {
  const user = await getUserData();

  async function signOut() {
    "use server";
    const { account } = await createSessionClient();
    cookies().delete("my-custom-session");
    await account.deleteSession("current");
    redirect("/signup");
  }

  return (
    <header className={cn("sticky top-0 z-50 w-full bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 backdrop-blur-lg", className)}>
      <Script id="google-analytics">
        {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-ZP6BCLZZ2H');`}
      </Script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZP6BCLZZ2H" />
      <div className="container flex h-16 items-center justify-between py-6 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/physio_logo.webp"
            alt="PhysioAI Logo"
            width={150}
            height={150}
            className="object-contain"
            priority
          />
        </Link>


        {user ? (
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <form action={signOut}>
              <Button variant="destructive">
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Sign Out</span>
              </Button>
            </form>
          </div>
        ) : (
          <Link href="/signup">
            <Button variant={"outline"} className="border-blue-600 text-blue-600 hover:bg-blue-100">Get Started</Button>
          </Link>
        )}
      </div>
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
      )} />
    </header>
  );
}
