import { useEffect, useState } from "react";
import { Input } from "./Input";
import { Mood } from "./Mood";
import { JSXRenderer } from "./JsxRenderer";
import { CodeType, generateCode, loadModel } from "../codeGenerator";

function App() {
  const [hasLoadedModel, setHasLoadedModel] = useState(false);
  const [jsx, setJsx] = useState<string | null>(null);

  async function updatePage(value: string) {
    const code = await generateCode(value, jsx, CodeType.JSX);
    setJsx(code);
  }

  useEffect(() => {
    const load = async () => {
      await loadModel();
      setHasLoadedModel(true);
    };
    load();
  }, []);

  if (!hasLoadedModel) {
    return <p>Loading model...</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p>Render JSX:</p>
        <Input onSubmit={updatePage} />
        <JSXRenderer jsxString={jsx} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p>Update style from sentiment of user input:</p>
        <Mood />
      </div>
    </div>
  );
}

export default App;
