import React from "react";

import { RadioButton } from "@components/Navigation";

interface SwitchButtonProps {
  start: () => void;
  reset: () => void;
  disable: boolean;
  animationDone: boolean;
}

const SwitchButton = ({
  start,
  reset,
  disable,
  animationDone,
}: SwitchButtonProps) => {
  const state = animationDone ? "reset" : "start";
  return (
    <button
      className={` ${
        disable
          ? "text-base-content/25 cursor-not-allowed"
          : "hover:text-base-content active:text-base-content/75 cursor-pointer"
      }`}
      onClick={() => (state === "start" ? start() : reset())}
      disabled={disable}
    >
      <kbd className="kbd kbd-sm">{state === "start" ? "enter" : "esc"}</kbd>{" "}
      {state === "start" ? "Start" : "Reset"}
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

export { SwitchButton, ModeButtons };
