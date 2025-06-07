"use client";
import { useState, useCallback, useEffect } from "react";

import { NavDivider, KeyElement } from "@components/UI";
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

import { useChangeModeUsingScreenWidth } from "@utils/Misc";

import { ActiveTouchData } from "@/types";

const Roulette = () => {
  const [mode, setMode] = useState("touch-mode"); // keys-mode or touch-mode
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
          reset={() => reset()}
        >
          {activeTouches.map((touch, index) => (
            <div
              key={index}
              className="w-20 h-20 bg-primary rounded-full absolute"
              style={{
                left: `${touch.x}px`,
                top: `${touch.y - 164}px`, // offset
                transform: "translate(-50%, -50%)",
              }}
            ></div>
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
