import { useEffect, useState } from "react";
import { Input } from "./Input";
import { JSXRenderer } from "./JsxRenderer";
import { generateCode, loadModel } from "./codeGenerator";
import "./App.css";

function App() {
  const [hasLoadedModel, setHasLoadedModel] = useState(false);
  const [jsx, setJsx] = useState<string | null>(null);
  async function updatePage(value: string) {
    const code = await generateCode(value, jsx);
    setJsx(code);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <>
      <Input onSubmit={updatePage} />
      <JSXRenderer jsxString={jsx} />
    </>
  );
}

export default App;
