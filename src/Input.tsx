import { useState } from "react";

type InputProps = {
  onSubmit: (value: string) => void;
};

export function Input({ onSubmit }: InputProps) {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <textarea
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
        }}
      />
      <button onClick={() => onSubmit(value)}>Enter</button>
    </>
  );
}
