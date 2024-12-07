import { useEffect, useState } from "react";
import { Mood } from "./Mood";
import { loadModel } from "../codeGenerator";
import { InputRenderer } from "./InputRenderer";

function App() {
  const [hasLoadedModel, setHasLoadedModel] = useState(false);

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
        gap: "100px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p>Render user input:</p>
        <InputRenderer />
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
