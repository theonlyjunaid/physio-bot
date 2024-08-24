"use client";
import React, { useEffect, useState } from "react";
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

const Assignment = ({ user }: { user: Iuser }) => {
  const router = useRouter();

  const [assisment, setAssisment] = useState({
    for: "",
    name: "",
    age: "",
    gender: "",
    occupation: "",
    locationOfPain: "",
    durationOfPain: "",
    painStartedFrom: "",
    isRadiateToOtherPart: "",
    customerProblem: "",
    painIncreasesWhen: "",
    painPattern: "",
    qualityOfPain: "",
    severityOfPain: "",
    preExistingCondition: "",
    familyMadicalHistoryOfSameProblem: "",
    symptomExperienced: "",
    bodyTemperature: "",
    userInput: "",
  });

  const [step, setStep] = useState(0);

  const submitAssisment = async () => {
    try {
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
        locationOfPain: assisment.locationOfPain,
        durationOfPain: assisment.durationOfPain,
        painStartedFrom: assisment.painStartedFrom,
        customerProblem: assisment.customerProblem,
        painIncreasesWhen: assisment.painIncreasesWhen,
        painPattern: assisment.painPattern,
        qualityOfPain: assisment.qualityOfPain,
        severityOfPain: assisment.severityOfPain,
        preExistingCondition: assisment.preExistingCondition,
        familyMadicalHistoryOfSameProblem:
          assisment.familyMadicalHistoryOfSameProblem,
        symptomExperienced: assisment.symptomExperienced,
        bodyTemperature: assisment.bodyTemperature,
        userInput: assisment.userInput,
        isRadiateToOtherPart: assisment.isRadiateToOtherPart,
        threadId: data.threadId,
      });
      console.log(convo);
      console.log(convo);
      if (convo) {
        router.push(`/dashboard/${convo.$id}`);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
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
              onChange={(e) => {
                setAssisment({
                  ...assisment,
                  name: e.target.value,
                });
              }}
            />
            <div className="mb-2 grid w-full md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <Label htmlFor="age" className="mb-1">
                  Age
                </Label>
                <Select
                  onValueChange={(value) => {
                    setAssisment({
                      ...assisment,
                      age: value,
                    });
                  }}
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
              </div>
              <div>
                <Label htmlFor="gender" className="mb-1">
                  Gender
                </Label>
                <Select
                  onValueChange={(value) => {
                    setAssisment({
                      ...assisment,
                      gender: value,
                    });
                  }}
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
              </div>
            </div>
            <Label htmlFor="occupation" className="mb-1">
              Occupation
            </Label>
            <Select
              onValueChange={(value) => {
                setAssisment({
                  ...assisment,
                  occupation: value,
                });
              }}
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
                setStep(2);
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
              onValueChange={(value) => {
                setAssisment({
                  ...assisment,
                  locationOfPain: value,
                });
              }}
              value={assisment.locationOfPain}
            >
              <SelectTrigger className="" id="locationOfPain">
                <SelectValue placeholder="locationOfPain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="neck">Neck</SelectItem>
                <SelectItem value="shoulder">Shoulder</SelectItem>
                <SelectItem value="arm">Arm</SelectItem>
                <SelectItem value="elbow">Elbow</SelectItem>
                <SelectItem value="wrist">Wrist</SelectItem>
                <SelectItem value="hand">Hand</SelectItem>
                <SelectItem value="upper back">Upper Back</SelectItem>
                <SelectItem value="lower back">Lower Back</SelectItem>
                <SelectItem value="hip">Hip</SelectItem>
                <SelectItem value="thigh">Thigh</SelectItem>
                <SelectItem value="knee">Knee</SelectItem>
                <SelectItem value="shin calf">Shin Calf</SelectItem>
                <SelectItem value="ankle">Ankle</SelectItem>
                <SelectItem value="foot">Foot</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <div className="mb-2 mt-1 grid w-full md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <Label htmlFor="durationOfPain" className="mb-1">
                  Duration of pain
                </Label>
                <Select
                  onValueChange={(value) => {
                    setAssisment({
                      ...assisment,
                      durationOfPain: value,
                    });
                  }}
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
              </div>
              <div>
                <Label htmlFor="painStartedFrom" className="mb-1">
                  Pain Started From
                </Label>
                <Select
                  onValueChange={(value) => {
                    setAssisment({
                      ...assisment,
                      painStartedFrom: value,
                    });
                  }}
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
              </div>
            </div>
            <div className="mb-2 mt-1 grid w-full md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <Label htmlFor="isRadiateToOtherPart" className="mb-1">
                  Is Radiate To Other Part?
                </Label>
                <Select
                  onValueChange={(value) => {
                    setAssisment({
                      ...assisment,
                      isRadiateToOtherPart: value,
                    });
                  }}
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
              </div>
              <div>
                <Label htmlFor="customerProblem" className="mb-1">
                  Customer Problem
                </Label>
                <Select
                  onValueChange={(value) => {
                    setAssisment({
                      ...assisment,
                      customerProblem: value,
                    });
                  }}
                  value={assisment.customerProblem}
                >
                  <SelectTrigger className="" id="customerProblem">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="difficulty walking">
                      Difficulty Walking
                    </SelectItem>
                    <SelectItem value="difficulty standing">
                      Difficulty Standing
                    </SelectItem>
                    <SelectItem value="difficulty sitting">
                      Difficulty Sitting
                    </SelectItem>
                    <SelectItem value="difficulty sleeping">
                      Difficulty Sleeping
                    </SelectItem>
                    <SelectItem value="difficulty lifting objects">
                      Difficulty in lifting objects
                    </SelectItem>
                    <SelectItem value="difficulty bending">
                      Difficulty in Bending
                    </SelectItem>
                    <SelectItem value="difficulty reaching">
                      Difficulty in Reaching
                    </SelectItem>
                    <SelectItem value="general weakness">
                      General Weakness
                    </SelectItem>
                    <SelectItem value="limited range of motion">
                      Limited Range Of Motion{" "}
                    </SelectItem>
                    <SelectItem value="other">Any other </SelectItem>
                  </SelectContent>
                </Select>
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
                setStep(3);
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
              onValueChange={(value) => {
                setAssisment({
                  ...assisment,
                  painIncreasesWhen: value,
                });
              }}
              value={assisment.painIncreasesWhen}
            >
              <SelectTrigger className="" id="painIncreasesWhen">
                <SelectValue placeholder="painIncreasesWhen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="during any activity">
                  during any activity
                </SelectItem>
                <SelectItem value="when moving">when moving</SelectItem>
                <SelectItem value="during rest">during rest</SelectItem>
                <SelectItem value="during exercise">during exercise</SelectItem>
                <SelectItem value="during sleep">during sleep</SelectItem>
                <SelectItem value="at night">at night</SelectItem>
                <SelectItem value="in the morning">in the morning</SelectItem>
                <SelectItem value="during both activity and rest">
                  during both activity and rest
                </SelectItem>
                <SelectItem value="with specific movements">
                  with specific movements
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="mb-2 mt-1 grid w-full md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <Label htmlFor="painPattern" className="mb-1">
                  Pattern of pain
                </Label>
                <Select
                  onValueChange={(value) => {
                    setAssisment({
                      ...assisment,
                      painPattern: value,
                    });
                  }}
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
              </div>
              <div>
                <Label htmlFor="qualityOfPain" className="mb-1">
                  qualityOfPain{" "}
                </Label>
                <Select
                  onValueChange={(value) => {
                    setAssisment({
                      ...assisment,
                      qualityOfPain: value,
                    });
                  }}
                  value={assisment.qualityOfPain}
                >
                  <SelectTrigger className="" id="qualityOfPain">
                    <SelectValue placeholder="qualityOfPain" />
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
              </div>
            </div>

            <Label htmlFor="severityOfPain" className="mb-1">
              Rate your pain
            </Label>
            <Select
              onValueChange={(value) => {
                setAssisment({
                  ...assisment,
                  severityOfPain: value,
                });
              }}
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
                setStep(4);
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
              pre existing conditions{" "}
            </Label>
            <Select
              onValueChange={(value) => {
                setAssisment({
                  ...assisment,
                  preExistingCondition: value,
                });
              }}
              value={assisment.preExistingCondition}
            >
              <SelectTrigger className="" id="preExistingCondition">
                <SelectValue placeholder="preExistingCondition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diabetes">diabetes</SelectItem>
                <SelectItem value="hypertension">hypertension</SelectItem>
                <SelectItem value="high blood pressure">
                  high blood pressure
                </SelectItem>
                <SelectItem value="obesity">obesity</SelectItem>
                <SelectItem value="asthma">asthma</SelectItem>
                <SelectItem value="arthritis">arthritis</SelectItem>
                <SelectItem value="cancer">cancer</SelectItem>
                <SelectItem value="heart disease">heart disease</SelectItem>
                <SelectItem value="kidney disease">kidney disease</SelectItem>
                <SelectItem value="other">other</SelectItem>
              </SelectContent>
            </Select>

            <div className="mb-2 mt-1 grid w-full md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <Label
                  htmlFor="familyMadicalHistoryOfSameProblem"
                  className="mb-1"
                >
                  familyMadicalHistoryOfSameProblem{" "}
                </Label>
                <Select
                  onValueChange={(value) => {
                    setAssisment({
                      ...assisment,
                      familyMadicalHistoryOfSameProblem: value,
                    });
                  }}
                  value={assisment.familyMadicalHistoryOfSameProblem}
                >
                  <SelectTrigger
                    className=""
                    id="familyMadicalHistoryOfSameProblem"
                  >
                    <SelectValue placeholder="familyMadicalHistoryOfSameProblem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">yes</SelectItem>
                    <SelectItem value="no">no</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="symptomExperienced" className="mb-1">
                  symptomExperienced{" "}
                </Label>
                <Select
                  onValueChange={(value) => {
                    setAssisment({
                      ...assisment,
                      symptomExperienced: value,
                    });
                  }}
                  value={assisment.symptomExperienced}
                >
                  <SelectTrigger className="" id="symptomExperienced">
                    <SelectValue placeholder="symptomExperienced" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="swelling">swelling</SelectItem>
                    <SelectItem value="functional reduction during movement">
                      functional reduction during movement
                    </SelectItem>
                    <SelectItem value="clicking sound from joint">
                      clicking sound from joint
                    </SelectItem>
                    <SelectItem value="locking or catching sensation in joint">
                      locking or catching sensation in joint
                    </SelectItem>
                    <SelectItem value="redness">redness</SelectItem>
                    <SelectItem value="warmth">warmth</SelectItem>
                    <SelectItem value="bruising">bruising</SelectItem>
                    <SelectItem value="numbness">numbness</SelectItem>
                    <SelectItem value="weakness">weakness</SelectItem>
                    <SelectItem value="other">other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Label htmlFor="bodyTemperature" className="mb-1">
              body temperature{" "}
            </Label>
            <Select
              onValueChange={(value) => {
                setAssisment({
                  ...assisment,
                  bodyTemperature: value,
                });
              }}
              value={assisment.bodyTemperature}
            >
              <SelectTrigger className="" id="bodyTemperature">
                <SelectValue placeholder="bodyTemperature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fever">fever</SelectItem>
                <SelectItem value="normal">normal</SelectItem>
              </SelectContent>
            </Select>
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
                setStep(5);
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
              onChange={(e) =>
                setAssisment({ ...assisment, userInput: e.target.value })
              }
              className="w-full p-3 text-sm"
              rows={5}
            />
          </CardContent>
          <CardFooter className="flex gap-2 md:gap-4">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                setStep(4);
              }}
            >
              Back
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                submitAssisment();
              }}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Assignment;
