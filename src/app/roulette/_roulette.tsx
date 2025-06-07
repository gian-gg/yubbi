"use client";
import { useState, useCallback, useEffect } from "react";

import { NavDivider, Container, KeyContainer } from "@components/UI";
import {
  SwitchButton,
  ModeButtons,
  ToolBar,
  BottomBar,
} from "@components/Components";
import KeyHighlighter from "@components/KeyHighlighter";

import { NoFingersDetected } from "@utils/Toasts";
import rouletteAnimation from "@utils/RouletteAnimation";
import { launchConfetti } from "@utils/Confetti";

import { useChangeModeUsingScreenWidth } from "@utils/Misc";

const Roulette = () => {
  const [mode, setMode] = useState("touch-mode"); // keys-mode or touch-mode
  useChangeModeUsingScreenWidth(setMode);

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
    <>
      <ToolBar>
        <div className="h-full hidden md:flex items-center gap-6">
          <ModeButtons mode={mode} setMode={setMode} />

          <NavDivider />
        </div>

        <SwitchButton
          start={start}
          reset={reset}
          disable={hasStarted}
          animationDone={animationDone}
        />
      </ToolBar>

      <KeyHighlighter
        setPressedKeys={setPressedKeys}
        currentKey={currentKey}
        hasStarted={hasStarted}
        start={() => start()}
        reset={() => reset()}
      >
        <Container className="h-full w-full min-h-[200px] max-h-[800px] flex-1 p-8 my-2 lg:my-6 flex flex-wrap lg:items-center justify-center gap-2 lg:gap-4">
          {pressedKeys.map((key, index) => (
            <KeyContainer
              key={index}
              className={
                key === currentKey
                  ? hasStarted
                    ? "bg-secondary scale-110"
                    : "bg-primary animate-pulse scale-125 mx-3 md:mx-6 lg:mx-10"
                  : ""
              }
              character={key}
            />
          ))}
        </Container>
      </KeyHighlighter>
      <BottomBar
        fingers={pressedKeys.length}
        tooltip="Instant finger-based random selector."
      />
    </>
  );
};

export default Roulette;
