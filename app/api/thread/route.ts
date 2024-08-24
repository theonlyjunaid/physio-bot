import { type NextRequest } from 'next/server'
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(request: Request) {
    const res = await request.json()
    const messageThread = await openai.beta.threads.create(res);
    let run = await openai.beta.threads.runs.create(
        messageThread.id,
        { assistant_id: process.env.OPENAI_ASSISTANT_ID as string }
    );

    // while (run.status !== "completed") {
    //     run = await openai.beta.threads.runs.retrieve(
    //         messageThread.id,
    //         run.id,
    //     );
    //     console.log(`🏃 Run Status: ${run.status}`);
    //     await new Promise((r) => setTimeout(r, 1000));
    // }

    // console.log("🏁 Run Completed!");

    // const threadMessages = await openai.beta.threads.messages.list(
    //     messageThread.id
    // );

    return Response.json({ run })
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const threadId = searchParams.get('id')

    // const myThread = await openai.beta.threads.retrieve(
    //     id as string
    // );

    // console.log(myThread);
    // return Response.json({ myThread })
    const threadMessages = await openai.beta.threads.messages.list(
        threadId as string
    );

    const formattedData = threadMessages.data.map(item => {
        return {
            role: item.role,
            text: item.content[0].type === 'text' ? item.content[0].text.value : ''
        };
    }).reverse().slice(1);

    return Response.json({ formattedData })
}

export async function PATCH(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const threadId = searchParams.get('id') as string

    let run = await openai.beta.threads.runs.create(
        threadId,
        { assistant_id: process.env.OPENAI_ASSISTANT_ID as string }
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


