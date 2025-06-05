"use client";

import { useState, useCallback } from "react";

import { NavBar, NavDivider } from "@components/Navigation";
import { ResetButton, ModeButtons } from "@components/Buttons";
import KeyHighlighter from "@components/KeyHighlighter";
import { NoFingersDetected } from "@components/Toasts";

const Roulette = () => {
  const [mode, setMode] = useState("keys-mode"); // keys-mode or touch-mode

  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const reset = () => {
    if (!hasStarted) {
      setPressedKeys([]);
      setCurrentKey(null);
      setHasStarted(false);
    }
  };

  const start = useCallback(() => {
    if (pressedKeys.length === 0) {
      NoFingersDetected();

      return;
    }

    setCurrentKey(null);

    setHasStarted(true);

    let index = 0;
    const totalSpins = Math.floor(Math.random() * 20) + 15;
    const interval = 100;
    let spins = 0;

    const intervalId = setInterval(() => {
      setCurrentKey(pressedKeys[index % pressedKeys.length]);

      index++;
      spins++;

      if (spins >= totalSpins) {
        clearInterval(intervalId);
        setHasStarted(false);
      }
    }, interval);
  }, [pressedKeys]);

  return (
    <main className="h-[600px] w-full flex flex-col items-center">
      <NavBar>
        <ModeButtons mode={mode} setMode={setMode} />

        <NavDivider />

        <ResetButton reset={reset} hasStarted={hasStarted} />
      </NavBar>

      <KeyHighlighter
        setPressedKeys={setPressedKeys}
        currentKey={currentKey}
        hasStarted={hasStarted}
        start={() => start()}
        reset={() => reset()}
      >
        <div className="bg-base-200 min-h-60 w-full p-8 my-8 rounded-lg flex items-center justify-center gap-4">
          {pressedKeys.map((key, index) => (
            <kbd
              key={index}
              className={`kbd kbd-lg w-40 h-40 text-[80px] transition-transform duration-200 bg-base-300 
            ${
              key === currentKey
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
      </KeyHighlighter>
    </main>
  );
};

export default Roulette;
