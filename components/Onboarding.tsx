"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Iuser } from "@/lib/types/types";
import { useRouter } from "next/navigation";
export function Onboarding({
  onboardUserToDB,
}: {
  onboardUserToDB: ({
    designation,
    city,
    organisation,
    dob,
  }: {
    organisation: string;
    designation: string;
    dob: string;
    city: string;
  }) => Promise<void>;
}) {
  const [formData, setFormData] = useState({
    organisation: "",
    designation: "",
    dob: "",
    city: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { organisation, designation, dob, city } = formData;
      await onboardUserToDB({ organisation, designation, dob, city });
      console.log({ organisation, designation, dob, city });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to onboard user", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Tell us a little about yourself
          </h1>
          <p className="text-muted-foreground">
            Please fill out the following information to continue.
          </p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="organization">Organization</Label>
            <Input
              id="organization"
              placeholder="Enter your organization name"
              required
              value={formData.organisation}
              onChange={(e) =>
                setFormData({ ...formData, organisation: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              placeholder="Enter your designation"
              value={formData.designation}
              required
              onChange={(e) =>
                setFormData({ ...formData, designation: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                type="date"
                id="dob"
                className=""
                required
                placeholder="Enter your date of birth"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Enter your city"
                value={formData.city}
                required
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-2">
            <Button type="submit" className="px-8 w-full">
              Let{"'"}s Go
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
