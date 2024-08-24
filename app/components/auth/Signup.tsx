"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { CgSpinner } from "react-icons/cg";
import { INewUser, Iuser } from "@/lib/types/types";
import { Models } from "node-appwrite";

const Signup = ({
  signUpWithGoogle,
  user,
  createUserAccount,
}: {
  signUpWithGoogle: () => void;
  user: Models.User<Iuser> | null;
  createUserAccount: (user: INewUser) => Promise<unknown>;
}) => {
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
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

  const handleSignup = async () => {
    setLoading(true);
    try {
      await createUserAccount({
        email: newUser.email,
        password: newUser.password, // replace with hashed password
        name: newUser.name,
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
            <h1 className="text-3xl font-bold">Signup</h1>
            <p className="text-muted-foreground">
              Enter your details below to create a new account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="Jhon doe"
                required
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                value={newUser.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>

              {/* <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div> */}
              <Input
                id="password"
                type="password"
                required
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleSignup}
              disabled={loading}
            >
              Signup{" "}
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
            Already Have an account?{" "}
            <Link href="/signin" className="underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
