
// import { StartupDetail } from "@/lib/types/types";
import OpenAI from "openai";
const openai = new OpenAI();
export async function POST(request: Request) {
  // const res = await request.json() as StartupDetail
  const thread = await openai.beta.threads.create();
  return Response.json({ threadId: thread.id });
}

// const patientInfo = `
// Name: ${res.name}
// Age: ${res.age}
// Gender: ${res.gender}
// Occupation: ${res.occupation}
// Location of Pain: ${res.locationOfPain}
// Duration of Pain: ${res.durationOfPain}
// Pain Started From: ${res.painStartedFrom}
// Does Pain Radiate to Other Parts: ${res.isRadiateToOtherPart}
// Customer's Problem: ${res.customerProblem}
// Pain Increases When: ${res.painIncreasesWhen}
// Pain Pattern: ${res.painPattern}
// Quality of Pain: ${res.qualityOfPain}
// Severity of Pain: ${res.severityOfPain}
// Pre-existing Conditions: ${res.preExistingCondition}
// Family Medical History of Same Problem: ${res.familyMadicalHistoryOfSameProblem}
// Symptoms Experienced: ${res.symptomExperienced}
// Body Temperature: ${res.bodyTemperature}
// User Input: ${res.userInput}
// `;