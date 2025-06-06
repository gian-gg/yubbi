"use client";
import { useState, useCallback, useEffect } from "react";

import { NavBar, NavDivider, Container } from "@components/Navigation";
import { SwitchButton, ModeButtons } from "@components/Buttons";
import KeyHighlighter from "@components/KeyHighlighter";

import { NoFingersDetected } from "@utils/Toasts";
import rouletteAnimation from "@utils/RouletteAnimation";
import { launchConfetti } from "@utils/Confetti";

import { changeModeUsingScreenWidth } from "@utils/Misc";

const Roulette = () => {
  const [mode, setMode] = useState("touch-mode"); // keys-mode or touch-mode
  changeModeUsingScreenWidth(setMode);

  const [animationDone, setAnimationDone] = useState(false);

  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (animationDone) {
      setHasStarted(false);

      launchConfetti();
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
    if (pressedKeys.length <= 1) {
      NoFingersDetected();

      return;
    }

    setCurrentKey(null);
    setHasStarted(true);

    rouletteAnimation(setCurrentKey, pressedKeys, setAnimationDone);
  }, [pressedKeys]);

  return (
    <main className="h-full w-full flex flex-col items-center mb-2">
      <NavBar>
        <div className=" hidden md:flex items-center gap-6">
          <ModeButtons mode={mode} setMode={setMode} />

          <NavDivider />
        </div>

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
        <Container className="h-full lg:min-h-[240px] min-h-60 w-full p-8 my-2 lg:my-6 flex flex-wrap lg:items-center justify-center gap-2 lg:gap-4">
          {pressedKeys.map((key, index) => (
            <kbd
              key={index}
              className={`kbd kbd-lg w-20 h-20 lg:w-40 lg:h-40 text-[40px] lg:text-[80px] transition-transform duration-200 bg-base-300 
            ${
              key === currentKey
                ? hasStarted
                  ? "bg-secondary scale-110"
                  : "bg-primary animate-pulse scale-125 mx-3 md:mx-6 lg:mx-10"
                : ""
            }
            `}
            >
              {key}
            </kbd>
          ))}
        </Container>
      </KeyHighlighter>
      <Container>Fingers: {pressedKeys.length}</Container>
    </main>
  );
};

export default Roulette;
