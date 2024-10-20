"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Calendar, Activity, Thermometer, User, Briefcase } from "lucide-react";
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

type Assisment = {
    name: string;
    age: string;
    gender: string;
    occupation: string;
    locationOfPain: string;
    durationOfPain: string;
    painStartedFrom: string;
    customerProblem: string;
    painIncreasesWhen: string;
    painPattern: string;
    qualityOfPain: string;
    severityOfPain: string;
    preExistingCondition: string;
    familyMadicalHistoryOfSameProblem: string;
    symptomExperienced: string;
    bodyTemperature: string;
    userInput: string;
    isRadiateToOtherPart: string;
    threadId: string;
};

const AssessmentInfo = ({ assessment }: { assessment: Assisment }) => {
    const [expanded, setExpanded] = useState(false);

    const truncate = (text: string, maxLength: number) =>
        text.length <= maxLength ? text : `${text.substr(0, maxLength)}...`;

    const renderExpandButton = () => (
        <Button
            variant="link"
            onClick={() => setExpanded(!expanded)}
            className="ml-2 p-0 h-auto font-normal text-blue-500 hover:text-blue-700"
        >
            {expanded ? "Read Less" : "Read More"}
        </Button>
    );

    const renderAssessmentDetails = () => (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{assessment.name}'s Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem icon={User} label="Age:" value={assessment.age} />
                    <InfoItem icon={User} label="Gender:" value={assessment.gender} />
                    <InfoItem icon={Briefcase} label="Occupation:" value={assessment.occupation} />
                    <InfoItem icon={MapPin} label="Location of Pain:" value={assessment.locationOfPain} />
                    <InfoItem icon={Clock} label="Duration of Pain:" value={assessment.durationOfPain} />
                    <InfoItem icon={Calendar} label="Pain Started From:" value={assessment.painStartedFrom} />
                    <InfoItem icon={Activity} label="Pain Increases When:" value={assessment.painIncreasesWhen} />
                    <InfoItem icon={Thermometer} label="Body Temperature:" value={assessment.bodyTemperature} />
                </div>
                <div>
                    <Label className="font-semibold">Customer Problem:</Label>
                    <p className="mt-1">
                        {expanded ? assessment.customerProblem : truncate(assessment.customerProblem, 100)}
                        {assessment.customerProblem.length > 100 && renderExpandButton()}
                    </p>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <ScrollArea className="h-full w-full">
            <div className=" flex-col p-4 space-y-4 hidden md:flex">
                <header className="py-4">
                    <Link href="/dashboard">
                        <Button variant="outline" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                </header>

                {renderAssessmentDetails()}

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="additional-info">
                        <AccordionTrigger>Additional Information</AccordionTrigger>
                        <AccordionContent>



                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="Pain Pattern:" value={assessment.painPattern} />
                                <InfoItem label="Quality of Pain:" value={assessment.qualityOfPain} />
                                <InfoItem label="Severity of Pain:" value={assessment.severityOfPain} />
                                <InfoItem label="Pre-existing Condition:" value={assessment.preExistingCondition} />
                                <InfoItem label="Family Medical History:" value={assessment.familyMadicalHistoryOfSameProblem} />
                                <InfoItem label="Symptoms Experienced:" value={assessment.symptomExperienced} />
                                <InfoItem label="Radiates to Other Parts:" value={assessment.isRadiateToOtherPart} />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="flex flex-col p-4 pb-0 space-y-4 md:hidden">
                <div className="flex items-center justify-between w-full">
                    <Link href="/dashboard">
                        <Button variant="outline" className="flex items-center justify-center w-12 h-12">
                            <ArrowLeft className="h-10 w-10" />
                        </Button>
                    </Link>
                    <h2 className="text-lg font-semibold">Assessment Details</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="assessment-details">
                        <AccordionTrigger className="text-left">View Assessment Details</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-1 gap-4 mt-2">
                                <InfoItem label="Name:" value={assessment.name} />
                                <InfoItem label="Age:" value={assessment.age} />
                                <InfoItem label="Gender:" value={assessment.gender} />
                                <InfoItem label="Occupation:" value={assessment.occupation} />
                                <InfoItem label="Location of Pain:" value={assessment.locationOfPain} />
                                <InfoItem label="Duration of Pain:" value={assessment.durationOfPain} />
                                <InfoItem label="Pain Started From:" value={assessment.painStartedFrom} />
                                <InfoItem label="Customer Problem:" value={assessment.customerProblem} />
                                <InfoItem label="Pain Increases When:" value={assessment.painIncreasesWhen} />
                                <InfoItem label="Pain Pattern:" value={assessment.painPattern} />
                                <InfoItem label="Quality of Pain:" value={assessment.qualityOfPain} />
                                <InfoItem label="Severity of Pain:" value={assessment.severityOfPain} />
                                <InfoItem label="Pre-existing Condition:" value={assessment.preExistingCondition} />
                                <InfoItem label="Family Medical History:" value={assessment.familyMadicalHistoryOfSameProblem} />
                                <InfoItem label="Symptoms Experienced:" value={assessment.symptomExperienced} />
                                <InfoItem label="Body Temperature:" value={assessment.bodyTemperature} />
                                <InfoItem label="Radiates to Other Parts:" value={assessment.isRadiateToOtherPart} />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </ScrollArea>
    );
};

const InfoItem = ({ icon: Icon, label, value }: { icon?: React.ElementType; label: string; value: string }) => (
    <div className="flex items-center space-x-2">
        {Icon && <Icon className="h-5 w-5 text-primary" />}
        <Label className="font-semibold">{label}</Label>
        <span className="text-gray-700">{value}</span>
    </div>
);

export default AssessmentInfo;
