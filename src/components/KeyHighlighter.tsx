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
  setPressedKeys: (value: string[] | ((prev: string[]) => string[])) => void;
  currentKey: string | null;
  hasStarted: boolean;
  start: () => void;
  reset: () => void;
  children: React.ReactNode;
}

const KeyHighlighter = ({
  setPressedKeys,
  currentKey,
  hasStarted,
  start,
  reset,
  children,
}: KeyHighlighterProps) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !currentKey) {
      start();
      return;
    }

    if (e.key === "Escape") {
      reset();
      return;
    }

    if (currentKey) return;

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
    if (!currentKey) {
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
  }, [handleKeyDown, handleKeyUp, hasStarted, currentKey]);
  return <>{children}</>;
};

export default KeyHighlighter;
