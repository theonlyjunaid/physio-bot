import React from "react";
import { NavBar } from "../components/home/Navbar";
import { SiteFooter } from "../components/home/Footer";
import Dashboard from "../components/Dashboard/Dashboard";
import { getUserData } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getUserData();
  console.log(user?.conversations);
  if (!user?.is_onboarded) return redirect("/onboarding");
  return (
    <div className="min-h-screen">
      <NavBar />
      <Dashboard user={user} />
      <SiteFooter />
    </div>
  );
};

export default page;
