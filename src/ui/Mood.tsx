import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { Input } from "./Input";
import { CodeType, cssDiaryPrompt, generateCode } from "../codeGenerator";
import { parseStyleString } from "../utils";

export function Mood() {
  const [css, setCss] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function update(value: string) {
    const cssPrompt = cssDiaryPrompt(value);
    setIsLoading(true);
    const cssCode = await generateCode(cssPrompt, css, CodeType.CSS);
    setIsLoading(false);
    setCss(cssCode);
  }

  useEffect(() => {
    Object.assign(document.body.style, parseStyleString(css));
  }, [css]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(debounce(update, 3_000), []);

  return (
    <>
      <div style={{ display: "flex" }}>
        How was your day?{isLoading ? "🤔" : ""}
      </div>
      <br />
      <Input onChange={debouncedUpdate} />
    </>
  );
}
