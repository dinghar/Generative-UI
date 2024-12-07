import { CreateMLCEngine } from "@mlc-ai/web-llm";

type Message = {
  role: "system" | "user";
  content: string;
};

export enum CodeType {
  JSX = "jsx",
  CSS = "css",
}

const MODEL = "Llama-3.1-8B-Instruct-q4f32_1-MLC";

const jsxSystemMessage = `
You are a sophisticated software engineering copilot that generates code. 
When given JSX and a set of instructions, you should respond with updated JSX.
Respond only with the code in the format \`\`\`{code}\`\`\`. Do not respond with any other text.
Assume that you do not have access to any other third party libraries.
Write all styles as inline CSS.
`;

const cssSystemMessage = `
You are a sophisticated software engineering copilot that generates CSS for JSX. 
When given CSS and a set of instructions, you should respond with updated CSS.
Respond only with the code in the format \`\`\`{code}\`\`\`. Do not respond with any other text.
Assume that you do not have access to any other third party libraries.
`;

export const cssDiaryPrompt = (text: string) => {
  return `This is an entry in a diary:\n\n${text}\n\nGiven this text, determine what the mood of the writer is. For that mood, write css that represents it. The CSS should be written as a string in the following format:
    
    'width: 100%; height: 100%; background-color: #FFFFFF; color: #000000; font-size: 16px; font-family: Arial;'

    The CSS should at least set the element's background color, text color, font size, and font family to match the mood. Feel free to add any other styles that are appropriate. Do not include any comments.`;
};

export async function loadModel() {
  const initProgressCallback = (initProgress: any) => {
    console.log(initProgress);
  };
  await CreateMLCEngine(MODEL, { initProgressCallback });
}

export async function generateCode(
  userInput: string,
  code: string | null,
  type: CodeType
): Promise<string> {
  const engine = await CreateMLCEngine(MODEL);
  const messages = formatMessages(userInput, code, type);
  const reply = await engine.chat.completions.create({
    messages,
  });
  // If the model does not provide a response, return the existing code
  const fallBack = code ?? "";
  const answer = extractCodeFromMessage(reply.choices[0].message.content ?? "");
  return answer ?? fallBack;
}

function formatMessages(
  userInput: string,
  jsxString: string | null,
  type: CodeType
): Message[] {
  const systemMessage =
    type === CodeType.JSX ? jsxSystemMessage : cssSystemMessage;
  const userMessageString = `Existing code: \`\`\`${jsxString}\`\`\`\n\nUser input: \`\`\`${userInput}\`\`\``;
  return [
    { role: "system", content: systemMessage },
    { role: "user", content: userMessageString },
  ];
}

function extractCodeFromMessage(message: string): string {
  const codeRegex = /```(?:\w+\n)?([\s\S]*?)```/;
  const match = message.match(codeRegex);
  return match ? match[1] : "";
}
