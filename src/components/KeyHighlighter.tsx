"use client";
import React, { useEffect } from "react";

const ignoredKeys = [
  " ", // space
  "Shift",
  "Control",
  "Alt",
  "Meta",
  "CapsLock",
  "Tab",
  "Escape",
  "Enter",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ContextMenu",
  "ScrollLock",
  "Pause",
  "Insert",
  "Home",
  "End",
  "PageUp",
  "PageDown",
];

interface KeyHighlighterProps {
  pressedKeys: string[];
  setPressedKeys: (value: string[] | ((prev: string[]) => string[])) => void;
  selectedKey: string | null;
  setSelectedKey: (value: string | null) => void;
  hasStarted: boolean;
  setHasStarted: (value: boolean) => void;
  start: () => void;
  reset: () => void;
}

const KeyHighlighter = ({
  pressedKeys,
  setPressedKeys,
  selectedKey,
  setSelectedKey,
  hasStarted,
  setHasStarted,
  start,
  reset,
}: KeyHighlighterProps) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      start();
      return;
    }

    if (e.key === "Escape") {
      reset();
      return;
    }

    if (selectedKey) return;

    if (
      ignoredKeys.includes(e.key) ||
      /^F\d{1,2}$/.test(e.key) // Matches F1 to F12
    ) {
      return;
    }

    setPressedKeys((prev) => {
      if (!prev.includes(e.key)) return [...prev, e.key];
      return prev;
    });
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (!selectedKey) {
      setPressedKeys((prev) => prev.filter((key) => key !== e.key));
    }
  };

  useEffect(() => {
    if (hasStarted) return;

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp, hasStarted, selectedKey]);
  return (
    <>
      <div className="bg-base-200 min-h-60 w-full p-8 my-8 rounded-lg flex items-center justify-center gap-4">
        {pressedKeys.map((key, index) => (
          <kbd
            key={index}
            className={`kbd kbd-lg w-40 h-40 text-[80px] transition-transform duration-200 bg-base-300 
            ${
              key === selectedKey
                ? hasStarted
                  ? "bg-secondary scale-110"
                  : "bg-primary animate-pulse scale-125 mx-10"
                : ""
            }
            `}
          >
            {key}
          </kbd>
        ))}
      </div>
      <p>
        Press <kbd className="kbd kbd-md">Enter</kbd> to start.
      </p>
    </>
  );
};

export default KeyHighlighter;
