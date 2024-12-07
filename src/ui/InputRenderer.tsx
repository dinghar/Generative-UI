import { useState } from "react";
import { Input } from "./Input";
import { JSXRenderer } from "./JsxRenderer";
import { CodeType, generateCode } from "../codeGenerator";

export function InputRenderer() {
  const [jsx, setJsx] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function updatePage(value: string) {
    setIsLoading(true);
    const code = await generateCode(value, jsx, CodeType.JSX);
    setIsLoading(false);
    setJsx(code);
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        What do you want to see?{isLoading ? "🤔" : ""}
      </div>
      <br />
      <Input onSubmit={updatePage} />
      <JSXRenderer jsxString={jsx} />
    </>
  );
}
