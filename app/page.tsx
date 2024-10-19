import type { Metadata } from "next";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import HeroSection from "./components/home/hero-section";
import { NavBar } from "./components/home/Navbar";
import { HowToGetStarted } from "./components/home/HowToGetStarted";
import FAQs from "./components/home/FaQ";
import { SiteFooter } from "./components/home/Footer";

export default async function Home() {
  // if (!user) redirect("/signup");
  const user = await getLoggedInUser();
  if (user) redirect("/dashboard");

  // redirect("/account");
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <HeroSection />
      {/* <HowToGetStarted /> */}
      <SiteFooter />
    </div>
  );
}
