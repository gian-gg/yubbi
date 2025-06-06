"use client";
import React, { useState, useCallback, useEffect } from "react";

import {
  NavBar,
  NavDivider,
  NavButton,
  Container,
} from "@components/Navigation";
import { SwitchButton, ModeButtons } from "@components/Buttons";
import KeyHighlighter from "@components/KeyHighlighter";

import { NoFingersDetected, yubiToast } from "@utils/Toasts";
import rouletteAnimation from "@utils/RouletteAnimation";
import { launchConfetti } from "@utils/Confetti";

import { groupColors, groupConfig } from "@/data";

const Group = () => {
  const [mode, setMode] = useState("keys-mode"); // keys-mode or touch-mode
  const [animationDone, setAnimationDone] = useState(false);

  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const [numberOfGroups, setNumberOfGroups] = useState(groupConfig.MIN);
  const [groups, setGroups] = useState<string[][]>([]);

  useEffect(() => {
    if (animationDone) {
      generateGroups();
      setHasStarted(false);

      launchConfetti();
    }
  }, [animationDone]);

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

  const generateGroups = () => {
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
    <main className="h-[600px] w-full flex flex-col items-center">
      <NavBar>
        <ModeButtons mode={mode} setMode={setMode} />

        <NavDivider />

        <p>Groups: </p>
        <NavButton
          text="+"
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
        <Container className="min-h-60 w-full p-8 my-8 flex items-center justify-center gap-4">
          {pressedKeys.map((key, index) => {
            const highlightStyle =
              key === currentKey && hasStarted ? {} : highlightGroup(key);

            return (
              <kbd
                key={index}
                className={`kbd kbd-lg w-40 h-40 text-[80px] transition-transform duration-200 bg-base-300 ${
                  key === currentKey && hasStarted
                    ? "bg-secondary scale-110"
                    : ""
                }`}
                style={highlightStyle}
              >
                {key}
              </kbd>
            );
          })}
        </Container>
      </KeyHighlighter>
      <Container className="flex gap-4">
        <p className="text-base-content">Fingers: {pressedKeys.length}</p>
        <NavDivider />
        <ul className="flex gap-2">
          {Array.from({ length: numberOfGroups }).map((_, i) => (
            <li
              key={i}
              className="w-6 h-6 rounded flex justify-center items-center text-neutral"
              style={{ backgroundColor: groupColors[i] }}
            >
              {i + 1}
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
};

export default Group;
