import React from "react";
import { NavBar } from "../components/home/Navbar";
import { SiteFooter } from "../components/home/Footer";
import Dashboard from "../components/Dashboard/Dashboard";
import { getUserData } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const user = await getUserData();

  if (!user?.is_onboarded) {
    return redirect("/onboarding");
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-blue-600 dark:text-blue-400 mb-8">
          Welcome to Your Dashboard
        </h1>
        <Dashboard user={user} />
      </main>
      <SiteFooter />
    </div>
  );
};

export default DashboardPage;
