import React from "react";

import { RadioButton, Container, NavDivider, NavLink } from "@components/UI";
import { InfoIcon, EnterIcon, EscapeIcon } from "@components/Icons";

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
        {state === "start" ? <EnterIcon /> : <EscapeIcon />}
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

interface ToolBarProps {
  children?: React.ReactNode;
}

const ToolBar = ({ children }: ToolBarProps) => {
  return (
    <Container className="flex gap-4 md:gap-8 justify-center items-center">
      <NavLink icon="🎲" text="Roulette" route="/roulette" />
      <NavLink icon="👥" text="Group" route="/group" />
      {children && (
        <>
          <NavDivider />
          {children}
        </>
      )}
    </Container>
  );
};

interface BottomBarProps {
  fingers: number;
  tooltip: string;
  children?: React.ReactNode;
}

const BottomBar = ({ fingers, tooltip, children }: BottomBarProps) => {
  return (
    <Container className="flex gap-4 justify-center items-center">
      <div className="tooltip hover:text-base-content" data-tip={tooltip}>
        <InfoIcon />
      </div>

      <p>Fingers: {fingers}</p>

      {children && children}
    </Container>
  );
};

export { SwitchButton, ModeButtons, ToolBar, BottomBar };
