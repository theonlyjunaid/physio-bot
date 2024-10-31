"use client";

import React, { useState, useEffect, useRef } from "react";
import { AssistantStream } from "openai/lib/AssistantStream";
import Markdown from "react-markdown";
// @ts-expect-error - no types for this yet
import { AssistantStreamEvent } from "openai/resources/beta/assistants/assistants";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { Assisment, Iuser } from "@/lib/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

const isUserPro = true
type MessageProps = {
  role: "user" | "assistant" | "code";
  text: string;
};

const UserMessage = ({ text }: { text: string }) => {
  return (
    <div className="self-end  bg-primary text-primary-foreground my-2 p-2 px-4 rounded-lg max-w-[80%] break-words md:mr-6">
      {text}
    </div>
  );
};

const AssistantMessage = ({ text }: { text: string }) => {
  function removeCitations(text: string) {
    // Regular expression pattern to match the citation format
    const pattern = /【\d+:\d+†source】/g;

    // Replace matched patterns with an empty string
    const cleanedText = text.replace(pattern, "");

    const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;

    // Replace the link format with bold text and make it open in a new tab
    const modifiedText = cleanedText.replace(
      linkPattern,
      (match, linkText, url) => {
        return `**[${linkText}](${url})**`;
      }
    );

    // Create a contai
    return modifiedText;
  }

  return (
    <div className="self-start bg-muted my-2 p-2 px-4 rounded-lg max-w-[80%] break-words">
      <Markdown>{removeCitations(text)}</Markdown>
    </div>
  );
};

const CodeMessage = ({ text }: { text: string }) => {
  return (
    <div className="self-start bg-muted my-2 p-2 px-4 rounded-lg max-w-[80%] break-words font-mono">
      {text.split("\n").map((line, index) => (
        <div key={index} className="mt-1">
          <span className="text-gray-500 mr-2">{`${index + 1}. `}</span>
          {line}
        </div>
      ))}
    </div>
  );
};

const Message = ({ role, text }: MessageProps) => {
  const validRoles: MessageProps["role"][] = ["user", "assistant", "code"];
  if (!validRoles.includes(role)) {
    return null;
  }

  switch (role) {
    case "user":
      return <UserMessage text={text} />;
    case "assistant":
      return <AssistantMessage text={text} />;
    case "code":
      return <CodeMessage text={text} />;
    default:
      return null;
  }
};

type ChatProps = {
  functionCallHandler?: (
    toolCall: RequiredActionFunctionToolCall
  ) => Promise<string>;
  threadId: string;
  assisment: Assisment;
  user: Iuser;
};

const Chat = ({
  threadId,
  assisment,
  user,
  functionCallHandler = () => Promise.resolve(""), // default to return empty string
}: ChatProps) => {
  const [userInput, setUserInput] = useState("");

  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [inputDisabled, setInputDisabled] = useState(false);

  // automatically scroll to bottom of chat
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // create a new threadID when chat component created

  const sendMessage = async (text: string) => {
    const response = await fetch(
      `/api/assistants/threads/${threadId}/messages`,
      {
        method: "POST",
        body: JSON.stringify({
          content: text,
        }),
      }
    );
    const stream = AssistantStream.fromReadableStream(
      response.body as ReadableStream<any>
    );
    handleReadableStream(stream);
  };

  const submitActionResult = async (
    runId: string,
    toolCallOutputs: { output: string; tool_call_id: string }[]
  ) => {
    const response = await fetch(
      `/api/assistants/threads/${threadId}/actions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          runId: runId,
          toolCallOutputs: toolCallOutputs,
        }),
      }
    );
    const stream = AssistantStream.fromReadableStream(
      response.body as ReadableStream<any>
    );
    handleReadableStream(stream);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    sendMessage(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", text: userInput },
    ]);
    setUserInput("");
    setInputDisabled(true);
    scrollToBottom();
  };

  /* Stream Event Handlers */

  const handleFirstMessage = () => {
    const message = `
    Name: ${assisment.name}
    Age: ${assisment.age}
    Gender: ${assisment.gender}
    Occupation: ${assisment.occupation}
    Location of Pain: ${assisment.locationOfPain}
    Duration of Pain: ${assisment.durationOfPain}
    Pain Started From: ${assisment.painStartedFrom}
    Does Pain Radiate to Other Parts: ${assisment.isRadiateToOtherPart}
    Customer's Problem: ${assisment.customerProblem}
    Pain Increases When: ${assisment.painIncreasesWhen}
    Pain Pattern: ${assisment.painPattern}
    Quality of Pain: ${assisment.qualityOfPain}
    Severity of Pain: ${assisment.severityOfPain}
    Pre-existing Conditions: ${assisment.preExistingCondition}
    Family Medical History of Same Problem: ${assisment.familyMadicalHistoryOfSameProblem}
    Symptoms Experienced: ${assisment.symptomExperienced}
    Body Temperature: ${assisment.bodyTemperature}
    User Input: ${assisment.userInput}
    `

    sendMessage(message);
    setUserInput("");
    setInputDisabled(true);
    scrollToBottom();
  };

  // textCreated - create new assistant message
  const handleTextCreated = () => {
    appendMessage("assistant", "");
  };

  // textDelta - append text to last assistant message
  const handleTextDelta = (delta: any) => {
    if (delta.value != null) {
      appendToLastMessage(delta.value);
    }
    if (delta.annotations != null) {
      annotateLastMessage(delta.annotations);
    }
  };

  // imageFileDone - show image in chat
  const handleImageFileDone = (image: any) => {
    appendToLastMessage(`\n![${image.file_id}](/api/files/${image.file_id})\n`);
  };

  // toolCallCreated - log new tool call
  const toolCallCreated = (toolCall: any) => {
    if (toolCall.type != "code_interpreter") return;
    appendMessage("code", "");
  };

  // toolCallDelta - log delta and snapshot for the tool call
  const toolCallDelta = (delta: any) => {
    if (delta.type != "code_interpreter") return;
    if (!delta.code_interpreter.input) return;
    appendToLastMessage(delta.code_interpreter.input);
  };

  // handleRequiresAction - handle function call
  const handleRequiresAction = async (
    event: AssistantStreamEvent.ThreadRunRequiresAction
  ) => {
    const runId = event.data.id;
    const toolCalls = event.data.required_action.submit_tool_outputs.tool_calls;
    // loop over tool calls and call function handler
    const toolCallOutputs = await Promise.all(
      toolCalls.map(async (toolCall: any) => {
        const result = await functionCallHandler(toolCall);
        return { output: result, tool_call_id: toolCall.id };
      })
    );
    setInputDisabled(true);
    submitActionResult(runId, toolCallOutputs);
  };

  // handleRunCompleted - re-enable the input form
  const handleRunCompleted = () => {
    setInputDisabled(false);
  };

  const handleReadableStream = (stream: AssistantStream) => {
    // messages
    stream.on("textCreated", handleTextCreated);
    stream.on("textDelta", handleTextDelta);

    // image
    stream.on("imageFileDone", handleImageFileDone);

    // code interpreter
    stream.on("toolCallCreated", toolCallCreated);
    stream.on("toolCallDelta", toolCallDelta);

    // events without helpers yet (e.g. requires_action and run.done)
    stream.on("event", (event) => {
      if (event.event === "thread.run.requires_action")
        handleRequiresAction(event);
      if (event.event === "thread.run.completed") handleRunCompleted();
    });
  };

  /*
    =======================
    === Utility Helpers ===
    =======================
  */

  const appendToLastMessage = (text: string) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
        text: lastMessage.text + text,
      };
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };

  const appendMessage = (role: string, text: string) => {
    setMessages((prevMessages) => [...prevMessages, { role, text }]);
  };

  const annotateLastMessage = (annotations: any[]) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
      };
      annotations.forEach((annotation) => {
        if (annotation.type === "file_path") {
          updatedLastMessage.text = updatedLastMessage.text.replaceAll(
            annotation.text,
            `/api/files/${annotation.file_path.file_id}`
          );
        }
      });
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      const response = await fetch(`/api/thread?id=${threadId}`);
      const messages = await response.json();
      console.log(messages);
      setMessages(messages.formattedData);
      setLoading(false);
    };
    fetchMessages();
  }, [threadId]);
  // useEffect(() => {
  //   if (messages.length > 0 && !assisment.is_reviewed) {
  //     setOpen(true);
  //   }
  // }, [messages.length]);

  const imediateNextQuestions = [
    "Explain the Exercises and Stretches in detail",
    "Explain the Manual Therapy in detail",
    "Explain the Pain Management in detail",
    "Explain the Postural Ergonomics in detail"
  ]
  return (
    <div className="flex flex-col h-full w-full relative">
      <ScrollArea className="h-full">
        <div className={`flex-grow overflow-y-auto p-2.5 flex flex-col order-2 whitespace-pre-wrap pb-${messages.length > 0 && messages.length < 3 ? "44" : "28"}`}>
          {loading ? (
            <div className="w-full flex flex-col gap-5 text-center items-center pt-28 justify-center">
              <Loader2 className="animate-spin" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Fetching Data...
              </p>
            </div>
          ) : messages.length ? (
            messages.map((msg, index) => (
              <Message
                key={index}
                role={msg.role as "user" | "assistant" | "code"}
                text={msg.text}
              />
            ))
          ) : (
            <div className="w-full flex flex-col gap-5 text-center items-center pt-28 justify-center">
              <form action={handleFirstMessage}>
                <Button
                  type="submit"
                  className="px-6 py-2 border-none text-base rounded-full h-full"
                  disabled={inputDisabled}
                >
                  Get Response
                </Button>
              </form>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {messages.length > 0 && messages.length < 2 && (
        <div className="fixed bottom-24  flex  justify-center gap-2 z-20 px-5 mb-4 ">
          {imediateNextQuestions.slice(0, 2).map((question, index) => (
            <div
              key={index}
              className="text-sm bg-white p-2 border cursor-pointer rounded-lg w-[40vw] lg:w-1/4 "
              onClick={() => setUserInput(question)}
            >
              {question}
            </div>
          ))}
        </div>
      )}

      {messages.length > 0 && (
        <div className="p-4 border-t fixed bottom-0 w-full z-10 md:w-[55%] bg-white dark:bg-gray-800">
          {isUserPro ? (
            messages.length < 50 ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit" disabled={inputDisabled}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
                <div className="text-muted-foreground text-sm text-center">
                  If message gets stuck, click{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => {
                      if (typeof window !== "undefined") window.location.reload();
                    }}
                  >
                    here
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-red-500 text-sm text-center">
                You have reached the limit of 50 messages.
              </div>
            )
          ) : (
            messages.length < 5 ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit" disabled={inputDisabled}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
                <div className="text-muted-foreground text-sm text-center">
                  If message gets stuck, click{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => {
                      if (typeof window !== "undefined") window.location.reload();
                    }}
                  >
                    here
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-red-500 text-sm text-center">
                You have reached the limit of 5 messages. Please upgrade to Pro to continue.
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;
