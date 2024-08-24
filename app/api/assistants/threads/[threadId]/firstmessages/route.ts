
import { StartupDetail } from "@/lib/types/types";
import OpenAI from "openai";

const openai = new OpenAI();


// Send a new message to a thread
export async function POST(request: Request, { params: { threadId } }: { params: { threadId: string } }) {
    const res = await request.json() as StartupDetail
    const message = `Startup Name: ${res.startupName}\nStartup Description: ${res.startupDescription}\nIndustry Sector: ${res.industrySector}\nStage of Startup: ${res.stageOfStartup}\nPurpose of Funding: ${res.purposeOfFunding}\nCountry/Region: ${res.countryRegion}`;

    await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: message,
    });

    const stream = openai.beta.threads.runs.stream(threadId, {
        assistant_id: process.env.OPENAI_ASSISTANT_ID as string,
    });

    return new Response(stream.toReadableStream());
}




