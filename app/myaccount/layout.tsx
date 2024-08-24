import { Metadata } from "next";
import Image from "next/image";
import { SidebarNav } from "./components/side-nav";
import { Separator } from "@/components/ui/separator";
import { NavBar } from "../components/home/Navbar";
import { SiteFooter } from "../components/home/Footer";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/myaccount",
  },
  {
    title: "Account",
    href: "/myaccount/account",
  },

  {
    title: "Notifications",
    href: "/myaccount/notifications",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const user = await getLoggedInUser();
  if (!user) redirect("/signup");
  return (
    <>
      <NavBar />

      <div className=" space-y-6 p-10 md:px-20 lg:px-28 pb-16 ">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
