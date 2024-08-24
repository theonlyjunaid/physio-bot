import { Onboarding } from "@/components/Onboarding";
import { getUserData, onboardUser } from "@/lib/server/appwrite";
import { Iuser } from "@/lib/types/types";
import React from "react";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getUserData();
  if (!user) redirect("/signup");
  if (user?.is_onboarded) return redirect("/dashboard");

  const onboardUserToDB = async ({
    organisation,
    designation,
    dob,
    city,
  }: {
    organisation: string;
    designation: string;
    dob: string;
    city: string;
  }) => {
    "use server";
    const user = await onboardUser({
      designation,
      city,
      organisation,
      dob,
    });
    console.log(user);
  };
  return (
    <div>
      <Onboarding onboardUserToDB={onboardUserToDB} />
    </div>
  );
};

export default page;
