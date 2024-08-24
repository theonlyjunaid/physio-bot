"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { CgSpinner } from "react-icons/cg";

const Auth = ({ signUpWithGoogle }: { signUpWithGoogle: () => void }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await signUpWithGoogle();
    } catch (error) {
      alert("Failed to sign up with Google. Please try again later.");
    }
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <div className=" p-8 rounded-lg shadow-md border border-neutral-700 max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Welcome to BridgeIN
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="text-center"
        ></form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="text-center"
        >
          <Button
            className="flex gap-2 border shadow mx-auto mb-4 text-lg py-5"
            variant="secondary"
            type="submit"
          >
            <FcGoogle size={28} />
            Continue with Google
            {loading && (
              <span className="ml-2 text-gray-500 animate-spin">
                <CgSpinner />
              </span>
            )}
          </Button>
          <p>
            We welcome you to BridgeIN, a platform that solves Your startup
            funds issues
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
