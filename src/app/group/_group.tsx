"use client";
import React, { useState, useCallback, useEffect } from "react";

import { NavBar, NavDivider, NavButton } from "@components/Navigation";
import { ResetButton, ModeButtons } from "@components/Buttons";
import KeyHighlighter from "@components/KeyHighlighter";

import { NoFingersDetected, yubiToast } from "@utils/Toasts";
import rouletteAnimation from "@utils/RouletteAnimation";

const groupColors = [
  "border-4 border-[#A3CEF1]", // pastel blue
  "border-4 border-[#F9F871]", // pastel yellow
  "border-4 border-[#F6D6AD]", // pastel orange
  "border-4 border-[#F7A072]", // pastel coral
  "border-4 border-[#B6E2D3]", // pastel teal
  "border-4 border-[#E4C1F9]", // pastel purple
  "border-4 border-[#B5ead7]", // pastel mint
  "border-4 border-[#FFDAC1]", // pastel peach
  "border-4 border-[#C7CEEA]", // pastel lavender
  "border-4 border-[#FFB7B2]", // pastel pink
];

const Group = () => {
  const [mode, setMode] = useState("keys-mode"); // keys-mode or touch-mode
  const [animationDone, setAnimationDone] = useState(false);

  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const [numberOfGroups, setNumberOfGroups] = useState(2);
  const [groups, setGroups] = useState<string[][]>([]);

  useEffect(() => {
    if (animationDone) {
      generateGroups();
      setHasStarted(false);
    }
  }, [animationDone]);

  const reset = () => {
    if (!hasStarted) {
      setPressedKeys([]);
      setCurrentKey(null);
      setHasStarted(false);
      setNumberOfGroups(2);
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
    if (pressedKeys.length === 0) {
      NoFingersDetected();
      return;
    }

    if (pressedKeys.length < numberOfGroups) {
      yubiToast("Too many groups for the number of keys.", "error");
      return;
    }

    setCurrentKey(null);
    setHasStarted(true);

    rouletteAnimation(setCurrentKey, pressedKeys, setAnimationDone);
  }, [pressedKeys, numberOfGroups]);

  const highlightGroup = (key: string) => {
    if (!groups.length) return "";

    for (let i = 0; i < groups.length; i++) {
      if (groups[i].includes(key)) {
        return groupColors[i] || "border-4 border-base-300"; // fallback for more than 10 groups
      }
    }
    return "";
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
              if (prev < 10) {
                return prev + 1;
              }
              return prev;
            })
          }
        />
        <p>{numberOfGroups}</p>
        <NavButton
          text="-"
          handleClick={() =>
            setNumberOfGroups((prev) => {
              if (prev > 2) {
                return prev - 1;
              }

              return prev;
            })
          }
        />

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
                  : `${highlightGroup(key)}`
                : `${highlightGroup(key)}`
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

export default Group;
