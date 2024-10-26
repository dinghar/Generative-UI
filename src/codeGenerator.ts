import { CreateMLCEngine } from "@mlc-ai/web-llm";

type Message = {
  role: "system" | "user";
  content: string;
};

const MODEL = "Llama-3.1-8B-Instruct-q4f32_1-MLC";

const systemMessaage = `
You are a sophisticated software engineering copilot that generates code. 
When given JSX and a set of instructions, you should respond with updated JSX.
Respond only with the code in the format \`\`\`{code}\`\`\`. Do not respond with any other text.
Assume that you do not have access to any other third party libraries.
Write all styles as inline CSS.
`;

export async function loadModel() {
  const initProgressCallback = (initProgress: any) => {
    console.log(initProgress);
  };
  await CreateMLCEngine(MODEL, { initProgressCallback });
}

export async function generateCode(
  userInput: string,
  jsxString: string | null
): Promise<string> {
  const engine = await CreateMLCEngine(MODEL);
  const messages = formatMessages(userInput, jsxString);
  const reply = await engine.chat.completions.create({
    messages,
  });
  // If the model does not provide a response, return the existing code
  const fallBack = jsxString ?? "";
  const answer = extractCodeFromMessage(reply.choices[0].message.content ?? "");
  return answer ?? fallBack;
}

function formatMessages(
  userInput: string,
  jsxString: string | null
): Message[] {
  const userMessageString = `Existing code: \`\`\`${jsxString}\`\`\`\n\nUser input: \`\`\`${userInput}\`\`\``;
  return [
    { role: "system", content: systemMessaage },
    { role: "user", content: userMessageString },
  ];
}

function extractCodeFromMessage(message: string): string {
  const codeRegex = /```(?:\w+\n)?([\s\S]*?)```/;
  const match = message.match(codeRegex);
  return match ? match[1] : "";
}
