import { StartupDetail } from "@/lib/types/types";
import OpenAI from "openai";
const openai = new OpenAI();
export async function POST(request: Request) {
  const res = await request.json() as StartupDetail
  const message = `Startup Name: ${res.startupName}\nStartup Description: ${res.startupDescription}\nIndustry Sector: ${res.industrySector}\nStage of Startup: ${res.stageOfStartup}\nPurpose of Funding: ${res.purposeOfFunding}\nCountry/Region: ${res.countryRegion}`;
  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: message,
  });
  await openai.beta.threads.runs.create(thread.id, {
    assistant_id: process.env.OPENAI_ASSISTANT_ID as string,
  });



  return Response.json({ threadId: thread.id });
}
