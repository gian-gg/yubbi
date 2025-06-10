import React from "react";

import { RadioButton, Container, NavDivider, NavLink } from "@components/UI";
import { InfoIcon, EnterIcon, EscapeIcon } from "@components/Icons";

import { Mode } from "@/types";

interface SwitchButtonProps {
  start: () => void;
  reset: () => void;
  disable: boolean;
  currentKey: string | null;
}

const SwitchButton = ({
  start,
  reset,
  disable,
  currentKey,
}: SwitchButtonProps) => {
  return (
    <>
      <button
        className={`hidden lg:flex gap-2 ${
          disable || currentKey !== null
            ? "text-base-content/25 cursor-not-allowed"
            : "hover:text-base-content active:text-base-content/75 cursor-pointer"
        }`}
        onClick={start}
        disabled={disable || currentKey !== null}
      >
        <kbd className="kbd kbd-sm hidden lg:inline-grid">
          <EnterIcon />
        </kbd>
        Start
      </button>
      <button
        className={`flex gap-2 ${
          disable
            ? "text-base-content/25 cursor-not-allowed"
            : "hover:text-base-content active:text-base-content/75 cursor-pointer"
        }`}
        onClick={reset}
        disabled={disable}
      >
        <kbd className="kbd kbd-sm hidden lg:inline-grid">
          <EscapeIcon />
        </kbd>
        Reset
      </button>
    </>
  );
};

interface ModeButtonsProps {
  mode: Mode;
  setMode: (value: Mode) => void;
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

interface FingerContainerProps {
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement | null>;
}

const FingerContainer = ({
  className,
  children,
  ref,
}: FingerContainerProps) => {
  return (
    <Container
      ref={ref}
      className={`${className} h-full w-full min-h-[200px] max-h-[800px] flex-1 p-8 my-2 lg:my-6 flex flex-wrap lg:items-center justify-center gap-2 lg:gap-4`}
    >
      {children}
    </Container>
  );
};

export { SwitchButton, ModeButtons, ToolBar, BottomBar, FingerContainer };
