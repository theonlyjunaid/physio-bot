
import { Assisment } from "@/lib/types/types";
import OpenAI from "openai";

const openai = new OpenAI();


// Send a new message to a thread
export async function POST(request: Request, { params: { threadId } }: { params: { threadId: string } }) {
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
    await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: patientInfo,
    });

    const stream = openai.beta.threads.runs.stream(threadId, {
        assistant_id: process.env.OPENAI_ASSISTANT_ID as string,
    });

    return new Response(stream.toReadableStream());
}




