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
    age,
    gender,
    occupation,
    city,
  }: {
    age: string;
    gender: string;
    occupation: string;
    city: string;
  }) => {
    "use server";
    const user = await onboardUser({
      age,
      gender,
      occupation,
      city,
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
