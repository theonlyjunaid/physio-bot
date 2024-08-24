"use client";
import React from "react";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Iuser } from "@/lib/types/types";
import { Models } from "node-appwrite";
const Verify = ({
  verifyUserAccount,
  getLoggedInUser,
}: {
  verifyUserAccount: (data: { userId: string; secret: string }) => Promise<any>;
  getLoggedInUser: () => Promise<Models.User<Models.Preferences> | null>;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyUser = async () => {
    const user = (await verifyUserAccount({
      userId: searchParams.get("userId")!,
      secret: searchParams.get("secret")!,
    })) as {
      success: boolean;
      message: string;
    };

    if (user.success) {
      console.log(user.message);
      setVerified(true);
      router.push("/onboarding");
    }
    setLoading(false);
  };

  const getUser = async () => {
    const user = await getLoggedInUser();
    if (!user) return router.push("/signup");
    if (user?.emailVerification) {
      setVerified(true);
      router.push("/onboarding");
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
    verifyUser();
  }, [searchParams]);
  return (
    <div>
      {" "}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {loading ? (
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
        ) : verified ? (
          <div className="text-center text-green-500 text-xl font-bold">
            Verification successful! Redirecting...
          </div>
        ) : (
          <div className="text-center text-red-500 text-xl font-bold">
            Verification failed. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
