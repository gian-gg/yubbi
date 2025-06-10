"use client";
import React, { useState, useCallback, useEffect } from "react";

import {
  NavDivider,
  NavButton,
  KeyElement,
  TouchElement,
} from "@components/UI";
import {
  SwitchButton,
  ModeButtons,
  ToolBar,
  BottomBar,
  FingerContainer,
} from "@components/Components";
import KeyHighlighter from "@components/KeyHighlighter";
import TouchHighlighter from "@components/TouchHighlighter";

import { NoFingersDetected, yubiToast } from "@utils/Toasts";
import rouletteAnimation from "@utils/RouletteAnimation";
import { launchConfetti } from "@utils/Confetti";
import generateGroups from "@utils/generateGroups";

import useChangeModeUsingScreenWidth from "@hooks/useChangeModeUsingScreenWidth";

import { groupColors, groupConfig } from "@/data";

import { ActiveTouchData, Mode } from "@/types";

const Group = () => {
  const [mode, setMode] = useState<Mode>("touch-mode");
  useChangeModeUsingScreenWidth(setMode);

  const [animationDone, setAnimationDone] = useState(false);

  const [activeTouches, setActiveTouches] = useState<ActiveTouchData[]>([]);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [currentFinger, setCurrentFinger] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const [numberOfGroups, setNumberOfGroups] = useState(groupConfig.MIN);
  const [groups, setGroups] = useState<string[][]>([]);

  useEffect(() => {
    if (animationDone) {
      generateGroups(
        mode === "touch-mode" ? activeTouches : pressedKeys,
        numberOfGroups,
        setGroups
      );
      setHasStarted(false);

      launchConfetti();
    }
  }, [animationDone, activeTouches, pressedKeys, numberOfGroups, mode]);

  const reset = () => {
    if (!hasStarted) {
      setPressedKeys([]);
      setCurrentFinger(null);
      setHasStarted(false);
      setNumberOfGroups(groupConfig.MIN);
      setGroups([]);
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

    if (fingerCount < numberOfGroups) {
      yubiToast("Too many groups for the number of fingers.", "error");
      return;
    }

    setCurrentFinger(null);
    setHasStarted(true);

    if (mode === "touch-mode") {
      rouletteAnimation(setCurrentFinger, activeTouches, setAnimationDone);
    } else {
      rouletteAnimation(setCurrentFinger, pressedKeys, setAnimationDone);
    }
  }, [activeTouches, pressedKeys, numberOfGroups, mode]);

  const highlightGroup = (key: string): React.CSSProperties => {
    if (!groups.length) return {};

    for (let i = 0; i < groups.length; i++) {
      if (groups[i].includes(key)) {
        return {
          color: "var(--color-neutral)",
          backgroundColor: `${groupColors[i]}BF`, // 75% opacity
          border: `4px solid ${groupColors[i]}D9`, // 85% opacity
          backgroundClip: "padding-box",
          boxShadow: `0 0 10px ${groupColors[i]}BF`,
        };
      }
    }
    return {};
  };

  return (
    <>
      <ToolBar>
        <div className="h-full hidden md:flex items-center gap-6 text-primary">
          <ModeButtons mode={mode} setMode={setMode} />

          <NavDivider />
        </div>

        <p className="hidden md:block">Groups: </p>
        <NavButton
          text="+"
          disable={groups.length !== 0 || hasStarted}
          handleClick={() =>
            setNumberOfGroups((prev) => {
              if (prev < groupConfig.MAX) {
                return prev + 1;
              }
              yubiToast("Maximum number of groups reached.", "warning");
              return prev;
            })
          }
        />
        <p>{numberOfGroups}</p>
        <NavButton
          text="-"
          disable={groups.length !== 0 || hasStarted}
          handleClick={() =>
            setNumberOfGroups((prev) => {
              if (prev > groupConfig.MIN) {
                return prev - 1;
              }
              yubiToast("Minimum number of groups reached.", "warning");
              return prev;
            })
          }
        />

        <NavDivider />

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
          {activeTouches.map((touch, index) => {
            const isCurrentFinger =
              touch.id.toString() === currentFinger && hasStarted;
            const highlightStyle = isCurrentFinger
              ? {}
              : highlightGroup(touch.id.toString());
            return (
              <TouchElement
                key={index}
                touch={touch}
                className={
                  isCurrentFinger
                    ? "bg-secondary/75 scale-110 border-secondary/75"
                    : ""
                }
                style={highlightStyle}
              />
            );
          })}
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
            {pressedKeys.map((key, index) => {
              const isCurrentFinger = key === currentFinger && hasStarted;

              const highlightStyle = isCurrentFinger ? {} : highlightGroup(key);

              return (
                <KeyElement
                  key={index}
                  className={isCurrentFinger ? "bg-secondary scale-110" : ""}
                  character={key}
                  style={highlightStyle}
                />
              );
            })}
          </FingerContainer>
        </KeyHighlighter>
      )}

      <BottomBar
        fingers={pressedKeys.length | activeTouches.length}
        tooltip="Group fingers instantly, randomly."
      >
        <NavDivider />
        <ul className="flex gap-2">
          {Array.from({ length: numberOfGroups }).map((_, i) => (
            <li
              key={i}
              className="w-4 h-4 md:w-5 md:h-5 text-[10px] md:text-[12px] rounded flex justify-center items-center text-neutral"
              style={{ backgroundColor: groupColors[i] }}
            >
              {i + 1}
            </li>
          ))}
        </ul>
      </BottomBar>
    </>
  );
};

export default Group;
