import { Assisment } from "@/lib/types/types";
import OpenAI from "openai";
const openai = new OpenAI();
export async function POST(request: Request) {
  const res = await request.json() as Assisment
  const patientInfo = `
  Name: ${res.name}
  Age: ${res.age}
  Gender: ${res.gender}
  Occupation: ${res.occupation}
  Location of Pain: ${res.locationOfPain}
  Duration of Pain: ${res.durationOfPain}
  Pain Started From: ${res.painStartedFrom}
  Does Pain Radiate to Other Parts: ${res.isRadiateToOtherPart}
  Customer's Problem: ${res.customerProblem}
  Pain Increases When: ${res.painIncreasesWhen}
  Pain Pattern: ${res.painPattern}
  Quality of Pain: ${res.qualityOfPain}
  Severity of Pain: ${res.severityOfPain}
  Pre-existing Conditions: ${res.preExistingCondition}
  Family Medical History of Same Problem: ${res.familyMadicalHistoryOfSameProblem}
  Symptoms Experienced: ${res.symptomExperienced}
  Body Temperature: ${res.bodyTemperature}
  User Input: ${res.userInput}
  `;
  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: patientInfo,
  });
  await openai.beta.threads.runs.create(thread.id, {
    assistant_id: process.env.OPENAI_ASSISTANT_ID as string,
  });



  return Response.json({ threadId: thread.id });
}
