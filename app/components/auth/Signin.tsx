"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Models } from "node-appwrite";
import { Iuser } from "@/lib/types/types";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";

const Signin = ({
  signUpWithGoogle,
  user,
  signInAccount,
}: {
  signUpWithGoogle: () => void;
  user: Models.User<Iuser> | null;
  signInAccount: (user: {
    email: string;
    password: string;
  }) => Promise<Models.Session | undefined>;
}) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleGoogleSubmit = async () => {
    setLoading(true);
    try {
      await signUpWithGoogle();
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Failed to sign up with Google. Please try again later.");
    }
  };
  const handleSignin = async () => {
    setLoading(true);
    try {
      await signInAccount({
        email: userData.email,
        password: userData.password, // replace with hashed password
      });
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

      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleSignin}
              disabled={loading}
            >
              Login
              {loading && (
                <span className="ml-2 text-gray-500 animate-spin">
                  <CgSpinner />
                </span>
              )}
            </Button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGoogleSubmit();
              }}
              className="text-center"
            >
              <Button
                variant="outline"
                className="w-full flex gap-2"
                disabled={loading}
              >
                <FcGoogle size={28} />
                Continue with Google
                {loading && (
                  <span className="ml-2 text-gray-500 animate-spin">
                    <CgSpinner />
                  </span>
                )}
              </Button>
            </form>
          </div>
          <div className="mt-2 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
