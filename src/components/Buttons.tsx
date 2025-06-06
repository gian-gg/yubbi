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
      <kbd className="kbd kbd-sm hidden lg:inline-grid">
        {state === "start" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 4v7a4 4 0 0 1-4 4H4" />
            <path d="m9 10-5 5 5 5" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 8V2h6" />
            <path d="m2 2 10 10" />
            <path d="M12 2A10 10 0 1 1 2 12" />
          </svg>
        )}
      </kbd>{" "}
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
      <RadioButton text="Touch" setMode={setMode} mode={mode} />
      <RadioButton text="Keys" setMode={setMode} mode={mode} />
    </div>
  );
};

export { SwitchButton, ModeButtons };
