"use client";

import { useEffect, useState, useCallback } from "react";
import { NavBar, NavDivider, RadioButton } from "@components/Navigation";

import { toast } from "sonner";

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

const Roulette = () => {
  const [mode, setMode] = useState("keys-mode");

  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isRandomizing, setIsRandomizing] = useState(false);

  const reset = () => {
    if (!isRandomizing) {
      setPressedKeys([]);
      setSelectedKey(null);
      setIsRandomizing(false);
    }
  };

  const startRandomizer = useCallback(() => {
    if (pressedKeys.length === 0) {
      toast.warning("No Fingers Detected", {
        unstyled: true,
        className: "alert alert-warning alert-soft w-80 h-14",
      });

      return;
    }

    setSelectedKey(null);

    setIsRandomizing(true);

    let index = 0;
    const totalSpins = Math.floor(Math.random() * 20) + 15;
    const interval = 100;
    let spins = 0;

    const intervalId = setInterval(() => {
      setSelectedKey(pressedKeys[index % pressedKeys.length]);

      index++;
      spins++;

      if (spins >= totalSpins) {
        clearInterval(intervalId);
        setIsRandomizing(false);
      }
    }, interval);
  }, [pressedKeys]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      startRandomizer();
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
    if (isRandomizing) return;

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp, isRandomizing, selectedKey]);

  return (
    <main className="h-[600px] w-full flex flex-col items-center">
      <NavBar>
        <div className="flex gap-4">
          <RadioButton text="Keys" setMode={setMode} mode={mode} />
          <RadioButton text="Touch" setMode={setMode} mode={mode} />
        </div>

        <NavDivider />

        <button
          className={` ${
            isRandomizing
              ? "text-base-content/25 cursor-not-allowed"
              : "hover:text-base-content active:text-base-content/75 cursor-pointer"
          }`}
          onClick={reset}
          disabled={isRandomizing}
        >
          <kbd className="kbd kbd-sm">esc</kbd> Reset
        </button>
      </NavBar>

      <div className="bg-base-200 min-h-60 w-full p-8 my-8 rounded-lg flex items-center justify-center gap-4">
        {pressedKeys.map((key, index) => (
          <kbd
            key={index}
            className={`kbd kbd-lg w-40 h-40 text-[80px] transition-transform duration-200 bg-base-300 
            ${
              key === selectedKey
                ? isRandomizing
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
    </main>
  );
};

export default Roulette;
