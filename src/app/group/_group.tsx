"use client";

import React, { useState, useCallback } from "react";

import { NavBar, NavDivider } from "@components/Navigation";
import { ResetButton, ModeButtons } from "@components/Buttons";
import KeyHighlighter from "@components/KeyHighlighter";
import { NoFingersDetected } from "@components/Toasts";

const Group = () => {
  const [mode, setMode] = useState("keys-mode"); // keys-mode or touch-mode

  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const reset = () => {
    if (!hasStarted) {
      setPressedKeys([]);
      setSelectedKey(null);
      setHasStarted(false);
    }
  };

  const start = useCallback(() => {
    if (pressedKeys.length === 0) {
      NoFingersDetected();

      return;
    }

    setSelectedKey(null);
    setHasStarted(true);
  }, [pressedKeys]);

  return (
    <main className="h-[600px] w-full flex flex-col items-center">
      <NavBar>
        <ModeButtons mode={mode} setMode={setMode} />

        <NavDivider />

        <ResetButton reset={reset} hasStarted={hasStarted} />
      </NavBar>

      <KeyHighlighter
        pressedKeys={pressedKeys}
        setPressedKeys={setPressedKeys}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        hasStarted={hasStarted}
        setHasStarted={setHasStarted}
        start={() => start()}
        reset={() => reset()}
      />
    </main>
  );
};

export default Group;
