import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { Input } from "./Input";
import { CodeType, cssDiaryPrompt, generateCode } from "../codeGenerator";
import { parseStyleString } from "../utils";

export function Mood() {
  const [css, setCss] = useState<string | null>(null);

  async function update(value: string) {
    const cssPrompt = cssDiaryPrompt(value);
    const cssCode = await generateCode(cssPrompt, css, CodeType.CSS);
    setCss(cssCode);
  }

  useEffect(() => {
    Object.assign(document.body.style, parseStyleString(css));
  }, [css]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(debounce(update, 3_000), []);

  return (
    <>
      Tell me about your day
      <br />
      <Input onChange={debouncedUpdate} />
    </>
  );
}
