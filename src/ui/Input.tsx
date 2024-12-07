import { useState } from "react";

type InputProps = {
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
};

export function Input({ onSubmit, onChange }: InputProps) {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <textarea
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
          onChange && onChange(newValue);
        }}
      />
      {onSubmit && <button onClick={() => onSubmit(value)}>Enter</button>}
    </>
  );
}
