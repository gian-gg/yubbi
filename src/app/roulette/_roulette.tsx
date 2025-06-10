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

    setCurrentKey(null);
    setHasStarted(true);

    if (mode === "touch-mode") {
      rouletteAnimation(setCurrentKey, activeTouches, setAnimationDone);
    } else {
      rouletteAnimation(setCurrentKey, pressedKeys, setAnimationDone);
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
          currentKey={currentKey}
        />
      </ToolBar>

      {mode === "touch-mode" ? (
        <TouchHighlighter
          setActiveTouches={setActiveTouches}
          activeTouches={activeTouches}
          currentKey={currentKey}
          hasStarted={hasStarted}
          start={() => start()}
        >
          {activeTouches.map((touch, index) => (
            <TouchElement
              key={index}
              touch={touch}
              className={
                touch.id.toString() === currentKey
                  ? hasStarted
                    ? "bg-secondary scale-110"
                    : "bg-primary/75 animate-pulse border-primary scale-125 mx-3 md:mx-6 lg:mx-10"
                  : ""
              }
            />
          ))}
        </TouchHighlighter>
      ) : (
        <KeyHighlighter
          setPressedKeys={setPressedKeys}
          currentKey={currentKey}
          hasStarted={hasStarted}
          start={() => start()}
          reset={() => reset()}
        >
          <FingerContainer>
            {pressedKeys.map((key, index) => (
              <KeyElement
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
