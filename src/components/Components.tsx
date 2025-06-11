"use client";
import React, { useRef, useState } from "react";

import Image from "next/image";

import { RadioButton, Container, NavDivider, NavLink } from "@components/UI";
import {
  InfoIcon,
  EnterIcon,
  EscapeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@components/Icons";

import { Mode, ModalInfoData } from "@/types";

interface SwitchButtonProps {
  start: () => void;
  reset: () => void;
  disable: boolean;
  currentFinger: string | null;
}

const SwitchButton = ({
  start,
  reset,
  disable,
  currentFinger,
}: SwitchButtonProps) => {
  return (
    <>
      <button
        className={`hidden lg:flex gap-2 ${
          disable || currentFinger !== null
            ? "text-base-content/25 cursor-not-allowed"
            : "hover:text-base-content active:text-base-content/75 cursor-pointer"
        }`}
        onClick={start}
        disabled={disable || currentFinger !== null}
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

interface ArrowButtonProps {
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
}

const ArrowButton = ({ onClick, disabled, icon }: ArrowButtonProps) => {
  return (
    <button
      className="hover:text-primary active:text-base-content/75 transition-colors duration-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed disabled:hover:text-base-content/75"
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

interface BottomBarProps {
  fingers: number;
  modalInfo: ModalInfoData[];
  children?: React.ReactNode;
}

const BottomBar = ({ fingers, children, modalInfo }: BottomBarProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box bg-[#363636] h-[500px] border-1 border-base-300/30 flex flex-col justify-end">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-50">
              ✕
            </button>
          </form>
          <div className="w-full h-full p-2 md:p-3 lg:p-4 flex flex-col items-center gap-4">
            <div className="fixed inset-0 flex items-center justify-between px-2 md:px-3 lg:px-4">
              <ArrowButton
                icon={<ChevronLeftIcon />}
                disabled={selectedOption <= 0}
                onClick={() => {
                  if (selectedOption <= 0) return;
                  setSelectedOption(selectedOption - 1);
                }}
              />
              <ArrowButton
                icon={<ChevronRightIcon />}
                disabled={selectedOption >= modalInfo.length - 1}
                onClick={() => {
                  if (selectedOption >= modalInfo.length - 1) return;
                  setSelectedOption(selectedOption + 1);
                }}
              />
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Image
                src={modalInfo[selectedOption].img}
                alt={modalInfo[selectedOption].title}
                width={300}
                height={300}
                className="rounded-lg mb-2"
              />
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold mt-3 mb-1">
                {modalInfo[selectedOption].title}
              </h1>
              <p className="text-xs md:text-sm text-base-content/75 text-center">
                {modalInfo[selectedOption].description}
              </p>
            </div>
            <div className="flex gap-2 z-50">
              {modalInfo.map((_, index) => (
                <input
                  key={index}
                  type="radio"
                  name="option"
                  value={index}
                  className="join-item btn rounded-full btn-square w-3 h-3"
                  checked={selectedOption === index}
                  onChange={(e) => setSelectedOption(parseInt(e.target.value))}
                />
              ))}
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <Container className="flex gap-4 justify-center items-center">
        <div // div so that its not clickable using the keyboard
          className="md:tooltip hover:text-base-content animate-pulse cursor-pointer"
          data-tip="Need help?"
          onClick={() => modalRef.current?.showModal()}
        >
          <InfoIcon />
        </div>

        <p>Fingers: {fingers}</p>

        {children}
      </Container>
    </>
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
