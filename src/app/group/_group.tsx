"use client";
import React, { useState, useCallback, useEffect } from "react";

import { NavDivider, NavButton, KeyElement } from "@components/UI";
import {
  SwitchButton,
  ModeButtons,
  ToolBar,
  BottomBar,
  FingerContainer,
} from "@components/Components";
import KeyHighlighter from "@components/KeyHighlighter";

import { NoFingersDetected, yubiToast } from "@utils/Toasts";
import rouletteAnimation from "@utils/RouletteAnimation";
import { launchConfetti } from "@utils/Confetti";

import { useChangeModeUsingScreenWidth } from "@utils/Misc";

import { groupColors, groupConfig } from "@/data";

const Group = () => {
  const [mode, setMode] = useState("touch-mode"); // keys-mode or touch-mode
  useChangeModeUsingScreenWidth(setMode);

  const [animationDone, setAnimationDone] = useState(false);

  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const [numberOfGroups, setNumberOfGroups] = useState(groupConfig.MIN);
  const [groups, setGroups] = useState<string[][]>([]);

  const generateGroups = useCallback(() => {
    const shuffledKeys = [...pressedKeys].sort(() => Math.random() - 0.5);

    const newGroups: string[][] = Array.from(
      { length: numberOfGroups },
      () => []
    );

    shuffledKeys.forEach((key, index) => {
      const groupIndex = index % numberOfGroups;
      newGroups[groupIndex].push(key);
    });

    setGroups(newGroups);
  }, [pressedKeys, numberOfGroups]);

  useEffect(() => {
    if (animationDone) {
      generateGroups();
      setHasStarted(false);

      launchConfetti();
    }
  }, [animationDone, generateGroups]);

  const reset = () => {
    if (!hasStarted) {
      setPressedKeys([]);
      setCurrentKey(null);
      setHasStarted(false);
      setNumberOfGroups(groupConfig.MIN);
      setGroups([]);
      setAnimationDone(false);
    }
  };

  const start = useCallback(() => {
    if (pressedKeys.length <= 1) {
      NoFingersDetected();

      return;
    }

    if (pressedKeys.length < numberOfGroups) {
      yubiToast("Too many groups for the number of fingers.", "error");
      return;
    }

    setCurrentKey(null);
    setHasStarted(true);

    rouletteAnimation(setCurrentKey, pressedKeys, setAnimationDone);
  }, [pressedKeys, numberOfGroups]);

  const highlightGroup = (key: string): React.CSSProperties => {
    if (!groups.length) return {};

    for (let i = 0; i < groups.length; i++) {
      if (groups[i].includes(key)) {
        return {
          color: "var(--color-neutral)",
          backgroundColor: groupColors[i],
        };
      }
    }
    return {};
  };

  return (
    <>
      <ToolBar>
        <div className="h-full hidden md:flex items-center gap-6">
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
          currentKey={currentKey}
        />
      </ToolBar>

      <KeyHighlighter
        setPressedKeys={setPressedKeys}
        currentKey={currentKey}
        hasStarted={hasStarted}
        start={() => start()}
        reset={() => reset()}
      >
        <FingerContainer>
          {pressedKeys.map((key, index) => {
            const highlightStyle =
              key === currentKey && hasStarted ? {} : highlightGroup(key);

            return (
              <KeyElement
                key={index}
                className={
                  key === currentKey && hasStarted
                    ? "bg-secondary scale-110"
                    : ""
                }
                character={key}
                style={highlightStyle}
              />
            );
          })}
        </FingerContainer>
      </KeyHighlighter>
      <BottomBar
        fingers={pressedKeys.length}
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
