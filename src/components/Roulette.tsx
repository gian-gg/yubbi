"use client";

import { useEffect, useState, useCallback } from "react";

const ignoredKeys = [
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
      console.log("No keys to randomize.");
      return;
    }

    setSelectedKey(null);

    console.log("Randomizer started");
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
    <div className="p-4 space-y-4">
      <nav className="flex gap-4 items-center">
        <button className="btn" onClick={reset} disabled={isRandomizing}>
          <span>⎋</span> Reset
        </button>
        <p>
          Press <kbd className="kbd kbd-md">Enter</kbd> to start.
        </p>
      </nav>

      <div className="bg-base-300 flex flex-wrap gap-4 p-4 rounded-lg">
        {pressedKeys.map((key, index) => (
          <kbd
            id={key}
            key={index}
            className={`kbd kbd-lg w-auto h-auto text-[80px] transition-transform duration-200
            ${
              key === selectedKey
                ? isRandomizing
                  ? "bg-secondary scale-110"
                  : "bg-primary animate-pulse scale-125"
                : ""
            }
            `}
          >
            {key === " " ? "Space" : key}
          </kbd>
        ))}
      </div>
    </div>
  );
};

export default Roulette;
