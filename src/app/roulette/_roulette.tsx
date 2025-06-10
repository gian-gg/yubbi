"use client";
import { useState, useCallback, useEffect } from "react";

import { NavDivider, KeyElement, TouchElement } from "@components/UI";
import {
  SwitchButton,
  ModeButtons,
  ToolBar,
  BottomBar,
  FingerContainer,
} from "@components/Components";
import KeyHighlighter from "@components/KeyHighlighter";
import TouchHighlighter from "@components/TouchHighlighter";

import { NoFingersDetected } from "@utils/Toasts";
import rouletteAnimation from "@utils/RouletteAnimation";
import { launchConfetti } from "@utils/Confetti";

import useChangeModeUsingScreenWidth from "@hooks/useChangeModeUsingScreenWidth";

import { ActiveTouchData, Mode } from "@/types";

const Roulette = () => {
  const [mode, setMode] = useState<Mode>("touch-mode");
  useChangeModeUsingScreenWidth(setMode);

  const [animationDone, setAnimationDone] = useState(false);

  const [activeTouches, setActiveTouches] = useState<ActiveTouchData[]>([]);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [currentFinger, setCurrentFinger] = useState<string | null>(null);
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
      setCurrentFinger(null);
      setHasStarted(false);
      setAnimationDone(false);
      setActiveTouches([]);
    }
  };

  const start = useCallback(() => {
    const fingerCount =
      mode === "touch-mode" ? activeTouches.length : pressedKeys.length;

    if (fingerCount <= 1) {
      NoFingersDetected();

      return;
    }

    setCurrentFinger(null);
    setHasStarted(true);

    if (mode === "touch-mode") {
      rouletteAnimation(setCurrentFinger, activeTouches, setAnimationDone);
    } else {
      rouletteAnimation(setCurrentFinger, pressedKeys, setAnimationDone);
    }
  }, [mode, pressedKeys, activeTouches]);

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
          currentFinger={currentFinger}
        />
      </ToolBar>

      {mode === "touch-mode" ? (
        <TouchHighlighter
          setActiveTouches={setActiveTouches}
          activeTouches={activeTouches}
          currentFinger={currentFinger}
          hasStarted={hasStarted}
          start={() => start()}
        >
          {activeTouches.map((touch, index) => (
            <TouchElement
              key={index}
              touch={touch}
              className={
                touch.id.toString() === currentFinger
                  ? hasStarted
                    ? "bg-secondary/75 scale-110 border-secondary/75"
                    : "bg-primary/75 animate-pulse border-primary scale-125 mx-3 md:mx-6 lg:mx-10"
                  : ""
              }
              style={
                touch.id.toString() === currentFinger
                  ? hasStarted
                    ? {}
                    : {
                        boxShadow: `0 0 10px var(--color-primary)`,
                      }
                  : {}
              }
            />
          ))}
        </TouchHighlighter>
      ) : (
        <KeyHighlighter
          setPressedKeys={setPressedKeys}
          currentFinger={currentFinger}
          hasStarted={hasStarted}
          start={() => start()}
          reset={() => reset()}
        >
          <FingerContainer>
            {pressedKeys.map((key, index) => (
              <KeyElement
                key={index}
                className={
                  key === currentFinger
                    ? hasStarted
                      ? "bg-secondary scale-110"
                      : "bg-primary animate-pulse scale-125 mx-3 md:mx-6 lg:mx-10 backdrop-blur-sm shadow-lg shadow-primary"
                    : ""
                }
                character={key}
              />
            ))}
          </FingerContainer>
        </KeyHighlighter>
      )}

      <BottomBar
        fingers={pressedKeys.length | activeTouches.length}
        tooltip="Instant finger-based random selector."
      />
    </>
  );
};

export default Roulette;
