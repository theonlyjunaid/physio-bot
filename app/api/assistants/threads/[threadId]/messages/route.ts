
import OpenAI from "openai";

const openai = new OpenAI();


// Send a new message to a thread
export async function POST(request: Request, { params: { threadId } }: { params: { threadId: string } }) {
  const { content } = await request.json();

  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  });

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: process.env.OPENAI_ASSISTANT_ID as string,
  });

  return new Response(stream.toReadableStream());
}




