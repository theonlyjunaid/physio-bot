"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Iuser } from "@/lib/types/types";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
export function Onboarding({
  onboardUserToDB,
}: {
  onboardUserToDB: ({
    age,
    gender,
    occupation,
    city,
  }: {
    age: string;
    gender: string;
    occupation: string;
    city: string;
  }) => Promise<void>;
}) {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    city: "",
    occupation: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Added state for loading

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted

    try {
      const { age, gender, occupation, city } = formData;
      await onboardUserToDB({ age, gender, occupation, city });
      console.log({ age, gender, occupation, city });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to onboard user", error);
    } finally {
      setIsLoading(false); // Set loading to false when function completes
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
            <Label htmlFor="age" className="mb-1">
              Age
            </Label>
            <Select
              onValueChange={(value) => {
                setFormData({
                  ...formData,
                  age: value,
                });
              }}
              value={formData.age}
            >
              <SelectTrigger className="" id="age">
                <SelectValue placeholder="age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-5">0-5</SelectItem>
                <SelectItem value="6-12">6-12</SelectItem>
                <SelectItem value="13-18">13-18</SelectItem>
                <SelectItem value="19-29">19-29</SelectItem>
                <SelectItem value="30-39">30-39</SelectItem>
                <SelectItem value="40-49">40-49</SelectItem>
                <SelectItem value="50-59">50-59</SelectItem>
                <SelectItem value="60-69">60-69</SelectItem>
                <SelectItem value="70+">70+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gender" className="mb-1">
              Gender
            </Label>
            <Select
              onValueChange={(value) => {
                setFormData({
                  ...formData,
                  gender: value,
                });
              }}
              value={formData.gender}
            >
              <SelectTrigger className="" id="gender">
                <SelectValue placeholder="gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="occupation" className="mb-1">
                Occupation
              </Label>
              <Select
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    occupation: value,
                  });
                }}
                value={formData.occupation}
              >
                <SelectTrigger className="mb-2" id="occupation">
                  <SelectValue placeholder="occupation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Manual Worker">Manual Worker</SelectItem>
                  <SelectItem value="Office Worker">Office Worker</SelectItem>
                  <SelectItem value="Healthcare Worker">
                    Healthcare Worker
                  </SelectItem>
                  <SelectItem value="Educator">Educator</SelectItem>
                  <SelectItem value="Self Employed">Self Employed</SelectItem>
                  <SelectItem value="Housewife">Housewife</SelectItem>
                  <SelectItem value="Unemployed">Unemployed</SelectItem>
                  <SelectItem value="Retired">Retired</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
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
            <Button
              type="submit"
              className="px-8 w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                ""
              )}
              Let's Go
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
