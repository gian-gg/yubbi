"use client";
import React, { useCallback, useEffect } from "react";

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
  currentFinger: string | null;
  hasStarted: boolean;
  start: () => void;
  reset: () => void;
  children: React.ReactNode;
}

const KeyHighlighter = ({
  setPressedKeys,
  currentFinger,
  hasStarted,
  start,
  reset,
  children,
}: KeyHighlighterProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && !currentFinger) {
        start();
        return;
      }

      if (e.key === "Escape") {
        reset();
        return;
      }

      if (currentFinger) return;

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
    },
    [currentFinger, setPressedKeys, start, reset]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (!currentFinger) {
        setPressedKeys((prev) => prev.filter((key) => key !== e.key));
      }
    },
    [currentFinger, setPressedKeys]
  );

  useEffect(() => {
    if (hasStarted) return;

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp, hasStarted, currentFinger]);
  return <>{children}</>;
};

export default KeyHighlighter;
