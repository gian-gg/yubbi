"use client";
import { useState, useCallback, useEffect } from "react";

import { NavBar, NavDivider } from "@components/Navigation";
import { SwitchButton, ModeButtons } from "@components/Buttons";
import KeyHighlighter from "@components/KeyHighlighter";

import { NoFingersDetected } from "@utils/Toasts";
import rouletteAnimation from "@utils/RouletteAnimation";

const Roulette = () => {
  const [mode, setMode] = useState("keys-mode"); // keys-mode or touch-mode
  const [animationDone, setAnimationDone] = useState(false);

  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (animationDone) {
      setHasStarted(false);
    }
  }, [animationDone]);

  const reset = () => {
    if (!hasStarted) {
      setPressedKeys([]);
      setCurrentKey(null);
      setHasStarted(false);
      setAnimationDone(false);
    }
  };

  const start = useCallback(() => {
    if (pressedKeys.length === 0) {
      NoFingersDetected();

      return;
    }

    setCurrentKey(null);
    setHasStarted(true);

    rouletteAnimation(setCurrentKey, pressedKeys, setAnimationDone);
  }, [pressedKeys]);

  return (
    <main className="h-[600px] w-full flex flex-col items-center">
      <NavBar>
        <ModeButtons mode={mode} setMode={setMode} />

        <NavDivider />

        <SwitchButton
          start={start}
          reset={reset}
          disable={hasStarted}
          animationDone={animationDone}
        />
      </NavBar>

      <KeyHighlighter
        setPressedKeys={setPressedKeys}
        currentKey={currentKey}
        hasStarted={hasStarted}
        start={() => start()}
        reset={() => reset()}
      >
        <div className="bg-base-200/60 min-h-60 w-full p-8 my-8 rounded-lg flex items-center justify-center gap-4">
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
      <ul className="flex gap-8 bg-base-200/60 p-2 px-6 rounded-lg text-sm text-base-100">
        <li className="text-base-content">Fingers: {pressedKeys.length}</li>
      </ul>
    </main>
  );
};

export default Roulette;
