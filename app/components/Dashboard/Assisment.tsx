"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Iuser } from "@/lib/types/types";
import { createAssisment } from "@/lib/server/appwrite";
import { Loader2 } from "lucide-react";

const Assignment = ({ user }: { user: Iuser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [assisment, setAssisment] = useState({
    for: "",
    name: "",
    age: "",
    gender: "",
    occupation: "",
    locationOfPain: [] as string[],
    durationOfPain: "",
    painStartedFrom: "",
    isRadiateToOtherPart: "",
    customerProblem: [] as string[],
    painIncreasesWhen: [] as string[],
    painPattern: "",
    qualityOfPain: "",
    severityOfPain: "",
    preExistingCondition: [] as string[],
    familyMadicalHistoryOfSameProblem: "",
    symptomExperienced: [] as string[],
    bodyTemperature: "",
    userInput: "",
  });

  const [step, setStep] = useState(0);

  const validateField = (field: string, value: string | string[]) => {
    if (Array.isArray(value) && value.length === 0) {
      setErrors(prev => ({ ...prev, [field]: "This field is required" }));
      return false;
    }
    if (!value) {
      setErrors(prev => ({ ...prev, [field]: "This field is required" }));
      return false;
    }
    setErrors(prev => ({ ...prev, [field]: "" }));
    return true;
  };

  const submitAssisment = async () => {
    // Validate all fields before submission
    const fieldsToValidate = Object.keys(assisment);
    const isValid = fieldsToValidate.every(field => validateField(field, assisment[field as keyof typeof assisment]));

    if (!isValid) {
      return;
    }

    try {
      setIsLoading(true);
      console.log(assisment);
      const res = await fetch(`/api/assistants/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assisment),
      });
      const data = await res.json();
      const convo = await createAssisment({
        name: assisment.name,
        age: assisment.age,
        gender: assisment.gender,
        occupation: assisment.occupation,
        locationOfPain: assisment.locationOfPain.join(", "),
        durationOfPain: assisment.durationOfPain,
        painStartedFrom: assisment.painStartedFrom,
        customerProblem: assisment.customerProblem.join(", "),
        painIncreasesWhen: assisment.painIncreasesWhen.join(", "),
        painPattern: assisment.painPattern,
        qualityOfPain: assisment.qualityOfPain,
        severityOfPain: assisment.severityOfPain,
        preExistingCondition: assisment.preExistingCondition.join(", "),
        familyMadicalHistoryOfSameProblem:
          assisment.familyMadicalHistoryOfSameProblem,
        symptomExperienced: assisment.symptomExperienced.join(", "),
        bodyTemperature: assisment.bodyTemperature,
        userInput: assisment.userInput,
        isRadiateToOtherPart: assisment.isRadiateToOtherPart,
        threadId: data.threadId,
      });

      if (convo) {
        router.push(`/dashboard/${convo.$id}`);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setAssisment(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleMultiSelectChange = (field: string, value: string[]) => {
    setAssisment(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  return (
    <div>
      {assisment.for == "" && (
        <Card className=" border-0 shadow-none">
          <CardHeader>
            <CardTitle>For Who?</CardTitle>
            <CardDescription>For Who this assessment is?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto grid w-full gap-5 md:md:grid-cols-2">
              <div
                className="flex h-[20vh] w-full cursor-pointer items-center  justify-center rounded-md border p-5  text-center  text-2xl font-semibold transition-transform duration-300 ease-in-out hover:shadow-lg"
                onClick={() => {
                  setStep(1);
                  setAssisment({
                    ...assisment,
                    for: "myself",
                    name: user.name,
                    age: user.age,
                    gender: user.gender,
                    occupation: user.occupation,
                  });
                  setStep(2);
                }}
              >
                MySelf
              </div>
              <div
                className="flex h-[20vh] w-full cursor-pointer items-center  justify-center rounded-md border p-5  text-center  text-2xl font-semibold transition-transform duration-300 ease-in-out hover:shadow-lg"
                onClick={() => {
                  setStep(1);
                  setAssisment({
                    ...assisment,
                    for: "someoneElse",
                  });
                }}
              >
                For Someone Else
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {assisment.for == "someoneElse" && step == 1 && (
        <Card className=" border-0  shadow-none">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Personal Information about the person who is taking this
              assessment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="name" className="mb-1">
              Patient Name
            </Label>
            <Input
              type="text"
              placeholder="name"
              id="name"
              value={assisment.name}
              className="mb-2"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            <div className="mb-2 grid w-full md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <Label htmlFor="age" className="mb-1">
                  Age
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange("age", value)}
                  value={assisment.age}
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
                {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
              </div>
              <div>
                <Label htmlFor="gender" className="mb-1">
                  Gender
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange("gender", value)}
                  value={assisment.gender}
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
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>
            </div>
            <Label htmlFor="occupation" className="mb-1">
              Occupation
            </Label>
            <Select
              onValueChange={(value) => handleInputChange("occupation", value)}
              value={assisment.occupation}
            >
              <SelectTrigger className="" id="occupation">
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
            {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation}</p>}
          </CardContent>
          <CardFooter className="flex gap-2 md:gap-4">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                setStep(0);

                setAssisment({
                  ...assisment,
                  for: "",
                });
              }}
            >
              Back
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                if (validateField("name", assisment.name) &&
                  validateField("age", assisment.age) &&
                  validateField("gender", assisment.gender) &&
                  validateField("occupation", assisment.occupation)) {
                  setStep(2);
                }
              }}
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      )}
      {step == 2 && (
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle>Present Complaint</CardTitle>
            <CardDescription>
              Present Complaint about the person who is taking this assessment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="locationOfPain" className="mb-1">
              Location of pain{" "}
            </Label>
            <Select
              onValueChange={(value) => handleMultiSelectChange("locationOfPain", value.split(','))}
              value={assisment.locationOfPain.join(',')}
            >
              <SelectTrigger className="" id="locationOfPain">
                <SelectValue placeholder="Select locations" />
              </SelectTrigger>
              <SelectContent>
                {["neck", "shoulder", "arm", "elbow", "wrist", "hand", "upper back", "lower back", "hip", "thigh", "knee", "shin calf", "ankle", "foot", "other"].map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.locationOfPain && <p className="text-red-500 text-sm">{errors.locationOfPain}</p>}

            <div className="mb-2 mt-1 grid w-full md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <Label htmlFor="durationOfPain" className="mb-1">
                  Duration of pain
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange("durationOfPain", value)}
                  value={assisment.durationOfPain}
                >
                  <SelectTrigger className="" id="durationOfPain">
                    <SelectValue placeholder="Duration Of Pain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less than 24 hours">
                      Less than 24 hours
                    </SelectItem>
                    <SelectItem value="1-2 days">1-2 Days</SelectItem>
                    <SelectItem value="3-7 days">3-7 Days</SelectItem>
                    <SelectItem value="1-2 week">1-2 Weeks</SelectItem>
                    <SelectItem value="3-4 week">3-4 Weeks</SelectItem> .
                    <SelectItem value="1-2 month">1-2 Months</SelectItem>
                    <SelectItem value="3-6 month">3-6 Months</SelectItem>
                    <SelectItem value="6-12 month">6-12 Months</SelectItem>
                    <SelectItem value="1-2 year">1-2 Years</SelectItem>
                    <SelectItem value="2-3 year">2-3 Years</SelectItem>
                    <SelectItem value="3-5 year">3-5 Years</SelectItem>
                    <SelectItem value="5-10 year">5-10 Years</SelectItem>
                    <SelectItem value="10+ year">10+ Years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.durationOfPain && <p className="text-red-500 text-sm">{errors.durationOfPain}</p>}
              </div>
              <div>
                <Label htmlFor="painStartedFrom" className="mb-1">
                  Pain Started From
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange("painStartedFrom", value)}
                  value={assisment.painStartedFrom}
                >
                  <SelectTrigger className="" id="painStartedFrom">
                    <SelectValue placeholder="Pain Started From" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="injury">Injury</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="household activity">
                      Household Activity
                    </SelectItem>
                    <SelectItem value="weight lifting activity">
                      Weight Lifting Activity
                    </SelectItem>
                    <SelectItem value="less flexibility in muscle">
                      Less Flexibility In Muscle
                    </SelectItem>
                    <SelectItem value="age factor">Age Factor</SelectItem>
                    <SelectItem value="unknown factor">
                      Unknown Factor
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.painStartedFrom && <p className="text-red-500 text-sm">{errors.painStartedFrom}</p>}
              </div>
            </div>
            <div className="mb-2 mt-1 grid w-full md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <Label htmlFor="isRadiateToOtherPart" className="mb-1">
                  Is Radiate To Other Part?
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange("isRadiateToOtherPart", value)}
                  value={assisment.isRadiateToOtherPart}
                >
                  <SelectTrigger className="" id="isRadiateToOtherPart">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
                {errors.isRadiateToOtherPart && <p className="text-red-500 text-sm">{errors.isRadiateToOtherPart}</p>}
              </div>
              <div>
                <Label htmlFor="customerProblem" className="mb-1">
                  Customer Problem
                </Label>
                <Select
                  onValueChange={(value) => handleMultiSelectChange("customerProblem", value.split(','))}
                  value={assisment.customerProblem.join(',')}
                >
                  <SelectTrigger className="" id="customerProblem">
                    <SelectValue placeholder="Select problems" />
                  </SelectTrigger>
                  <SelectContent>
                    {["difficulty walking", "difficulty standing", "difficulty sitting", "difficulty sleeping", "difficulty lifting objects", "difficulty bending", "difficulty reaching", "general weakness", "limited range of motion", "other"].map((problem) => (
                      <SelectItem key={problem} value={problem}>{problem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.customerProblem && <p className="text-red-500 text-sm">{errors.customerProblem}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 md:gap-4">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                if (assisment.for == "someoneElse") {
                  setStep(1);
                } else {
                  setStep(0);
                  setAssisment({
                    ...assisment,
                    for: "",
                  });
                }
              }}
            >
              Back
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                if (validateField("locationOfPain", assisment.locationOfPain) &&
                  validateField("durationOfPain", assisment.durationOfPain) &&
                  validateField("painStartedFrom", assisment.painStartedFrom) &&
                  validateField("isRadiateToOtherPart", assisment.isRadiateToOtherPart) &&
                  validateField("customerProblem", assisment.customerProblem)) {
                  setStep(3);
                }
              }}
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      )}
      {step == 3 && (
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle>Pain Characteristics</CardTitle>
            <CardDescription>
              Select a Characteristics of your pain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="painIncreasesWhen" className="mb-1">
              When Pain Increases{" "}
            </Label>
            <Select
              onValueChange={(value) => handleMultiSelectChange("painIncreasesWhen", value.split(','))}
              value={assisment.painIncreasesWhen.join(',')}
            >
              <SelectTrigger className="" id="painIncreasesWhen">
                <SelectValue placeholder="Select conditions" />
              </SelectTrigger>
              <SelectContent>
                {["during any activity", "when moving", "during rest", "during exercise", "during sleep", "at night", "in the morning", "during both activity and rest", "with specific movements"].map((condition) => (
                  <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.painIncreasesWhen && <p className="text-red-500 text-sm">{errors.painIncreasesWhen}</p>}

            <div className="mb-2 mt-1 grid w-full md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <Label htmlFor="painPattern" className="mb-1">
                  Pattern of pain
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange("painPattern", value)}
                  value={assisment.painPattern}
                >
                  <SelectTrigger className="" id="painPattern">
                    <SelectValue placeholder="Pattern Of Pain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consistant">Consistent</SelectItem>
                    <SelectItem value="episodic">episodic</SelectItem>
                    <SelectItem value="recurring">Recurring</SelectItem>
                    <SelectItem value="occasional">occasional</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                  </SelectContent>
                </Select>
                {errors.painPattern && <p className="text-red-500 text-sm">{errors.painPattern}</p>}
              </div>
              <div>
                <Label htmlFor="qualityOfPain" className="mb-1">
                  Quality Of Pain{" "}
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange("qualityOfPain", value)}
                  value={assisment.qualityOfPain}
                >
                  <SelectTrigger className="" id="qualityOfPain">
                    <SelectValue placeholder="Quality Of Pain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="muscle aching pain">
                      muscle aching pain
                    </SelectItem>
                    <SelectItem value="burning">burning</SelectItem>
                    <SelectItem value="tingling pin pricking">
                      tingling pin pricking
                    </SelectItem>
                    <SelectItem value="sharp pain">sharp pain</SelectItem>
                    <SelectItem value="dull pain">dull pain</SelectItem>
                    <SelectItem value="throbbing pain">
                      throbbing pain
                    </SelectItem>
                    <SelectItem value="stiffness">stiffness</SelectItem>
                    <SelectItem value="other">other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.qualityOfPain && <p className="text-red-500 text-sm">{errors.qualityOfPain}</p>}
              </div>
            </div>

            <Label htmlFor="severityOfPain" className="mb-1">
              Rate your pain
            </Label>
            <Select
              onValueChange={(value) => handleInputChange("severityOfPain", value)}
              value={assisment.severityOfPain}
            >
              <SelectTrigger className="" id="severityOfPain">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 (No pain)</SelectItem>
                <SelectItem value="1">1 (Mild pain)</SelectItem>
                <SelectItem value="2">2 (Moderate pain)</SelectItem>
                <SelectItem value="3">3 (Severe pain)</SelectItem>
                <SelectItem value="4">4 (Extreme pain)</SelectItem>
                <SelectItem value="5">5 (Very severe pain)</SelectItem>
                <SelectItem value="6">6 (Life-threatening pain)</SelectItem>
                <SelectItem value="7">7 (Incapacitating pain)</SelectItem>
                <SelectItem value="8">8 (Unbearable pain)</SelectItem>
                <SelectItem value="9">9 (Uncontrollable pain)</SelectItem>
                <SelectItem value="10">
                  10 (Uncontrollable pain and unable to do anything)
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.severityOfPain && <p className="text-red-500 text-sm">{errors.severityOfPain}</p>}
          </CardContent>
          <CardFooter className="flex gap-2 md:gap-4">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                setStep(2);
              }}
            >
              Back
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                if (validateField("painIncreasesWhen", assisment.painIncreasesWhen) &&
                  validateField("painPattern", assisment.painPattern) &&
                  validateField("qualityOfPain", assisment.qualityOfPain) &&
                  validateField("severityOfPain", assisment.severityOfPain)) {
                  setStep(4);
                }
              }}
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      )}
      {step == 4 && (
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
            <CardDescription>Info about your medical history</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="preExistingCondition" className="mb-1">
              Pre Existing Conditions{" "}
            </Label>
            <Select
              onValueChange={(value) => handleMultiSelectChange("preExistingCondition", value.split(','))}
              value={assisment.preExistingCondition.join(',')}
            >
              <SelectTrigger className="" id="preExistingCondition">
                <SelectValue placeholder="Select conditions" />
              </SelectTrigger>
              <SelectContent>
                {["diabetes", "hypertension", "high blood pressure", "obesity", "asthma", "arthritis", "cancer", "heart disease", "kidney disease", "other"].map((condition) => (
                  <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.preExistingCondition && <p className="text-red-500 text-sm">{errors.preExistingCondition}</p>}

            <div className="mb-2 mt-1 grid w-full md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <Label
                  htmlFor="familyMadicalHistoryOfSameProblem"
                  className="mb-1"
                >
                  Family Madical History Of Same Problem{" "}
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange("familyMadicalHistoryOfSameProblem", value)}
                  value={assisment.familyMadicalHistoryOfSameProblem}
                >
                  <SelectTrigger
                    className=""
                    id="familyMadicalHistoryOfSameProblem"
                  >
                    <SelectValue placeholder="Family Madical History Of Same Problem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">yes</SelectItem>
                    <SelectItem value="no">no</SelectItem>
                  </SelectContent>
                </Select>
                {errors.familyMadicalHistoryOfSameProblem && <p className="text-red-500 text-sm">{errors.familyMadicalHistoryOfSameProblem}</p>}
              </div>
              <div>
                <Label htmlFor="symptomExperienced" className="mb-1">
                  Symptom Experienced{" "}
                </Label>
                <Select
                  onValueChange={(value) => handleMultiSelectChange("symptomExperienced", value.split(','))}
                  value={assisment.symptomExperienced.join(',')}
                >
                  <SelectTrigger className="" id="symptomExperienced">
                    <SelectValue placeholder="Select symptoms" />
                  </SelectTrigger>
                  <SelectContent>
                    {["swelling", "functional reduction during movement", "clicking sound from joint", "locking or catching sensation in joint", "redness", "warmth", "bruising", "numbness", "weakness", "other"].map((symptom) => (
                      <SelectItem key={symptom} value={symptom}>{symptom}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.symptomExperienced && <p className="text-red-500 text-sm">{errors.symptomExperienced}</p>}
              </div>
            </div>

            <Label htmlFor="bodyTemperature" className="mb-1">
              Body Temperature{" "}
            </Label>
            <Select
              onValueChange={(value) => handleInputChange("bodyTemperature", value)}
              value={assisment.bodyTemperature}
            >
              <SelectTrigger className="" id="bodyTemperature">
                <SelectValue placeholder="Body Temperature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fever">fever</SelectItem>
                <SelectItem value="normal">normal</SelectItem>
              </SelectContent>
            </Select>
            {errors.bodyTemperature && <p className="text-red-500 text-sm">{errors.bodyTemperature}</p>}
          </CardContent>
          <CardFooter className="flex gap-2 md:gap-4">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                setStep(3);
              }}
            >
              Back
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                if (validateField("preExistingCondition", assisment.preExistingCondition) &&
                  validateField("familyMadicalHistoryOfSameProblem", assisment.familyMadicalHistoryOfSameProblem) &&
                  validateField("symptomExperienced", assisment.symptomExperienced) &&
                  validateField("bodyTemperature", assisment.bodyTemperature)) {
                  setStep(5);
                }
              }}
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      )}
      {step == 5 && (
        <Card className="border-0 shadow-none w-full md:min-w-[500px]">
          <CardHeader>
            <CardTitle>Your Input</CardTitle>
            <CardDescription>Your input</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Your input"
              value={assisment.userInput}
              onChange={(e) => handleInputChange("userInput", e.target.value)}
              className="w-full p-3 text-sm"
              rows={5}
            />
            {errors.userInput && <p className="text-red-500 text-sm">{errors.userInput}</p>}
          </CardContent>
          <CardFooter className="flex gap-2 md:gap-4">
            <Button
              className="w-full"
              variant="outline"
              disabled={isLoading}
              onClick={() => {
                setStep(4);
              }}
            >
              Back
            </Button>
            <Button
              className="w-full"
              disabled={isLoading}
              onClick={() => {
                if (validateField("userInput", assisment.userInput)) {
                  submitAssisment();
                }
              }}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Submit
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Assignment;
