
import { type NextRequest } from 'next/server'
import OpenAI from "openai";

const openai = new OpenAI();

export async function PATCH(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const threadId = searchParams.get('id') as string
    const runId = searchParams.get('runId') as string

    let run = await openai.beta.threads.runs.retrieve(
        threadId,
        runId,
    );

    while (run.status !== "completed") {
        run = await openai.beta.threads.runs.retrieve(
            threadId,
            run.id,
        );
        console.log(`🏃 Run Status: ${run.status}`);
        await new Promise((r) => setTimeout(r, 1000));
    }

    console.log("🏁 Run Completed!");

    const threadMessages = await openai.beta.threads.messages.list(
        threadId
    );

    return Response.json({ threadMessages })
}
