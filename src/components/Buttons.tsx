import React from "react";

import { RadioButton } from "@components/Navigation";

interface ResetButtonProps {
  reset: () => void;
  hasStarted: boolean;
}

const ResetButton = ({ reset, hasStarted }: ResetButtonProps) => {
  return (
    <button
      className={` ${
        hasStarted
          ? "text-base-content/25 cursor-not-allowed"
          : "hover:text-base-content active:text-base-content/75 cursor-pointer"
      }`}
      onClick={reset}
      disabled={hasStarted}
    >
      <kbd className="kbd kbd-sm">esc</kbd> Reset
    </button>
  );
};

interface ModeButtonsProps {
  mode: string;
  setMode: (value: string) => void;
}

const ModeButtons = ({ mode, setMode }: ModeButtonsProps) => {
  return (
    <div className="flex gap-4">
      <RadioButton text="Keys" setMode={setMode} mode={mode} />
      <RadioButton text="Touch" setMode={setMode} mode={mode} />
    </div>
  );
};

export { ResetButton, ModeButtons };
