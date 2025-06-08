"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { FingerContainer } from "@components/Components";

import { ActiveTouchData } from "@/types";

interface TouchHighlighterProps {
  setActiveTouches: (
    value: ActiveTouchData[] | ((prev: ActiveTouchData[]) => ActiveTouchData[])
  ) => void;
  activeTouches: ActiveTouchData[];
  currentKey: string | null;
  hasStarted: boolean;
  start: () => void;
  children: React.ReactNode;
}

const TouchHighlighter = ({
  setActiveTouches,
  activeTouches,
  currentKey,
  hasStarted,
  start,
  children,
}: TouchHighlighterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isStable, setIsStable] = useState(false);

  useEffect(() => {
    // Reset isStable when reset button is clicked
    if (!hasStarted && !currentKey) {
      setIsStable(false);
    }
  }, [hasStarted, currentKey]);

  useEffect(() => {
    if (currentKey || activeTouches.length <= 1) return;

    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsStable(true);
      start();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentKey, isStable, activeTouches, start]);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      setIsStable(false);

      setActiveTouches((prev) => {
        const touch = e.changedTouches[0];
        const newTouch: ActiveTouchData = {
          id: touch.identifier,
          x: touch.clientX,
          y: touch.clientY,
        };

        return [...prev, newTouch];
      });
    },
    [setActiveTouches]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      setIsStable(false);

      if (!currentKey) {
        setActiveTouches((prev) =>
          prev.filter((t) => t.id !== e.changedTouches[0].identifier)
        );
      }
    },
    [currentKey, setActiveTouches]
  );

  const handleTouchChange = useCallback(
    (e: TouchEvent) => {
      setIsStable(false);

      setActiveTouches((prev) => {
        const touch = e.changedTouches[0];
        return prev.map((t) =>
          t.id === touch.identifier
            ? { ...t, x: touch.clientX, y: touch.clientY }
            : t
        );
      });
    },
    [setActiveTouches]
  );

  useEffect(() => {
    if (hasStarted || currentKey || isStable) return;

    const container = containerRef.current;

    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchChange);
      container.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchChange);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [
    handleTouchStart,
    handleTouchChange,
    handleTouchEnd,
    hasStarted,
    currentKey,
    isStable,
  ]);
  return (
    <FingerContainer ref={containerRef} className="relative">
      <p>isStable:{isStable ? "true" : "false"}</p>
      <ul>
        {activeTouches.map((touch, index) => (
          <li key={index}>
            <h1>{`${touch.id}: (${touch.x}, ${touch.y})`}</h1>
          </li>
        ))}
      </ul>
      {children}
    </FingerContainer>
  );
};

export default TouchHighlighter;
