"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Models } from "node-appwrite";
import { useEffect, useState } from "react";
import { Iuser } from "@/lib/types/types";
import { CgSpinner } from "react-icons/cg";

export default function Reset({
  setPasswordByResetLink,
  user,
}: {
  setPasswordByResetLink: ({
    userId,
    secret,
    password,
  }: {
    userId: string;
    secret: string;
    password: string;
  }) => Promise<{ success: boolean; message: string } | null>;
  user: Models.User<Iuser> | null;
}) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const handleReset = async () => {
    setLoading(true);
    try {
      await setPasswordByResetLink({
        userId: searchParams.get("userId")!,
        secret: searchParams.get("secret")!,
        password: password,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Failed to sign up with Google. Please try again later.");
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]">
      {/* <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div> */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className=" text-muted-foreground">
              Enter your new password below to reset your password.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleReset}>
              Submit{" "}
              {loading && (
                <span className="ml-2 text-gray-500 animate-spin">
                  <CgSpinner />
                </span>
              )}
            </Button>
          </div>
          <div className="mt-2 text-center text-sm">
            Don&apos;t remember your email?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
